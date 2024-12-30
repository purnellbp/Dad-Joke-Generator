// /src/app/dad-joke-generator/lib/openai/joke-types.ts

export const jokeTypes = [
  "Rule of Three",
  "Embarrassing",
  "Exaggeration",
  "Stand-up comedian",
  "Wordplay",
  "Puns",
  "Observational",
  "Dark humor",
  "Sarcasm",
  "Self-deprecating",
  "Parody",
  "Irony",
  "Knock-knock",
  "One-liner",
  "Impression",
  "Physical comedy",
  "Slapstick",
  "Misunderstanding",
  "Call-and-response",
  "Situational",
  "Inappropriate",
  "Innuendo",
  "Sexual",
  "Naughty",
  "Rude",
  "Dirty",
  "Silly",
  "Surprise",
  "Unexpected",
  "Unexpected Twist",
  "Unexpected Ending",
  "Unexpected Punchline",
];

  
  /** Helper function to pick a random type from the list. */
  export function getRandomJokeType(): string {
    const randomIndex = Math.floor(Math.random() * jokeTypes.length);
    return jokeTypes[randomIndex];
  }
  