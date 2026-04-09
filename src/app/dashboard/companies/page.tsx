import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CompaniesPage } from "@/components/dashboard/companies/CompaniesPage";

export const metadata = {
  title: "Companies — Goodstack Admin",
};

export default function CompaniesRoute() {
  return (
    <DashboardLayout>
      <CompaniesPage />
    </DashboardLayout>
  );
}
