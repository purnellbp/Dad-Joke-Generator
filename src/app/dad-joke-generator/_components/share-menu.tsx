"use client"

import { Button } from "@/components/ui/button";
import {  Clipboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareMenuProps {
  text: string;
  className?: string;
}

function XLogo( ) {
  return (
    <svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
</svg>
  )
}

// reddit logo
import React from "react";

const RedditLogo = () => {
  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      {/* Orange background rectangle */}
      <rect
        x="0"
        y="0"
        width="256"
        height="256"
        fill="#ff4500"
      />

      {/* White shape */}
      <path
        fill="#fff"
        d="M154.04,60.36c2.22,9.41,10.67,16.42,20.76,16.42,11.78,0,21.33-9.55,21.33-21.33s-9.55-21.33-21.33-21.33c-10.3,0-18.89,7.3-20.89,17.01-17.25,1.85-30.72,16.48-30.72,34.21,0,.04,0,.07,0,.11-18.76.79-35.89,6.13-49.49,14.56-5.05-3.91-11.39-6.24-18.27-6.24-16.51,0-29.89,13.38-29.89,29.89,0,11.98,7.04,22.3,17.21,27.07.99,34.7,38.8,62.61,85.31,62.61s84.37-27.94,85.31-62.67c10.09-4.8,17.07-15.09,17.07-27,0-16.51-13.38-29.89-29.89-29.89-6.85,0-13.16,2.31-18.2,6.19-13.72-8.49-31.04-13.83-49.99-14.54,0-.03,0-.05,0-.08,0-12.7,9.44-23.24,21.68-24.97Zm-81.54,82.27c.5-10.84,7.7-19.16,16.07-19.16s14.77,8.79,14.27,19.63c-.5,10.84-6.75,14.78-15.13,14.78s-15.71-4.41-15.21-15.25Zm95.06-19.16c8.38,0,15.58,8.32,16.07,19.16.5,10.84-6.84,15.25-15.21,15.25s-14.63-3.93-15.13-14.78c-.5-10.84,5.89-19.63,14.27-19.63Zm-9.96,44.24c1.57.16,2.57,1.79,1.96,3.25-5.15,12.31-17.31,20.96-31.5,20.96s-26.34-8.65-31.5-20.96c-.61-1.46.39-3.09,1.96-3.25,9.2-.93,19.15-1.44,29.54-1.44s20.33.51,29.54,1.44Z"
      />
    </svg>
  );
};




export function ShareMenu({ text  }: ShareMenuProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodedText}`
  };



  const copyToClipboard = async () => {
    try {
      const textToCopy = `${text}\n\n${shareUrl}\n\n#DadJoke`;
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: "The joke has been copied to your clipboard.",
      });
    } catch (error: unknown) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  return (

   <div className="flex items-center justify-center gap-2 p-2 mb-4 text-sm ">
 
          <Button
            onClick={() => window.open(shareLinks.twitter, '_blank')}
            className="flex items-center gap-2 cursor-pointer"
            variant="link"
          >
            <XLogo />


</Button>
       
          <Button
            onClick={() => window.open(shareLinks.reddit, '_blank')}
            className="flex items-center gap-2 cursor-pointer"
            variant="link"
          >
          <RedditLogo />
          </Button>
       

        <Button
          onClick={copyToClipboard}
          className="flex items-center gap-2 cursor-pointer"
          variant="link"
        >
          <Clipboard className="h-4 w-4" />
        </Button>
     </div>
  );
}