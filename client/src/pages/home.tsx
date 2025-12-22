import { PasskeyLogin } from "@/components/passkey-login";
import { ShieldCheck, Zap, Key } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live on Solana Devnet
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]">
            The Future of <br />
            <span className="text-gradient-primary">Web3 Authentication</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of smart wallets. No seed phrases, no passwords. 
            Just secure, biometric authentication powered by LazorKit.
          </p>
        </div>

        <div className="pt-8 pb-12">
          <PasskeyLogin />
          <p className="mt-4 text-sm text-muted-foreground">
            Powered by WebAuthn • No extension required
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <FeatureCard 
            icon={<Key className="w-6 h-6 text-primary" />}
            title="Passkey Auth"
            description="Login securely with FaceID, TouchID, or your device password."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-purple-400" />}
            title="Gasless Txs"
            description="Transactions are sponsored automatically via Paymaster."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-pink-400" />}
            title="Smart Security"
            description="Non-custodial smart wallet architecture on Solana."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm">
      <div className="mb-4 p-2.5 rounded-xl bg-background w-fit border border-white/5 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-display">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
