// src\lib\joke-categories.ts

export const jokeCategories = [
  {
    name: "Random Shenanigans",
    description: "Random jokes. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Popular TV Shows",
    description: "Generate jokes about TV shows from different decades and genres. RANDOMIZE between: Classic shows, 80s/90s shows, 2000s shows, or modern shows. DO NOT focus on overused shows like The Office or Friends. Each joke MUST use a different show than the last 3 jokes.",
  },
  {
    name: "Popular Movies",
    description: "Generate jokes about movies from different decades and genres. RANDOMIZE between: Classic movies, 80s/90s movies, 2000s movies, or modern movies. DO NOT focus on overused movies like The Matrix or Star Wars. Each joke MUST use a different movie than the last 3 jokes.",
  },
  {
    name: "Popular Music",
    description: "Generate jokes about music from different decades and genres. RANDOMIZE between: Classic music, 80s/90s music, 2000s music, or modern music. DO NOT focus on overused music like The Beatles or Queen. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Tech & Gadgets",
    description: "Generate jokes about technology and gadgets. RANDOMIZE between: Computers, smartphones, social media, and everything in between. DO NOT focus on overused technology like Apple or Google. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Foodie Funnies",
    description: "Generate jokes about food and cooking. RANDOMIZE between: Pizza, sushi, burgers, and everything else edible. DO NOT focus on overused food like pizza or sushi. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Sports Groaners",
    description: "Generate jokes about sports. RANDOMIZE between: Football, basketball, baseball, and everything else sports-related. DO NOT focus on overused sports like baseball or basketball. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Dad Habits & Quirks",
    description: "Generate jokes about dad habits and quirks. RANDOMIZE between: Thermostat policing, groaning when sitting down, and everything else dad-ish. DO NOT focus on overused dad habits like groaning or thermostat policing. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Fashion Faux-Pas (Dad Edition)",
    description: "Generate jokes about dad fashion. RANDOMIZE between: Socks with sandals, cargo shorts, and that one shirt Dad won’t throw away. DO NOT focus on overused dad fashion like cargo shorts or socks with sandals. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Dad vs. Pop Culture",
    description: "Generate jokes about dad's struggle with pop culture. RANDOMIZE between: Trying to understand new slang, social media trends, and memes. DO NOT focus on overused pop culture references like tic-tok or instagram. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "DIY (Dad-It-Yourself)",
    description: "Generate jokes about Dad’s home improvement attempts, questionable tool usage, and epic 'I can fix that' moments. DO NOT focus on overused home improvement references like fixing a leaky faucet or hanging a picture. Each joke MUST use a different reference than the last 3 jokes.",
  },
  {
    name: "Accidental Innuendos",
    description: "Generate jokes about Dad’s well-meaning remarks veer into awkward or suggestive territory without him even realizing it. Each joke MUST use a different reference than the last 3 jokes.",
  },
] as const;

export type JokeCategory = typeof jokeCategories[number];
