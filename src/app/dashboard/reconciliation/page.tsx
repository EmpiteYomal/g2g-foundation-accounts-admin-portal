import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReconciliationPage } from "@/components/dashboard/reconciliation/ReconciliationPage";

export const metadata = {
  title: "Bank Reconciliation — Goodstack Admin",
};

export default function ReconciliationRoute() {
  return (
    <DashboardLayout>
      <ReconciliationPage />
    </DashboardLayout>
  );
}
