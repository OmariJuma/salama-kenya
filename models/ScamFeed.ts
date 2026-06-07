import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const scamFeedSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
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
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    source: {
      type: String,
      enum: ["community", "admin", "ai_detected"],
      default: "community",
    },
    tags: [{ type: String, trim: true }],
    language: { type: String, enum: ["en", "sw"], default: "en" },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

scamFeedSchema.index({ title: "text", body: "text", tags: "text" });

export type ScamFeedDocument = InferSchemaType<typeof scamFeedSchema>;

export const ScamFeed =
  (mongoose.models.ScamFeed as Model<ScamFeedDocument>) ??
  mongoose.model("ScamFeed", scamFeedSchema);
