import Image from "next/image";

export const Hero = () => {
  return (
    <div className="hero py-10 relative bg-background text-onBackground min-h-[250px] flex items-center justify-center">
      <div className="bg absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={"/about/heroBg.png"}
          alt="background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container text-center relative z-[1]">
        <h1 className="text-6xl font-medium mb-4">About us</h1>
        <p className="font-light">Home - About us</p>
      </div>
    </div>
  );
};
