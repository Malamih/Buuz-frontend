import { WhyUs } from "../components/WhyUs";
import { AboutSection } from "./components/About";
import { DubaiOffice } from "./components/DubaiOffice";
import { Hero } from "./components/Hero";
import { Team } from "./components/Team";
import { VisionAndValue } from "./components/Vision&Value";

const About = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <VisionAndValue />
      <Team />
      <DubaiOffice />
      <WhyUs classes="text-[#0B0B0B] bg-white" />
    </>
  );
};

export default About;
