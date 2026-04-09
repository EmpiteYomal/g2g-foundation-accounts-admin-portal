import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CompanyDetailPage } from "@/components/dashboard/companies/CompanyDetailPage";

export const metadata = {
  title: "Company Profile — Goodstack Admin",
};

export default async function CompanyDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <DashboardLayout>
      <CompanyDetailPage id={id} />
    </DashboardLayout>
  );
}
