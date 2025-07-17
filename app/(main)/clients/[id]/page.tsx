// app/portoflios/[id]/page.tsx
import { Content } from "./Content";
import { BASE_URL } from "@/lib/apiClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(`${BASE_URL}/portoflios/${params.id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch client");

    const client = await res.json();

    const name = client?.name ?? "Client";
    const description =
      client?.description ??
      "Client of Beez Productions, a broadcasting and media production company in Baghdad.";
    const image = client?.image || client?.logo || "/OG.png";

    return {
      title: `${name} - Client | BEEZ PRODUCTIONS`,
      description,
      openGraph: {
        title: `${name} - Client | BEEZ PRODUCTIONS`,
        description,
        type: "profile",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${name} Client Cover`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} - Client | BEEZ PRODUCTIONS`,
        description,
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Beez Productions – Error",
      description: "Error loading client metadata.",
    };
  }
}

export default function Page() {
  return <Content />;
}
