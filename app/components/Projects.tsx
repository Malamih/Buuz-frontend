import { Project } from "./Project";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

export const Projects = () => {
  return (
    <div className="container">
      <div className="projects flex overflow-hidden gap-4">
        <Project thumbnail="/projects/1.png" title="Vimeo" />
        <Project thumbnail="/projects/2.png" title="Vimeo" />
        <Project thumbnail="/projects/3.png" title="Vimeo" />
        <Project thumbnail="/projects/4.png" title="Vimeo" />
      </div>
      <div className="controllers flex items-center gap-4 mt-8">
        <ArrowLeft className="cursor-pointer" />
        <ArrowRight className="cursor-pointer" />
      </div>
    </div>
  );
};
