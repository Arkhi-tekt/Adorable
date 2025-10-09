import { google } from '@ai-sdk/google';

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error(
    'Missing GOOGLE_GENERATIVE_AI_API_KEY – make sure to set it in your .env file',
  );
}

// By default, we use a Gemini model, but others like GPT-4 and Claude Opus also work well.
// See https://sdk.vercel.ai/docs/guides/providers/google-generative-ai for more info.
export const model = google('models/gemini-2.5-pro-latest');