import Image from "next/image";

type props = {
  title: string;
  date: string;
  client: string;
  type: string;
  link: string;
  background: string;
};

export const Project = ({
  title,
  date,
  client,
  type,
  link,
  background,
}: props) => {
  return (
    <div className="project relative py-24 bg-background text-onBackground">
      <div className="bg absolute top-0 left-0 w-full h-full">
        <Image
          src={background}
          alt="background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container">
        <h1 className="text-2xl md:text-5xl font-bold mb-12">{title}</h1>
        <div className="others flex items-center gap-4 md:gap-12">
          <div className="label-value text-xs md:text-lg">
            <h1 className="font-bold">DATE</h1>
            <p className="font-light">{date}</p>
          </div>
          <div className="label-value text-xs md:text-lg">
            <h1 className="font-bold">CLIENT</h1>
            <p className="font-light">{client}</p>
          </div>
          <div className="label-value text-xs md:text-lg">
            <h1 className="font-bold">TYPE</h1>
            <p className="font-light">{type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
