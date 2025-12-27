import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // When bundled with esbuild, __dirname points to dist/, so dist/public should exist
  // Also try process.cwd() as fallback for different deployment setups
  const possiblePaths = [
    path.resolve(__dirname, "public"), // When bundled: dist/public
    path.resolve(process.cwd(), "dist", "public"), // Fallback: from project root
  ];

  let distPath: string | null = null;
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      distPath = possiblePath;
      break;
    }
  }

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Tried: ${possiblePaths.join(", ")}. Make sure to run 'npm run build' first.`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath!, "index.html"));
  });
}
