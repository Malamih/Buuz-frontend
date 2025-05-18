"use client";
import Image from "next/image";
import styles from "../styles/visionAndValues.module.scss";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";

export const VisionAndValue = () => {
  const mainCard = useRef<HTMLDivElement>(null);
  const firstCard = useRef<HTMLDivElement>(null);
  const secondCard = useRef<HTMLDivElement>(null);
  const thirdCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainCard.current || !firstCard.current || !secondCard.current) return;
    gsap.to(mainCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: mainCard.current,
        scrub: 1,
        end: "top center",
      },
    });
    gsap.to(firstCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: firstCard.current,
        scrub: 1,
        end: "top center",
      },
    });
    gsap.to(secondCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: secondCard.current,
        scrub: 1,
        end: "top center",
      },
    });
    gsap.to(thirdCard.current, {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: thirdCard.current,
        scrub: 1,
        end: "top center",
      },
    });
  }, []);
  const cards = [
    {
      title: "The Buzz That You Need",
      desc: "",
      list: [],
      areaId: "main",
      ref: mainCard,
    },
    {
      title: "Our Mission",
      desc: "To elevate Iraqi TV commercials to new levels of creativity and directing. We believe every brand has a story to tell, and our job is to make sure your audience not only hears it but feels it",
      areaId: "mission",
      list: [],
      ref: firstCard,
    },
    {
      title: "Our Vision",
      desc: "We aim to be the most innovative and influential video production company in Iraq, known for our cutting-edge creativity and high-quality content. Our goal is to create commercials that go beyond promotion and become memorable experiences",
      areaId: "vision",
      list: [],
      ref: secondCard,
    },
    {
      title: "Our Values",
      desc: "",
      ref: thirdCard,
      list: [
        {
          title: "Creativity",
          desc: "We push boundaries to craft original ideas that make your brand stand out.",
        },
        {
          title: "Quality",
          desc: " Excellence in every detail, from scripting to post-production.",
        },
        {
          title: "Collaboration",
          desc: "Your vision matters, and we make it our priority.",
        },
        {
          title: "Innovation",
          desc: "Continuously evolving to stay ahead of industry trends.",
        },
        {
          title: "Integrity",
          desc: "Building lasting relationships based on trust and transparency.",
        },
      ],
      areaId: "values",
    },
  ];
  const cardsEl = cards.map((card, i: number) => {
    return (
      <div
        className={clsx(
          "card relative overflow-hidden py-6 px-8 bg-[#0B0B0B] text-onBackground rounded-2xl text-xl",
          styles.card,
          styles[card.areaId],
          {
            "-translate-x-[300px] opacity-0": card.areaId != "main",
            "translate-x-[300px] opacity-0": card.areaId == "main",
          }
        )}
        key={i}
        ref={card.ref}
      >
        {card.areaId != "main" ? (
          <>
            <h1 className="font-bold mb-6 text-black py-3 px-4 bg-white w-fit rounded-xl">
              {card.title}
            </h1>
            <p className="font-light">{card.desc}</p>
            <ul className="values flex flex-col gap-4">
              {card.list.map((item, i: number) => {
                return (
                  <li key={i} className="font-light">
                    <b>{item.title}:</b> {item.desc}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <h1 className="text-5xl text-right w-full xl:w-[400px] ml-0 md:ml-auto z-[1] relative font-bold">
              {card.title}
            </h1>
            <Image
              src={"/about/mainCardBg.png"}
              alt="background"
              width={1000}
              height={1000}
              className="w-full z-0 h-full absolute top-0 left-0 object-cover"
            />
          </>
        )}
      </div>
    );
  });
  return (
    <section className={twMerge("mission-vision-value", styles.section)}>
      <div className="container">
        <div className={twMerge("cards grid gap-2", styles.cards)}>
          {cardsEl}
        </div>
      </div>
    </section>
  );
};
