import type { Joke } from './jokes';
import { kv } from '@vercel/kv';

const JOKE_PREFIX = 'joke:';
const isDevelopment = process.env.NODE_ENV === 'development';

export async function storeJoke(joke: Joke): Promise<void> {
  if (isDevelopment) return;
  
  try {
    await kv.set(`${JOKE_PREFIX}${joke.id}`, JSON.stringify(joke));
  } catch (error) {
    console.error('Failed to store joke:', error);
    throw new Error('Failed to store joke for sharing');
  }
}

export async function getJoke(id: string): Promise<Joke | null> {
  if (isDevelopment) return null;
  
  try {
    const data = await kv.get<string>(`${JOKE_PREFIX}${id}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve joke:', error);
    throw new Error('Failed to retrieve shared joke');
  }
} 