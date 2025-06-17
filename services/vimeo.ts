import ApiClient from "@/lib/apiClient";
import vimeoApiClient from "@/lib/vimeoApiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Project {
  title: string;
  description: string;
  client: string;
  type: string;
  thumbnail: string;
  video: string;
  created_time: string;
  video_uri: string;
  _id: string;
  project_id: string;
  id: string;
}

export interface ProjectResponse {
  message: string;
  project: Project;
}

export const useFetchVideos = (
  id: string,
  fetchingType: "single" | "multiple",
  params?: {}
) => {
  let url =
    fetchingType == "multiple" ? `/users/${id}/videos` : `/videos/${id}`;
  const endpoint = new vimeoApiClient<any, any>(url);
  return useQuery({
    queryKey: ["vimeo", id, params],
    queryFn: endpoint.get,
    retry: false,
    meta: { params: { ...params } },
  });
};

export const useUploadProject = (
  success: (data: ProjectResponse) => void,
  error: (errors: string[]) => void
) => {
  const endpoint = new ApiClient<any, ProjectResponse>("/projects");

  return useMutation({
    mutationFn: endpoint.post,
    mutationKey: ["project"],
    retry: false,
    onSuccess: (data) => {
      success(data);
    },
    onError: (err: { message: string[] }) => {
      error(err.message);
    },
  });
};
