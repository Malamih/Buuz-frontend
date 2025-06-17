"use client";
import ImportIcon from "@/assets/icons/import.svg";
import { formatShortDateTime } from "@/lib/date";
import { useDeleteProject, useGetProjects } from "@/services/projects";
import Image from "next/image";
import Link from "next/link";
import ClientIcon from "@/assets/icons/client-icon.svg";
import TypeIcon from "@/assets/icons/type-icon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OptionsIcon from "@/assets/icons/options.svg";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { Project } from "@/services/vimeo";
import { Edit } from "./Edit";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Content = () => {
  const [type, setType] = useState("");

  const { data, isFetching, error, refetch }: any = useGetProjects({
    ...(type == "all" ? {} : { type }),
  });

  const success = (message: string) => {
    toast.success(message);
    refetch();
  };
  const { mutate, isPending, error: deleteError } = useDeleteProject(success);

  const deleteProject = (id: string) => {
    mutate(id);
  };
  useEffect(() => {
    if (error || deleteError) {
      toast.error(error?.message || deleteError?.message);
    }
  }, [error, deleteError]);
  return (
    <div className="content" style={{ gridArea: "content" }}>
      <div className="header flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Total Projects: {data?.payload?.length}
        </h1>
        <div className="options flex items-center gap-4">
          <Select onValueChange={setType}>
            <SelectTrigger className="rounded-sm">
              <SelectValue placeholder="Filter By Project Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="films">Films</SelectItem>
              <SelectItem value="short-films">Short Films</SelectItem>
              <SelectItem value="series">Series</SelectItem>
              <SelectItem value="tv-programs">TV Programs</SelectItem>
              <SelectItem value="video-clip">Video Clip</SelectItem>
              <SelectItem value="sketch">Sketch</SelectItem>
            </SelectContent>
          </Select>
          <Link href={"/dashboard/import"}>
            <div className="importProjects py-[.4rem] px-3 rounded-sm cursor-pointer hover:bg-primary transition duration-200 bg-darkPrimary">
              <ImportIcon />
            </div>
          </Link>
        </div>
      </div>
      <div className="projects mt-4 grid gap-2">
        {data?.payload && data.payload.length < 1 && (
          <h1 className="text-center text-xl text-gray-400">No Projects</h1>
        )}
        {data?.payload.map((project: Project, i: number) => {
          return (
            <div
              className="project flex justify-between bg-white py-2 px-4 rounded-lg border border-gray-200"
              key={i}
            >
              <div className="thumb-content flex gap-4">
                <div className="thumbnail flex items-center">
                  <Image
                    src={project.thumbnail}
                    alt="thumbnail"
                    width={250}
                    height={150}
                    onError={(err) => console.log(err)}
                    className="min-w-[250px] rounded-tr-4xl rounded-bl-4xl"
                  />
                </div>
                <div className="content flex flex-col gap-2">
                  <div className="title flex items-center gap-1">
                    <h1 className="font-bold">{project.title}</h1>
                    <span>|</span>
                    <span className="font-light text-sm">
                      {formatShortDateTime(project.created_time)}
                    </span>
                  </div>
                  <div className="desc-items flex-col flex gap-2 flex-1">
                    <p className="font-light text-sm leading-tight w-full max-w-[800px] flex-1">
                      {project.description}
                    </p>
                    <div className="client-type flex items-center gap-4 mt-4">
                      <div className="label-value flex items-center gap-2 text-sm">
                        <ClientIcon />
                        <span>{project.client}</span>
                      </div>{" "}
                      <div className="label-value flex items-center gap-2 text-sm">
                        <TypeIcon />
                        <span>{project.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="options">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition duration-200">
                      <OptionsIcon />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-12">
                    <DropdownMenuItem asChild>
                      <Edit project={project} refetch={refetch} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteProject(project._id)}
                      className="hover:bg-gray-100 cursor-pointer duration-100 transition"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
