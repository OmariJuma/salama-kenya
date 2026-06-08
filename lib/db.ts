import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// In production (Vercel), set DATABASE_CA_CERT env var to the full PEM cert content.
// In local dev, we fall back to reading prisma/ca.pem from disk.
function getCaCert(): string | undefined {
  if (process.env.DATABASE_CA_CERT) {
    // Vercel stores env vars as single-line; restore newlines if needed
    return process.env.DATABASE_CA_CERT.replace(/\\n/g, "\n");
  }
  try {
    return fs.readFileSync(path.join(process.cwd(), "prisma", "ca.pem"), "utf-8");
  } catch {
    return undefined;
  }
}

const ca = getCaCert();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false },
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;