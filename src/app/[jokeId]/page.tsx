import { JokeGenerator } from "@/components/joke-generator";
import { Metadata } from "next";
import { getJoke } from "@/lib/joke-storage";

interface Props {
  params: {
    jokeId: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const joke = await getJoke(params.jokeId);
  
  return {
    title: joke ? `Dad Joke: ${joke.emoji}` : "Dad Joke Generator",
    description: joke?.text || "Generate hilarious dad jokes with AI",
    openGraph: {
      title: joke ? `Dad Joke: ${joke.emoji}` : "Dad Joke Generator",
      description: joke?.text || "Generate hilarious dad jokes with AI",
    },
    twitter: {
      card: "summary_large_image",
      title: joke ? `Dad Joke: ${joke.emoji}` : "Dad Joke Generator",
      description: joke?.text || "Generate hilarious dad jokes with AI",
    },
  };
}

export default function JokePage({ params }: Props) {
  return <JokeGenerator initialJokeId={params.jokeId} />;
} 