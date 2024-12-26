'use server'

import OpenAI from 'openai';
import { ChatModel } from 'openai/resources/chat/chat.mjs';
import type { Joke } from '@/lib/jokes';
import { storage } from '@/lib/storage';
import { preGeneratedJokes } from '@/lib/jokes';
import { headers } from 'next/headers';
import { createHash } from 'crypto';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate and sanitize environment variables
const AI_MODEL_FAST = process.env.AI_MODEL_FAST;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Allow shorter durations in development for testing
const isLocalDev = !process.env.VERCEL && process.env.NODE_ENV !== 'production';
const RATE_LIMIT_DURATION = isLocalDev
  ? Number(process.env.RATE_LIMIT_DURATION) || 300 // Use exact value in development
  : Math.max(
      Math.min(Number(process.env.RATE_LIMIT_DURATION) || 5 * 60, 24 * 60 * 60), // Max 24 hours
      60 // Min 1 minute in production
    );

// Maximum requests per time window
const MAX_REQUESTS_PER_WINDOW = Number(process.env.MAX_REQUESTS_PER_WINDOW) || 100;

async function getClientIdentifier() {
  const headersList = await headers();
  
  // Get the real client IP from Vercel's headers
  const realIP = headersList.get('x-real-ip');
  const cfIP = headersList.get('cf-connecting-ip');
  const forwardedFor = headersList.get('x-forwarded-for')?.split(',')[0];
  const ip = realIP || cfIP || forwardedFor || 'unknown';
  
  // Include multiple identifiers to make spoofing harder
  const identifiers = [
    ip,
    headersList.get('user-agent') || 'unknown',
    headersList.get('accept-language') || 'unknown',
    headersList.get('sec-ch-ua-platform') || 'unknown'
  ];

  // Create a hash of all identifiers
  const hash = createHash('sha256')
    .update(identifiers.join('|'))
    .digest('hex');

  return hash;
}

async function isRateLimited(clientId: string): Promise<boolean> {
  const rateKey = `rate_limit:${clientId}`;
  const requestCountKey = `request_count:${clientId}`;
  
  const now = Math.floor(Date.now() / 1000);
  console.log('Rate limit check starting:', { clientId: clientId.substring(0, 8), now });

  // Get current state
  const [lastRequest, currentCount] = await Promise.all([
    storage.get<number>(rateKey),
    storage.get<number>(requestCountKey)
  ]);

  console.log('Rate limit state:', {
    lastRequest,
    currentCount,
    now,
    timeSinceLastRequest: lastRequest ? now - lastRequest : 'first request',
    rateLimitDuration: RATE_LIMIT_DURATION,
    maxRequests: MAX_REQUESTS_PER_WINDOW
  });

  // First request ever
  if (!lastRequest) {
    console.log('First request ever, initializing rate limit');
    await Promise.all([
      storage.set(rateKey, now, { ex: RATE_LIMIT_DURATION }),
      storage.set(requestCountKey, 1, { ex: RATE_LIMIT_DURATION })
    ]);
    return false;
  }

  const timeSinceLastRequest = now - lastRequest;

  // If we're within the rate limit window
  if (timeSinceLastRequest < RATE_LIMIT_DURATION) {
    const count = currentCount || 0;
    
    // Check if we've hit the limit
    if (count >= MAX_REQUESTS_PER_WINDOW) {
      console.log('Rate limit exceeded:', {
        currentCount: count,
        maxRequests: MAX_REQUESTS_PER_WINDOW,
        timeRemaining: RATE_LIMIT_DURATION - timeSinceLastRequest
      });
      return true;
    }

    // Increment the counter and update last request time
    console.log('Within rate limit window, incrementing count');
    await Promise.all([
      storage.set(rateKey, now, { ex: RATE_LIMIT_DURATION }),
      storage.incr(requestCountKey)
    ]);
    return false;
  }

  // Window has expired, start fresh
  console.log('Rate limit window expired, resetting');
  await Promise.all([
    storage.set(rateKey, now, { ex: RATE_LIMIT_DURATION }),
    storage.set(requestCountKey, 1, { ex: RATE_LIMIT_DURATION })
  ]);
  return false;
}

// Track recently used themes to avoid repetition
async function getRecentThemes(clientId: string): Promise<string[]> {
  const recentThemesKey = `recent_themes:${clientId}`;
  return await storage.get<string[]>(recentThemesKey) || [];
}

async function addRecentTheme(clientId: string, theme: string) {
  const recentThemesKey = `recent_themes:${clientId}`;
  const themes = await getRecentThemes(clientId);
  const updatedThemes = [...new Set([theme, ...themes])].slice(0, 5); // Keep last 5 unique themes
  await storage.set(recentThemesKey, updatedThemes, { ex: 60 * 60 }); // 1 hour expiry
}

// Track recently used patterns to avoid repetition
async function getRecentPatterns(clientId: string): Promise<string[]> {
  const recentPatternsKey = `recent_patterns:${clientId}`;
  return await storage.get<string[]>(recentPatternsKey) || [];
}

async function addRecentPattern(clientId: string, joke: string) {
  const recentPatternsKey = `recent_patterns:${clientId}`;
  
  // Extract key patterns from the joke
  const patterns = [
    joke.split('?')[0].toLowerCase(), // Setup pattern
    ...joke.match(/\b\w+(?:ed|ing|s)\b/g) || [], // Common verb forms
    ...(joke.match(/therapy|bytes|computer|bicycle|scarecrow|ocean|wave|red|bear|cookie/g) || []) // Common themes
  ];
  
  const existingPatterns = await getRecentPatterns(clientId);
  const updatedPatterns = [...new Set([...patterns, ...existingPatterns])].slice(0, 20);
  await storage.set(recentPatternsKey, updatedPatterns, { ex: 60 * 60 }); // 1 hour expiry
}

export async function generateJokeAction(): Promise<Joke> {
  try {
    const clientId = await getClientIdentifier();
    const seenJokesKey = `seen_jokes:${clientId}`;
    const lastJokeKey = `last_joke:${clientId}`;

    // Get the last joke and recent themes to avoid repetition
    const [lastJoke, recentThemes] = await Promise.all([
      storage.get<string>(lastJokeKey),
      getRecentThemes(clientId)
    ]);

    // Check rate limiting
    const rateLimited = await isRateLimited(clientId);
    console.log('Rate limited:', rateLimited);
    
    if (rateLimited) {
      // Return a pre-generated joke if rate limited
      const seenJokes = await storage.get<string[]>(seenJokesKey) || [];
      console.log('Seen jokes:', seenJokes);
      
      const unseenJokes = preGeneratedJokes.filter(joke => 
        !seenJokes.includes(joke.id) && joke.id !== lastJoke &&
        !recentThemes.includes(joke.category)
      );
      console.log('Unseen jokes count:', unseenJokes.length);
      console.log('Last joke:', lastJoke);
      console.log('Recent themes:', recentThemes);
      
      let selectedJoke: Joke;
      if (unseenJokes.length === 0) {
        console.log('All jokes seen or themes recent, resetting history');
        // If all jokes seen, pick a random one that's not the last one shown and not a recent theme
        const availableJokes = preGeneratedJokes.filter(joke => 
          joke.id !== lastJoke && !recentThemes.includes(joke.category)
        );
        console.log('Available jokes for reset:', availableJokes.length);
        selectedJoke = availableJokes.length > 0 
          ? availableJokes[Math.floor(Math.random() * availableJokes.length)]
          : preGeneratedJokes.filter(joke => joke.id !== lastJoke)[0];
        await storage.del(seenJokesKey);
      } else {
        console.log('Selecting from unseen jokes');
        selectedJoke = unseenJokes[Math.floor(Math.random() * unseenJokes.length)];
        await storage.set(seenJokesKey, [...seenJokes, selectedJoke.id], {
          ex: 60 * 60 * 12 // 12 hours expiry
        });
      }

      console.log('Selected joke:', selectedJoke.id);
      console.log('Joke content:', selectedJoke.text);
      
      // Update tracking
      await Promise.all([
        storage.set(lastJokeKey, selectedJoke.id, { ex: 60 * 60 * 12 }),
        addRecentTheme(clientId, selectedJoke.category)
      ]);
      
      return selectedJoke;
    }

    // Generate AI joke if not rate limited
    const [randomExample, recentPatterns] = await Promise.all([
      Promise.resolve(preGeneratedJokes[Math.floor(Math.random() * preGeneratedJokes.length)]),
      getRecentPatterns(clientId)
    ]);

    const completion = await openai.chat.completions.create({
      model: AI_MODEL_FAST as ChatModel,
      messages: [
        {
          role: "system",
          content: "You are a dad joke generator. Create original, clever, family-friendly dad jokes that include a setup and punchline. Each joke should be unique and not repeated. The jokes should be groan-worthy, involve wordplay, and be suitable for all ages."
        },
        {
          role: "user",
          content: `Here's an example dad joke (category: ${randomExample.category}):
"${randomExample.text}"

Recent patterns to avoid:
${recentPatterns.join(', ')}

Recent themes to avoid: ${recentThemes.join(', ')}

Generate a completely different dad joke:
1. Use a different theme than the example and recent themes
2. Different structure than the example
3. Avoid ALL words and patterns listed above
4. Make it original and unique
5. No common dad joke tropes`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "create_joke",
            description: "Create a structured dad joke",
            parameters: {
              type: "object",
              properties: {
                text: {
                  type: "string",
                  description: "The full joke text including setup and punchline. Must be original and avoid all listed patterns."
                },
                category: {
                  type: "string",
                  enum: ["classic", "tech", "food", "animal", "science", "resume", "office", "weather", "story"],
                  description: "The category that best fits the joke. Must be different from recent themes."
                },
                emoji: {
                  type: "string",
                  description: "A single emoji that represents the joke's theme"
                }
              },
              required: ["text", "category", "emoji"]
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "create_joke" } },
      temperature: 1.0,
      max_tokens: 150,
      presence_penalty: 1.0,
      frequency_penalty: 2.0
    });

    const toolCall = completion.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error('No tool call response from OpenAI');
      throw new Error('AI_GENERATION_FAILED');
    }

    let jokeData;
    try {
      jokeData = JSON.parse(toolCall.function.arguments);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', toolCall.function.arguments);
      console.error('Error details:', parseError);
      throw new Error('AI_RESPONSE_PARSE_ERROR');
    }

    // Validate joke data
    if (!jokeData.text || !jokeData.category || !jokeData.emoji) {
      console.error('Invalid joke data from OpenAI:', jokeData);
      throw new Error('AI_RESPONSE_VALIDATION_ERROR');
    }

    const joke = {
      id: `ai-${Date.now()}-${clientId.substring(0, 8)}`,
      text: jokeData.text,
      category: jokeData.category,
      emoji: jokeData.emoji
    };

    console.log('Generated AI joke:', joke.text);

    // Add AI joke to seen jokes list and patterns
    const seenJokes = await storage.get<string[]>(seenJokesKey) || [];
    await Promise.all([
      storage.set(seenJokesKey, [...seenJokes, joke.id], {
        ex: 60 * 60 * 12 // 12 hours expiry
      }),
      storage.set(lastJokeKey, joke.id, { ex: 60 * 60 * 12 }),
      addRecentTheme(clientId, joke.category),
      addRecentPattern(clientId, joke.text)
    ]);

    return joke;

  } catch (error) {
    // Log error with redacted client info
    console.error('Error in generateJokeAction:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Handle specific error types
    if (error instanceof Error) {
      switch (error.message) {
        case 'OPENAI_CONFIG_ERROR':
          throw new Error('Service configuration error. Please contact support.');
        case 'OPENAI_API_ERROR':
          throw new Error('AI service temporarily unavailable. Please try again later.');
        case 'AI_GENERATION_FAILED':
          throw new Error('Failed to generate joke. Please try again.');
        case 'AI_RESPONSE_PARSE_ERROR':
          throw new Error('Error processing AI response. Please try again.');
        case 'AI_RESPONSE_VALIDATION_ERROR':
          throw new Error('Invalid response from AI. Please try again.');
      }
    }
    
    // Fallback to a pre-generated joke for unexpected errors
    console.warn('Falling back to pre-generated joke due to error');
    const lastJokeKey = `last_joke:${await getClientIdentifier()}`;
    const lastJoke = await storage.get<string>(lastJokeKey);
    
    // Pick a random joke that's not the last one shown
    const availableJokes = preGeneratedJokes.filter(joke => joke.id !== lastJoke);
    const selectedJoke = availableJokes[Math.floor(Math.random() * availableJokes.length)];
    
    // Store this joke as the last shown
    await storage.set(lastJokeKey, selectedJoke.id, { ex: 60 * 60 * 12 });
    return selectedJoke;
  }
}

export async function getRandomDadImage(): Promise<string> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=father,dad&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return '';
  }
} 