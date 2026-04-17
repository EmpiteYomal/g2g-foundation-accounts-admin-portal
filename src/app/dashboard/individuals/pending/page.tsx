import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PendingIndividualsPage } from "@/components/dashboard/individuals/PendingIndividualsPage";

export const metadata = {
  title: "Pending Approvals — Goodstack Admin",
};

export default function PendingIndividualsRoute() {
  return (
    <DashboardLayout>
      <PendingIndividualsPage />
    </DashboardLayout>
  );
}
