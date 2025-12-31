import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { LazorkitProvider } from "@lazorkit/wallet";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import WalletPage from "@/pages/wallet";
import NotFound from "@/pages/not-found";
import { lazorkitConfig } from "@/lib/lazorkit";
import { useMemo } from "react";

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
  // Memoize the config to prevent re-creating the object on every render
  // This fixes the "Maximum update depth exceeded" error in LazorkitProvider
  const config = useMemo(() => lazorkitConfig, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LazorkitProvider {...config}>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
        <Analytics />
      </LazorkitProvider>
    </QueryClientProvider>
  );
}

export default App;
