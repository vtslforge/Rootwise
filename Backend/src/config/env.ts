import dotenv from "dotenv";
dotenv.config();

function checkRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable for ${key}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3001),
  pgDatabaseUrl: checkRequiredEnv("NEON_PG_DB"),
  betterAuthSecret: checkRequiredEnv("BETTER_AUTH_SECRET"),
  betterAuthUrl: checkRequiredEnv("BETTER_AUTH_URL"),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
};