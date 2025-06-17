"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { deleteClient, getClients } from "@/services/clients";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatShortDateTime } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import clsx from "clsx";

export const Content = () => {
  const [email, setEmail] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [serviceValue, setService] = useState("all");
  const router = useRouter();
  const HandleAuthErorr = () => {
    Cookies.remove("token");
    router.push("/auth");
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmail(emailInputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [emailInputValue]);
  const services = [
    {
      value: "commercial",
      label: "Commercial",
      color: "rgba(255, 193, 7, 0.3)", // Golden yellow - premium, commercial appeal
      borderColor: "#F57C00",
    },
    {
      value: "films",
      label: "Films",
      color: "rgba(220, 53, 69, 0.3)", // Cinema red - classic movie theater
      borderColor: "#C21807",
    },
    {
      value: "short-films",
      label: "Short Films",
      color: "rgba(111, 66, 193, 0.3)", // Purple - artistic, creative
      borderColor: "#6F42C1",
    },
    {
      value: "series",
      label: "Series",
      color: "rgba(25, 135, 84, 0.3)", // Green - continuous, ongoing
      borderColor: "#146C43",
    },
    {
      value: "tv-programs",
      label: "TV Programs",
      color: "rgba(13, 110, 253, 0.3)", // Blue - broadcast, traditional TV
      borderColor: "#0A58CA",
    },
    {
      value: "video-clip",
      label: "Video Clip",
      color: "rgba(214, 51, 132, 0.3)", // Pink/magenta - modern, social media
      borderColor: "#B02A5B",
    },
    {
      value: "sketch",
      label: "Sketch",
      color: "rgba(253, 126, 20, 0.3)", // Orange - playful, comedy
      borderColor: "#D63384",
    },
    {
      value: "all",
      label: "All",
      color: "rgba(108, 117, 125, 0.3)", // Neutral gray - comprehensive
      borderColor: "#495057",
    },
  ];

  const { data, isFetching, error, refetch } = getClients({
    email,
    ...(serviceValue == "all" ? "" : { serviceValue }),
  });
  const scss = (msg: string) => {
    toast.success(msg);
    refetch();
  };
  const { mutate, error: delete_error, isPending }: any = deleteClient(scss);
  useEffect(() => {
    if (delete_error || error) {
      if (delete_error.statusCode == 401) {
        HandleAuthErorr();
      }
      toast.error(delete_error?.message || error?.message);
    }
  }, [delete_error, error]);
  return (
    <>
      <header className="flex items-center justify-between">
        <Input
          placeholder="Search by email..."
          className="w-full max-w-[500px]"
          value={emailInputValue}
          onInput={(e: any) => setEmailInputValue(e.target.value)}
        />
        <Select defaultValue="all" onValueChange={setService}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Services" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service, i: number) => {
              return (
                <SelectItem value={service.value} key={i}>
                  <div
                    className="ball w-[10px] h-[10px] border rounded-full"
                    style={{
                      background: service.color,
                      borderColor: service.borderColor,
                    }}
                  ></div>
                  {service.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </header>
      {data?.payload?.length == 0 && (
        <span className="text-center text-xl text-gray-400 w-full inline-block py-8">
          No Messages
        </span>
      )}
      <div className="clients mt-4 flex flex-wrap gap-4">
        {data?.payload?.map((client, i: number) => {
          return (
            <div
              className="client w-full md:w-[calc(50%-1rem)] px-4 py-2 rounded-lg border border-gray-300"
              key={i}
            >
              <header className="mb-1 flex items-center justify-between gap-4">
                <div className="title w-full">
                  <h1 className="text-lg font-medium leading-5 flex items-center justify-between w-full gap-2">
                    {client.name}
                    <span className="text-s mt-2 text-gray-600 font-light">
                      {client.phone_number}
                    </span>
                  </h1>
                  <p className="text-sm font-light">
                    {client.email} |{" "}
                    {formatShortDateTime(
                      new Date(client.createdAt).toISOString()
                    )}
                  </p>
                </div>
                <Button
                  className="w-[30px] h-[30px] cursor-pointer"
                  variant={"outline"}
                  disabled={isPending}
                  onClick={() => mutate({ id: client._id })}
                >
                  <Trash2Icon />
                </Button>
              </header>
              <div className="message-services">
                <p className="text-sm text-gray-600">{client.message}</p>
                <ul className="services mt-4 flex flex-wrap gap-4">
                  {client?.services?.map((service, i: number) => {
                    return (
                      <li
                        className="text-xs flex items-center gap-1 w-[calc(50%-1rem)]"
                        key={i}
                      >
                        <div
                          className={clsx(
                            "ball w-[10px] h-[10px] border rounded-full"
                          )}
                          style={{
                            backgroundColor: services.find(
                              (s) => s.value === service
                            )?.color,
                            borderColor: services.find(
                              (s) => s.value === service
                            )?.borderColor,
                          }}
                        ></div>
                        <span
                          className={clsx(
                            "capitalize py-1 px-2 rounded-full border"
                          )}
                          style={{
                            background:
                              service == serviceValue
                                ? services.find((s) => s.value == service)
                                    ?.color
                                : "",
                            borderColor:
                              service == serviceValue
                                ? services.find((s) => s.value == service)
                                    ?.borderColor
                                : "",
                          }}
                        >
                          {service}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
