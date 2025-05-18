import ApiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface AdminLoginResponse {
  message: string;
  payload: {
    email: string;
    id: string;
  };
  token: string;
}

export const useLogin = (successCallback: () => void) => {
  const loginEndpoint = new ApiClient<any, AdminLoginResponse>("/admin/login");

  return useMutation({
    mutationFn: loginEndpoint.post,
    mutationKey: ["admin"],
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      successCallback();
    },
  });
};

export const useLogout = (successCallback: () => void) => {
  Cookies.remove("token");
  successCallback();
};
