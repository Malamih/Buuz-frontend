import Image from "next/image";
import styles from "@/app/styles/Project.module.scss";
import { twMerge } from "tailwind-merge";

type props = {
  title: string;
  thumbnail: string;
  video?: string;
};

export const Project = ({ title, thumbnail, video }: props) => {
  return (
    <div
      className={twMerge(
        styles.project,
        "project relative overflow-hidden w-[430px] min-w-[430px] h-[261px]"
      )}
    >
      <div className="thumbnail absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={thumbnail}
          alt="project thumbnail"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={twMerge(
          "conten relative z-[1] opacity-0 flex items-center justify-center h-full text-white",
          styles.content
        )}
        style={{ background: "rgba(0,0,0,.5)" }}
      >
        <h1 className="text-3xl">{title}</h1>
      </div>
    </div>
  );
};
