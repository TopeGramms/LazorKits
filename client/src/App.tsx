import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { LazorkitProvider } from "@lazorkit/wallet";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import WalletPage from "@/pages/wallet";
import NotFound from "@/pages/not-found";
import { Buffer } from "buffer";

// Polyfill Buffer for Solana web3.js
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wallet" component={WalletPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LazorkitProvider
        rpcUrl="https://api.devnet.solana.com"
        portalUrl="https://portal.lazor.sh"
        paymasterConfig={{
          paymasterUrl: "https://lazorkit-paymaster.onrender.com"
        }}
      >
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </LazorkitProvider>
    </QueryClientProvider>
  );
}

export default App;
