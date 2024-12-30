"use server";

interface Model {
  id: string;
  created: number;
  owned_by: string;
  object: string;
}

export async function fetchModelsAction() {
  const orgId = process.env.OPENAI_ORG_ID;
  if (!orgId) {
    console.error('OPENAI_ORG_ID is not set');
    return null;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Organization': orgId,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      return null;
    }

    const data = await response.json();
    // Sort models by creation date (newest first) and filter for GPT models
    const models = data.data
      .filter((model: Model) => 
        model.id.includes('gpt') || 
        model.id.includes('text-embedding') || 
        model.id.includes('whisper') ||
        model.id.includes('dall-e')
      )
      .sort((a: Model, b: Model) => b.created - a.created);

    return models;
  } catch (error) {
    console.error('Error fetching models:', error);
    return null;
  }
} 