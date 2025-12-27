import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { LazorkitProvider } from "@lazorkit/wallet";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import WalletPage from "@/pages/wallet";
import NotFound from "@/pages/not-found";
import { lazorkitConfig } from "@/lib/lazorkit";

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
      <LazorkitProvider {...lazorkitConfig}>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </LazorkitProvider>
    </QueryClientProvider>
  );
}

export default App;
