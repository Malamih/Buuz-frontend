"use client";
import gsap from "gsap";
import { PauseIcon, PlayIcon, PlaySquareIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const title = useRef<HTMLHeadingElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!title.current) return;
    const firstSpans = title.current.querySelectorAll(".first");
    const secondSpans = title.current.querySelectorAll(".second");
    const tl = gsap.timeline();
    if (firstSpans && secondSpans) {
      tl.to(firstSpans, {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
      });
      tl.to(secondSpans, {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
        delay: 0.3,
      });
    }
  }, []);
  return (
    <>
      <div className="hero relative h-[calc(86vh-200px)] md:h-[calc(100vh-90px)] bg-black overflow-hidden">
        <div className="bg absolute top-0 left-0 w-full h-full z-[0] pointer-events-none">
          <video
            src={"/bg-video.mp4"}
            playsInline
            autoPlay
            className="w-full h-full object-cover opacity-50"
            muted
            ref={videoRef}
            loop
          />
        </div>
        <div className="container h-full hover:[&_button]:opacity-100">
          <div
            className="playIcon absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 cursor-pointer z-20 "
            onClick={togglePlay}
          >
            <button className="cursor-pointer opacity-0 transition duration-200">
              {isPlaying ? (
                <PauseIcon className="scale-[3] text-white" />
              ) : (
                <PlayIcon className="scale-[3] text-white" />
              )}
            </button>
          </div>
          <div className="content relative z-10 h-full flex items-end text-white">
            <h1
              className="font-extralight text-center text-3xl w-full md:text-left md:mb-10 [&_span]:opacity-0 [&_span]:translate-y-12 [&_span]:inline-block overflow-hidden"
              ref={title}
            >
              <span className="first">Welcome</span>{" "}
              <span className="first">to</span>{" "}
              <b>
                <span className="second">Beez</span>{" "}
                <span className="second">Production</span>
              </b>{" "}
              <br /> <span className="first">The</span>{" "}
              <b>
                <span className="first">Buzz</span>
              </b>{" "}
              <span className="second">That</span>{" "}
              <span className="second">You</span>{" "}
              <b>
                <span className="second">Need</span>
              </b>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
