import { kv } from '@vercel/kv';
import { Redis } from 'ioredis';

type StorageValue = string | number | boolean | object | null;

interface StorageOptions {
  ex?: number;
}

interface Storage {
  get: <T extends StorageValue>(key: string) => Promise<T | null>;
  set: (key: string, value: StorageValue, options?: StorageOptions) => Promise<void>;
  del: (key: string) => Promise<void>;
  incr: (key: string) => Promise<number>;
}

// Check if we're in development and have Redis config
const isLocalDev = !process.env.VERCEL && process.env.NODE_ENV !== 'production';

let storage: Storage;

if (isLocalDev) {
  console.log('Using local Redis for development');
  // Use local Redis in development
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    lazyConnect: true, // Only connect when needed
  });

  // Handle Redis connection errors gracefully
  redis.on('error', (error) => {
    console.warn('Redis connection error:', error);
    console.warn('Make sure Redis is running locally for development');
  });

  storage = {
    get: async <T extends StorageValue>(key: string) => {
      const value = await redis.get(key);
      if (!value) return null;
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    },
    set: async (key: string, value: StorageValue, options?: StorageOptions) => {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      if (options?.ex) {
        await redis.setex(key, options.ex, stringValue);
      } else {
        await redis.set(key, stringValue);
      }
    },
    del: async (key: string) => {
      await redis.del(key);
    },
    incr: async (key: string) => {
      return redis.incr(key);
    }
  };
} else {
  console.log('Using Vercel KV for production');
  // Verify Vercel KV configuration
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error('Missing required Vercel KV environment variables');
  }
  
  // Use Vercel KV in production
  storage = {
    get: async <T extends StorageValue>(key: string) => kv.get<T>(key),
    set: async (key: string, value: StorageValue, options?: StorageOptions) => {
      if (options?.ex) {
        await kv.set(key, value, { ex: options.ex });
      } else {
        await kv.set(key, value);
      }
    },
    del: async (key: string) => {
      await kv.del(key);
    },
    incr: async (key: string) => {
      return kv.incr(key);
    }
  };
}

export { storage, type StorageValue, type StorageOptions }; 