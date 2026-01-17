
import { GoogleGenAI } from "@google/genai";
import { MBTIType, PersonalityInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDetailedPersonalityAnalysis(type: MBTIType, insight: PersonalityInsight): Promise<string> {
  const prompt = `Analyze the MBTI personality type ${type} (${insight.title}). 
  Provide a personalized, deep-dive dating profile description for someone of this type. 
  Include: 
  1. What they look for in a partner.
  2. A creative "bio" hook.
  3. One piece of relationship advice specific to their cognitive functions.
  Keep it engaging, warm, and insightful. Return as plain text with markdown headers.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "We couldn't generate a detailed analysis at this time, but your results are valid!";
  }
}

export async function getCompatibilityTip(userType: MBTIType, matchType: MBTIType): Promise<string> {
  const prompt = `Explain the romantic dynamic between a ${userType} and a ${matchType}. 
  Provide one specific 'Icebreaker' question they could ask each other and one 'Relationship Tip' for harmony.
  Keep it short (max 100 words).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Compatibility tips unavailable.";
  } catch (error) {
    console.error("Gemini Compatibility Error:", error);
    return "Focus on open communication and shared values!";
  }
}
