"use client";
import { useEffect, useRef } from "react";
import { Projects } from "./Projects";
import gsap from "gsap";
import { useMainStore } from "@/stores/main";

export const About = () => {
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subTitle1 = useRef(null);
  const subTitle2 = useRef(null);
  const textBlock1 = useRef(null);
  const textBlock2 = useRef(null);
  const textBlock3 = useRef(null);
  const { pageContent } = useMainStore((state) => state);
  useEffect(() => {
    if (
      !container.current ||
      !title.current ||
      !subTitle1.current ||
      !subTitle2.current ||
      !textBlock1.current ||
      !textBlock2.current ||
      !textBlock3.current
    )
      return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 40%",
      },
    });
    tl.to(title.current, {
      y: 0,
      x: 0,
      opacity: 1,
    });
    tl.to(
      subTitle1.current,
      {
        y: 0,
        x: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      subTitle2.current,
      {
        y: 0,
        x: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      textBlock1.current,
      {
        y: 0,
        x: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      textBlock2.current,
      {
        y: 0,
        x: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      textBlock3.current,
      {
        y: 0,
        x: 0,
        opacity: 1,
      },
      "<"
    );
  }, []);
  return (
    <>
      <section className="about pt-14 bg-gray-100" ref={container}>
        <div className="container  mb-14 flex flex-col md:flex-row gap-12 justify-between">
          <div className="main w-full max-w-[600px] font-light overflow-hidden">
            <h1
              className="font-bold text-5xl md:text-6xl md:text-left lg:text-8xl mb-12 text-center -translate-x-[100%] opacity-0"
              ref={title}
            >
              About Us
            </h1>
            <div className="content text-xl">
              <h2
                className="font-bold mb-8 translate-y-12 opacity-0"
                ref={subTitle1}
              >
                Who We Are
              </h2>
              <p
                className="text-justify -translate-x-24 opacity-0"
                ref={textBlock1}
              >
                {pageContent?.home?.who_are_we}
              </p>
            </div>
          </div>
          <div className="mission text-xl font-light w-full max-w-[700px]">
            <p className="mb-16 -translate-x-24 opacity-0" ref={textBlock2}>
              {pageContent?.home?.about_us}
            </p>
            <div className="content">
              <h2
                className="font-bold mb-12 translate-y-12 opacity-0"
                ref={subTitle2}
              >
                Our Mission
              </h2>
              <p ref={textBlock3} className="-translate-x-24 opacity-0">
                {pageContent?.home?.our_mission}
              </p>
            </div>
          </div>
        </div>
        <Projects />
      </section>
    </>
  );
};
