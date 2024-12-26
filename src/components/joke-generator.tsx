'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { preGeneratedJokes } from '@/lib/jokes';
import { motion, AnimatePresence } from 'framer-motion';
import type { Joke } from '@/lib/jokes';
import { generateJokeAction } from '@/app/actions';
import { ShareMenu } from '@/lib/social-icons';



interface JokeHistory {
  seenJokes: string[];
  lastApiCall?: number;
}

export function JokeGenerator() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [displayedJoke, setDisplayedJoke] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [jokeHistory, setJokeHistory] = useState<JokeHistory>({ seenJokes: [] });

  // Update animation effect to use currentJoke
  useEffect(() => {
    if (currentJoke) {
      setIsAnimating(true);
      setDisplayedJoke('');
      let index = 0;
      const interval = setInterval(() => {
        if (index >= currentJoke.text.length) {
          clearInterval(interval);
          setIsAnimating(false);
          return;
        }
        index++;
        setDisplayedJoke(currentJoke.text.slice(0, index));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [currentJoke]);

  // Load joke history from localStorage and show initial joke on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('jokeHistory');
    if (savedHistory) {
      setJokeHistory(JSON.parse(savedHistory));
    }
    generateJoke();
  }, []);

  // Save joke history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
  }, [jokeHistory]);

  function getRandomUnseenJoke(): Joke | null {
    const unseenJokes = preGeneratedJokes.filter(
      joke => !jokeHistory.seenJokes.includes(joke.id)
    );
    if (unseenJokes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * unseenJokes.length);
    return unseenJokes[randomIndex];
  }

  async function generateJoke() {
    setIsLoading(true);
    try {
      const unseenJoke = getRandomUnseenJoke();
      
      if (unseenJoke) {
        setCurrentJoke(unseenJoke);
        setJokeHistory(prev => ({
          ...prev,
          seenJokes: [...prev.seenJokes, unseenJoke.id]
        }));
      } else {
        // If all pre-generated jokes have been seen, try server action
        try {
          const joke = await generateJokeAction();
          setCurrentJoke({
            id: `ai-${Date.now()}`,
            text: joke,
            category: 'classic',
            emoji: '🤖'
          });
        } catch (error) {
          // If server action fails, show a random pre-generated joke
          console.error('Error generating AI joke:', error);
          const randomIndex = Math.floor(Math.random() * preGeneratedJokes.length);
          const fallbackJoke = preGeneratedJokes[randomIndex];
          setCurrentJoke(fallbackJoke);
          // Only add to history if it's not already there
          if (!jokeHistory.seenJokes.includes(fallbackJoke.id)) {
            setJokeHistory(prev => ({
              ...prev,
              seenJokes: [...prev.seenJokes, fallbackJoke.id]
            }));
          }
        }
      }
    } catch (err: unknown) {
      console.error('Error fetching joke:', err);
      const randomIndex = Math.floor(Math.random() * preGeneratedJokes.length);
      const fallbackJoke = preGeneratedJokes[randomIndex];
      setCurrentJoke(fallbackJoke);
      // Only add to history if it's not already there
      if (!jokeHistory.seenJokes.includes(fallbackJoke.id)) {
        setJokeHistory(prev => ({
          ...prev,
          seenJokes: [...prev.seenJokes, fallbackJoke.id]
        }));
      }
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div className="space-y-6 w-[95vw] max-w-[1200px]">
      <Card className="w-full backdrop-blur-sm border bg-card/75 text-card-foreground">
        <CardHeader className="p-8 sm:p-10">
          <CardTitle className="text-center text-3xl sm:text-4xl">👨 Dad Joke Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-8 sm:p-10">
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentJoke?.id || 'initial'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-center text-xl sm:text-3xl px-6"
              >
                {displayedJoke || 'Click the button to generate a dad joke!'}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-between gap-4">
            <Button 
              onClick={generateJoke} 
              className="h-16 text-2xl"
              disabled={isLoading || isAnimating}
            >
              {isLoading ? 'Generating...' : isAnimating ? 'Displaying...' : 'Generate Joke'}
            </Button>

            {currentJoke && <ShareMenu text={currentJoke.text} className="h-16 text-2xl px-4 bg-transparent border-none" />}
          </div>
        </CardContent>
      </Card>
      
    
    </div>
  );
} 