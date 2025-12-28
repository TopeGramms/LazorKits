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

  // Paymaster endpoint - handles gasless transaction requests
  // In production, this should validate transactions and sponsor them
  // For demo purposes, this returns a placeholder payer account
  app.post("/api/paymaster", (req, res) => {
    try {
      // The LazorKit SDK expects a payer account for gasless transactions
      // In a real implementation, you would:
      // 1. Verify the transaction details
      // 2. Check if you want to sponsor this transaction
      // 3. Return a valid signer account
      
      // For now, return an error message explaining the limitation
      res.status(501).json({
        error: "Paymaster service not fully implemented",
        message: "The demo paymaster has been suspended. To enable gasless transactions, deploy your own paymaster service. See: https://github.com/lazorkit/paymaster",
      });
    } catch (error: any) {
      res.status(500).json({ error: error?.message || "Paymaster error" });
    }
  });

  return httpServer;
}
