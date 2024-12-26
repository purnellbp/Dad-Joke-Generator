'use client';

import { useEffect, useState } from 'react';
import { getBackgroundAction } from '@/app/actions';

export function BackgroundImage({ children }: { children: React.ReactNode }) {
  const [bgImage, setBgImage] = useState<string>('');

  useEffect(() => {
    getBackgroundAction().then(setBgImage);
  }, []);

  return (
    <div 
      className="min-h-[100dvh] w-full relative"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 