import Image from "next/image";

export const Vision = () => {
  return (
    <section className="vission py-10">
      <div className="container">
        <h1 className="mb-12 font-bold text-2xl">Our Vision & Values</h1>
        <div className="image w-full mb-12">
          <Image
            src={"/home/vision.png"}
            alt="vision image"
            width={1000}
            height={1000}
            className="w-full"
          />
        </div>
        <p className="font-light text-xl text-center md:text-left">
          We aim to be the most innovative and influential video production
          company in Iraq, known for our cutting-edge creativity and
          high-quality content. Our goal is to create commercials that go beyond
          promotion and become memorable experiences.
        </p>
      </div>
    </section>
  );
};
