import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PendingCompanyDetailPage } from "@/components/dashboard/companies/PendingCompanyDetailPage";

export const metadata = {
  title: "Pending Company — Goodstack Admin",
};

export default async function PendingCompanyDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <DashboardLayout>
      <PendingCompanyDetailPage id={id} />
    </DashboardLayout>
  );
}
