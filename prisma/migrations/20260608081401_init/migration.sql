-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('phone', 'business', 'website', 'social_media');

-- CreateEnum
CREATE TYPE "ScamCategory" AS ENUM ('fake_loan', 'impersonation', 'phishing', 'job_scam', 'investment', 'other');

-- CreateEnum
CREATE TYPE "RiskScore" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('pending', 'verified', 'rejected');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'sw');

-- CreateEnum
CREATE TYPE "FeedSource" AS ENUM ('community', 'admin', 'ai_detected');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('text', 'screenshot');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "subject" TEXT NOT NULL,
    "normalizedSubject" TEXT NOT NULL,
    "scamCategory" "ScamCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "evidence" TEXT[],
    "language" "Language" NOT NULL DEFAULT 'en',
    "status" "ReportStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "searchIndexId" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchIndex" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "normalizedSubject" TEXT NOT NULL,
    "subjectType" "ReportType" NOT NULL,
    "totalReports" INTEGER NOT NULL DEFAULT 0,
    "scamCategories" TEXT[],
    "riskScore" "RiskScore" NOT NULL DEFAULT 'low',
    "lastReportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScamFeed" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "scamCategory" "ScamCategory" NOT NULL,
    "severity" "RiskScore" NOT NULL DEFAULT 'medium',
    "source" "FeedSource" NOT NULL DEFAULT 'community',
    "tags" TEXT[],
    "language" "Language" NOT NULL DEFAULT 'en',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScamFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AICheck" (
    "id" TEXT NOT NULL,
    "inputType" "InputType" NOT NULL,
    "rawInput" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT,
    "riskLevel" "RiskScore" NOT NULL,
    "scamIndicators" TEXT[],
    "similarPatterns" TEXT[],
    "recommendedAction" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'en',
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AICheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Report_normalizedSubject_idx" ON "Report"("normalizedSubject");

-- CreateIndex
CREATE INDEX "Report_subject_idx" ON "Report"("subject");

-- CreateIndex
CREATE UNIQUE INDEX "SearchIndex_normalizedSubject_key" ON "SearchIndex"("normalizedSubject");

-- CreateIndex
CREATE INDEX "SearchIndex_normalizedSubject_idx" ON "SearchIndex"("normalizedSubject");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_searchIndexId_fkey" FOREIGN KEY ("searchIndexId") REFERENCES "SearchIndex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
