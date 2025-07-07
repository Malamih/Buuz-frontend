import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateImageFile } from "@/helpers/image";
import { queryClient } from "@/providers/QueryProvider";
import { useUpdatePortfolio } from "@/services/portfolios";
import { Portfolio } from "@/types/portfolios";
import clsx from "clsx";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export const Edit = ({ portfolio }: { portfolio: Portfolio }) => {
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const [image, setImage] = useState("");

  const handleSetImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunc: (val: string) => void
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      validateImageFile(file, (msg, src) => {
        toast.message(msg);
        setFunc(src || "");
      });
    }
  };

  useEffect(() => {
    if (!open) {
      setImage("");
      setLogo("");
    }
  }, [open]);

  const {
    mutate,
    isPending,
    error: updateError,
  } = useUpdatePortfolio((msg) => {
    toast.success(msg);
    queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    setOpen(false);
  }, portfolio._id) as {
    mutate: (data: FormData) => void;
    error: any;
    isPending: boolean;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    mutate(form);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-[30px] h-[30px] hover:bg-primary/90 hover:border-primary hover:text-white"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogTitle>Update Client</DialogTitle>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                placeholder="Client name"
                name="name"
                className={clsx({
                  "border-destructive": updateError?.fieldsError?.name,
                })}
                defaultValue={portfolio?.name}
              />
            </div>
            {updateError?.fieldsError?.name && (
              <span className="inline-block text-xs text-destructive">
                {updateError?.fieldsError?.name}
              </span>
            )}
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label>Caption</Label>
              <textarea
                name="description"
                defaultValue={portfolio?.description}
                className={clsx(
                  "border border-gray-200 text-sm placeholder:text-sm px-3 py-2 shadow-sm rounded-md resize-y min-h-[60px] max-h-[100px]",
                  {
                    "!border-destructive":
                      updateError?.fieldErrors?.description,
                  }
                )}
                placeholder="Client caption"
              ></textarea>
              {updateError?.fieldErrors?.description && (
                <span className="inline-block text-xs text-destructive">
                  {updateError?.fieldErrors?.description[0]}
                </span>
              )}
            </div>
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label htmlFor="logo-input">Logo</Label>
              <Input
                placeholder="Client logo"
                id="logo-input"
                type="file"
                onChange={(e) => handleSetImage(e, setLogo)}
                name="logo"
                className={clsx("cursor-pointer", {
                  "border-destructive": updateError?.fieldsError?.logo,
                })}
              />
            </div>
            {(logo || portfolio?.logo) && (
              <Image
                src={logo || portfolio?.logo}
                width={3000}
                height={3000}
                alt="Client image"
                className={clsx(
                  "w-full border border-transparent mt-2 object-cover rounded-lg max-h-[300px]",
                  {
                    "border-destructive": updateError?.fieldsError?.logo,
                  }
                )}
              />
            )}
          </div>
          <div className="input">
            <div className="flex flex-col gap-2">
              <Label htmlFor="image-input">Image</Label>
              <Input
                placeholder="Portfolio image"
                id="image-input"
                type="file"
                onChange={(e) => handleSetImage(e, setImage)}
                name="image"
                className={clsx("cursor-pointer", {
                  "border-destructive": updateError?.fieldsError?.image,
                })}
              />
            </div>
            {(image || portfolio?.image) && (
              <Image
                src={image || portfolio?.image}
                width={3000}
                height={300}
                alt="Portfolio image"
                className={clsx(
                  "w-full border border-transparent h-[300px] mt-2 object-cover rounded-lg max-h-[300px]",
                  {
                    "border-destructive": updateError?.fieldsError?.image,
                  }
                )}
              />
            )}
          </div>
          <div className="submit">
            <Button disabled={isPending} className="w-full">
              {isPending ? "Editing..." : "Edit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
