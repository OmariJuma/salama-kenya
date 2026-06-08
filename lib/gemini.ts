import { GoogleGenAI, type Part } from "@google/genai";

export type CheckerResult = {
  riskLevel: "low" | "medium" | "high" | "critical";
  scamIndicators: string[];
  similarPatterns: string[];
  recommendedAction: string;
};

type AnalyzeScamInput = {
  rawInput?: string;
  imageBase64?: string;
  mimeType?: string;
  language?: "en" | "sw";
};

const allowedRiskLevels = new Set(["low", "medium", "high", "critical"]);

function normalizeCheckerResult(result: Partial<CheckerResult>): CheckerResult {
  const riskLevel = allowedRiskLevels.has(String(result.riskLevel))
    ? (result.riskLevel as CheckerResult["riskLevel"])
    : "medium";

  return {
    riskLevel,
    scamIndicators: Array.isArray(result.scamIndicators)
      ? result.scamIndicators.map(String).slice(0, 8)
      : [],
    similarPatterns: Array.isArray(result.similarPatterns)
      ? result.similarPatterns.map(String).slice(0, 6)
      : [],
    recommendedAction:
      typeof result.recommendedAction === "string" &&
        result.recommendedAction.trim()
        ? result.recommendedAction.trim()
        : "Do not send money, PINs, OTPs, or personal information. Verify through an official channel.",
  };
}

export async function analyzeScam(input: AnalyzeScamInput): Promise<CheckerResult> {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("Please define GEMINI_API_KEY or GOOGLE_API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const languageName = input.language === "sw" ? "Swahili" : "English";
  const parts: Part[] = [];

  // Image first — Gemini handles multimodal better this way
  if (input.imageBase64) {
    parts.push({
      inlineData: {
        data: input.imageBase64,
        mimeType: input.mimeType ?? "image/png",
      },
    });
  }

  parts.push({
    text: `You are Kaa Rada, a Kenya-focused scam safety assistant.
Analyze the submitted ${input.imageBase64 ? "screenshot and message" : "message"} for fraud risk.
Return ONLY valid JSON with this exact shape:
{
  "riskLevel": "low | medium | high | critical",
  "scamIndicators": ["short indicator"],
  "similarPatterns": ["fake_loan | impersonation | phishing | job_scam | investment | other"],
  "recommendedAction": "clear action for the user"
}
Use ${languageName} for the recommendedAction.
Be practical for Kenyan contexts such as M-Pesa, Safaricom, KRA, banks, WhatsApp takeover, fake loans, jobs, crypto, and OTP/PIN theft.

${input.rawInput ? `Submitted text:\n${input.rawInput}` : ""}`,
  });

  const geminiResponse = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    contents: [{ role: "user", parts }],
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });

  const raw = geminiResponse.text ?? "";

  try {
    const parsed = JSON.parse(raw) as Partial<CheckerResult>;
    return normalizeCheckerResult(parsed);
  } catch {
    // Fallback: strip markdown fences if model ignored responseMimeType
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced?.[1] ?? raw;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Gemini did not return valid JSON.");
    }

    return normalizeCheckerResult(
      JSON.parse(candidate.slice(start, end + 1)) as Partial<CheckerResult>
    );
  }
}