'use server'

import { generateJoke } from "../lib/openai/jokes";
import { unstable_cache } from 'next/cache';

export async function generateJokeAction(generateOffensiveJoke: boolean = false) {
  return generateJoke(generateOffensiveJoke);
}

const getCachedBackgroundImage = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=father,dad&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const data = await response.json();
      return data.urls.regular;
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
      return '';
    }
  },
  ['background-image'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['background-image']
  }
);

export async function getBackgroundImage(): Promise<string> {
  return getCachedBackgroundImage();
} 