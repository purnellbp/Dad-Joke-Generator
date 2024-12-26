import { openai } from "./openai";
import { jokeTopics } from "./joke-topics";


export interface Joke {
  id: string;
  text: string;
  emoji: string;
}





function parseJokeResponse(toolCall: { function: { arguments: string } }): Joke {
  try {
    const data = JSON.parse(toolCall.function.arguments);
    return {
      id: `joke-${Date.now()}`,
      text: data.text,
      emoji: data.emoji || '👨',
    };
  } catch (error) {
    console.error('Error parsing joke response:', error);
    return {
      id: `joke-${Date.now()}`,
      text: 'Why did the joke fail? Because it got lost in translation! (fallback joke)',
      emoji: '🤔',
    };
  }
}

/**
 * Helper function to compute cost based on the latest pricing.
 * 
 * Pricing from the latest sources (regular only, no batch pricing detailed):
 * 
 * gpt-4o:
 *  - Regular:  $5.00 / 1M input, $15.00 / 1M output
 * 
 * gpt-4o-mini:
 *  - Regular:  $0.15 / 1M input, $0.60 / 1M output
 */
function computeCost(
  modelName: string,
  inputTokens: number,
  outputTokens: number,
  // useBatchApi: boolean = false // Note: No batch pricing available in sources
): number {
  // Convert tokens to 'per million' units
  const inputMillions = inputTokens / 1_000_000;
  const outputMillions = outputTokens / 1_000_000;

  // We'll lowercase the model name for easier checks
  const m = modelName.toLowerCase();

  // gpt-4o 
  if (m.includes('gpt-4o') && !m.includes('mini')) {
    return inputMillions * 5.0 + outputMillions * 15.0;
  }

  // gpt-4o-mini 
  if (m.includes('gpt-4o-mini')) {
    return inputMillions * 0.15 + outputMillions * 0.6;
  }

  // Fallback: If the model doesn't match known strings, just return 0 or some baseline
  return 0;
}

export async function generateJoke(
  
  lastJoke: string = '',
  generateOffensiveJoke: boolean = false
): Promise<Joke> {


  // toggle cost logging, default is false
  const isCostLoggingEnabled = process.env.COST_LOGGING === 'true';

  // Lower temperature range
  const randomTemperature = Math.random() * 0.4 + 0.8; // e.g., 0.8 -> 1.2

  // get random joke topic
  const randomJokeTopic = jokeTopics[Math.floor(Math.random() * jokeTopics.length)];

  // Decide model + tokens
  const settings = {
        model: process.env.AI_MODEL_FAST as string,
        max_completion_tokens: 170,
        temperature: randomTemperature,
        frequency_penalty: 0.5,
      };

  // Example: "IS_BATCH_API=true" would switch to batch pricing, but no batch pricing in sources
  const useBatchApi = process.env.IS_BATCH_API === 'true';

  // Prompt logic
  const systemPrompt = generateOffensiveJoke
    ? 'You are an edgy dad joke generator. You can be rude or edgy, but avoid hateful or bigoted language. ' +
      `Last joke: ${lastJoke}`
    : 'You are a family-friendly dad joke generator. ' +
      `Last joke: ${lastJoke}`;

  const userPrompt = generateOffensiveJoke
    ? 'Generate a rude or edgy joke. ' +
      "Don't mention the last joke you generated.  " +
      `The joke topic is: ${randomJokeTopic}`

    : 'Generate a new family-friendly dad joke. ' +
      "Don't mention the last joke you generated.  " +
      `The joke topic is: ${randomJokeTopic}`;

  try {
    const completion = await openai.chat.completions.create({
      ...settings,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      tool_choice: 'auto',
      tools: [
        {
          type: 'function',
          function: {
            name: 'create_joke',
            description: 'Create a dad joke with text and an associated emoji.',
            parameters: {
              type: 'object',
              properties: {
                text: {
                  type: 'string',
                  description:
                    'The actual text of the dad joke. ASCII only. Not hateful.',
                },
                emoji: {
                  type: 'string',
                  description: 'An optional emoji that fits the joke theme. Example: 🤣',
                },
              },
              required: ['text', 'emoji'],
            },
          },
        },
      ],
      modalities: ['text'],
      n: 1,
    });

    // pretty print the completion if COST_LOGGING is true
    if (isCostLoggingEnabled) {
      console.log('System prompt:', systemPrompt);
      console.log('User prompt:', userPrompt);
      console.log('Completion:', JSON.stringify(completion, null, 2));
    }

    // ---------------------------
    // COST LOGGING FEATURE
    // ---------------------------
    if (isCostLoggingEnabled) {
    const usage = completion.usage;
    if (usage) {
      const promptTokens = usage.prompt_tokens ?? 0;
      const completionTokens = usage.completion_tokens ?? 0;
      const totalTokens = usage.total_tokens ?? 0;

      // Use our new function to compute cost
      const costUSD = computeCost(
        completion.model,
        promptTokens,
        completionTokens,
        // useBatchApi
      );

      console.log(`Model: ${completion.model}`);
      console.log('Prompt tokens:', promptTokens);
      console.log('Completion tokens:', completionTokens);
      console.log('Total tokens:', totalTokens);
      console.log(`Batch pricing? ${useBatchApi}`);
      console.log('Approx. cost (USD):', costUSD.toFixed(4));
    } else {
        console.log('No token usage reported by the API.');
      }
    }
    // ---------------------------

    // Extract structured data if function call was used
    const firstChoice = completion.choices[0];
    const toolCall = firstChoice?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      return parseJokeResponse(toolCall);
    }

    // Fallback to direct text
    const jokeText = firstChoice?.message?.content;
    if (!jokeText) {
      throw new Error('No joke text returned by the API');
    }

    return {
      id: `joke-${Date.now()}`,
      text: jokeText,
      emoji: '👨',
    };
  } catch (error) {
    console.error('Error generating joke:', error);
    throw new Error('Failed to generate joke');
  }
}