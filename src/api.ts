import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config";

const genAI = new GoogleGenerativeAI(config.googleApiKey);

export const getResponse = async (message: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const result = await model.generateContent(message);
  const response = result.response;
  const text = response.text();

  return text;
};
