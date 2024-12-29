"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { MessageDelta } from "@/app/assistants/lib/types/streaming";
import { streamRunAction } from "@/app/assistants/actions/streaming";

interface StreamingJokeProps {
  threadId: string;
  runId: string;
  onComplete?: () => void;
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

export function StreamingJoke({ threadId, runId, onComplete }: StreamingJokeProps) {
  const [jokeText, setJokeText] = useState<string>("");
  const [status, setStatus] = useState<string>("thinking");

  useEffect(() => {
    let isMounted = true;

    async function startStreaming() {
      try {
        await streamRunAction(threadId, runId, {
          onEvent: (event) => {
            if (!isMounted) return;

            switch (event.event) {
              case "thread.message.delta":
                const delta = event.data as MessageDelta;
                const content = delta.delta?.content?.[0];
                if (content?.type === 'text' && content.text?.value) {
                  setJokeText(prev => prev + content.text.value);
                }
                break;
              
              case "thread.message.created":
                setStatus("generating");
                break;
              
              case "thread.message.completed":
                setStatus("complete");
                onComplete?.();
                break;
              
              case "error":
                setStatus("error");
                console.error("Stream error:", event.data);
                break;
            }
          },
          onError: (error) => {
            if (!isMounted) return;
            console.error("Stream error:", error);
            setStatus("error");
          },
          onComplete: () => {
            if (!isMounted) return;
            setStatus("complete");
            onComplete?.();
          },
        });
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to start streaming:", error);
        setStatus("error");
      }
    }

    startStreaming();

    return () => {
      isMounted = false;
    };
  }, [threadId, runId, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative min-h-[180px]"
      >
        <Card className="w-full backdrop-blur-sm border bg-card/75">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-4">
              {status === "thinking" && (
                <>
                  <SpinningLoader />
                  <span className="ml-2">Thinking of a joke...</span>
                </>
              )}
            </div>
            
            <p className="text-center text-xl sm:text-3xl px-6 whitespace-pre-wrap">
              {jokeText || "Generating your dad joke..."}
            </p>

            {status === "error" && (
              <p className="text-center text-red-500 mt-4">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
} 