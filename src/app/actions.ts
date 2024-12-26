'use server'

import { generateJoke } from '@/lib/jokes';
import { getBackgroundImage } from '@/lib/unsplash';
import { revalidatePath } from 'next/cache';
import { storeJoke } from '@/lib/joke-storage';

export async function generateJokeAction(lastJoke: string = '', generateOffensiveJoke: boolean = false) {
  const joke = await generateJoke(lastJoke,  generateOffensiveJoke);
  
  // Store the joke for retrieval
  await storeJoke(joke);
  
  // Revalidate the page to update metadata
  revalidatePath('/');
  revalidatePath(`/${joke.id}`);
  
  return joke;
}

export async function getBackgroundAction() {
  const imageUrl = await getBackgroundImage();
  return imageUrl;
} 