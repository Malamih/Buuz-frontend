import ReasonIcon from "@/assets/icons/reason.svg";

type props = {
  title: string;
  desc: string;
  index: string;
};

export const Reason = ({ title, desc, index }: props) => {
  return (
    <>
      <div className="reason flex relative gap-5 min-h-[300px]">
        <div className="icon hidden md:inline-block">
          <ReasonIcon />
        </div>
        <div className="title-desc relative">
          <div className="reason-number font-extralight absolute top-[-60%] left-0 w-full h-full text-[220px] opacity-10 pointer-events-none">
            <span className="relative z-[1]">{index}</span>
            <div
              className="layer z-10 absolute bottom-0 left-0 w-[140%] md:w-full h-full"
              style={{
                background: "linear-gradient(to top, black, transparent)",
              }}
            ></div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">{title}</h1>
          <p className="text-lg font-light">{desc}</p>
        </div>
      </div>
    </>
  );
};
