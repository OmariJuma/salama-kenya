import { NextResponse } from "next/server";
import { errorResponse, normalizeSubject } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { SearchIndex } from "@/models/SearchIndex";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query?.trim()) {
      return errorResponse("Search query q is required.");
    }

    await connectToDatabase();

    const normalizedQuery = normalizeSubject(query);
    const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const results = await SearchIndex.find({
      $or: [
        { normalizedSubject: normalizedQuery },
        { normalizedSubject: { $regex: escapedQuery, $options: "i" } },
        { subject: { $regex: escapedQuery, $options: "i" } },
      ],
    })
      .sort({ totalReports: -1, lastReportedAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to search reports.", 500);
  }
}
