import { BASE_URL } from "@/lib/apiClient";
import { Content } from "./Content";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const res = await fetch(`${BASE_URL}/portoflios/${params.id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        title: "Client not found - BEEZ PRODUCTIONS",
        description: "The requested client profile could not be found.",
      };
    }

    const client = await res.json();

    // تحقق من وجود بيانات العميل الأساسية
    if (!client || typeof client !== "object") {
      throw new Error("Invalid client data");
    }

    const name = client?.name ?? "Client";
    const description =
      client?.description ??
      "Client of Beez Productions, a broadcasting and media production company in Baghdad.";

    // معالجة رابط الصورة ليكون مطلقاً
    const imageUrl = client?.image || client?.logo || "/OG.png";
    const absoluteImageUrl = new URL(imageUrl, BASE_URL).toString();

    // رابط الصفحة الحالي
    const pageUrl = new URL(`/portoflios/${params.id}`, BASE_URL).toString();

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
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: `${name} Client Cover`,
          },
        ],
        type: "profile",
        url: pageUrl, // إضافة رابط الصفحة الحالي
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} - Client | BEEZ PRODUCTIONS`,
        description,
        images: [absoluteImageUrl],
      },
      // إضافة حقول جديدة لتحسين السيو
      metadataBase: new URL(BASE_URL),
      alternates: {
        canonical: pageUrl,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Error - BEEZ PRODUCTIONS",
      description:
        "An unexpected error occurred while generating client metadata.",
    };
  }
};

export default function page() {
  return <Content />;
}
