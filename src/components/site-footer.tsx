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
                    style={{ width: "80px", height: "80px" }}
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </Button>
              </Link>

              {/* gihub repo link */}
              <Link
                href="https://github.com/CtrlCPasta/dad-joke-generator"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-20 h-20"
                >
                  <svg
                    role="img"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "80px", height: "80px" }}

                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>{" "}
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold">Quick Links</h3>
            <ul className="space-y-4 text-xl">
              <li>
                <p className="hover:text-yellow-300 transition-colors">
                  About Us (coming soon!)
                </p>
              </li>
              <li>
                <p className="hover:text-yellow-300 transition-colors">
                  Joke Database (coming soon!)
                </p>
              </li>
              <li>
                <p className="hover:text-yellow-300 transition-colors">
                  Submit a Joke (coming soon!)
                </p>
              </li>
              <li>
                <p className="hover:text-yellow-300 transition-colors">
                  Dad Joke Merch (coming soon!)
                </p>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <Image
              src="/images/dad-joke-ad.webp"
              alt="Dad Joke Logo"
              width={300}
              height={300}
            />
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
          <p>
            &copy; 1979 Artificial Intelligence Paternal Humor Distribution
            Platform. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <p className="hover:text-yellow-300 transition-colors">
              Privacy Policy
            </p>
            <p className="hover:text-yellow-300 transition-colors">
              Terms of Service
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          <p>
            Warning: Excessive manipulation of the thermostat may cause the
            Artificial Intelligence Paternal Humor Distribution Platform to
            malfunction.
          </p>
        </div>
      </div>
    </footer>
  );
}
