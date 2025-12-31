import { QueryClient } from "@tanstack/react-query";

/**
 * Standard React Query client.
 * In this starter, we primarily use it for internal LazorKit state management
 * and fetching on-chain data if needed.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
