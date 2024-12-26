'use client';

import { Metadata } from 'next';
import { JokeGenerator } from '@/components/joke-generator';
import { getBackgroundImage } from '@/lib/unsplash';
import { useEffect, useState } from 'react';

export const generateMetadata = async ({ searchParams }: {
  searchParams: { joke?: string }
}): Promise<Metadata> => {
  const joke = searchParams.joke || 'Generate hilarious dad jokes with AI';
  const ogImageUrl = new URL('/opengraph-image', 'https://artificialintelligencepaternalhumordistributionplatform.online');
  ogImageUrl.searchParams.set('joke', joke);

  return {
    title: 'Dad Joke Generator',
    description: joke,
    openGraph: {
      title: 'Dad Joke Generator',
      description: joke,
      type: 'website',
      url: 'https://artificialintelligencepaternalhumordistributionplatform.online',
      siteName: 'Dad Joke Generator',
      locale: 'en_US',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: 'Dad Joke Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dad Joke Generator',
      description: joke,
      creator: '@CtrlCPasta',
      images: [ogImageUrl.toString()],
    },
  };
};

export default function Home() {
  const [bgImage, setBgImage] = useState<string>('');

  useEffect(() => {
    getBackgroundImage().then(setBgImage);
  }, []);

  return (
    <main 
      className="min-h-[100dvh] w-full flex items-center justify-center  relative"
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
