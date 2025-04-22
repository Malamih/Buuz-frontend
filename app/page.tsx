import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { PortfolioProjects } from "./components/PortfolioProjects";
import { Services } from "./components/Services";
import { Value } from "./components/Value";
import { Vision } from "./components/Vision";
import { WhyUs } from "./components/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Vision />
      <Value />
      <Services classes="bg-background text-onBackground" />
      <WhyUs classes="bg-background text-onBackground" />
      <Portfolio />
      <PortfolioProjects />
    </>
  );
}
