export async function getBackgroundImage(): Promise<string> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=father,dad&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 60 * 60 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return '';
  }
} 