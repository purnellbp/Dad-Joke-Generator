// /src/lib/openai-dad-joke-functions.ts

/**
 * We add "jokeType" as a required property,
 * enumerating the different comedic structures.
 */
export const createDadJokeFunction = {
  name: "createDadJoke",
  description:
    "Generates a coherent dad joke within a chosen category and sub-topic. The joke should be in a typical dad-joke style. Never start a joke with 'Why' or 'How'.",
  parameters: {
    type: "object",
    properties: {
      category: {
        type: "string",
        description:
          "The category.",
      },
      subTopic: {
        type: "string",
        description:
          "For TV shows: Pick a random memorable scene, character quirk, or plot point from ANY well-known TV show EXCEPT The Office or Friends. Each subtopic must reference a different show than recent jokes. Avoid using the same show or type of show repeatedly.",
      },
      jokeType: {
        type: "string",
        description:
          "The joke type.",
      },
      text: {
        type: "string",
        description:
          "The actual text of the dad joke. If you need line breaks, use actual line breaks in the text - do not use escape sequences like \\n or any other special characters.",
      },
      emoji: {
        type: "string",
        description:
          "An optional emoji to enhance or punctuate the joke's punchline or theme (e.g., 🤣, 🍕, etc.).",
      },
    },
    required: ["category", "subTopic", "jokeType", "text", "emoji"],
  },
} as const;

/**
 * Updated interfaces to include 'jokeType'.
 */
export interface CreateDadJokeFunctionArgs {
  category: string;
  jokeType: string;
  // Optionally, if you want your app to supply the jokeType manually,
  // you can add: jokeType?: string;
}

export interface CreateDadJokeFunctionResult {
  category: string;
  subTopic: string;
  jokeType: string;
  text: string;
  emoji: string;
}

/**
 * If you want to pass multiple function schemas in one request,
 * you can collect them here. For now, there's just one.
 */
export const dadJokeFunctions = [createDadJokeFunction];
