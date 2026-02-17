import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,

      staleTime: 1000 * 60 * 30,   // 30 minut świeżości
      gcTime: 1000 * 60 * 30,     // 30 min w cache

      retry: 1,
      retryDelay: 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
