import { Metadata } from "next";
import { VimeoPlayer } from "../components/Player";
import { BASE_URL } from "@/lib/apiClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/projects/${params.id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Fetch failed");

    const data = await res.json();
    const project = data.project || {};
    const title = project.title || "Project";
    const client = project.client?.name || "Client";
    const thumbnail = project.thumbnail || "/OG.png";

    const meta: Metadata = {
      title: `${title} – BEEZ PRODUCTIONS`,
      description: `Beez Productions project for ${client}. High-quality media content produced in Baghdad.`,
      openGraph: {
        title,
        description: `Beez Productions project for ${client}.`,
        images: [{ url: thumbnail }],
        type: "video.other",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: `Project by Beez for ${client}`,
        images: [thumbnail],
      },
      keywords: ["Beez Productions", title, client],
      authors: [{ name: "Malamih - شركة ملامح" }],
    };
    return meta;
  } catch (error) {
    return {
      title: "Beez Productions – Error",
      description: "Error loading project metadata.",
    };
  }
}
const ProjectPlayer = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <VimeoPlayer id={id} />;
};

export default ProjectPlayer;
