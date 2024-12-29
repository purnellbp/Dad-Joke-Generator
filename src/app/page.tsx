import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavButton } from "./_components/nav-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Laugh, ThumbsUp, Share2, Coffee } from "lucide-react";
import { Footer } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-full flex-1">
        {/* Top Navigation Bar */}
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 max-w-7xl mx-auto w-full">
          {/* Nav Button - Mobile Bottom, Desktop Top */}
          <div className="hidden sm:block">
            <NavButton />
          </div>

          {/* Version Badge - Desktop Only */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-white/20">
            <span className="text-xs sm:text-sm opacity-80 whitespace-nowrap">Version</span>
            <Badge className="bg-yellow-400 text-indigo-800 rounded-none text-xs sm:text-sm p-[0.1rem] whitespace-nowrap">
              777.770.77777.777177_beta
            </Badge>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
          <NavButton />
        </div>

        {/* Content starts with proper top margin */}
        <div className="mt-8 sm:mt-16">
          {/* Hero Section */}
          <header className="relative text-center py-8 sm:py-16 mb-12 sm:mb-20">
            {/* Main title with larger emoji */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4 sm:mb-6">
              <span className="block text-6xl sm:text-8xl md:text-9xl mb-2 sm:mb-4">
                👨
              </span>
              Dad Joke Generator
            </h1>

            {/* Subtitle with better contrast */}
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-yellow-300 animate-pulse mb-6 sm:mb-8 px-4">
              Artificial Intelligence Paternal Humor Distribution Platform
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto border-b-2 border-yellow-400 pb-4 px-4">
              Where AI stands for &apos;Amazingly Ingenious&apos; and the puns are
              so bad, they&apos;re good!
            </p>
          </header>

          {/* Feature Cards */}
          <div className="px-4 mb-12 sm:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <Laugh className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-base sm:text-lg font-bold">
                    Instant Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    Dad Joke Delivery - No Dad Required!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <ThumbsUp className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-base sm:text-lg font-bold">
                    Eye-Rolling Good
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    Jokes So Corny, They&apos;ll Make Your Eyes Roll
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <Share2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-base sm:text-lg font-bold">
                    Shareable Smiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    Perfect for Family Gatherings
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <Coffee className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-base sm:text-lg font-bold">
                    Endless Supply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    Because One Pun Isn&apos;t Pun-ough
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Image Section */}
          <div className="flex justify-center mb-12 sm:mb-20 px-4">
            <div className="relative max-w-[400px] sm:max-w-[600px]">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image 
                  src="/images/dad-joke-machine.webp" 
                  alt="A cartoon of a dad with a giant machine that spits out dad jokes"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  loading="eager"
                  quality={80}
                />
              </div>
              <Badge
                id="now-with-more-groan"
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-sm sm:text-lg bg-yellow-400 text-indigo-800 rounded-full px-3 py-1 sm:px-4 sm:py-2 shadow-xl motion-preset-oscillate"
              >
                Now with more groan!
              </Badge>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="max-w-4xl mx-auto mb-8 px-2 sm:px-4">
            <Tabs defaultValue="jokes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-2 mb-4 sm:mb-8 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl shadow-xl">
                <TabsTrigger 
                  value="jokes" 
                  className="text-xs sm:text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold transition-all duration-300 transform hover:scale-105 data-[state=active]:rotate-2 px-1 py-2 sm:px-4"
                >
                  🎭 Jokes
                </TabsTrigger>
                <TabsTrigger 
                  value="testimonials" 
                  className="text-xs sm:text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold transition-all duration-300 transform hover:scale-105 data-[state=active]:-rotate-2 px-1 py-2 sm:px-4"
                >
                  🌟 Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="warning" 
                  className="text-xs sm:text-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-bold transition-all duration-300 transform hover:scale-105 data-[state=active]:rotate-1 px-1 py-2 sm:px-4"
                >
                  ⚠️ Warning
                </TabsTrigger>
              </TabsList>
              <div className="rounded-xl shadow-2xl p-3 sm:p-6 border-4 border-yellow-400 transform hover:scale-[1.01] transition-transform">
                <TabsContent value="jokes" className="mt-0">
                  <ScrollArea className="h-[300px] w-full rounded-md border-2 border-yellow-400/50 p-3 sm:p-6">
                    <ul className="space-y-4 sm:space-y-6 text-base sm:text-lg">
                      <li>
                        {"I'm afraid for the calendar. Its days are numbered."}
                      </li>
                      <li>
                        {
                          "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!"
                        }
                      </li>
                      <li>
                        {
                          "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera."
                        }
                      </li>
                      <li>{"What do you call a fake noodle? An impasta!"}</li>
                      <li>
                        {
                          "Why did the scarecrow win an award? He was outstanding in his field!"
                        }
                      </li>
                      <li>
                        {"What do you call a bear with no teeth? A gummy bear!"}
                      </li>
                      <li>{"Why don't eggs tell jokes? They'd crack up!"}</li>
                      <li>
                        {
                          "What do you call a fish wearing a bowtie? So-fish-ticated!"
                        }
                      </li>
                      <li>
                        {"What did the coffee report to the police? A mugging!"}
                      </li>
                      <li>
                        {
                          "Why did the math book look so sad? Because it had too many problems!"
                        }
                      </li>
                      <li>
                        {
                          "What do you call a can opener that doesn't work? A can't opener!"
                        }
                      </li>
                      <li>
                        {
                          "What do you call cheese that isn't yours? Nacho cheese!"
                        }
                      </li>
                      <li>
                        {
                          "Why did the cookie go to the doctor? Because it was feeling crumbly!"
                        }
                      </li>
                      <li>
                        {
                          "What did the grape say when it got stepped on? Nothing, it just let out a little wine!"
                        }
                      </li>
                    </ul>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="testimonials" className="mt-0">
                  <ScrollArea className="h-[300px] w-full rounded-md border-2 border-yellow-400/50 p-3 sm:p-6">
                    <ul className="space-y-4 sm:space-y-6">
                      <li className="border-b border-white/10 pb-4">
                        <p className="text-lg italic">{"My kids finally think I'm cool! Well, they still roll their eyes, but now they laugh while doing it."}</p>
                        <p className="text-sm text-muted-foreground mt-2">- Dave, Dad of 3</p>
                      </li>
                      <li className="border-b border-white/10 pb-4">
                        <p className="text-lg italic">{"I've never rolled my eyes so much. It's perfect! My dad's been using these and now he thinks he's a comedian."}</p>
                        <p className="text-sm text-muted-foreground mt-2">- Sarah, Teenager</p>
                      </li>
                      <li className="border-b border-white/10 pb-4">
                        <p className="text-lg italic">{"These jokes are so bad, they're good! I've started using them at family dinners and now everyone groans in unison."}</p>
                        <p className="text-sm text-muted-foreground mt-2">- Mom Who Can&apos;t Stop Laughing</p>
                      </li>
                      <li className="border-b border-white/10 pb-4">
                        <p className="text-lg italic">{"Used to be a professional comedian. Now I just tell dad jokes. They're way more effective at clearing a room!"}</p>
                        <p className="text-sm text-muted-foreground mt-2">- Mike, Reformed Stand-up Comic</p>
                      </li>
                      <li className="border-b border-white/10 pb-4">
                        <p className="text-lg italic">{"As a grandpa, I needed fresh material. Now my grandkids groan twice as much when I visit. Mission accomplished!"}</p>
                        <p className="text-sm text-muted-foreground mt-2">- Bob, Professional Grandpa</p>
                      </li>
                      <li className="border-b border-white/10 pb-4">
                        <p className="text-lg italic">{"I'm not even a dad, but these jokes are my secret weapon at awkward business meetings. Works every time!"}</p>
                        <p className="text-sm text-muted-foreground mt-2">- James, Corporate Ice-breaker</p>
                      </li>
                      <li>
                        <p className="text-lg italic">{"My dad used to be the king of bad jokes. Now with this, I've finally out-dad-joked him. The student has become the master!"}</p>
                        <p className="text-sm text-muted-foreground mt-2">- Alex, Aspiring Dad Joker</p>
                      </li>
                    </ul>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="warning" className="mt-0">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-3 sm:p-6 rounded-lg border-2 border-yellow-400/50">
                    <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 transform -rotate-6 hover:rotate-6 transition-transform">
                      <Image
                        src="/images/caution-dad-jokes-ahead.webp"
                        alt="Warning sign"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm sm:text-base md:text-xl leading-relaxed text-yellow-800 text-center sm:text-left">
                      ⚠️ WARNING: Exposure to these dad jokes might cause
                      uncontrollable laughter, excessive eye-rolling, or sudden
                      urges to wear socks with sandals. Use with caution and at
                      your own risk of becoming the family comedian! 🎭
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Call to Action */}
          <div className="hidden sm:block text-center my-12   px-4">
            <div className="relative">
              <Image
                src="/images/arrow-pointing-down.webp" 
                alt="Cartoon arrow" 
                width={80}
                height={80}
                style={{ width: 'auto', height: 'auto' }}
                className="absolute left-1/2 -translate-x-1/2 -top-16  animate-bounce z-10 w-16 " 
              />
              <Button
                asChild
                size="lg"
                className="text-3xl  px-12 py-4  bg-yellow-400 text-indigo-800 hover:bg-yellow-300 
                         transition-all duration-300 transform hover:scale-105 shadow-xl relative max-w-full h-full"
              >
                <Link href="/dad-joke-generator" className="flex items-center gap-2 flex-wrap justify-center">
                  <span>Get Your Dad Joke Fix</span>
                  <span>🤖</span>
                  <span className="text-xs sm:text-sm italic block w-full sm:w-auto">{"\" It Hertz So Good!\""}</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 mb-8 sm:mb-12 pb-20 sm:pb-0">
            <Card className="bg-white/5 border-white/20 transform hover:scale-[1.02] transition-transform">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Dad Joke of the Day (Coming Soon)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/dad-joke-of-the-day.webp"
                    alt="Dad joke of the day"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg">
                  {
                    "Why don't scientists trust atoms? Because they make up everything!"
                  }
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 transform hover:scale-[1.02] transition-transform">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Dad Joke Challenge (Coming Soon)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/dad-joke-challenge.webp"
                    alt="Dad joke challenge"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg">
                  Can you out-dad-joke our AI? Submit your best dad joke and see
                  if it makes the cut!
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 transform hover:scale-[1.02] transition-transform">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Dad Joke Hall of Fame (Coming Soon)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/dad-joke-hall-of-fame.webp"
                    alt="Dad joke hall of fame"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg">
                  Check out our collection of the most groan-worthy dad jokes of
                  all time!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
