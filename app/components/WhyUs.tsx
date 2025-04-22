import Image from "next/image";
import { Reason } from "./Reason";
import { twMerge } from "tailwind-merge";

export const WhyUs = ({ classes }: { classes?: string }) => {
  const reasons = [
    {
      title: "Innovative Storytelling",
      desc: "We create content that captures hearts and mindvs",
      order: "01",
      active: false,
    },
    {
      title: "Creative Expertise",
      desc: "Fresh ideas tailored to your brand’s needs",
      order: "02",
      active: false,
    },
    {
      title: "Tailored Solutions",
      desc: "Customized strategies to achieve your goals",
      order: "03",
      active: false,
    },
    {
      title: "Professional Quality",
      desc: "High-end visuals with meticulous attention to detail",
      order: "04",
      active: false,
    },
    {
      title: "Collaborative Process",
      desc: "We listen, we create, and we deliver",
      order: "05",
      active: false,
    },
  ];

  const reasonsEl = reasons.map((reason, i: number) => {
    return (
      <Reason
        key={i}
        title={reason.title}
        desc={reason.desc}
        index={reason.order}
      />
    );
  });
  return (
    <section className={twMerge("overflow-hidden pt-32 min-h-[90vh]", classes)}>
      <div className="container">
        <div className="title text-center font-extralight mb-28">
          <h1 className="mb-3 text-4xl">
            Why Choose <b>Beez Production?</b>
          </h1>
          <p className="w-full md:w-[800px] m-auto">
            Choosing the right partner for your production needs can make all
            the difference. Here’s why Beez Production is your best choice
          </p>
        </div>
        <div className="content flex justify-between gap-12">
          <div className="reasons pt-24">{reasonsEl}</div>
          <div className="image w-[50%] rounded-bl-[100px] overflow-hidden">
            <Image
              src={"/home/reasons/1.png"}
              width={1000}
              height={1000}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
