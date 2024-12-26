import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Open Graph Preview',
}

export default function OGPreview() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Open Graph Preview</h1>
      
      {/* Twitter Preview */}
      <div className="mb-12 border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Twitter Card Preview</h2>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full aspect-[1.91/1]">
            <Image
              src="/twitter-image"
              alt="Twitter card preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-4 border-t">
            <div className="font-bold">Dad Joke Generator</div>
            <div className="text-gray-600 text-sm">Generate hilarious dad jokes with AI and share them with your friends!</div>
            <div className="text-gray-500 text-sm mt-2">artificialintelligencepaternalhumordistributionplatform.online</div>
          </div>
        </div>
      </div>

      {/* Facebook/Open Graph Preview */}
      <div className="mb-12 border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Facebook/Open Graph Preview</h2>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full aspect-[1.91/1]">
            <Image
              src="/opengraph-image"
              alt="Open Graph preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-4 border-t">
            <div className="font-bold">Dad Joke Generator</div>
            <div className="text-gray-600 text-sm">Generate hilarious dad jokes with AI and share them with your friends!</div>
            <div className="text-gray-500 text-sm mt-2">artificialintelligencepaternalhumordistributionplatform.online</div>
          </div>
        </div>
      </div>

      {/* Direct Image Links */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Direct Image Links</h2>
        <div className="space-y-2">
          <div>
            <a href="/opengraph-image" className="text-blue-600 hover:underline" target="_blank">
              View Open Graph Image
            </a>
          </div>
          <div>
            <a href="/twitter-image" className="text-blue-600 hover:underline" target="_blank">
              View Twitter Image
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 