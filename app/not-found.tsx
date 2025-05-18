"use client";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <html>
        <body>
          <div className="notFound w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-8 font-black w-full text-center mx-auto">
              Sorry, This Page is{" "}
              <span className="text-primary">Not Found</span>.
            </h1>
            <Link href={"/"}>
              <Button
                content="Go back home"
                classes="border-black rounded-lg"
                iconClasses="bg-black"
              />
            </Link>
          </div>
        </body>
      </html>
    </>
  );
};

export default NotFound;
