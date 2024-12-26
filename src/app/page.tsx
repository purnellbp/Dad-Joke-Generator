import { Metadata } from 'next';
import { JokeGenerator } from '@/components/joke-generator';
import { BackgroundImage } from '@/components/background-image';

export const metadata: Metadata = {
  title: 'Dad Joke Generator',
  description: 'Generate hilarious dad jokes with AI',
  openGraph: {
    title: 'Dad Joke Generator',
    description: 'Generate hilarious dad jokes with AI',
    type: 'website',
    url: 'https://artificialintelligencepaternalhumordistributionplatform.online',
    siteName: 'Dad Joke Generator',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dad Joke Generator',
    description: 'Generate hilarious dad jokes with AI',
    creator: '@CtrlCPasta',
  },
};

export default function Home() {
  return (
    <BackgroundImage>
      <main className="min-h-[100dvh] w-full flex items-center justify-center relative">
        <div className="relative z-10">
          <JokeGenerator />
        </div>
      </main>
    </BackgroundImage>
  );
}
