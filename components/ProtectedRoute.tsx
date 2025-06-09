"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useCheckAuth } from "@/services/auth";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, error, isPending } = useCheckAuth((msg) => {
    router.push("/dashboard");
  });
  useEffect(() => {
    if (error) {
      router.push("/auth");
      toast.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (!token && pathname.includes("/dashboard")) {
      router.push("/auth");
      setMounted(true);
    } else {
      setMounted(true);
    }
  });

  if (!mounted) return <>Loading...</>;
  return <>{children}</>;
};
