"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import type { Joke } from "@/lib/jokes";
import { generateJokeAction } from "@/app/actions";
import { ShareMenu } from "@/lib/social-icons";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getJoke } from "@/lib/joke-storage";

interface JokeGeneratorProps {
  initialJokeId?: string;
}

const SpinningLoader = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="inline-block"
  >
    <Loader2 className="w-6 h-6" />
  </motion.div>
);

export function JokeGenerator({ initialJokeId }: JokeGeneratorProps) {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [lastJokeText, setLastJokeText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOffensive, setIsOffensive] = useState(false);
  const { toast } = useToast();

  // Load initial joke if ID is provided
  useEffect(() => {
    async function loadInitialJoke() {
      if (initialJokeId) {
        const initialJoke = await getJoke(initialJokeId);
        if (initialJoke) {
          setJoke(initialJoke);
          setLastJokeText(initialJoke.text);
        }
      }
    }
    loadInitialJoke();
  }, [initialJokeId]);

  async function handleGenerateJoke() {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const newJoke = await generateJokeAction(lastJokeText, isOffensive);
      setJoke(newJoke);
      setLastJokeText(newJoke.text);
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
      <Card className="w-full backdrop-blur-sm border bg-card/75">
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
    </div>
  );
}
