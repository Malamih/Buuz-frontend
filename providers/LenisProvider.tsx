"use client";
import { useMainStore } from "@/stores/main";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";

export const LensiProvider = ({ children }: { children: React.ReactNode }) => {
  const lenis = useLenis();
  const { smoothScrolling } = useMainStore((state) => state);
  useEffect(() => {
    if (!lenis) return;
    lenis.start();
  }, [lenis]);
  useEffect(() => {
    if (!smoothScrolling && lenis) {
      lenis.stop();
    } else {
      lenis?.start();
    }
  }, [smoothScrolling]);
  return <ReactLenis root>{children}</ReactLenis>;
};
