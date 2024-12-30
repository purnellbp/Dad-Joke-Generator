// published-model-pricing.ts

// Interface for pricing details
interface PricingDetails {
    inputTokensPer1K: number;
    outputTokensPer1K: number;
    cachedInputTokensPer1K?: number;
    batchApiInputTokensPer1K?: number;
    batchApiOutputTokensPer1K?: number;
    audioInputTokensPer1K?: number;
    audioOutputTokensPer1K?: number;
  }
  
  // Pricing data
  const modelPricing: { [modelName: string]: PricingDetails } = {
    "gpt-4o": {
      inputTokensPer1K: 0.0025,
      outputTokensPer1K: 0.01,
      cachedInputTokensPer1K: 0.00125,
      batchApiInputTokensPer1K: 0.00125,
      batchApiOutputTokensPer1K: 0.005,
    },
    "gpt-4o-2024-11-20": {
      inputTokensPer1K: 0.0025,
      outputTokensPer1K: 0.01,
      cachedInputTokensPer1K: 0.00125,
      batchApiInputTokensPer1K: 0.00125,
      batchApiOutputTokensPer1K: 0.005,
    },
    "gpt-4o-audio-preview": {
      inputTokensPer1K: 0.0025,
      outputTokensPer1K: 0.01,
      audioInputTokensPer1K: 0.1,
      audioOutputTokensPer1K: 0.2,
    },
    "gpt-4o-mini": {
      inputTokensPer1K: 0.00015,
      outputTokensPer1K: 0.0006,
      cachedInputTokensPer1K: 0.000075,
      batchApiInputTokensPer1K: 0.000075,
      batchApiOutputTokensPer1K: 0.0003,
    },
    "gpt-4o-mini-2024-07-18": {
      inputTokensPer1K: 0.00015,
      outputTokensPer1K: 0.0006,
      cachedInputTokensPer1K: 0.000075,
      batchApiInputTokensPer1K: 0.000075,
      batchApiOutputTokensPer1K: 0.0003,
    },
    "gpt-4o-mini-audio-preview": {
      inputTokensPer1K: 0.00015,
      outputTokensPer1K: 0.0006,
      audioInputTokensPer1K: 0.01,
      audioOutputTokensPer1K: 0.02,
    },
  };
  
  export default modelPricing;
  