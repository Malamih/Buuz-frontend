"use client";
import { useGetProjects } from "@/services/projects";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { timeAgo } from "@/lib/date";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, Play, PlayIcon } from "lucide-react";
import styles from "../styles/Portfolio.module.scss";
import { twMerge } from "tailwind-merge";
import ArrowTopRight from "@/assets/icons/arrow-top-right.svg";
import Link from "next/link";

export const PortfolioProjects = () => {
  const container = useRef<HTMLDivElement>(null);
  const { data, isFetching, error } = useGetProjects({});
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <section className="bg-background text-onBackground" ref={container}>
      {isFetching &&
        Array.from({ length: 4 }).map((_, i: number) => {
          return (
            <div
              className="project relative py-36 bg-[#0B0B0B] text-white opacity-0 translate-y-12"
              key={i}
            >
              <div className="bg absolute top-0 left-0 w-full h-full z-[0]">
                <Skeleton className="w-full h-full bg-gray-400" />
              </div>
              <div className="container relative z-[2]">
                <Skeleton className="h-10 md:h-14 w-3/4 mb-12 bg-gray-400" />
                <div className="others flex items-center gap-4 md:gap-12">
                  <div className="label-value">
                    <Skeleton className="h-4 md:h-6 w-16 mb-2 bg-gray-400" />
                    <Skeleton className="h-4 md:h-6 w-24 bg-gray-400" />
                  </div>
                  <div className="label-value">
                    <Skeleton className="h-4 md:h-6 w-16 mb-2 bg-gray-400" />
                    <Skeleton className="h-4 md:h-6 w-32 bg-gray-400" />
                  </div>
                  <div className="label-value">
                    <Skeleton className="h-4 md:h-6 w-16 mb-2 bg-gray-400" />
                    <Skeleton className="h-4 md:h-6 w-20 bg-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {!isFetching &&
        data?.payload?.slice(0, 4).map((project, i: number) => {
          return (
            <Link href={`/portfolio/${project._id}`} key={i}>
              <div
                className={twMerge(
                  "project overflow-hidden relative py-36 bg-[#0B0B0B] text-white cursor-pointer",
                  styles.project
                )}
              >
                <div className="bg absolute top-0 left-0 w-full h-full z-[0]">
                  <Image
                    src={project.thumbnail}
                    alt="background"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="layer absolute top-0 left-0 w-full h-full z-[1] text-[#1f1f1fe2]"
                    style={{
                      background:
                        "linear-gradient(to bottom, #1f1f1fe2, transparent)",
                    }}
                  ></div>
                </div>
                <div
                  className={twMerge(
                    "playButton cursor-pointer transition duration-200 ease-out select-none absolute top-12 right-12 overflow-hidden z-[3] w-[70px] h-[70px] rounded-full text-black hover:text-white flex items-center justify-center",
                    styles.playButton
                  )}
                >
                  <div
                    className={twMerge(
                      "layer absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition duration-150 ease-out rounded-full bg-black pointer-events-none z-0",
                      styles.layer
                    )}
                  ></div>
                  <ArrowTopRight
                    className={twMerge(
                      "relative z-[1] scale-[1.2]",
                      styles.icon
                    )}
                  />
                </div>
                <div
                  className={twMerge(
                    "playButton cursor-pointer transition duration-200 ease-out select-none absolute bottom-0 opacity-0 right-2/4 bg-white overflow-hidden z-[3] w-[70px] h-[70px] rounded-full text-black hover:text-white flex items-center justify-center",
                    styles.mainPlayButton
                  )}
                >
                  <div
                    className={twMerge(
                      "layer absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition duration-150 ease-out rounded-full bg-darkPrimary pointer-events-none z-0",
                      styles.mainLayer
                    )}
                  ></div>
                  <PlayIcon
                    className={twMerge(
                      "relative z-[1] scale-[1.2]",
                      styles.mainIcon
                    )}
                  />
                </div>
                <div
                  className={twMerge(
                    "container relative z-[2]",
                    styles.container
                  )}
                >
                  <h1 className="text-2xl md:text-5xl font-bold mb-12">
                    {project.title}
                  </h1>
                  <div className="others flex items-center gap-4 md:gap-14">
                    <div className="label-value flex-[1] max-w-[300px] text-xs md:text-lg">
                      <h1 className="font-bold">DATE</h1>
                      <p className="font-light capitalize">
                        {timeAgo(project.created_time)}
                      </p>
                    </div>
                    <div className="label-value flex-[1] max-w-[300px] text-xs md:text-lg">
                      <h1 className="font-bold">CLIENT</h1>
                      <p className="font-light">{project.client}</p>
                    </div>
                    <div className="label-value flex-[1] max-w-[300px] text-xs md:text-lg">
                      <h1 className="font-bold">TYPE</h1>
                      <p className="font-light">{project.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </section>
  );
};
