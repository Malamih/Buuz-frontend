import { ScrollTrigger } from "gsap/ScrollTrigger";
import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { PortfolioProjects } from "./components/PortfolioProjects";
import { Services } from "./components/Services";
import { ValueEl } from "./components/Value";
import { Vision } from "./components/Vision";
import { WhyUs } from "./components/WhyUs";

export default function Home() {
  return (
    <div className="home bg-black">
      <Hero />
      <About />
      <Vision />
      <ValueEl />
      <Services classes="bg-[#0B0B0B] text-white" title={true} />
      <WhyUs classes="bg-[#0B0B0B] text-white" />
      <Portfolio />
      <PortfolioProjects />
    </div>
  );
}
