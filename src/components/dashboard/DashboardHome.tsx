"use client";

import { AdminStatCards } from "./AdminStatCards";
import { AdminPendingCompanies } from "./AdminPendingCompanies";
import { AdminRecentActivity } from "./AdminRecentActivity";
import { AdminQuickActions } from "./AdminQuickActions";

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Good morning, Sarah</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Here&apos;s your admin overview for{" "}
          <span className="font-medium text-foreground">April 2026</span>. You have items that need attention.
        </p>
      </div>

      {/* KPI cards */}
      <AdminStatCards />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column — 2/3 */}
        <div className="xl:col-span-2">
          <AdminPendingCompanies />
        </div>

        {/* Right column — 1/3 */}
        <div className="flex flex-col gap-6">
          <AdminQuickActions />
        </div>
      </div>

      {/* Full-width recent activity */}
      <AdminRecentActivity />
    </div>
  );
}
