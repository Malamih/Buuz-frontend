import { WhyUs } from "../components/WhyUs";
import { AboutSection } from "./components/About";
import { Hero } from "./components/Hero";
import { VisionAndValue } from "./components/Vision&Value";

const About = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <VisionAndValue />
      <WhyUs classes="text-background bg-onBackground" />
    </>
  );
};

export default About;
