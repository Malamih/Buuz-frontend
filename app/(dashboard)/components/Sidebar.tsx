"use client";
import Image from "next/image";
import ProjectsIcon from "@/assets/icons/project.svg";
import ValuesIcon from "@/assets/icons/value.svg";
import ClientsIcon from "@/assets/icons/client.svg";
import Link from "next/link";
import styles from "../styles/sidebar.module.scss";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const mainLinksGroup = [
    {
      name: "Projects",
      path: "/dashboard",
      icon: <ProjectsIcon />,
    },
    {
      name: "Values",
      path: "/dashboard/values",
      icon: <ValuesIcon />,
    },
    {
      name: "Clients",
      path: "/dashboard/clients",
      icon: <ClientsIcon />,
    },
  ];
  // const pagesGroupLinks = [
  //   {
  //     name: "Home",
  //     links: [
  //       {
  //         name: "Projects",
  //         path: "/dashboard/home/projects",
  //         icon: <ProjectsIcon width={20} />,
  //       },
  //       {
  //         name: "Values",
  //         path: "/dashboard/home/values",
  //         icon: <ValuesIcon width={20} />,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Services",
  //     links: [
  //       {
  //         name: "Projects",
  //         path: "/dashboard/home/projects",
  //         icon: <ProjectsIcon width={20} />,
  //       },
  //       {
  //         name: "Values",
  //         path: "/dashboard/home/values",
  //         icon: <ValuesIcon width={20} />,
  //       },
  //     ],
  //   },
  // ];
  return (
    <aside
      className={twMerge(
        "w-full h-[100vh] bg-white sticky left-0 top-0 border-r border-r-gray-300",
        styles.sidebar
      )}
      style={{ gridArea: "sidebar" }}
    >
      <div className="logo w-full h-[60px] border-b border-b-gray-300 flex items-center px-2">
        <Image alt="logo" src={"/dashboard/logo.png"} width={120} height={50} />
      </div>
      <ul className="groupLinks mt-4">
        <div className="mainLinks">
          <span className="px-4 py-2 inline-block font-light text-sm text-gray-900">
            Main
          </span>
          {mainLinksGroup.map((link, i: number) => {
            return (
              <li key={i} className="w-full pl-4 mb-2">
                <Link
                  href={link.path}
                  className={clsx(
                    "flex items-center gap-2 w-[90%] text-sm rounded-sm p-2",
                    styles.link,
                    {
                      [styles.active]: pathname == link.path,
                    }
                  )}
                >
                  <div className="icon">{link.icon}</div>
                  <div className="value">{link.name}</div>
                </Link>
              </li>
            );
          })}
        </div>
        {/* <span className="px-4 py-2 inline-block font-light text-sm text-gray-900">
          Pages
        </span>
        {pagesGroupLinks.map((page, i: number) => {
          return (
            <ul className="links" key={i}>
              <h1 className="pl-6 text-[.9rem]">{page.name}</h1>
              {page.links.map((link, i: number) => {
                return (
                  <li key={i} className="w-full pl-8 mb-2">
                    <Link
                      href={link.path}
                      className={clsx(
                        "flex items-center gap-2 w-[90%] rounded-sm p-2 text-sm",
                        styles.link,
                        {
                          [styles.active]: pathname == link.path,
                        }
                      )}
                    >
                      <div className="icon">{link.icon}</div>
                      <div className="value">{link.name}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })} */}
      </ul>
    </aside>
  );
};
