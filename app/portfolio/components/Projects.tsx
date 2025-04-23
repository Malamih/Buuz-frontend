import { Project } from "./Project";

export const Projects = () => {
  const projects = [
    {
      title: "Mirmaz Academy TVC | مرماز تحلها",
      background: "/projects/1.png",
      link: "",
    },
    {
      title: "TCL | Video Commercial | هيج لو هيج",
      background: "/projects/2.png",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/projects/3.png",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/projects/3.png",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/projects/4.png",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/projects/3.png",
      link: "",
    },
    {
      title: "Mirmaz Academy TVC | مرماز تحلها",
      background: "/projects/1.png",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/projects/4.png",
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
      <div className="container flex flex-wrap items-center justify-center lg:justify-start gap-12">
        {projectsEl}
      </div>
    </section>
  );
};
