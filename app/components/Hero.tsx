import Image from "next/image";
import PlayIcon from "@/assets/icons/play.svg";

export const Hero = () => {
  return (
    <>
      <div className="hero" style={{ height: "calc(100vh - 100px)" }}>
        <div className="bg absolute top-0 left-0 w-full h-full z-[0] pointer-events-none">
          <Image
            src={"/home/heroBg.png"}
            alt="hero image"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container h-full">
          <div className="playIcon absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 cursor-pointer z-20">
            <PlayIcon />
          </div>
          <div className="content relative z-10 h-full flex items-end text-white">
            <h1 className="font-extralight text-center text-3xl mb-24 md:text-left md:mb-10">
              Welcome to <b>Beez Production</b> <br /> The <b>Buzz</b> That You{" "}
              <b>Need</b>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
