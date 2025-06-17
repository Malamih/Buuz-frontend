"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import _ScrollTrigger, { ScrollTrigger } from "gsap/ScrollTrigger";
import ReasonIcon from "@/assets/icons/reason.svg";
import { useMainStore } from "@/stores/main";
import { useRouter } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
}

export const WhyUs = ({ classes }: { classes?: string }) => {
  const { pageContent } = useMainStore((state) => state);
  const [reasons, setReasons] = useState<Feature[]>([]);

  const imageRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const reasonsWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageContent?.home) {
      setReasons(pageContent?.home?.features);
    }
  }, [pageContent]);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // تأخير بسيط للسماح للـ DOM بأن يكتمل
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);
    };
  }, [router]);

  useEffect(() => {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    if (isIOS) {
      document.documentElement.classList.add("is-ios");
      ScrollTrigger.defaults({
        preventOverlaps: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          if (!self.isActive) return;
          window.requestAnimationFrame(() => {});
        },
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Pin image animation (only runs once when container is ready)
  useGSAP(() => {
    if (!imageRef.current || !container.current) return;

    ScrollTrigger.create({
      trigger: container.current,
      start: "top 120px",
      end: "bottom bottom",
      pin: imageRef.current,
      pinSpacing: false,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    });
  }, [container]);

  // Reasons animation (runs when reasons change)
  useGSAP(() => {
    if (!reasonsWrapper.current || reasons.length === 0) return;

    // Clear existing reason animations first
    const existingTriggers = ScrollTrigger.getAll().filter(
      (trigger) =>
        trigger.vars.trigger &&
        trigger.vars.trigger instanceof Element &&
        trigger.vars.trigger.classList.contains("reason")
    );
    existingTriggers.forEach((trigger) => trigger.kill());

    // Simple fade in animation for reasons
    const reasonElements = reasonsWrapper.current.querySelectorAll(".reason");
    reasonElements.forEach((reason) => {
      gsap.to(reason, {
        opacity: 1,
        y: 0,
        x: 0,
        scrollTrigger: {
          trigger: reason,
          scrub: 0.3,
          start: "top 100%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Refresh ScrollTrigger after adding new animations
    ScrollTrigger.refresh();
  }, [reasons]);

  return (
    <section className={twMerge("overflow-hidden relative", classes)}>
      <div className="container">
        <div className="title text-center font-extralight mb-28">
          <h1 className="mb-3 text-4xl">
            Why Choose <b>Beez Production?</b>
          </h1>
          <p className="w-full md:w-[800px] m-auto">
            {pageContent?.home?.why_choose_beez_production}
          </p>
        </div>
        <div
          className="content flex justify-between gap-12 relative"
          ref={container}
        >
          <div
            className="reasons flex-1 pt-24 pb-24 relative z-10"
            ref={reasonsWrapper}
          >
            {reasons?.map((reason, i: number) => {
              return (
                <div
                  className="reason flex relative gap-5 min-h-[300px] mb-8 opacity-0 translate-y-[200px]"
                  key={i}
                >
                  <div className="icon hidden md:inline-block flex-shrink-0">
                    <ReasonIcon />
                  </div>
                  <div className="title-desc relative flex-1">
                    <div className="reason-number font-extralight absolute top-[-60%] left-0 w-full h-full text-[220px] opacity-10 pointer-events-none">
                      <span className="relative z-[1]">{"0" + (i + 1)}</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold relative z-[2]">
                      {reason.title}
                    </h1>
                    <p className="text-lg font-light relative z-[2]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="image w-[45%] hidden lg:block rounded-bl-[100px] overflow-hidden shadow-lg relative"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              height: "calc(100vh - 240px)",
              position: "relative",
            }}
            ref={imageRef}
          >
            <Image
              src={"/home/reasons/1.png"}
              width={1000}
              height={1000}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
