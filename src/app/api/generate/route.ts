import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate 3 creative project ideas based on the topic: "${topic}"`,
            },
          ],
        },
      ],
    });

    const ideas =
      response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No ideas generated";

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}
