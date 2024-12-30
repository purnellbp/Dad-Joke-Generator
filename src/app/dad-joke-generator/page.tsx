import { Suspense } from 'react'
import { JokeGenerator } from '@/app/dad-joke-generator/_components/joke-generator'
import { MetadataUpdater } from '@/app/dad-joke-generator/_components/metadata-updater'
import { BackgroundImage } from './_components/background-image'
import Link from 'next/link'

export default function DadJokeGeneratorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-4 ">
      <BackgroundImage />
      <Link 
        href="/"
        className="hidden md:block absolute top-4 left-4 px-4 py-2  transition-colors"
      >
        ← Back to Home
      </Link>
      <Suspense fallback={null}>
        <MetadataUpdater />
        <JokeGenerator />
      </Suspense>
    </main>
  )
}
