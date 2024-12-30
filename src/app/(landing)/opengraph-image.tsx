import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dad Joke Generator'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #6366f1, #9333ea)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontSize: '100px',
            marginBottom: '24px',
          }}
        >
          👨
        </div>
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Dad Joke Generator
        </div>
        <div
          style={{
            fontSize: '32px',
            color: 'white',
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          Where AI stands for &apos;Amazingly Ingenious&apos;
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 