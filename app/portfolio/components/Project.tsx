import Image from "next/image";

type props = {
  title: string;
  thumbnail: string;
};

export const Project = ({ title, thumbnail }: props) => {
  return (
    <div className="project w-full max-w-[415px] flex flex-col gap-4">
      <div className="thumbnail w-full h-[226px] rounded-[25px] overflow-hidden">
        <Image src={thumbnail} alt="thumbnail" width={415} height={226} />
      </div>
      <h1 className="text-center text-xl">{title}</h1>
    </div>
  );
};
