import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Dad Joke Generator';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';

// Cache font response
let notoSansBoldData: ArrayBuffer | null = null;
 
export default async function Image() {
  try {
    // Load and cache font
    if (!notoSansBoldData) {
      const response = await fetch(
        'https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFlY9aA5Wl6PQ.ttf',
        { next: { revalidate: 60 * 60 * 24 } } // Cache for 24 hours
      );
      if (!response.ok) {
        throw new Error(`Failed to load font: ${response.status} ${response.statusText}`);
      }
      notoSansBoldData = await response.arrayBuffer();
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom right, #4F46E5, #7C3AED)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Noto Sans"',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            👨 Dad Joke Generator
          </div>
          <div
            style={{
              fontSize: 40,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Generate hilarious dad jokes with AI
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Noto Sans',
            data: notoSansBoldData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error: unknown) {
    console.log(`Failed to generate Twitter image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
} 