import React from "react";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/QueryProvider";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollbarGutter: "stable" }}>
      <body className={`antialiased`}>
        <Toaster className="z-[999]" />
        <div className="dashboardLayout">
          <QueryProvider>
            <Sidebar />
            <Header />
            {children}
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
