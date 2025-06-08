import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { PageContentHandler } from "@/components/PageContentHanlder";

export const metadata: Metadata = {
  title: "Beez production",
  description: "Beez production",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <NextTopLoader color="black" showSpinner={false} />
        <Toaster />
        <QueryProvider>
          <PageContentHandler />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
