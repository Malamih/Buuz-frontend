"use client";
import { useMainStore } from "@/stores/main";

export const Vision = () => {
  const { pageContent } = useMainStore((state) => state);
  return (
    <section className="vission py-10 bg-white">
      <div className="container">
        <h1 className="mb-12 font-bold text-2xl">Our Vision & Values</h1>
        <div className="image w-full h-[calc(100vh-200px)] relative mb-12 rounded-br-[100px] overflow-hidden">
          <video
            src="/vision-bg.mp4"
            autoPlay
            muted
            className="w-full h-full absolute top-0 left-0 object-cover"
            playsInline
            loop
          ></video>
        </div>
        <p className="font-light text-xl text-center md:text-left">
          {JSON.stringify(pageContent?.home?.our_vision)}
        </p>
      </div>
    </section>
  );
};
