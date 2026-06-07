import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const reportSchema = new Schema(
  {
    reportType: {
      type: String,
      enum: ["phone", "business", "website", "social_media"],
      required: true,
    },
    subject: { type: String, required: true, trim: true, index: true },
    normalizedSubject: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    scamCategory: {
      type: String,
      enum: [
        "fake_loan",
        "impersonation",
        "phishing",
        "job_scam",
        "investment",
        "other",
      ],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    evidence: [{ type: String, trim: true }],
    reportCount: { type: Number, default: 1, min: 1 },
    language: { type: String, enum: ["en", "sw"], default: "en" },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

reportSchema.index({ normalizedSubject: "text", description: "text" });

export type ReportDocument = InferSchemaType<typeof reportSchema>;

export const Report =
  (mongoose.models.Report as Model<ReportDocument>) ??
  mongoose.model("Report", reportSchema);
