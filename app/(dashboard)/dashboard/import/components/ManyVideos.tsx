import { formatShortDateTime } from "@/lib/date";
import Image from "next/image";
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
import { Project, ProjectResponse, useUploadProject } from "@/services/vimeo";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { extractId } from "@/helpers/vimeo";
import { PlusIcon } from "lucide-react";

export const ManyVideos = ({ videos, ...props }: { videos: any[] }) => {
  const [newProjects, setNewProjects] = useState([] as Project[]);
  const inputs = [
    {
      name: "description",
      placeholder: "Project description...",
      id: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "client",
      placeholder: "Project client...",
      id: "client",
      label: "Client",
      type: "input",
    },
    {
      name: "type",
      placeholder: "Project type...",
      id: "type",
      label: "Type",
      type: "input",
    },
  ];

  const dialogRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const setDialogRef =
    (projectId: string) => (el: HTMLButtonElement | null) => {
      if (el) {
        dialogRefs.current.set(projectId, el);
      } else {
        dialogRefs.current.delete(projectId);
      }
    };

  const success = (response: ProjectResponse) => {
    const dialogRef = dialogRefs.current.get(response.project.video_uri);
    const projects = [...newProjects];
    projects.push(response.project);
    setNewProjects(projects);
    if (dialogRef) {
      dialogRef.click();
    }
    toast.success(response.message);
  };

  const handleError = (errors: string[]) => {
    errors.forEach((error) => {
      toast.error(error);
    });
  };

  const { mutate, isPending, error } = useUploadProject(success, handleError);

  const create = (e: any, videoData: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const projectData = {
      client: form.get("client"),
      description: form.get("description"),
      type: form.get("type"),
      created_time: videoData.created_time,
      thumbnail: videoData.pictures.base_link,
      title: videoData.name,
      video: videoData.link,
      video_uri: videoData.uri,
      project_id: videoData.uri.split("/")[2],
    };
    mutate(projectData);
  };

  if (error) {
    toast.error(error.message);
  }
  return (
    <div {...props}>
      <ul className="flex flex-col gap-2">
        {videos?.map((project: any, i: number) => {
          return (
            <li
              className="project bg-white flex items-center justify-between pr-4 px-2 py-4"
              key={i}
            >
              <div className="thumbnail-content flex gap-2">
                <Image
                  src={project.pictures.base_link}
                  alt="thumbnail"
                  width={200}
                  height={100}
                  className="rounded-tr-4xl rounded-bl-4xl"
                />
                <div className="content flex flex-col justify-between pb-2">
                  <h1 className="font-bold">{project.name}</h1>
                  <p className="font-light">
                    {formatShortDateTime(project.created_time)}
                  </p>
                </div>
              </div>
              <div className="options">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="add-project flex items-center p-0 rounded-sm cursor-pointer hover:bg-primary justify-center bg-darkPrimary"
                      ref={setDialogRef(project.uri)}
                      disabled={
                        newProjects.filter((p) => p.video_uri == project.uri)
                          .length > 0
                      }
                    >
                      <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[767px] bg-white">
                    <form onSubmit={(e) => create(e, project)}>
                      <DialogHeader className="pb-4">
                        <DialogTitle>Add to projects</DialogTitle>
                        <DialogDescription className="font-light">
                          Add this project to your projects list, the video,
                          title, and thumbnail will be automaticlly uploaded.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-5">
                        {inputs.map((input, i: number) => {
                          return input.type == "textarea" ? (
                            <div className="grid gap-2" key={i}>
                              <Label
                                htmlFor={input.name}
                                className="text-right"
                              >
                                {input.label}
                              </Label>
                              <textarea
                                id={input.name}
                                placeholder={input.placeholder}
                                className="text-sm w-full p-2 font-light h-[100px] max-h-[200px] min-h-[50px] resize-y shadow-xs border border-gray-200"
                                name={input.name}
                              />
                            </div>
                          ) : (
                            <div className="grid gap-2" key={i}>
                              <Label htmlFor={input.id} className="text-right">
                                {input.label}
                              </Label>
                              <Input
                                id={input.id}
                                placeholder={input.placeholder}
                                className="text-sm font-light"
                                name={input.name}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <DialogFooter className="pt-4">
                        <Button
                          type="submit"
                          className="w-full cursor-pointer"
                          disabled={isPending}
                        >
                          {isPending ? "Adding..." : "Add"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
