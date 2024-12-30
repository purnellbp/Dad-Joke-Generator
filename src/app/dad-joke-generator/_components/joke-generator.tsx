"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ExternalLink, RefreshCcw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ShareMenu } from "@/app/dad-joke-generator/_components/share-menu";
import { generateJokeAction } from "@/app/dad-joke-generator/actions";
import type { Joke } from "@/app/dad-joke-generator/lib/openai/jokes";
import { useRecentJokes } from "../lib/hooks/use-recent-jokes";
import { RecentJokes } from "./recent-jokes";

const SpinningLoader = ({ className }: { className?: string }) => (
  <div className="inline-block ">
    <Loader2 className={className || "w-6 h-6 text-indigo-800"}   />
  </div>
);

export function JokeGenerator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDevelopment = process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === "true";
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffensive, setIsOffensive] = useState(false);
  const { toast } = useToast();
  const { recentJokes, addJoke } = useRecentJokes();

  const currentJoke = searchParams.get("joke");
  const currentEmoji = searchParams.get("emoji");

  const previewUrl = currentJoke
    ? `/opengraph-image?joke=${encodeURIComponent(
        currentJoke
      )}&emoji=${encodeURIComponent(
        currentEmoji || "👨"
      )}&topic=${encodeURIComponent(joke?.topic || "")}`
    : "/opengraph-image";

  useEffect(() => {
    if (joke) {
      const params = new URLSearchParams(searchParams);
      params.set("joke", joke.text);
      params.set("emoji", joke.emoji || "👨");
      router.replace(`/dad-joke-generator?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [joke, router, searchParams]);

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

  const jokeSkeleton = (
    <span className="flex flex-col items-center gap-2">
      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-6 w-[200px]" />

      <Skeleton className="h-6 w-[200px]" />
    </span>
  );

  return (
    <div className="w-full md:max-w-4xl mx-auto px-1 md:px-0">
      {/* OpenGraph preview link */}
      {joke && isDevelopment && (
        <div className="mb-8">
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View OpenGraph Preview
          </Link>
        </div>
      )}

      {/* main joke card */}
      <Card className=" md:border md:bg-card/75 mb-8 bg-transparent border-none shadow-none md:shadow-lg">
        <CardHeader className="pb-2 sm:pb-6 px-0 md:px-6">
          <CardTitle className="text-center text-xl sm:text-3xl font-bold">
            {joke?.emoji || "👨"} Dad Joke Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 sm:pb-6 px-2 md:px-6 sm:bg-transparent bg-white/50">
          <div
            key={joke?.id || "empty"}
            className="relative min-h-[140px] sm:min-h-[180px] flex items-center justify-center px-0 md:px-6  rounded-none"
          >
            <div className="text-center text-lg sm:text-2xl whitespace-pre-wrap">
              {joke?.text || jokeSkeleton}
            </div>
          </div>
          {joke?.topic && isDevelopment && (
            <div className="text-center text-xs sm:text-sm text-muted-foreground mt-2  sm:mt-0 italic  ">
              Topic: {joke.topic}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:gap-4 px-0 md:px-6">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className=" hidden  md:flex items-center space-x-2">
              <Switch
                id="offensive-mode"
                checked={isOffensive}
                onCheckedChange={setIsOffensive}
                disabled={true}
              />
              <Label
                htmlFor="offensive-mode"
                className="text-xs sm:text-sm"
              >
                Offensive Mode{" "}
                <span className="text-xs text-destructive">(Coming Soon!)</span>
              </Label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 w-full">
            <div className="fixed bottom-0 left-0 right-0 p-4   md:hidden w-full z-50">
              <Button
                onClick={handleGenerateJoke}
                className="w-full h-12 text-base sm:text-lg "
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <SpinningLoader className="mr-2 w-4 h-4 sm:w-5 sm:h-5 motion-preset-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Generate Joke
                  </>
                )}
              </Button>
            </div>
            <div className="hidden md:flex flex-1">
              <Button
                onClick={handleGenerateJoke}
                className="h-12 text-lg flex-1 "
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <SpinningLoader className="mr-2 w-5 h-5 motion-preset-spin  "  /> <span className="">Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-5 w-5" /> <span className="">Generate Joke</span>
                  </>
                )}
              </Button>
            </div>
            {joke && (
              <ShareMenu
                text={joke.text}
                className="h-10 sm:h-12 text-base sm:text-lg px-4 bg-secondary hover:bg-secondary/80 motion-preset-typewriter"
              />
            )}
          </div>
        </CardFooter>
      </Card>

      <RecentJokes jokes={recentJokes} />
    </div>
  );
}
