import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const joke = searchParams.get('joke') || 'Generate hilarious dad jokes with AI';
    const emoji = searchParams.get('emoji') || '👨';
    const topic = searchParams.get('topic') || '';

    const font = await fetch(
      'https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFlY9aA5Wl6PQ.ttf'
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '80px',
                fontWeight: 700,
                color: '#4F46E5',
                marginBottom: '20px',
              }}
            >
              <span>{emoji} Dad Joke Generator</span>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: '36px',
                color: '#333333',
                textAlign: 'center',
                maxWidth: '90%',
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                whiteSpace: 'pre-wrap',
              }}
            >
              <span>{joke}</span>
            </div>
            {topic && (
              <div
                style={{
                  display: 'flex',
                  fontSize: '24px',
                  color: '#666666',
                  fontStyle: 'italic',
                }}
              >
                <span>{topic}</span>
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: '#666666',
              marginTop: '20px',
            }}
          >
            <span>artificialintelligencepaternalhumordistributionplatform.online</span>
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
    console.error('Failed to generate OpenGraph image:', error);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
} 