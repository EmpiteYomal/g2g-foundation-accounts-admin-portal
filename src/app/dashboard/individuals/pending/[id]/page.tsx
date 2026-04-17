import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PendingIndividualDetailPage } from "@/components/dashboard/individuals/PendingIndividualDetailPage";

export const metadata = {
  title: "Pending Application — Goodstack Admin",
};

export default async function PendingIndividualDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <DashboardLayout>
      <PendingIndividualDetailPage id={id} />
    </DashboardLayout>
  );
}
