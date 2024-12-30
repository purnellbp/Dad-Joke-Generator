// /src/app/dad-joke-generator/lib/openai/joke-types.ts

export const jokeTypes = [
    "Rule of Three",
    // "Who-Shift",
    // "What-Shift",
    // "Where-Shift",
    // "When-Shift",
    // "Why-Shift",
    "Embarrassing",
    "Exaggeration",
    "Anti-Joke",
    "Stand-up comedian",  
];
  
  /** Helper function to pick a random type from the list. */
  export function getRandomJokeType(): string {
    const randomIndex = Math.floor(Math.random() * jokeTypes.length);
    return jokeTypes[randomIndex];
  }
  