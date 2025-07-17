import { Content } from "./Content";
import { BASE_URL } from "@/lib/apiClient";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const res = await fetch(`${BASE_URL}/portoflios/${params.id}`, {
      // caching optional
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        title: "Client not found - BEEZ PRODUCTIONS",
        description:
          "The requested client profile could not be found on BEEZ PRODUCTIONS.",
      };
    }

    const client = await res.json();

    const name = client?.name ?? "Client";
    const description =
      client?.description ??
      "Client of Beez Productions, a broadcasting and media production company in Baghdad.";
    const image = client?.image || client?.logo || "/OG.png";

    return {
      title: `${name} - Client | BEEZ PRODUCTIONS`,
      description,
      keywords: [
        "Beez Productions",
        "Broadcasting",
        "Media Production",
        "Client",
        "Baghdad",
        "Video Production",
        name,
      ],
      authors: [{ name: "Malamih - شركة ملامح" }],
      openGraph: {
        title: `${name} - Client | BEEZ PRODUCTIONS`,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${name} Client Cover`,
          },
        ],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} - Client | BEEZ PRODUCTIONS`,
        description,
        images: [image],
      },
    };
  } catch (error) {
    // في حال فشل الاتصال أو حصل استثناء
    console.error("generateMetadata error:", error);

    return {
      title: "Error - BEEZ PRODUCTIONS",
      description:
        "An unexpected error occurred while generating client metadata.",
    };
  }
};

export default function page() {
  return (
    <>
      <Content />
    </>
  );
}
