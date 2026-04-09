import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminReportsPage } from "@/components/dashboard/reports/AdminReportsPage";

export const metadata = {
  title: "Reports — Goodstack Admin",
};

export default function ReportsRoutePage() {
  return (
    <DashboardLayout>
      <AdminReportsPage />
    </DashboardLayout>
  );
}
