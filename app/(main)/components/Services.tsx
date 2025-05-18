"use client";
import { Service } from "./Service";
import VideoClipIcon from "@/assets/icons/video-clip.svg";
import TvIcon from "@/assets/icons/tv.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import LaudIcon from "@/assets/icons/loud.svg";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Services = ({
  classes,
  title,
}: {
  classes?: string;
  title?: boolean;
}) => {
  const titleEl = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleEl.current || !desc.current || !container.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        end: "top 0%",
      },
    });
    const titleSpans = titleEl.current.querySelectorAll("span");
    if (titleSpans) {
      tl.to(titleSpans, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
      });
      tl.to(titleEl.current, {
        opacity: 1,
        y: 0,
      });
      tl.to(desc.current, {
        opacity: 1,
        y: 0,
      });
    }
  }, []);

  return (
    <section className={twMerge("services py-16", classes)} ref={container}>
      <div className="container">
        {title ? (
          <div className="title mb-20 text-center font-extralight text-xl">
            <h1
              className="font-extralight mb-4 text-4xl [&_span]:opacity-0 [&_span]:translate-y-12 [&_span]:inline-block translate-y-16"
              ref={titleEl}
            >
              <span>Our</span>{" "}
              <b>
                <span>Services</span>
              </b>
            </h1>
            <p
              className="w-full max-w-[700px] m-auto translate-y-16 opacity-0"
              ref={desc}
            >
              At Beez Production, we offer a full range of services designed to
              amplify your brand’s presence
            </p>
          </div>
        ) : null}
        <div
          className={twMerge(
            "services flex justify-between flex-wrap gap-12",
            classes
          )}
        >
          <Service
            icon={<VideoClipIcon />}
            title="Video Production"
            desc="From concept creation to final edits, we deliver cinematic visuals that tell your brand’s story powerfully and effectively"
          />
          <Service
            icon={<TvIcon />}
            title="TV Commercials"
            desc="We specialize in creating commercials that grab attention and leave a powerful impression. Whether it’s humorous, dramatic, or action-packed, we deliver it with precision"
          />
          <Service
            icon={<PencilIcon />}
            title="Creative Concepts"
            desc="Looking for something unique? Our creative team develops fresh, out-of-the-box ideas that resonate with your audience and leave them wanting more"
          />
          <Service
            icon={<LaudIcon />}
            title="Marketing Campaigns"
            desc="From branding videos to promotional reels, we craft campaigns that effectively showcase your products and services to the right audience"
          />
        </div>
      </div>
    </section>
  );
};
