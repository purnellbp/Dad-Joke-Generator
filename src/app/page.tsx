'use client';

import { JokeGenerator } from '@/components/joke-generator';
import { getBackgroundImage } from '@/lib/unsplash';
import { useEffect, useState } from 'react';

export default function Home() {
  const [bgImage, setBgImage] = useState<string>('');

  useEffect(() => {
    getBackgroundImage().then(setBgImage);
  }, []);

  return (
    <main 
      className="min-h-[100dvh] w-full flex items-center justify-center p-8 relative"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/50" /> {/* Semi-transparent overlay using theme colors */}
      <div className="relative z-10">
        <JokeGenerator />
      </div>
    </main>
  );
}
