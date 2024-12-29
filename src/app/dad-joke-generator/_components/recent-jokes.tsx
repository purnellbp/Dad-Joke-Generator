'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

import type { Joke } from '../lib/openai/jokes'

interface RecentJokesProps {
  jokes: Joke[]
}

export function RecentJokes({ jokes }: RecentJokesProps) {
  if (!jokes.length) return null

  return (
    <div className="w-full max-w-[1200px] mb-8">
      <h2 className="text-xl text-white/80 mb-4">Recent Jokes</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {jokes.map((joke) => (
            <motion.div
              key={joke.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="backdrop-blur-sm border bg-card/50">
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-wrap">{joke.text}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{joke.emoji}</span>
                    <span className="italic">{joke.topic}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 