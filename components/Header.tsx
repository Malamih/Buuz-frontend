import Logo from "@/assets/logo.svg";
import { Sidebar } from "./Sidebar";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header className="bg-white h-[100px] flex items-center z-[100] sticky top-0 left-0">
        <div className="container flex items-center justify-between gap-2">
          <div className="burgerMenu">
            <Sidebar />
          </div>
          <div className="logo flex-1 flex items-center justify-center">
            <Link href={"/"}>
              <Logo height="34px" className="ml-[-37px]" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
