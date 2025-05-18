"use client";
import clsx from "clsx";
import gsap from "gsap";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/assets/logo.svg";
import EmailIcon from "@/assets/icons/email.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import CursorIcon from "@/assets/icons/cursor.svg";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const firstLine = useRef<HTMLSpanElement>(null);
  const secondLine = useRef<HTMLSpanElement>(null);
  const lastLine = useRef<HTMLSpanElement>(null);
  const burgerIcon = useRef<HTMLButtonElement>(null);
  const aside = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (
      !firstLine.current ||
      !secondLine.current ||
      !lastLine.current ||
      !aside.current
    )
      return;
    const tl = gsap.timeline({});
    if (open) {
      tl.to(firstLine.current, {
        x: 0,
        y: "-50%",
        top: "50%",
        left: "0%",
        rotate: 45,
        ease: "back",
        duration: 0.4,
      });
      tl.to(
        secondLine.current,
        {
          x: 0,
          y: "-50%",
          top: "50%",
          left: "0%",
          rotate: -45,
          ease: "back",
          duration: 0.4,
        },
        "<"
      );
      tl.to(
        lastLine.current,
        {
          opacity: 0,
          ease: "back",
          duration: 0.4,
        },
        "<"
      );

      tl.to(
        aside.current,
        {
          left: 0,
          delay: 0.1,
        },
        0
      );
    } else {
      tl.to(firstLine.current, {
        y: "0%",
        top: "0%",
        left: "0%",
        rotate: 0,
        ease: "back",
        duration: 0.4,
      });
      tl.to(
        secondLine.current,
        {
          y: "0%",
          top: "50%",
          left: "0%",
          rotate: -0,
          ease: "back",
          duration: 0.4,
        },
        "<"
      );
      tl.to(
        lastLine.current,
        {
          opacity: 1,
          ease: "back",
          duration: 0.4,
        },
        "<"
      );

      // sidebar
      tl.to(
        aside.current,
        {
          left: "-500px",
          delay: 0.1,
        },
        0
      );
    }
  }, [open]);

  useEffect(() => {
    const closeSidebar = (e: Event) => {
      if (!aside.current || !e || !burgerIcon.current) return;
      if (
        !aside.current.contains(e.target as Node) &&
        !burgerIcon.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", (e) => closeSidebar(e));
    return () => document.removeEventListener("click", closeSidebar);
  }, []);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About us",
      path: "/about",
    },
    {
      name: "Our services",
      path: "/services",
    },
    {
      name: "Portfolio",
      path: "/portfolio/first",
    },
    {
      name: "Contact us",
      path: "/contact-us",
    },
  ];

  return (
    <div className="z-101 relative">
      <div className="icon cursor-pointer">
        <button
          className="burgerMenu relative w-[40px] h-[27px] cursor-pointer"
          onClick={() => setOpen(!open)}
          ref={burgerIcon}
        >
          <span
            className="first absolute top-0 left-0 w-full h-[3px] bg-black rounded-full"
            ref={firstLine}
          ></span>
          <span
            className="second absolute top-2/4 left-0 w-full h-[3px] bg-black rounded-full"
            ref={secondLine}
          ></span>
          <span
            className="last absolute bottom-0 left-0 w-[50%] h-[3px] bg-black rounded-full"
            ref={lastLine}
          ></span>
        </button>
      </div>
      <div
        className={clsx(
          "fixed top-0 w-[96%] max-w-[500px] h-full bottom-0 bg-white z-[1] left-[-500px] shadow-lg flex flex-col"
        )}
        ref={aside}
      >
        <header className="flex items-center justify-between py-2 px-4 mb-4">
          <div className="logo">
            <Link href={"/"} onClick={() => setOpen(false)}>
              <Image src={"/logo.svg"} width={100} height={100} alt="Logo" />
            </Link>
          </div>
          <button
            className="close w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition duration-200"
            onClick={() => setOpen(false)}
          >
            <XIcon className="scale-[1.4]" />
          </button>
        </header>
        <ul className="links flex-[1] py-2 px-8 text-3xl flex flex-col gap-4">
          {links.map((link, i: number) => {
            return (
              <li key={i}>
                <Link
                  href={link.path}
                  className={clsx("hover:underline", {
                    underline:
                      pathname == link.path ||
                      (pathname.includes("portfolio") &&
                        link.path.includes("portfolio")),
                  })}
                  onClick={() => setOpen(false)}
                >
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="contactInfo py-2 px-8 pb-6">
          <div className="content flex flex-col gap-6 mt-8">
            <div className="label-value flex items-center gap-4">
              <EmailIcon />
              <span>info@beez-production.com</span>
            </div>
            <div className="label-value flex items-center gap-4">
              <PhoneIcon />
              <span>+964 782 433 3323</span>
            </div>
            <div className="label-value flex items-center gap-4">
              <CursorIcon />
              <span>Baghdad, Al-Mansour</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
