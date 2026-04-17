import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { IndividualDetailPage } from "@/components/dashboard/individuals/IndividualDetailPage";

export const metadata = {
  title: "Individual Profile — Goodstack Admin",
};

export default async function IndividualDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <DashboardLayout>
      <IndividualDetailPage id={id} />
    </DashboardLayout>
  );
}
