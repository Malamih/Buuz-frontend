"use client";
import { Button } from "@/components/ui/button";
import { useMainStore } from "@/stores/main";
import { useEffect, useState } from "react";
import { Textarea } from "./Textarea";
import { useUpdateHomePageContent } from "@/services/pages";
import { toast } from "sonner";

export const TextUpdaters = () => {
  const { pageContent, setPageContent } = useMainStore((state) => state);
  const [texts, setTexts] = useState({});
  const [initText, setInitText] = useState<any>(null);
  useEffect(() => {
    if (pageContent && pageContent?.home) {
      const newTexts = Object.fromEntries(
        Object.entries(pageContent?.home).filter(
          ([_, value]) => typeof value === "string"
        )
      );
      setTexts(newTexts);
      if (!initText) {
        setInitText(newTexts);
      }
    }
  }, [pageContent]);

  const { mutate, isPending, error } = useUpdateHomePageContent((data) => {
    setPageContent(data.updated_data);
    toast.success(data.message);
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="textUpdaters mt-12">
      <div className="header flex items-center justify-between mb-4">
        <h1 className="font-bold">Page Text Content</h1>
        <Button
          disabled={initText == texts || isPending}
          className="cursor-pointer select-none"
          onClick={() => mutate({ pageContent })}
        >
          Save
        </Button>
      </div>
      <div className="texts flex gap-4 flex-wrap">
        {Object.entries(texts).map(([key, value], i: number) => {
          return <Textarea title={key} value={value as string} key={i} />;
        })}
      </div>
    </div>
  );
};
