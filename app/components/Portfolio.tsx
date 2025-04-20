import Image from "next/image";

export const Portfolio = () => {
  return (
    <div className="portfolio relative bg-background text-onBackground">
      <div className="bg absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={"/home/portfolioBg.png"}
          alt="Background"
          width={1000}
          height={1000}
          className="w-full h-full object-top object-cover"
        />
      </div>
      <div className="container py-16 relative z-[1]">
        <h1 className="font-extralight text-5xl md:text-8xl mb-4">
          <b>Port</b>folio
        </h1>
        <p className="font-light text-lg mb-4">
          We’ve had the pleasure of working with a diverse range of clients,
          producing commercials and campaigns that stand out in the market. Our
          work has been featured nationwide, earning us a reputation for
          creativity and excellence.
        </p>
        <p className="font-light text-lg">
          Stay tuned for our upcoming projects – we’re just getting started!
        </p>
      </div>
    </div>
  );
};
