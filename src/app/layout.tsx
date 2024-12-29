import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTagManager } from '@next/third-parties/google'
import { siteConfig } from '@/lib/site-config'
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Dad Joke Generator",
    description: "Generate hilarious dad jokes with AI and share them with your friends!",
    images: [
      {
        url: "/images/dad-joke-machine.jpeg",
        width: 1200,
        height: 630,
        alt: "Dad Joke Generator"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dad Joke Generator",
    description: "Generate hilarious dad jokes with AI and share them with your friends!",
    creator: siteConfig.creator,
    images: ["/images/dad-joke-machine.jpeg"],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/images/dad-joke-machine.jpeg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!} />
      </body>
    </html>
  );
}
