import { NextResponse } from "next/server";
import { errorResponse, isNonEmptyString } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { analyzeScam } from "@/lib/gemini";
import { AICheck } from "@/models/AICheck";

export const runtime = "nodejs";
// AI scam checker
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inputType = body.inputType === "screenshot" ? "screenshot" : "text";
    const hasText = isNonEmptyString(body.rawInput);
    const hasImage = isNonEmptyString(body.imageBase64);

    if (!hasText && !hasImage) {
      return errorResponse("rawInput or imageBase64 is required.");
    }

    await connectToDatabase();

    const language = body.language === "sw" ? "sw" : "en";
    const result = await analyzeScam({
      rawInput: hasText ? body.rawInput.trim() : "",
      imageBase64: hasImage ? body.imageBase64 : undefined,
      mimeType: isNonEmptyString(body.mimeType) ? body.mimeType : undefined,
      language,
    });

    const check = await AICheck.create({
      inputType,
      rawInput: hasText ? body.rawInput.trim() : "",
      imageUrl: isNonEmptyString(body.imageUrl) ? body.imageUrl : null,
      result,
      language,
      checkedAt: new Date(),
    });

    return NextResponse.json({ result, check }, { status: 201 });
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to analyze scam content.", 500);
  }
}
