import { useWallet } from "@lazorkit/wallet";
import { Loader2, Fingerprint, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Single button that triggers LazorKit's passkey flow and redirects to /wallet when connected
export function PasskeyLogin() {
  const { connect, isConnecting, isConnected } = useWallet();
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      setLocation("/wallet");
    }
  }, [isConnected, setLocation]);

  const handleConnect = async () => {
    setError(null);
    try {
      console.log("Starting passkey authentication...");
      await connect();
      console.log("Passkey authentication successful");
    } catch (err: any) {
      console.error("Connection failed:", err);
      const errorMsg = err?.message || err?.toString() || "Authentication failed. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-xl font-semibold text-base sm:text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-75"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {isConnecting ? (
          <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
        ) : (
          <Fingerprint className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
        )}
        <span className="text-sm sm:text-base">
          {isConnecting ? "Authenticating..." : "Connect with Passkey"}
        </span>
      </button>

      {error && (
        <div className="w-full p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-300 font-medium">Authentication Error</p>
            <p className="text-xs text-red-200 mt-1 break-words">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
