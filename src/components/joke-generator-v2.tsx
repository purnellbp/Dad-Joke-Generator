"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShareMenu } from "@/lib/social-icons";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateJokeAction } from "@/app/assistants/actions/generate-joke";
import { StreamingJoke } from "./streaming-joke";
import { dadJokeStore } from "@/app/assistants/lib/client/dad-joke-store";
import { AssistantJoke } from "@/app/assistants/types/index";

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
  const [joke, setJoke] = useState<AssistantJoke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffensive, setIsOffensive] = useState(false);
  const [streamingState, setStreamingState] = useState<{
    threadId: string;
    runId: string;
  } | null>(null);
  const { toast } = useToast();

  async function handleGenerateJoke() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Check for similar jokes first
      if (joke) {
        const similarJokes = await dadJokeStore.findSimilarJokes(joke.text);
        if (similarJokes.length > 0) {
          console.log('Found similar jokes:', similarJokes);
        }
      }

      // Generate new joke
      const newJoke = await generateJokeAction(isOffensive);
      setJoke(newJoke);
      setStreamingState({
        threadId: newJoke.threadId,
        runId: newJoke.id,
      });

      // Store the joke in vector store
      await dadJokeStore.addJoke(newJoke.text, {
        isOffensive,
        emoji: newJoke.emoji,
      });
    } catch (error) {
      console.error("Error generating joke:", error);
      toast({
        title: "Error generating joke",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleStreamComplete() {
    setStreamingState(null);
  }

  return (
    <div className="w-[95vw] max-w-[1200px]">
      <Card className="w-full backdrop-blur-sm border bg-card/75">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-2xl sm:text-3xl">
            <div className="flex items-center space-x-2 space-y-0.5">
              <h1>{joke?.emoji || "👨"} Dad Joke Generator v2</h1>
            </div>
            <div className="space-x-2">
              <div className="flex flex-col items-end space-y-0.5">
                <Label
                  htmlFor="offensive-mode-header"
                  className="text-xs text-muted-foreground small-caps"
                >
                  Offensive Mode
                </Label>
                <Switch
                  id="offensive-mode-header"
                  checked={isOffensive}
                  onCheckedChange={setIsOffensive}
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {streamingState ? (
            <StreamingJoke
              threadId={streamingState.threadId}
              runId={streamingState.runId}
              onComplete={handleStreamComplete}
            />
          ) : (
            <p className="text-center text-xl sm:text-3xl px-6 whitespace-pre-wrap">
              {joke?.text || "Click the button to generate a dad joke!"}
            </p>
          )}

          <div className="flex flex-col gap-4 mt-8">
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
              {joke && !streamingState && (
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
