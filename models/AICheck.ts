import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const aiCheckSchema = new Schema(
  {
    inputType: { type: String, enum: ["text", "screenshot"], required: true },
    rawInput: { type: String, default: "" },
    imageUrl: { type: String, default: null },
    result: {
      riskLevel: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        required: true,
      },
      scamIndicators: [{ type: String }],
      similarPatterns: [{ type: String }],
      recommendedAction: { type: String, required: true },
    },
    language: { type: String, enum: ["en", "sw"], default: "en" },
    checkedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

export type AICheckDocument = InferSchemaType<typeof aiCheckSchema>;

export const AICheck =
  (mongoose.models.AICheck as Model<AICheckDocument>) ??
  mongoose.model("AICheck", aiCheckSchema);
