import { useWallet } from "@lazorkit/wallet";
import { Copy, Check, LogOut, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";

export function WalletStatus() {
  const { smartWalletPubkey, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!smartWalletPubkey) return null;

  const address = smartWalletPubkey.toString();

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <WalletIcon className="w-32 h-32 -mr-8 -mt-8 rotate-12" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-white">Smart Wallet</h3>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/20">
              Devnet
            </span>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-white/5 mb-6">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Address</p>
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-sm text-white truncate">
                {address}
              </code>
              <button
                onClick={copyAddress}
                className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-xs text-green-400 font-medium mb-0.5">Status</p>
              <p className="text-sm font-semibold text-white">Active</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-xs text-purple-400 font-medium mb-0.5">Network</p>
              <p className="text-sm font-semibold text-white">Solana</p>
            </div>
          </div>

          <button
            onClick={() => disconnect()}
            className="w-full mt-6 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
