import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AuditLogPage } from "@/components/dashboard/audit/AuditLogPage";

export const metadata = {
  title: "Audit Log — Goodstack Admin",
};

export default function AuditRoute() {
  return (
    <DashboardLayout>
      <AuditLogPage />
    </DashboardLayout>
  );
}
