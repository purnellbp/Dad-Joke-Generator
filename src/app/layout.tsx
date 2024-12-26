import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dad Joke Generator',
  description: 'Generate hilarious dad jokes with AI and share them with your friends!',
  openGraph: {
    title: 'Dad Joke Generator',
    description: 'Generate hilarious dad jokes with AI and share them with your friends!',
    type: 'website',
    url: 'https://artificialintelligencepaternalhumordistributionplatform.online',
    siteName: 'Dad Joke Generator',
    locale: 'en_US',
    images: [
      {
        url: 'https://artificialintelligencepaternalhumordistributionplatform.online/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Dad Joke Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dad Joke Generator',
    description: 'Generate hilarious dad jokes with AI and share them with your friends!',
    creator: '@CtrlCPasta',
    images: ['https://artificialintelligencepaternalhumordistributionplatform.online/twitter-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!} />
      </body>
    </html>
  );
}
