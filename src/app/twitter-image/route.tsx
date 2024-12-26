import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const joke = searchParams.get('joke') || 'Generate hilarious dad jokes with AI';

    // Load the Noto Sans font (known to work with Edge Runtime)
    const font = await fetch(
      'https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFlY9aA5Wl6PQ.ttf'
    ).then((res) => res.arrayBuffer());

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
              fontSize: 36,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '90%',
              margin: '0 auto',
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {joke}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans',
            data: font,
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