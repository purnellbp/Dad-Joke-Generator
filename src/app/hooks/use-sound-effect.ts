import { useCallback } from 'react';

export function useSoundEffect(soundPath: string) {
  const playSound = useCallback(() => {
    const audio = new Audio(soundPath);
    audio.volume = 0.5; // 50% volume
    audio.play().catch((error) => {
      // Ignore errors from browsers that require user interaction first
      console.log('Audio playback failed:', error);
    });
  }, [soundPath]);

  return playSound;
} 