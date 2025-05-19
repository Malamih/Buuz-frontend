"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFetchVideos } from "@/services/vimeo";
import { ManyVideos } from "./ManyVideos";
import { Loader } from "@/components/loader";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export const Content = () => {
  const [fetchingType, setFetchingType] = useState<"single" | "multiple">(
    "multiple"
  );
  const [idInputValue, setIdInputValue] = useState("");

  const {
    data: payload,
    isFetching,
    refetch,
  } = useFetchVideos(idInputValue, fetchingType);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 500);
    return () => clearTimeout(timer);
  }, [idInputValue]);

  const fetch = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <div className="header flex items-center justify-between pr-6 gap-2">
        <form className="input flex gap-2 flex-1" onSubmit={fetch}>
          <input
            type="text"
            placeholder={
              fetchingType == "single"
                ? "Project id from vimeo..."
                : "User id from vimeo..."
            }
            value={idInputValue}
            onChange={(e) => setIdInputValue(e.target.value)}
            name="id"
            className="border font-light border-gray-400 rounded-sm py-1 px-2 w-full max-w-[400px]"
          />
          <Button
            className="py-1 px-3 bg-darkPrimary border border-gray4100 rounded-sm text-white cursor-pointer hover:bg-primary"
            disabled={isFetching}
          >
            {isFetching ? "Fetching..." : "Fetch"}
          </Button>
        </form>
        <Link href={"/dashboard"} className="flex items-center gap-2 underline">
          Projects <ArrowRightIcon width={20} />
        </Link>
      </div>
      <div className="projects mt-8">
        {!payload?.data && (
          <h1 className="text-sm text-center">
            Start fetching by typing the user id. <br />
            <span className="font-light">
              tip: you can get the "user id" from the link of your profile in
              vimeo like this: https://vimeo.com/
              <span className="py-0 px-2 bg-green-100 border border-green-400 rounded-sm">
                your_id
              </span>
            </span>
          </h1>
        )}
        <div className="fetching mt-4">
          {isFetching && <Loader content="Fetching" />}
        </div>
        {payload?.data && <ManyVideos videos={payload?.data || []} />}
      </div>
    </>
  );
};
