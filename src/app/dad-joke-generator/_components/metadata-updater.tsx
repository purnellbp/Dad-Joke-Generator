'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function MetadataUpdater() {
  const searchParams = useSearchParams()
  const joke = searchParams.get('joke')
  const emoji = searchParams.get('emoji')

  useEffect(() => {
    if (joke) {
      // Update only the title tag dynamically
      document.title = `${emoji || '👨'} Dad Joke: ${joke.slice(0, 50)}...`
    }
  }, [joke, emoji])

  return null
} 