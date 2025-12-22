import { WalletStatus } from "@/components/wallet-status";
import { SendUsdc } from "@/components/send-usdc";
import { useWallet } from "@lazorkit/wallet";
import { Redirect } from "wouter";

export default function WalletPage() {
  const { isConnected, isConnecting } = useWallet();

  // If not connected and not currently connecting, redirect to home
  // Note: LazorKit takes a moment to initialize 'isConnected', so we check 'isConnecting' too
  // However, for better UX we might just render and let the button handle reconnect if needed
  if (!isConnected && !isConnecting) {
    return <Redirect to="/" />;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
          Wallet Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your assets and test gasless transactions
        </p>
      </div>

      <div className="space-y-6">
        <WalletStatus />
        <SendUsdc />
      </div>
    </div>
  );
}
