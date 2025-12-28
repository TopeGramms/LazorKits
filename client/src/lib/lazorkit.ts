export type LazorkitConfig = {
  /**
   * Solana RPC endpoint.
   * For local development this starter uses Devnet.
   */
  rpcUrl: string;

  /**
   * LazorKit portal URL where the passkey UI is hosted.
   */
  portalUrl: string;

  /**
   * Paymaster configuration for sponsoring (gasless) transactions.
   */
  paymasterConfig: {
    paymasterUrl: string;
  };
};

/**
 * Default LazorKit configuration used by the app.
 *
 * This is the single place to change RPC / portal / paymaster
 * when you move from devnet → mainnet or your own infra.
 * 
 * NOTE: The paymaster URL points to your own backend for now.
 * For production with real gasless transactions, you'll need to:
 * 1. Deploy a proper paymaster service (see https://github.com/lazorkit/paymaster)
 * 2. Or use a third-party paymaster provider
 * 3. Update paymasterUrl below
 */
export const lazorkitConfig: LazorkitConfig = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    // Point to your own backend paymaster endpoint
    paymasterUrl: typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:5000/api/paymaster"
      : `${window.location.origin}/api/paymaster`,
  },
};


