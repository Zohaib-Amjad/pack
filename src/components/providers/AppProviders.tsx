"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuoteModalProvider } from "@/components/QuoteModalContext";
import { Toaster } from "@/components/ui/toaster";
import GlobalAbandonedCapture from "@/components/GlobalAbandonedCapture";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <QuoteModalProvider>
        <ScrollToTopOnNavigate />
        <GlobalAbandonedCapture />
        {children}
        <Toaster />
      </QuoteModalProvider>
    </QueryClientProvider>
  );
}