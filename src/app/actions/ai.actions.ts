"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractText } from "unpdf"; // Import from unpdf

export async function analyzeResumeAction(formData: FormData) {
  try {
    const jobDescription = formData.get("jobDescription") as string;
    const file = formData.get("file") as File | null;
    const fileUrl = formData.get("fileUrl") as string | null;

    let resumeText = "";

    if (file) {
      console.log("Extracting from local file...");
      const buffer = await file.arrayBuffer();
      const { text } = await extractText(new Uint8Array(buffer));
      resumeText = Array.isArray(text) ? text.join("\n") : text;
    } else if (fileUrl) {
      console.log("Extracting from Supabase URL...");
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const { text } = await extractText(new Uint8Array(arrayBuffer));
      resumeText = Array.isArray(text) ? text.join("\n") : text;
    }

    console.log("Extracted text length:", resumeText?.length);

    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error("Could not extract enough text from the PDF. Please ensure it's a text-based PDF.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

    const prompt = `
      Act as an expert technical recruiter. Analyze the Resume against the Job Description.
      
      Resume Content:
      ${resumeText.substring(0, 15000)}
      
      Job Description:
      ${jobDescription}
      
      Return a JSON object with:
      {
        "missingKeywords": string[],
        "strengths": string[],
        "suggestions": string[]
      }
      
      Return ONLY the JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);

  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return { error: error.message || "Failed to analyze resume." };
  }
}
