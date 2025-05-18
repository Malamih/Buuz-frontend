"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractId } from "@/helpers/vimeo";
import { useEditProject } from "@/services/projects";
import { Project, useFetchVideos } from "@/services/vimeo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Edit = ({
  project,
  refetch,
}: {
  project: Project;
  refetch: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const success = (msg: string) => {
    toast.success(msg);
    setOpen(false);
    refetch();
  };
  const { mutate, isPending, error } = useEditProject(success);
  const [videoIdValue, setVideoIdValue] = useState(project.project_id);
  const {
    data,
    isFetching,
    error: video_error,
  }: any = useFetchVideos(videoId || project.project_id, "single");

  const editProject = (e: any) => {
    const form = new FormData(e.target);
    const projectData = {
      ...(form.get("title") && { title: form.get("title") }),
      ...(form.get("description") && { description: form.get("description") }),
      ...(form.get("client") && { client: form.get("client") }),
      ...(form.get("type") && { type: form.get("type") }),
      ...(data?.link && { video: data?.link }),
      ...(data?.uri && { video_uri: data?.uri }),
      ...(data?.pictures && { thumbnail: data?.pictures.base_link }),
      ...(form.get("created_time") && {
        created_time: form.get("created_time"),
      }),
      ...(form.get("thumbnail") && { thumbnail: form.get("thumbnail") }),
      id: project._id,
    };
    e.preventDefault();
    mutate(projectData);
  };

  useEffect(() => {
    if (error || video_error) {
      toast.error(error?.message || video_error?.error);
    }
  }, [error, video_error]);

  const fetchVideo = () => {
    setVideoId(videoIdValue);
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="hover:bg-gray-100 cursor-pointer duration-100 transition w-full text-left text-sm p-2">
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[767px] bg-white">
        <form onSubmit={(e) => editProject(e)}>
          <DialogHeader className="pb-4">
            <DialogTitle>Edit this project</DialogTitle>
            <DialogDescription className="font-light">
              This edits will effect the projects on the website not the
              original project in vimeo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Project title..."
                className="text-sm font-light"
                name="title"
                defaultValue={project.title}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="Description..."
                className="text-sm w-full p-2 rounded-sm font-light h-[100px] max-h-[200px] min-h-[50px] resize-y shadow-xs border border-gray-200"
                name="description"
                defaultValue={project.description}
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="grid gap-2 w-full">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input
                  id="client"
                  placeholder="Project client..."
                  className="text-sm font-light"
                  name="client"
                  defaultValue={project.client}
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  placeholder="Project type..."
                  className="text-sm font-light"
                  name="type"
                  defaultValue={project.type}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="thumbnail flex gap-2 mt-4 justify-between">
                <div className="input flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="video_id"
                      placeholder="Video id..."
                      className="text-sm font-light w-full"
                      name="video_id"
                      value={videoIdValue}
                      onInput={(e: any) => setVideoIdValue(e.target.value)}
                    />
                    <Button
                      className="cursor-pointer bg-darkPrimary"
                      type="button"
                      onClick={fetchVideo}
                      disabled={
                        isFetching ||
                        videoIdValue == project.project_id ||
                        videoId == extractId(data?.uri)
                      }
                    >
                      {isFetching ? <Loader color="white" /> : "Fetch"}
                    </Button>
                  </div>
                  <Label htmlFor="video_id" className="text-right">
                    Video id
                  </Label>
                  <p className="font-light text-sm">
                    The thumbnail and the video will be taken from this project,
                    You can get the project id from the project url like this:
                    "https://vimeo.com/
                    <span className="px-1 bg-green-100 border border-green-400 rounded-xs">
                      project_id
                    </span>
                    "
                  </p>
                </div>
                <Image
                  src={data?.pictures?.base_link || project.thumbnail}
                  alt="thumbnail"
                  width={300}
                  height={200}
                  className="w-[40%]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full cursor-pointer bg-white border-gray-300 border text-black hover:bg-white"
              disabled={false}
            >
              {isPending ? <Loader content="Editing" /> : "Edit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
