import Image from "next/image";

export const Hero = () => {
  return (
    <section className="hero relative py-16 h-[250px]">
      <div className="bg absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={"/contactUs/heroBg.png"}
          className="w-full h-full object-cover"
          alt="background"
          width={1000}
          height={250}
        />
      </div>
      <div className="container relative text-center z-[1] text-white">
        <h1 className="text-7xl mb-4">Contact us</h1>
        <p className="font-light text-sm">Home - Contact us</p>
      </div>
    </section>
  );
};
