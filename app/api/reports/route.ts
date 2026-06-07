import { NextResponse } from "next/server";
import { errorResponse, isNonEmptyString, normalizeSubject } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { calculateRiskScore } from "@/lib/risk";
import { Report } from "@/models/Report";
import { SearchIndex } from "@/models/SearchIndex";

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

    await connectToDatabase();

    const normalizedSubject = normalizeSubject(body.subject);
    const report = await Report.create({
      reportType: body.reportType,
      subject: body.subject.trim(),
      normalizedSubject,
      scamCategory: body.scamCategory,
      description: body.description.trim(),
      evidence: Array.isArray(body.evidence) ? body.evidence : [],
      language: body.language === "sw" ? "sw" : "en",
      status: "pending",
    });

    const existing = await SearchIndex.findOne({ normalizedSubject });
    const nextTotalReports = (existing?.totalReports ?? 0) + 1;
    const scamCategoriesSet = new Set<string>(existing?.scamCategories ?? []);
    scamCategoriesSet.add(body.scamCategory);

    const searchIndex = await SearchIndex.findOneAndUpdate(
      { normalizedSubject },
      {
        $set: {
          subject: body.subject.trim(),
          normalizedSubject,
          subjectType: body.reportType,
          totalReports: nextTotalReports,
          scamCategories: [...scamCategoriesSet],
          riskScore: calculateRiskScore(nextTotalReports),
          lastReportedAt: new Date(),
        },
        $addToSet: { reports: report._id },
      },
      { new: true, upsert: true },
    );

    return NextResponse.json({ report, searchIndex }, { status: 201 });
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to submit report.", 500);
  }
}
