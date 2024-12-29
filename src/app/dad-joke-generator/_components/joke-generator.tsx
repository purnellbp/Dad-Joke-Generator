"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShareMenu } from "@/app/dad-joke-generator/_components/share-menu";
import { generateJokeAction } from "@/app/dad-joke-generator/actions";
import type { Joke } from "@/app/dad-joke-generator/lib/openai/jokes";
import { useRecentJokes } from '../lib/hooks/use-recent-jokes'
import { RecentJokes } from './recent-jokes'

const SpinningLoader = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="inline-block"
  >
    <Loader2 className="w-6 h-6" />
  </motion.div>
);

export function JokeGenerator() {
  const searchParams = useSearchParams()
  const isDevelopment = process.env.NODE_ENV === 'development'
  const router = useRouter()
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffensive, setIsOffensive] = useState(false);
  const { toast } = useToast();
  const { recentJokes, addJoke } = useRecentJokes()

  // Get current joke and emoji from URL
  const currentJoke = searchParams.get('joke')
  const currentEmoji = searchParams.get('emoji')
  
  // Create preview URL
  const previewUrl = currentJoke 
    ? `/opengraph-image?joke=${encodeURIComponent(currentJoke)}&emoji=${encodeURIComponent(currentEmoji || '👨')}&topic=${encodeURIComponent(joke?.topic || '')}`
    : '/opengraph-image'

  // Update URL when joke changes
  useEffect(() => {
    if (joke) {
      // Create a new URLSearchParams object
      const params = new URLSearchParams(searchParams)
      params.set('joke', joke.text)
      params.set('emoji', joke.emoji || '👨')
      
      // Update URL without reload
      router.replace(`/dad-joke-generator?${params.toString()}`, { scroll: false })
    }
  }, [joke, router, searchParams])

  async function handleGenerateJoke() {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const newJoke = await generateJokeAction(isOffensive);
      setJoke(newJoke);
      addJoke(newJoke);
    } catch (error) {
      console.error("Error generating joke", error);
      toast({
        title: "Error generating joke",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-[95vw] max-w-[1200px]">
      {isDevelopment && currentJoke && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2 mb-4 text-sm text-white/80 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View OpenGraph Preview
        </a>
      )}
      <Card className="w-full backdrop-blur-sm border bg-card/75 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl">
            {joke?.emoji || "👨"} Dad Joke Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={joke?.id || 'empty'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative min-h-[180px]"
            >
              <p className="text-center text-xl sm:text-3xl px-6 whitespace-pre-wrap">
                {joke?.text || "Click the button to generate a dad joke!"}
              </p>
              {joke?.topic && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground mt-4 italic"
                >
                  {joke.topic}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center space-x-2">
                <Switch
                  id="offensive-mode"
                  checked={isOffensive}
                  onCheckedChange={setIsOffensive}
                />
                <Label htmlFor="offensive-mode">Offensive Mode</Label>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4">
              <Button
                onClick={handleGenerateJoke}
                className="h-16 text-2xl"
                disabled={isLoading}
              >
                <span className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <SpinningLoader /> Generating...
                    </>
                  ) : (
                    "Generate Joke"
                  )}
                </span>
              </Button>
              {joke && (
                <ShareMenu
                  text={joke.text}
                  className="h-16 text-2xl px-4 bg-transparent border-none hover:text-white/80"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <RecentJokes jokes={recentJokes} />
    </div>
  );
}
