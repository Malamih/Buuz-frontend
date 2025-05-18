"use client";
import TopLoader from "@/components/TopLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const queryClient = new QueryClient();
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TopLoader />
      {children}
    </QueryClientProvider>
  );
};
