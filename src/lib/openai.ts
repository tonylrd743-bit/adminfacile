import OpenAI from "openai";
import { getRequiredEnv } from "@/lib/env";

let openaiClient: OpenAI | null = null;

export function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: getRequiredEnv("OPENAI_API_KEY"),
      timeout: 35_000,
      maxRetries: 1
    });
  }
  return openaiClient;
}
