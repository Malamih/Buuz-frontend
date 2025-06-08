"use client";
// import { useMainStore } from "@/stores/main";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

export const LensiProvider = ({ children }: { children: React.ReactNode }) => {
  const lenis = useLenis();
  // const { smoothScrolling } = useMainStore((state) => state);
  useEffect(() => {
    if (!lenis) return;
    lenis.start();
    lenis.options.duration = 1.2;
  }, [lenis]);

  useEffect(() => {
    const int = setInterval(() => {
      ScrollTrigger.refresh();
    }, 2000);
    return () => {
      clearInterval(int);
    };
  }, []);
  // useEffect(() => {
  //   if (!smoothScrolling && lenis) {
  //     lenis.stop();
  //   } else {
  //     lenis?.start();
  //   }
  // }, [smoothScrolling]);
  return <ReactLenis root>{children}</ReactLenis>;
};
