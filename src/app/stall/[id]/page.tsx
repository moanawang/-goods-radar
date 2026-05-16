import { StallDetailClient } from "@/app/stall/[id]/stall-detail-client";

type StallDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StallDetailPage({
  params,
}: StallDetailPageProps) {
  const { id } = await params;

  return <StallDetailClient id={id} />;
}
