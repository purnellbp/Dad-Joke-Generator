// /src/lib/openai.ts

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

/**
 * Simple convenience function if you ever just want 
 * to pass a raw prompt to OpenAI without function calling.
 */
export const create = (prompt: string, model: string) => {
  return openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
  });
};
