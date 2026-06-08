import { NextResponse } from "next/server";
import { errorResponse, getErrorMessage, isNonEmptyString } from "@/lib/api";
import prisma from "@/lib/db";
import { analyzeScam } from "@/lib/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hasText = isNonEmptyString(body.rawInput);
    const hasImage = isNonEmptyString(body.imageUrl);

    if (!hasText) {
      return errorResponse("rawInput is required.");
    }

    if (hasImage && !isNonEmptyString(body.mimeType)) {
      return errorResponse("mimeType is required when imageUrl is provided.");
    }

    const language = body.language === "sw" ? "sw" : "en";

    // Fetch image from Cloudinary URL and convert to base64 server-side
    let imageBase64: string | undefined;
    if (hasImage) {
      const res = await fetch(body.imageUrl);
      if (!res.ok) throw new Error(`Failed to fetch image from URL: ${body.imageUrl}`);
      const arrayBuffer = await res.arrayBuffer();
      imageBase64 = Buffer.from(arrayBuffer).toString("base64");
    }

    const result = await analyzeScam({
      rawInput: body.rawInput.trim(),
      imageBase64,
      mimeType: hasImage ? body.mimeType : undefined,
      language,
    });

    const check = await prisma.aICheck.create({
      data: {
        inputType: hasImage ? "screenshot" : "text",
        rawInput: body.rawInput.trim(),
        imageUrl: hasImage ? body.imageUrl : null, // store Cloudinary URL, not base64
        riskLevel: result.riskLevel,
        scamIndicators: result.scamIndicators ?? [],
        similarPatterns: result.similarPatterns ?? [],
        recommendedAction: result.recommendedAction,
        language,
        checkedAt: new Date(),
      },
    });

    return NextResponse.json({ result, check }, { status: 201 });
  } catch (error) {
    console.error(error);
    return errorResponse(
      getErrorMessage(error, "Failed to analyze scam content."),
      500,
    );
  }
}