export interface Joke {
  id: string;
  text: string;
  category: 'classic' | 'tech' | 'food' | 'animal' | 'science' | 'resume' | 'office' | 'weather' | 'story';
  emoji: string;
}

export const preGeneratedJokes: Joke[] = [
  // Classic Dad Jokes
  {
    id: 'cl01',
    text: "Why don't eggs tell jokes?\n\nThey'd crack up!",
    category: 'classic',
    emoji: '🥚'
  },
  {
    id: 'cl02',
    text: "What do you call a fake noodle?\n\nAn impasta!",
    category: 'classic',
    emoji: '🍝'
  },
  
  // Tech Dad Jokes
  {
    id: 'te01',
    text: "Why do programmers prefer dark mode?\n\nBecause light attracts bugs!",
    category: 'tech',
    emoji: '🐛'
  },
  {
    id: 'te02',
    text: "What did the computer do at lunchtime?\n\nHad a byte!",
    category: 'tech',
    emoji: '💻'
  },
  
  // Food Dad Jokes
  {
    id: 'fo01',
    text: "What did the sushi say to the bee?\n\nWasabee!",
    category: 'food',
    emoji: '🍱'
  },
  
  // Animal Dad Jokes
  {
    id: 'an01',
    text: "What do you call a bear with no teeth?\n\nA gummy bear!",
    category: 'animal',
    emoji: '🐻'
  },
  
  // Science Dad Jokes
  {
    id: 'sc01',
    text: "Why can't you trust atoms?\n\nThey make up everything!",
    category: 'science',
    emoji: '⚛️'
  },
  
  // Resume-style jokes
  {
    id: 're01',
    text: "How would you write 'I made coffee' on your resume?\n\n'Facilitated the implementation of critical morning optimization protocols through strategic caffeine deployment systems.'",
    category: 'resume',
    emoji: '☕'
  },
  
  // Story Dad Joke
  {
    id: 'st01',
    text: "My daughter asked me to tell her a bedtime story, so I said:\n\n'Once upon a time, there was this person who was interrupted mid-sneeze.'\n\nShe said 'What happened next?'\n\nI replied 'Nothing, it's a cliff-hanger!'",
    category: 'story',
    emoji: '🤧'
  }
]; 