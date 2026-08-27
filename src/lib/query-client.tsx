"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * React Query provider for the admin panel.
 * 
 * Configuration:
 * - staleTime: 30s — data is considered fresh for 30 seconds (instant page switches)
 * - gcTime: 5min — cache persists in memory for 5 minutes after component unmount
 * - refetchOnWindowFocus: false — prevents refetch storms on tab focus
 * - retry: 1 — single retry on failure to avoid long waits
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,       // 30 seconds
        gcTime: 5 * 60 * 1000,      // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
        // Ensures queries refetch correctly across auth redirects/remounts.
        refetchOnMount: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  // Server: always make a new query client
  if (typeof window === "undefined") return makeQueryClient();
  // Browser: reuse the same query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function AdminQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}