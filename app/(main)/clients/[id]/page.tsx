// app/portoflios/[id]/page.tsx
import { Content } from "./Content";
import { BASE_URL } from "@/lib/apiClient";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`${BASE_URL}/portoflios/${params.id}`);
  const data = await res.json();
  return {
    title: `${data?.payload?.name} - BEEZ PRODUCTIONS`,
    description: `${data?.description}`,
    openGraph: {
      title: data?.project?.title,
      description: `${data?.description}`,
      images: [data?.logo],
    },
  };
};

export default function Page() {
  return <Content />;
}
