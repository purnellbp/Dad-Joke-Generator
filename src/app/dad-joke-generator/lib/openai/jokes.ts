// /src/app/dad-joke-generator/jokes.ts
"use server"
import { jokeCategories, JokeCategory } from "./categories";
import { createDadJokeFunction } from "./functions";
import { getRandomJokeType } from "./joke-types";
import { openai } from "@/lib/openai";
import modelPricing from "./published-model-pricing";

/**
 * A local `Joke` interface for your final joke object.
 */
export interface Joke {
  id: string;
  text: string;
  emoji: string;
  topic: string;
  metadata?: OpenAIMetadata;
}

export interface OpenAIMetadata {
  model: string;
  temperature: number;
  maxTokens: number;
  category: string;
  jokeType: string;
  systemContent: string;
  timestamp: string;
  duration: number;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCost: number;
    projectId: string | undefined;
    dailyUsage?: {
      totalTokens: number;
      totalCost: number;
    };
  };
}

// random category
function getRandomJokeCategory(): JokeCategory {
  const randomIndex = Math.floor(Math.random() * jokeCategories.length);
  return jokeCategories[randomIndex];
}

/**
 * Generate a dad joke with a random category AND random joke type.
 */
export async function generateJoke(generateOffensiveJoke: boolean = false): Promise<Joke> {
  const startTime = Date.now();
  const randomCategory = getRandomJokeCategory();
  const randomJokeType = getRandomJokeType();
  const projectId = process.env.OPENAI_PROJECT_ID || undefined;

  const systemContent = generateOffensiveJoke
    ? "You are an edgy dad joke generator."
    : "You are a dad joke generator.";

  try {
    const model = process.env.AI_MODEL_FAST || "gpt-4o-mini";
    const temperature = 0.9;
    const maxTokens = 1000;

    // Log request details
    console.log('\n=== OpenAI API Request ===');
    console.table({
      model,
      temperature,
      maxTokens,
      systemContent,
      category: randomCategory.name + " - " + randomCategory.description,
      jokeType: randomJokeType,
      projectId,
    });

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemContent },
        {
          role: "user",
          content: `The dad joke style is: "${randomJokeType}". The dad joke category is: "${randomCategory.name}: ${randomCategory.description}".`,
        },
      ],
      tools: [{
        type: "function",
        function: createDadJokeFunction,
      }],
      tool_choice: { 
        type: "function",
        function: { name: createDadJokeFunction.name }
      },
      temperature,
      max_completion_tokens: maxTokens,
      
     
      top_p: 0.95,
      frequency_penalty: 0.5,
      presence_penalty: 0.6,    });

    // Log response details
    console.log('\n=== OpenAI API Response ===');
    console.table({
      status: 'success',
      promptTokens: completion.usage?.prompt_tokens || 0,
      completionTokens: completion.usage?.completion_tokens || 0,
      totalTokens: completion.usage?.total_tokens || 0,
      duration: `${Date.now() - startTime}ms`,
      joke: completion.choices[0].message.content,
    });

    const duration = Date.now() - startTime;
    const firstChoice = completion.choices[0];
    const toolCalls = firstChoice?.message?.tool_calls;
    let argumentsJson: string | undefined;
    
    if (toolCalls?.length) {
      argumentsJson = toolCalls[0].function.arguments;
      console.log('\n=== Function Call Arguments ===');
      console.log(JSON.parse(argumentsJson));
    }
    
    if (!argumentsJson) {
      throw new Error("No function call arguments found in the OpenAI response.");
    }
    
    const data = JSON.parse(argumentsJson);

    // Calculate cost based on published pricing
    const pricing = modelPricing[model as keyof typeof modelPricing];
    if (!pricing) {
      console.warn(`No pricing found for model ${model}, using fallback pricing`);
    }
    
    // Convert per 1K token price to per token price
    const costPerInputToken = (pricing?.inputTokensPer1K || 0) / 1000;
    const costPerOutputToken = (pricing?.outputTokensPer1K || 0) / 1000;
    const estimatedCost = 
      (completion.usage?.prompt_tokens || 0) * costPerInputToken +
      (completion.usage?.completion_tokens || 0) * costPerOutputToken;

    // Log cost details
    console.log('\n=== Cost Estimation ===');
    console.table({
      model,
      inputPricePer1KTokens: pricing?.inputTokensPer1K || 'unknown',
      outputPricePer1KTokens: pricing?.outputTokensPer1K || 'unknown',
      costPerInputToken,
      costPerOutputToken,
      promptTokens: completion.usage?.prompt_tokens || 0,
      completionTokens: completion.usage?.completion_tokens || 0,
      estimatedCost: estimatedCost.toFixed(6),
    });

    const metadata: OpenAIMetadata = {
      model,
      temperature,
      maxTokens,
      category: randomCategory.name,
      jokeType: randomJokeType,
      systemContent,
      timestamp: new Date().toISOString(),
      duration,
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
        estimatedCost: Number(estimatedCost.toFixed(6)),
        projectId,
      },
    };
    
    return {
      id: `joke-${Date.now()}`,
      text: data.text,
      emoji: data.emoji,
      topic: `${data.category} - ${data.subTopic} [${data.jokeType}]`,
      metadata,
    };
  } catch (error) {
    // Log error details
    console.error('\n=== OpenAI API Error ===');
    console.error('Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return {
      id: `joke-${Date.now()}`,
      text: "Why did the fallback joke cross the road? Because the real joke failed to load!",
      emoji: "🤔",
      topic: "Fallback Topic"
    };
  }
}
