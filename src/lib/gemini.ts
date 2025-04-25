import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.warn("Missing Gemini API key. Please set VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const generatePortfolio = async (formData: {
  name: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
}): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `...`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating portfolio:", error);
    throw new Error("Failed to generate portfolio. Please try again later.");
  }
};
