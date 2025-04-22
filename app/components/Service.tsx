import ButtonArrow from "@/assets/icons/button-arrow.svg";
import { ReactNode } from "react";
import styles from "../styles/Services.module.scss";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Button";

type props = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export const Service = ({ icon, title, desc }: props) => {
  return (
    <div className="service rounded-2xl pt-28 pb-4 px-4 w-full lg:w-[calc(50%-80px)] flex items-center justify-center gap-2 flex-col text-center border-2 border-[#3131318f]">
      <div className="icon mb-28 w-[200px] h-[200px] flex items-center justify-center relative">
        <div className="spheres w-full h-full absolute top-0 left-0">
          <div
            className={twMerge(
              "w-[calc(90%+72px)] h-[calc(90%+72px)]",
              styles.roundedBorder
            )}
          ></div>
          <div
            className={twMerge(
              "w-[calc(70%+72px)] h-[calc(70%+72px)]",
              styles.roundedBorder
            )}
          ></div>
          <div
            className={twMerge(
              "w-[calc(50%+72px)] h-[calc(50%+72px)]",
              styles.roundedBorder
            )}
          ></div>
        </div>
        {icon}
      </div>
      <div className="title mb-7 flex-1">
        <h1 className="mb-6 font-bold text-3xl">{title}</h1>
        <p className="w-full md:w-[90%] font-extralight leading-snug m-auto">
          {desc}
        </p>
      </div>
      <Button content="Contact us" classes="border-[#696969]" iconClasses="bg-[#2D2D2D]" />
    </div>
  );
};
