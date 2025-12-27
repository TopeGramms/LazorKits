import { useWallet } from "@lazorkit/wallet";
import { Loader2, Fingerprint } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

// Single button that triggers LazorKit's passkey flow and redirects to /wallet when connected
export function PasskeyLogin() {
  const { connect, isConnecting, isConnected } = useWallet();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isConnected) {
      setLocation("/wallet");
    }
  }, [isConnected, setLocation]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="group relative px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-3 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {isConnecting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Fingerprint className="w-5 h-5 text-primary" />
      )}
      <span>
        {isConnecting ? "Connecting..." : "Connect with Passkey"}
      </span>
    </button>
  );
}
