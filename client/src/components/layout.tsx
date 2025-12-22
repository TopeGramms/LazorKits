import { Link, useLocation } from "wouter";
import { Wallet, Zap, ExternalLink } from "lucide-react";
import { useWallet } from "@lazorkit/wallet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isConnected, smartWalletPubkey } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Lazor<span className="text-primary">Kit</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <a 
              href="https://lazorkit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Docs <ExternalLink className="w-3 h-3" />
            </a>
            
            {isConnected && smartWalletPubkey && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground truncate max-w-[100px]">
                  {smartWalletPubkey.toString().slice(0, 4)}...{smartWalletPubkey.toString().slice(-4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>

      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-primary">LazorKit SDK</span> on Solana Devnet
          </p>
        </div>
      </footer>
    </div>
  );
}
