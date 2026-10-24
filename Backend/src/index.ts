import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.js";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/health", (_req, res) => {
  res.json({ message: "Health okk" });
});

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});