import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CharitiesAdminPage } from "@/components/dashboard/charities/CharitiesAdminPage";

export const metadata = {
  title: "Charity Registry — Goodstack Admin",
};

export default function CharitiesRoute() {
  return (
    <DashboardLayout>
      <CharitiesAdminPage />
    </DashboardLayout>
  );
}
