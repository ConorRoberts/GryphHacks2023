import { Configuration, OpenAIApi } from "openai";

export const getOpenAiClient = () => {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    throw new Error("Missing env 'OPENAI_API_KEY'");
  }

  const config = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(config);

  return openai;
};
