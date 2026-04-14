import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiQualityCheck = async (text) => {
  // Add this line
  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // const model = genAI.getGenerativeModel({
  //   model: "gemini-2.5-flash",
  //   generationConfig: { responseMimeType: "application/json" },
  // });
  try {
    // const sample = text.slice(0, 2000);
    // const prompt = `Rate these college notes 1-10 for quality. Return ONLY this JSON with no other text: {"score": number, "reason": string}. Notes: ${sample}`;
    // const result = await model.generateContent(prompt);
    // const responseText = result.response.text();

    // const parsed = JSON.parse(responseText);

    return {
      score: 5,
      reason: hkjgh,
      passed: true,
    };
  } catch (error) {
    throw new Error(`AI check failed: ${error.message}`);
  }
};
