import { Metadata } from "next";
import { VimeoPlayer } from "../components/Player";
import { BASE_URL } from "@/lib/apiClient";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${params.id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        title: "Project not found - BEEZ PRODUCTIONS",
        description: "The requested project could not be found.",
      };
    }

    const data = await res.json();
    const project = data?.project;

    if (!project) throw new Error("Project data missing");

    const title = project.title || "Project";
    const clientName = project.client?.name || "Client";

    // بناء رابط الصورة بشكل صحيح
    const thumbnail = project.thumbnail
      ? new URL(project.thumbnail, BASE_URL).toString()
      : new URL("/OG.png", BASE_URL).toString();

    const metadata: Metadata = {
      title: `${title} - BEEZ PRODUCTIONS`,
      description: `Beez Productions project for ${clientName}. High-quality media content produced in Baghdad.`,
      keywords: [
        "Beez Productions",
        "Broadcasting Company",
        "Media Production",
        ...(title ? [title] : []),
        ...(clientName ? [clientName] : []),
      ],
      authors: [{ name: "Malamih - شركة ملامح" }],
      openGraph: {
        title: `${title} - BEEZ PRODUCTIONS`,
        description: `Beez Productions project for ${clientName}. Produced with excellence in Baghdad.`,
        type: "video.other",
        images: [
          {
            url: thumbnail,
            width: 1200,
            height: 630,
            alt: `${title} - Beez Productions Thumbnail`,
          },
        ],
        url: new URL(`/projects/${params.id}`, BASE_URL).toString(),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} - BEEZ PRODUCTIONS`,
        description: `Beez Productions project for ${clientName}.`,
        images: [thumbnail],
      },
    };

    return metadata;
  } catch (error) {
    return {
      title: "Error - BEEZ PRODUCTIONS",
      description: "An unexpected error occurred while loading the project.",
    };
  }
};

const ProjectPlayer = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <VimeoPlayer id={id} />;
};

export default ProjectPlayer;
