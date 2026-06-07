import { NextResponse } from "next/server";
import { errorResponse, parseCsvParam } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { ScamFeed } from "@/models/ScamFeed";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const language = searchParams.get("language");
    const tags = parseCsvParam(searchParams.get("tags"));
    const limit = Math.min(Number(searchParams.get("limit") ?? 20), 50);

    await connectToDatabase();

    const filter: Record<string, unknown> = {};

    if (category) {
      filter.scamCategory = category;
    }

    if (language === "en" || language === "sw") {
      filter.language = language;
    }

    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }

    const feed = await ScamFeed.find(filter)
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ feed });
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to load scam feed.", 500);
  }
}
