"use client";
import Image from "next/image";
import styles from "../styles/about.module.scss";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const firstCard = useRef<HTMLDivElement>(null);
  const secondCard = useRef<HTMLDivElement>(null);
  const thirdCard = useRef<HTMLDivElement>(null);
  const lastCard = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !firstCard.current ||
      !secondCard.current ||
      !thirdCard.current ||
      !lastCard.current ||
      !container.current
    )
      return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: 1,
        end: "top 10%",
        start: "bottom bottom",
      },
    });
    tl.to(firstCard.current, {
      x: 0,
      y: 0,
      opacity: 1,
    });
    tl.to(
      secondCard.current,
      {
        x: 0,
        y: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      thirdCard.current,
      {
        x: 0,
        y: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      lastCard.current,
      {
        x: 0,
        y: 0,
        opacity: 1,
      },
      "<"
    );
  }, []);
  return (
    <section className={twMerge("about overflow-hidden", styles.about)}>
      <div className="container" ref={container}>
        <div className={styles.cards}>
          <div
            className={twMerge(
              "overflow-hidden -translate-x-[400px] opacity-0",
              styles.card,
              styles.card1
            )}
            ref={firstCard}
          >
            <Image
              src={"/about/card-1.png"}
              alt="background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div
            className={twMerge(
              "-translate-y-[200px] opacity-0",
              styles.card,
              styles.card2
            )}
            ref={secondCard}
          >
            <Image
              src={"/about/card-2.png"}
              alt="background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div
            className={twMerge(
              "text-center px-2 py-14 bg-[#0B0B0B] text-white translate-y-[200px] opacity-0",
              styles.card,
              styles.card3
            )}
            ref={thirdCard}
          >
            <h1 className="font-bold text-3xl mb-4 lg:text-5xl">25+</h1>
            <p className="uppercase font-light text-lg lg:text-xl">
              Years Of Experiance
            </p>
          </div>
          <div
            className={twMerge(
              "bg-gray-300 py-10 px-8 translate-x-[300px] opacity-0",
              styles.card,
              styles.card4
            )}
            ref={lastCard}
          >
            <h2 className="uppercase mb-12 text-sm sm:text-lg font-medium">
              Who We Are
            </h2>
            <h1 className="font-bold text-4xl sm:text-5xl mb-12">
              Beez Production is an Iraqi video production
            </h1>
            <p className="font-light text-lg sm:text-xl text-justify">
              dedicated to redefining creativity and storytelling in the world
              of advertising. Specializing in high-quality TV commercials and
              imaginative creative concepts, we transform ordinary ideas into
              extraordinary visuals that leave lasting impressions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
