// /src/app/dad-joke-generator/jokes.ts

import { openai } from "@/lib/openai";
import { jokeCategories, JokeCategory } from "./categories";
import {
  createDadJokeFunction,
  dadJokeFunctions,
  CreateDadJokeFunctionResult,
} from "./functions";

/**
 * We define a local `Joke` interface to store
 * the final joke data in your application.
 */
export interface Joke {
  id: string;
  text: string;
  emoji: string;
  topic: string; // e.g., "<Category> - <subTopic>"
}

/**
 * Helper to get a random joke category from the array.
 */
function getRandomJokeCategory(): JokeCategory {
  const randomIndex = Math.floor(Math.random() * jokeCategories.length);
  return jokeCategories[randomIndex];
}

/**
 * Core function: generateJoke
 * 1) Picks a random category
 * 2) Asks the AI to come up with a sub-topic + dad joke about that category
 * 3) Returns a `Joke` object
 */
export async function generateJoke(generateOffensiveJoke: boolean = false): Promise<Joke> {
  // Select a random category
  const randomCategory = getRandomJokeCategory();

  // We'll keep the system + user instructions simple
  const systemContent = generateOffensiveJoke
    ? "You are an edgy dad joke generator. You can be rude, but avoid hateful or bigoted language."
    : "You are a family-friendly dad joke generator.";

  const userContent = `Please generate a joke about something in the category: "${randomCategory.name}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL_FAST || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent },
      ],
      functions: dadJokeFunctions,
      function_call: {
        name: createDadJokeFunction.name,
      },
      temperature: 1.0,
      frequency_penalty: 0.5,
    });

    // The model may respond with a function call. Let's parse it.
    const firstChoice = completion.choices[0];
    const functionCall = firstChoice?.message?.function_call;

    if (!functionCall || !functionCall.arguments) {
      throw new Error("No function call or arguments returned by the AI.");
    }

    // Parse the JSON returned by the function call
    const data = JSON.parse(functionCall.arguments) as CreateDadJokeFunctionResult;
    // data should include: { category, subTopic, text, emoji }

    // Construct and return our local `Joke` object
    return {
      id: `joke-${Date.now()}`,
      text: data.text,
      emoji: data.emoji,
      topic: `${data.category} - ${data.subTopic}`,
    };
  } catch (error) {
    console.error("Error generating joke:", error);
    // Return a fallback joke
    return {
      id: `joke-${Date.now()}`,
      text: "Why did the fallback joke cross the road? Because the real joke failed to load!",
      emoji: "🤔",
      topic: "Fallback Topic",
    };
  }
}
