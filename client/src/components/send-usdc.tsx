import { useWallet } from "@lazorkit/wallet";
import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { Zap, ExternalLink, Loader2, Send } from "lucide-react";

export function SendUsdc() {
  const { signAndSendTransaction, isSigning } = useWallet();
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGaslessTx = async () => {
    try {
      setSignature(null);
      setError(null);

      // Create a Memo instruction for the demo
      // In a real app, this would be a Token Transfer instruction
      const instruction = new TransactionInstruction({
        keys: [],
        programId: new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'),
        data: Buffer.from('Hello LazorKit Gasless!'),
      });

      const sig = await signAndSendTransaction(instruction);
      setSignature(sig);
    } catch (err: any) {
      console.error('Transaction failed:', err);
      setError(err.message || "Transaction failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="glass-card rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-white">Gasless Transaction</h3>
              <p className="text-xs text-muted-foreground">Sponsored by Paymaster</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Send a test transaction on Devnet without paying any SOL for gas fees. 
            This uses a Memo instruction for demonstration.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {signature ? (
            <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 mb-2 text-green-400 font-medium">
                <Zap className="w-4 h-4 fill-current" />
                <span>Transaction Successful!</span>
              </div>
              <a 
                href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-300 hover:text-white underline decoration-green-500/50 hover:decoration-white flex items-center gap-1 break-all"
              >
                View on Explorer <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          ) : null}

          <button
            onClick={handleGaslessTx}
            disabled={isSigning}
            className="w-full py-3 rounded-xl font-semibold text-white shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-purple-600 hover:to-purple-500 hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isSigning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Gasless Transaction
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
