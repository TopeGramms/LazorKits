import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.health.path, (req, res) => {
    res.json({ status: "ok" });
  });

  // Paymaster endpoint - for development/demo purposes
  // This endpoint is called when LazorKit tries to get a payer for gasless transactions
  // In production, you should deploy a real paymaster that:
  // 1. Validates transaction details
  // 2. Checks spending limits
  // 3. Signs transactions with a dedicated fee account
  app.post("/api/paymaster", (req, res) => {
    try {
      // For demo purposes, return a minimal response
      // In production, return a real payer account that can sponsor transactions
      res.status(200).json({
        error: "Demo paymaster - gasless transactions not available",
        message: "Deploy your own paymaster to enable gasless transactions",
      });
    } catch (error: any) {
      res.status(500).json({ error: error?.message || "Paymaster error" });
    }
  });

  return httpServer;
}
