import { defineConfig } from "prisma/config";
import path from "node:path";
import dotenv from "dotenv";

// Load .env.local first (Next.js convention), fallback to .env
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
