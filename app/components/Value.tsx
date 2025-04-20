"use client";
import clsx from "clsx";
import { useState } from "react";

export const Value = () => {
  const [values, setValues] = useState([
    {
      title: "Creativity",
      desc: "We push boundaries to craft original ideas that make your brand stand out",
      active: true,
    },
    {
      title: "quality",
      desc: "We craft original ideas that make your brand stand out",
      active: false,
    },
    {
      title: "Collaboration",
      desc: "We make your brand stand out",
      active: false,
    },
    {
      title: "Innovation",
      desc: "We push boundaries ideas that make your brand stand out",
      active: false,
    },
    {
      title: "Integrity",
      desc: "We push to craft original ideas that make your brand stand out",
      active: false,
    },
  ]);

  const setActiveValue = (i: number) => {
    const cloneValues = [...values];
    cloneValues.forEach((value) => {
      value.active = false;
    });
    cloneValues[i].active = true;
    setValues(cloneValues);
  };

  const valuesEl = values.map((value, i: number) => {
    return (
      <li
        key={i}
        onClick={() => setActiveValue(i)}
        className={clsx(
          "border-b-4 relative select-none z-[1] border-transparent py-6 px-12 font-light cursor-pointer hover:bg-gray-200 transition-all duration-200 text-gray-500 text-xl capitalize",
          {
            "border-b-black": value.active,
          }
        )}
      >
        <h2
          className={clsx({
            "font-bold text-black": value.active,
          })}
        >
          {value.title}
        </h2>
      </li>
    );
  });

  const content = values.find((v) => v.active)?.desc;
  return (
    <section className="value py-16 bg-gray-100">
      <div className="container">
        <ul className="values flex overflow-auto relative">
          {valuesEl}
          <div className="line absolute bottom-0 z-[0] left-0 w-full h-[3px] bg-gray-300"></div>
        </ul>
        <div className="content py-8 font-bold text-xl">
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
};
