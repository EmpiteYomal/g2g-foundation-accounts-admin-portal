import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PendingCompaniesPage } from "@/components/dashboard/companies/PendingCompaniesPage";

export const metadata = {
  title: "Pending Approvals — Goodstack Admin",
};

export default function PendingCompaniesRoute() {
  return (
    <DashboardLayout>
      <PendingCompaniesPage />
    </DashboardLayout>
  );
}
