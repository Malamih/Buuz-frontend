import { Project } from "./PortfolioProject";

export const PortfolioProjects = () => {
  const portfolioProjects = [
    {
      title: "Mirmaz Academy TVC | مرماز تحلها",
      background: "/home/portfolioBg.png",
      date: "FEB 24, 2024",
      client: "MIRMAZ ACADEMY",
      type: "COMMERCIAL",
      link: "",
    },
    {
      title: "TCL | Video Commercial | هيج لو هيج",
      background: "/home/portfolioBg.png",
      date: "FEB 24, 2024",
      client: "TCL",
      type: "COMMERCIAL",
      link: "",
    },
    {
      title: "ROMA TVC | ALL ROADS LEADS TO GOLD",
      background: "/home/portfolioBg.png",
      date: "FEB 24, 2024",
      client: "ROMA",
      type: "COMMERCIAL",
      link: "",
    },
  ];

  const portfolioProjectsEl = portfolioProjects.map((project, i: number) => {
    return (
      <Project
        key={i}
        background={project.background}
        client={project.client}
        date={project.date}
        link={project.link}
        title={project.title}
        type={project.type}
      />
    );
  });
  return (
    <section className="bg-background text-onBackground">
      {portfolioProjectsEl}
    </section>
  );
};
