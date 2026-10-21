import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "./config/env.js";

const pool = new Pool({
  connectionString: env.pgDatabaseUrl,
});

export const auth = betterAuth({
  database: pool,
  secret: env.betterAuthSecret,
  baseURL: env.betterAuthUrl,
  trustedOrigins: [env.frontendUrl],
  emailAndPassword: {
    enabled: true,
  },
});
