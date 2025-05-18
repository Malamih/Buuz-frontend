export const Vision = () => {
  return (
    <section className="vission py-10 bg-white">
      <div className="container">
        <h1 className="mb-12 font-bold text-2xl">Our Vision & Values</h1>
        <div className="image w-full h-[calc(100vh-200px)] relative mb-12 rounded-br-[100px] overflow-hidden">
          <video
            src="/vision-bg.mp4"
            autoPlay
            muted
            className="w-full h-full absolute top-0 left-0 object-cover"
            playsInline
            loop
          ></video>
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
