"use client";
import { useGetProjects } from "@/services/projects";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ProjectSkeleton } from "./ProjectSkeleton";

export const Projects = () => {
  const { id } = useParams();
  const { data, isFetching, error, refetch } = useGetProjects();
  useEffect(() => {
    if (!data?.payload && !error) {
      refetch();
    }
  }, [data]);
  return (
    <section className="projects">
      <div className="container gap-8 grid grid-cols-[repeat(auto-fill,minmax(100%,1fr))] md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
        {isFetching &&
          Array.from({ length: 12 }).map((_, i: number) => {
            return <ProjectSkeleton key={i} />;
          })}
        {!isFetching &&
          data?.payload?.map((project, i: number) => {
            return (
              <Link href={`/portfolio/${project._id}`} key={i}>
                <div
                  className="project w-full max-h-[300px] flex flex-col gap-4 cursor-pointer hover:[&_img]:opacity-70 transition duration-100 hover:[&_button]:scale-100"
                  key={i}
                >
                  <div className="thumbnail relative w-full rounded-[25px] overflow-hidden">
                    <button className="absolute z-10 scale-0 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full text-black hover:bg-darkPrimary hover:text-white cursor-pointer transition duration-200">
                      <PlayIcon />
                    </button>
                    <Image
                      src={project.thumbnail}
                      alt="thumbnail"
                      width={415}
                      height={226}
                      className="w-full h-[226px] object-cover transition duration-100"
                    />
                  </div>
                  <h1 className="text-center text-xl">{project.title}</h1>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};
