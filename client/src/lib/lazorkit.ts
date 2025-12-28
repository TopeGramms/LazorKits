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
 */
export const lazorkitConfig: LazorkitConfig = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    // To enable gasless transactions in production:
    // 1. Deploy your own paymaster (see https://github.com/lazorkit/paymaster)
    // 2. Update this URL to your paymaster endpoint
    // For now, use the LazorKit demo paymaster URL or deploy your own
    paymasterUrl: "https://lazorkit-paymaster.onrender.com",
  },
};


