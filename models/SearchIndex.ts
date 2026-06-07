import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const searchIndexSchema = new Schema(
  {
    subject: { type: String, required: true, trim: true },
    normalizedSubject: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    subjectType: {
      type: String,
      enum: ["phone", "business", "website", "social_media"],
      required: true,
    },
    totalReports: { type: Number, default: 0, min: 0 },
    scamCategories: [{ type: String, trim: true }],
    riskScore: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    lastReportedAt: { type: Date, default: Date.now },
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true },
);

searchIndexSchema.index({ normalizedSubject: "text", subject: "text" });

export type SearchIndexDocument = InferSchemaType<typeof searchIndexSchema>;

export const SearchIndex =
  (mongoose.models.SearchIndex as Model<SearchIndexDocument>) ??
  mongoose.model("SearchIndex", searchIndexSchema);
