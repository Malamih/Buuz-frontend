import { Project } from "./Project";

export const Projects = () => {
  const projects = [
    {
      title: "Mirmaz Academy TVC | مرماز تحلها",
      background: "/projects/1.png",
      date: "FEB 24, 2024",
      client: "MIRMAZ ACADEMY",
      type: "COMMERCIAL",
      link: "",
    },
    {
      title: "TCL | Video Commercial | هيج لو هيج",
      background: "/projects/2.png",
      date: "FEB 24, 2024",
      client: "TCL",
      type: "COMMERCIAL",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/projects/3.png",
      date: "FEB 24, 2024",
      client: "ROMA",
      type: "COMMERCIAL",
      link: "",
    },
  ];

  const projectsEl = projects.map((project, i: number) => {
    return (
      <Project title={project.title} key={i} thumbnail={project.background} />
    );
  });

  return (
    <section className="projects">
      <div className="container flex flex-wrap items-center justify-center lg:justify-between gap-12">
        {projectsEl}
      </div>
    </section>
  );
};
