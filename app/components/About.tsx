import { Projects } from "./Projects";

export const About = () => {
  return (
    <>
      <section className="about pt-14 bg-gray-100">
        <div className="container  mb-14 flex flex-col md:flex-row gap-12 justify-between">
          <div className="main w-full max-w-[600px] font-light">
            <h1 className="font-bold text-5xl md:text-6xl md:text-left lg:text-8xl mb-12 text-center">
              About Us
            </h1>
            <div className="content text-xl">
              <h2 className="font-bold mb-8">Who We Are</h2>
              <p className="text-justify">
                Beez Production is an Iraqi video production and marketing
                agency dedicated to redefining creativity and storytelling in
                the world of advertising. Specializing in high-quality TV
                commercials and imaginative creative concepts, we transform
                ordinary ideas into extraordinary visuals that leave lasting
                impressions
              </p>
            </div>
          </div>
          <div className="mission text-xl font-light w-full max-w-[700px]">
            <p className="mb-16">
              We are your creative powerhouse, here to turn your ideas into
              visual masterpieces. Whether it’s engaging TV commercials or
              innovative creative concepts, we bring your vision to life with
              creativity, passion, and professionalism. Let’s create the buzz
              your brand deserves!
            </p>
            <div className="content">
              <h2 className="font-bold mb-12">Our Mission</h2>
              <p>
                To elevate Iraqi TV commercials to new levels of creativity and
                directing. We believe every brand has a story to tell, and our
                job is to make sure your audience not only hears it but feels
                it.
              </p>
            </div>
          </div>
        </div>
        <Projects />
      </section>
    </>
  );
};
