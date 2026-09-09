#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

function hasDatabaseUrlConfigured() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0) {
    return true;
  }

  for (const envFile of [".env", ".env.local"]) {
    const filePath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed.startsWith("DATABASE_URL=") && trimmed.length > "DATABASE_URL=".length) {
          return true;
        }
      }
    }
  }

  return false;
}

async function main() {
  if (!hasDatabaseUrlConfigured()) {
    console.log("Skipping db:migrate bootstrap because DATABASE_URL is not configured.");
    return;
  }

  const { runMigrations } = require("./db-migrate.js");
  await runMigrations();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
