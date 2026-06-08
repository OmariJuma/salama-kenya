import { NextResponse } from "next/server";
import { errorResponse, getErrorMessage, normalizeSubject } from "@/lib/api";
import prisma from "@/lib/db";
import { ReportType, ScamCategory } from "@prisma/client";

export const runtime = "nodejs";

const REPORT_TYPES = Object.values(ReportType);
const SCAM_CATEGORIES = Object.values(ScamCategory);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query?.trim()) {
      return errorResponse("Search query q is required.");
    }

    const normalizedQuery = normalizeSubject(query);
    const rawQuery = query.trim();

    // Only pass to enum fields if the query is actually a valid enum value
    const matchedReportType = REPORT_TYPES.find(
      (t) => t.toLowerCase() === rawQuery.toLowerCase()
    );
    const matchedScamCategory = SCAM_CATEGORIES.find(
      (c) => c.toLowerCase() === rawQuery.toLowerCase()
    );

    const [indexResults, reportResults] = await prisma.$transaction([
      prisma.searchIndex.findMany({
        where: {
          OR: [
            { normalizedSubject: { contains: normalizedQuery, mode: "insensitive" } },
            { subject: { contains: rawQuery, mode: "insensitive" } },
            // Only include enum filters if query matches a valid enum value
            ...(matchedScamCategory ? [{ scamCategories: { has: matchedScamCategory } }] : []),
            ...(matchedReportType ? [{ subjectType: { equals: matchedReportType } }] : []),
          ],
        },
        orderBy: [{ totalReports: "desc" }, { lastReportedAt: "desc" }],
        take: 20,
        include: {
          reports: {
            select: {
              id: true,
              scamCategory: true,
              description: true,
              language: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 3,
          },
        },
      }),

      prisma.report.findMany({
        where: {
          OR: [
            { description: { contains: rawQuery, mode: "insensitive" } },
            { subject: { contains: rawQuery, mode: "insensitive" } },
            { normalizedSubject: { contains: normalizedQuery, mode: "insensitive" } },
            ...(matchedScamCategory ? [{ scamCategory: { equals: matchedScamCategory } }] : []),
            ...(matchedReportType ? [{ reportType: { equals: matchedReportType } }] : []),
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          reportType: true,
          subject: true,
          scamCategory: true,
          description: true,
          language: true,
          status: true,
          createdAt: true,
          searchIndex: {
            select: {
              id: true,
              riskScore: true,
              totalReports: true,
            },
          },
        },
      }),
    ]);

    const indexReportIds = new Set(
      indexResults.flatMap((i) => i.reports.map((r) => r.id))
    );
    const standaloneReports = reportResults.filter(
      (r) => !indexReportIds.has(r.id)
    );

    return NextResponse.json({
      results: {
        searchIndex: indexResults,
        reports: standaloneReports,
      },
      meta: {
        searchIndexCount: indexResults.length,
        reportsCount: standaloneReports.length,
        query: rawQuery,
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(getErrorMessage(error, "Failed to search reports."), 500);
  }
}