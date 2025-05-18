"use client";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  return (
    <>
      <header className="bg-white h-[90px] flex items-center z-[100] sticky top-0 left-0">
        <div className="container flex items-center justify-between gap-2">
          <Sidebar />
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
