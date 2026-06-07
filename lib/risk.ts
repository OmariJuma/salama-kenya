export type RiskScore = "low" | "medium" | "high" | "critical";

export function calculateRiskScore(totalReports: number): RiskScore {
  if (totalReports >= 25) {
    return "critical";
  }

  if (totalReports >= 10) {
    return "high";
  }

  if (totalReports >= 3) {
    return "medium";
  }

  return "low";
}
