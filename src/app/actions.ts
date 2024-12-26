'use server'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function getRandomDadImage(): Promise<string> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=father,dad&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return '';
  }
}

export async function generateJokeAction(): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a dad joke generator. Create a clever, family-friendly dad joke that includes a setup and punchline. The joke should be groan-worthy, involve wordplay, and be suitable for all ages. Format it with the setup and punchline separated by two newlines."
        },
        {
          role: "user",
          content: "Generate a dad joke"
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const joke = completion.choices[0]?.message?.content?.trim() || '';
    return joke;
  } catch (error) {
    console.error('Error generating joke:', error);
    throw new Error('Failed to generate joke');
  }
} 