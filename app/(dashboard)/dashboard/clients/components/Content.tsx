"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatShortDateTime } from "@/lib/date";
import { deleteClient, getClients } from "@/services/clients";
import clsx from "clsx";
import Cookies from "js-cookie";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      value: "video-production",
      label: "Video Production",
      color: "rgba(215, 38, 61, 0.3)",
      borderColor: "#A61B2D",
    },
    {
      value: "tvc-commercial",
      label: "TVC Commercial",
      color: "rgba(63, 114, 175, 0.3)",
      borderColor: "#2B4D77",
    },
    {
      value: "creative-concepts",
      label: "Creative Concepts",
      color: "rgba(244, 162, 97, 0.3)",
      borderColor: "#E07A3F",
    },
    {
      value: "marketing-campaigns",
      label: "Marketing Campaigns",
      color: "rgba(42, 157, 143, 0.3)",
      borderColor: "#1F766B",
    },
    {
      value: "all",
      label: "All",
      color: "rgba(108, 117, 125, 0.3)",
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
          No Clients
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
