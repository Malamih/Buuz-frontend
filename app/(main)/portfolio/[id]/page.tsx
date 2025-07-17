import { VimeoPlayer } from "../components/Player";
import { BASE_URL } from "@/lib/apiClient";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`${BASE_URL}/projects/${params.id}`);
  const data = await res.json();
  return {
    title: `${data?.project?.title} - BEEZ PRODUCTIONS`,
    description: `Beez production project for ${data?.project?.client?.name}`,
    openGraph: {
      title: data?.project?.title,
      description: `Beez production project for ${data?.project.client?.name}`,
      images: [data?.project?.thumbnail],
    },
  };
};

const ProjectPlayer = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <VimeoPlayer id={id} />;
};

export default ProjectPlayer;
