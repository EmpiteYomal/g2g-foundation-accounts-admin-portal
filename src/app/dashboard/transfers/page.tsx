import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransfersPage } from "@/components/dashboard/transfers/TransfersPage";

export const metadata = {
  title: "Fund Transfers — Goodstack Admin",
};

export default function TransfersRoute() {
  return (
    <DashboardLayout>
      <TransfersPage />
    </DashboardLayout>
  );
}
