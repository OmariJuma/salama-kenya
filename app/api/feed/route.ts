import { NextResponse } from "next/server";
import { errorResponse, getErrorMessage, parseCsvParam } from "@/lib/api";
import prisma from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const language = searchParams.get("language");
    const riskScore = searchParams.get("riskScore");
    const reportType = searchParams.get("reportType");
    const limit = Math.min(Number(searchParams.get("limit") ?? 20), 50);
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const skip = (page - 1) * limit;

    const [feed, total] = await prisma.$transaction([
      prisma.searchIndex.findMany({
        where: {
          ...(category ? { scamCategories: { has: category } } : {}),
          ...(riskScore ? { riskScore: riskScore as any } : {}),
          ...(reportType ? { subjectType: reportType as any } : {}),
        },
        orderBy: { lastReportedAt: "desc" },
        take: limit,
        skip,
        include: {
          reports: {
            where: {
              ...(language === "en" || language === "sw"
                ? { language: language as any }
                : {}),
            },
            orderBy: { createdAt: "desc" },
            take: 3, // preview of latest reports per subject
            select: {
              id: true,
              scamCategory: true,
              description: true,
              language: true,
              createdAt: true,
            },
          },
        },
      }),
      prisma.searchIndex.count({
        where: {
          ...(category ? { scamCategories: { has: category } } : {}),
          ...(riskScore ? { riskScore: riskScore as any } : {}),
          ...(reportType ? { subjectType: reportType as any } : {}),
        },
      }),
    ]);

    return NextResponse.json({
      feed,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(getErrorMessage(error, "Failed to load scam feed."), 500);
  }
}