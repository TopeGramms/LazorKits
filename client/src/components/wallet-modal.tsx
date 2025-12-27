import { useWallet } from "@lazorkit/wallet";
import { Copy, Check, LogOut, ChevronDown, ChevronUp, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";

export function WalletModal() {
  const { smartWalletPubkey, disconnect } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!smartWalletPubkey) return null;

  const address = smartWalletPubkey.toString();
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 left-4 z-50 sm:left-auto">
      {/* Closed State - Compact Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-xl bg-primary/20 border border-primary/40 hover:border-primary/60 text-white font-medium text-sm flex items-center gap-2 transition-all hover:bg-primary/30 justify-center sm:justify-start"
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="hidden sm:inline">{shortAddress}</span>
          <span className="sm:hidden text-xs">Connected</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Open State - Expanded Modal */}
      {isOpen && (
        <div className="w-full sm:w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-primary/30 rounded-2xl shadow-2xl p-4 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <WalletIcon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Connected</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Active on Devnet
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronUp className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

          {/* Wallet Address */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">
              Wallet Address
            </p>
            <div className="bg-black/40 rounded-lg p-3 border border-white/5 flex items-center justify-between gap-2 group hover:border-white/10 transition-colors">
              <code className="font-mono text-xs text-white/80 truncate group-hover:text-white transition-colors">
                {address}
              </code>
              <button
                onClick={copyAddress}
                className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors flex-shrink-0"
                title="Copy Address"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Balances */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">
              Balances
            </p>
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg p-3 border border-blue-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-300 font-medium">SOL</p>
                </div>
                <p className="text-sm font-semibold text-white">0.0009</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg p-3 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-300 font-medium">USDC</p>
                </div>
                <p className="text-sm font-semibold text-white">0.00</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

          {/* Actions */}
          <div className="space-y-2">
            <a
              href="https://explorer.solana.com/address/F3zwTui9GbSjodtuyZPyRvifudAdDE?cluster=devnet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              View on Explorer
            </a>
            <button
              onClick={handleDisconnect}
              className="w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
