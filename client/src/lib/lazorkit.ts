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
  paymasterConfig?: {
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
  // paymasterConfig: {
  //   // To enable gasless transactions locally:
  //   // 1. Run the local paymaster (see the /paymaster directory)
  //   // 2. Uncomment this block and use "http://localhost:3000"
  //   paymasterUrl: "http://localhost:3000",
  // },
};


