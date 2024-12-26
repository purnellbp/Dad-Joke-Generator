import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Copy, Twitter, Linkedin } from "lucide-react";

interface ShareMenuProps {
  text: string;
  className?: string;
}

const SITE_URL = "artificialintelligencepaternalhumordistributionplatform.online";

export function ShareMenu({ text, className = "" }: ShareMenuProps) {
  const handleTwitterShare = () => {
    const hashTag = "#DadJokeGenerator";
    const shareText = `${text}\n\nGet more dad jokes at ${SITE_URL}\n${hashTag}`;
    const encodedText = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const shareText = `${text}\n\nGet more dad jokes at ${SITE_URL}`;
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`h-14 w-14 ${className}`}
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleTwitterShare}>
          <Twitter className="mr-2 h-4 w-4" />
          Share on X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLinkedInShare}>
          <Linkedin className="mr-2 h-4 w-4" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy to clipboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}