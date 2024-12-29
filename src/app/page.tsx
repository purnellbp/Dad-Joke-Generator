import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-white">
          👨 Dad Joke Generator
        </h1>
        <p className="text-xl sm:text-2xl text-white/90">
          Generate hilarious dad jokes with AI and share them with your friends!
        </p>
        <Link 
          href="/dad-joke-generator" 
          className="inline-block px-8 py-4 text-xl font-semibold text-indigo-600 bg-white rounded-lg hover:bg-white/90 transition-colors"
        >
          Start Generating Jokes
        </Link>
      </div>
    </main>
  )
}
