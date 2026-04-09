import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdminSettingsPage } from "@/components/dashboard/settings/AdminSettingsPage";

export const metadata = {
  title: "Settings — Goodstack Admin",
};

export default function SettingsRoutePage() {
  return (
    <DashboardLayout>
      <AdminSettingsPage />
    </DashboardLayout>
  );
}
