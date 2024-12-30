// src\lib\joke-categories.ts

export const jokeCategories = [
  // {
  //   name: "Random Shenanigans",
  //   description: "All-purpose jokery. Perfect for those moments when your puns just can't be contained by logic or reason.",
  // },
  {
    name: "Popular TV Shows",
    description: "Timely, relevant, and just a little bit cringe—jokes about today's top small-screen obsessions.",
  },
  {
    name: "Popular Movies",
    description: "Big-screen funnies, hot off the Hollywood press. Guaranteed to make your kids roll their eyes like end-credit outtakes.",
  },
  {
    name: "Popular Music",
    description: "From chart-topping hits to indie darlings, these jokes will strike a chord with any music fan.",
  },
  {
    name: "Tech & Gadgets",
    description: "Geek out with puns about computers, smartphones, social media, and everything in between.",
  },
  {
    name: "Foodie Funnies",
    description: "Serve up some jokes about pizza, sushi, and everything else edible. Bon appétit—or should we say, pun appétit?",
  },
  {
    name: "Sports Groaners",
    description:
      "From football to tiddlywinks, these pun-based plays are guaranteed to have you shouting ‘Dad jokes for the win!’",
  },
  {
    name: "Foodie Funnies",
    description:
      "Serve up some jokes about pizza, sushi, and everything else edible. Bon appétit—or should we say, pun appétit?",
  },
  {
    name: "Dad Habits & Quirks",
    description:
      "From thermostat policing to groaning when sitting down, these jokes capture the timeless, universal dad-isms.",
  },
  {
    name: "Fashion Faux-Pas (Dad Edition)",
    description:
      "Think socks with sandals, cargo shorts, and that one shirt Dad won’t throw away—these jokes tackle Dad’s questionable style choices.",
  },
  {
    name: "Dad vs. Pop Culture",
    description:
      "Nothing’s funnier than Dad desperately trying to decode new slang, social media trends, and memes he can’t pronounce.",
  },
  {
    name: "DIY (Dad-It-Yourself)",
    description:
      "Gags about Dad’s home improvement attempts, questionable tool usage, and epic 'I can fix that' moments.",
  },
  {
    name: "Accidental Innuendos",
    description:
      "Those face-palm moments when Dad’s well-meaning remarks veer into awkward or suggestive territory without him even realizing it.",
  },
] as const;

export type JokeCategory = typeof jokeCategories[number];
