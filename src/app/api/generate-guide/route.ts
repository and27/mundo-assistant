import { NextResponse } from "next/server";
import { create3PillarGuidePrompt } from "@/lib/prompts";
import { MundoAssistantGuide } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userQuery = body.query;

    if (!userQuery) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const masterPrompt = create3PillarGuidePrompt(userQuery);

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: masterPrompt,
          },
        ],
        temperature: 0.7,
        stream: false,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch response from AI", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponseString = data.choices[0].message.content;

    const parsedGuide: MundoAssistantGuide = JSON.parse(aiResponseString);

    return NextResponse.json(parsedGuide);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
