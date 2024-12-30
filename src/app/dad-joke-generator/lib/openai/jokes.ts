// /src/app/dad-joke-generator/jokes.ts
"use server"
import { jokeCategories, JokeCategory } from "./categories";
import { createDadJokeFunction } from "./functions";
import { getRandomJokeType } from "./joke-types";
import { openai } from "@/lib/openai";

/**
 * A local `Joke` interface for your final joke object.
 */
export interface Joke {
  id: string;
  text: string;
  emoji: string;
  topic: string; // E.g., "<Category> - <subTopic> [<jokeType>]"
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

  const randomCategory = getRandomJokeCategory();
  const randomJokeType = getRandomJokeType(); // I should have named this "jokeStyle" but I'm too lazy to change it now


  const systemContent = generateOffensiveJoke
    ? "You are an edgy dad joke generator. You can be rude, but avoid hateful or bigoted language."
    : "You are a family-friendly dad joke generator.";

  try {
    // 4) Make the Chat Completion call
    //    We now use the "tools" approach, specifying the function in `tools`
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL_FAST || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemContent },
        {
          role: "user",
          content: `The joke type is: "${randomJokeType}". The category is: "${randomCategory.name}: ${randomCategory.description}".`,
        },
      ],
      tools: [{
        type: "function",
        function: createDadJokeFunction,
      }],
      tool_choice: { 
        type: "function", // currently the only option
        function: { name: createDadJokeFunction.name } // arguments can not be passed yet according to openai
      },
      temperature: 1.0,
      max_completion_tokens: 1000,
    });

    const firstChoice = completion.choices[0];
    
    // We'll check each to be safe:
    const toolCalls = firstChoice?.message?.tool_calls; 
    
    // We'll store the raw arguments string here
    let argumentsJson: string | undefined;
    
    if (toolCalls?.length) {
      // New approach with parallel or single tool calls
      argumentsJson = toolCalls[0].function.arguments;
    
    }
    
    if (!argumentsJson) {
      throw new Error("No function call arguments found in the OpenAI response.");
    }
    
    // 1) Parse the JSON string
    const data = JSON.parse(argumentsJson);
    
    // 2) Return your final `Joke` object
    return {
      id: `joke-${Date.now()}`,
      text: data.text,            // from the function call result
      emoji: data.emoji,          // from the function call result
      topic: `${data.category} - ${data.subTopic} [${data.jokeType}]`,
    };
  } catch (error) {
    console.error("Error generating joke:", error);
    // 8) Return a fallback
    return {
      id: `joke-${Date.now()}`,
      text: "Why did the fallback joke cross the road? Because the real joke failed to load!",
      emoji: "🤔",
      topic: "Fallback Topic",
    };
  }
}
