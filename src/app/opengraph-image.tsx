import { ImageResponse } from 'next/og';
 
// Route segment config
export const runtime = 'edge';
 
// Image metadata
export const alt = 'Dad Joke Generator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
// Image generation
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        <div style={{ fontSize: 128, marginBottom: 40 }}>👨</div>
        <div>Dad Joke Generator</div>
      </div>
    ),
    {
      ...size,
    }
  );
} 