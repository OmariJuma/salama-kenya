import { NextResponse } from "next/server";
import {
  errorResponse,
  getErrorMessage,
  isNonEmptyString,
  normalizeSubject,
} from "@/lib/api";
import prisma from "@/lib/db";
import { calculateRiskScore } from "@/lib/risk";

export const runtime = "nodejs";

const reportTypes = ["phone", "business", "website", "social_media"];
const scamCategories = [
  "fake_loan",
  "impersonation",
  "phishing",
  "job_scam",
  "investment",
  "other",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!reportTypes.includes(body.reportType)) {
      return errorResponse("reportType is required.");
    }

    if (!isNonEmptyString(body.subject)) {
      return errorResponse("subject is required.");
    }

    if (!scamCategories.includes(body.scamCategory)) {
      return errorResponse("scamCategory is required.");
    }

    if (!isNonEmptyString(body.description)) {
      return errorResponse("description is required.");
    }

    const normalizedSubject = normalizeSubject(body.subject);

    // Fetch existing search index first (needed for risk calc + category merge)
    const existing = await prisma.searchIndex.findUnique({
      where: { normalizedSubject },
    });

    const nextTotalReports = (existing?.totalReports ?? 0) + 1;
    const scamCategoriesSet = new Set<string>(existing?.scamCategories ?? []);
    scamCategoriesSet.add(body.scamCategory);
    const newRiskScore = calculateRiskScore(nextTotalReports);

    // Upsert the SearchIndex
    const searchIndex = await prisma.searchIndex.upsert({
      where: { normalizedSubject },
      create: {
        subject: body.subject.trim(),
        normalizedSubject,
        subjectType: body.reportType,
        totalReports: nextTotalReports,
        scamCategories: [...scamCategoriesSet],
        riskScore: newRiskScore,
        lastReportedAt: new Date(),
      },
      update: {
        subject: body.subject.trim(),
        subjectType: body.reportType,
        totalReports: nextTotalReports,
        scamCategories: [...scamCategoriesSet],
        riskScore: newRiskScore,
        lastReportedAt: new Date(),
      },
    });

    // Create the Report linked to the SearchIndex
    const report = await prisma.report.create({
      data: {
        reportType: body.reportType,
        subject: body.subject.trim(),
        normalizedSubject,
        scamCategory: body.scamCategory,
        description: body.description.trim(),
        evidence: Array.isArray(body.evidence) ? body.evidence : [],
        language: body.language === "sw" ? "sw" : "en",
        status: "pending",
        searchIndexId: searchIndex.id,
      },
    });

    return NextResponse.json({ report, searchIndex }, { status: 201 });
  } catch (error) {
    console.error(error);
    return errorResponse(getErrorMessage(error, "Failed to submit report."), 500);
  }
}