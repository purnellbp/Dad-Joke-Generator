"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Joke } from "@/lib/jokes";
import { generateJokeAction } from "@/app/actions";
import { ShareMenu } from "@/lib/social-icons";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';

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
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [displayedJoke, setDisplayedJoke] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update animation effect to use currentJoke
  useEffect(() => {
    if (currentJoke) {
      setIsAnimating(true);
      setDisplayedJoke("");
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

  const generateJoke = useCallback(async () => {
    setIsLoading(true);
    try {
      const joke = await generateJokeAction();
      setCurrentJoke(joke);
      
      // Update URL with new joke for social sharing
      const params = new URLSearchParams(searchParams);
      params.set('joke', joke.text);
      router.push(`/?${params.toString()}`);

    } catch (error) {
      toast({
        title: "Error generating joke",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error generating joke:", error);
    } finally {
      setIsLoading(false);
    }
  }, [toast, searchParams, router]);

  // Generate initial joke
  useEffect(() => {
    generateJoke();
  }, [generateJoke]);

  return (
    <div className=" w-[95vw] max-w-[1200px]">
      <Card className="w-full backdrop-blur-sm border bg-card/75 text-card-foreground">
        <CardHeader className="">
          <CardTitle className="text-center text-2xl sm:text-3xl">
            {currentJoke?.emoji || "👨"} Dad Joke Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="relative min-h-[180px]">
          
            <p className="inset-0 flex items-center justify-center text-center text-xl sm:text-3xl px-6">
              {displayedJoke || "Click the button to generate a dad joke!"}
              </p>
          </div>
          <div className="flex justify-between gap-4">
            <Button
              onClick={generateJoke}
              className="h-16 text-2xl"
              disabled={isLoading || isAnimating}
            >
              <span className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <SpinningLoader /> Generating...
                  </>
                ) : isAnimating ? (
                  <>
                    <SpinningLoader /> Typing...
                  </>
                ) : (
                  "Generate Joke"
                )}
              </span>
            </Button>
            {currentJoke && (
              <ShareMenu
                text={currentJoke.text}
                className="h-16 text-2xl px-4 bg-transparent border-none"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
