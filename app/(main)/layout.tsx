import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LensiProvider } from "@/providers/LenisProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LensiProvider>
      <Header />
      {children}
      <Footer />
    </LensiProvider>
  );
}
