import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  tablesFilter: ["!mastra*"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
