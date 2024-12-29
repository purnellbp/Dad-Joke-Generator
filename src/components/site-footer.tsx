import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-800 to-indigo-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Dad Joke Generator</h2>
            <p className="text-xl">
              Bringing families together, one groan at a time.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/CtrlCPasta"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-20 h-20"
                >
                  <svg
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold">Quick Links</h3>
            <ul className="space-y-4 text-xl">
              <li>
                <p
                  className="hover:text-yellow-300 transition-colors"
                >
                  About Us (coming soon!)
                </p>
              </li>
              <li>
                <p
                  className="hover:text-yellow-300 transition-colors"
                >
                  Joke Database (coming soon!)
                </p>
              </li>
              <li>
                <p
                  className="hover:text-yellow-300 transition-colors"
                >
                  Submit a Joke (coming soon!)
                </p>
              </li>
              <li>
                <p
                  className="hover:text-yellow-300 transition-colors"
                >
                  Dad Joke Merch (coming soon!)
                </p>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
          
            <Image src="/images/dad-joke-ad.webp" alt="Dad Joke Logo" width={300} height={300} />


          </div>
        </div>
        <Separator className="bg-white/20 my-8" />
        <div className="text-center space-y-6">
          <p className="text-2xl font-bold">
            &quot;I&apos;m not arguing, I&apos;m just explaining why I&apos;m
            right.&quot;
          </p>
          <p className="text-xl">- Every Dad Ever</p>
        </div>
        <Separator className="bg-white/20 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-lg">
          <p>&copy; 1979 Artificial Intelligence Paternal Humor Distribution Platform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <p
              className="hover:text-yellow-300 transition-colors"
            >
              Privacy Policy
            </p>
            <p
              className="hover:text-yellow-300 transition-colors"
            >
              Terms of Service
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          <p>
            Warning: Excessive manipulation of the thermostat may cause the Artificial Intelligence Paternal Humor Distribution Platform to malfunction.
          </p>
        </div>
      </div>
    </footer>
  );
}
