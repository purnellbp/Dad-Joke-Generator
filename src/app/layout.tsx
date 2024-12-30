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
    url: '/',
    siteName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    creator: siteConfig.creator,
  },
  icons: {
    icon: [
      {
        url: '/icon',
        type: 'image/png',
        sizes: '32x32',
      }
    ],
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
          href="/images/dad-joke-machine.webp"
          as="image"
          type="image/webp"
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
