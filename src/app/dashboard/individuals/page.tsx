import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { IndividualsPage } from "@/components/dashboard/individuals/IndividualsPage";

export const metadata = {
  title: "Individuals — Goodstack Admin",
};

export default function IndividualsRoute() {
  return (
    <DashboardLayout>
      <IndividualsPage />
    </DashboardLayout>
  );
}
