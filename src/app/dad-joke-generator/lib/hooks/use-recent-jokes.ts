/**
 * The function `useRecentJokes` manages a list of recent jokes by storing them in localStorage and
 * allowing the addition of new jokes.
 * @returns The `useRecentJokes` custom hook is returning an object with two properties:
 * 1. `recentJokes`: A state variable that holds an array of `Joke` objects representing the recent
 * jokes.
 * 2. `addJoke`: A function that takes a `Joke` object as a parameter and adds it to the list of recent
 * jokes, ensuring that the list contains a maximum of
 */
'use client'

import { useState, useEffect } from 'react'
import type { Joke } from '../openai/jokes'

const STORAGE_KEY = 'recent-jokes'
const MAX_JOKES = 6

export function useRecentJokes() {
  const [recentJokes, setRecentJokes] = useState<Joke[]>([])

  // Load jokes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setRecentJokes(JSON.parse(stored))
    }
  }, [])

  // Add a new joke to the list
  const addJoke = (joke: Joke) => {
    setRecentJokes(prev => {
      const newJokes = [joke, ...prev].slice(0, MAX_JOKES)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newJokes))
      return newJokes
    })
  }

  return {
    recentJokes,
    addJoke
  }
} 