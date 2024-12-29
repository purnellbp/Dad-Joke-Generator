'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "../hooks/use-sound-effect";

export function NavButton() {
  const playRobotSound = useSoundEffect("/audio/robot-start.mp3");

  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="w-full sm:w-auto bg-yellow-400 text-indigo-800 hover:bg-yellow-300 
               transition-all duration-300 transform hover:scale-110 hover:-rotate-6
               shadow-xl border-2 border-yellow-500 group px-3 sm:px-4 py-3 sm:py-3 h-auto"
      onClick={playRobotSound}
    >
      <Link href="/dad-joke-generator" className="flex items-center justify-center sm:justify-start gap-2 w-full">
        <span className="text-lg sm:text-xl">🤖</span>
        <span className="text-sm sm:text-base font-bold whitespace-nowrap">Generate Dad Jokes!</span>
        <span className="hidden sm:inline text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </Link>
    </Button>
  );
} 