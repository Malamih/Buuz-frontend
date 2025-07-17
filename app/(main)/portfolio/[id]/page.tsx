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
      // هذه الخيارات تساعد Next.js في التخزين المؤقت والـ ISR (اختياري)
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // فشل الاتصال أو المشروع غير موجود
      return {
        title: "Project not found - BEEZ PRODUCTIONS",
        description: "The requested project could not be found.",
      };
    }

    const data = await res.json();

    const title = data?.project?.title ?? "Project";
    const clientName = data?.project?.client?.name ?? "Client";
    const thumbnail = data?.project?.thumbnail ?? "/OG.png";

    return {
      title: `${title} - BEEZ PRODUCTIONS`,
      description: `Beez Productions project for ${clientName}. High-quality media content produced in Baghdad.`,
      keywords: [
        "Beez Productions",
        "Broadcasting Company",
        "Media Production",
        "Video Production",
        "Audio Production",
        "Film Production",
        "Baghdad Media",
        "Iraq Broadcasting",
        title,
        clientName,
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
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} - BEEZ PRODUCTIONS`,
        description: `Beez Productions project for ${clientName}.`,
        images: [thumbnail],
      },
    };
  } catch (error) {
    // في حال حصل استثناء (مثلاً الشبكة مقطوعة أو API فيه bug)
    return {
      title: "Error - BEEZ PRODUCTIONS",
      description: "An unexpected error occurred while loading the project.",
    };
  }
};

const ProjectPlayer = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <>
      <VimeoPlayer id={id} />
    </>
  );
};

export default ProjectPlayer;
