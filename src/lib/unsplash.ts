import { getRandomDadImage } from '@/app/actions';

const CACHE_KEY = 'dad-joke-bg-image';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedImage {
  url: string;
  timestamp: number;
}

export async function getBackgroundImage(): Promise<string> {
  // Check localStorage first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsedCache: CachedImage = JSON.parse(cached);
    if (Date.now() - parsedCache.timestamp < CACHE_DURATION) {
      return parsedCache.url;
    }
  }

  const imageUrl = await getRandomDadImage();
  
  if (imageUrl) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        url: imageUrl,
        timestamp: Date.now(),
      })
    );
  }

  return imageUrl;
} 