"use client";

import { ArrowLeftRight, HandCoins, Building2, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

const QUICK_LINKS = [
  {
    href: "/dashboard/reconciliation",
    icon: ArrowLeftRight,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    label: "Reconcile Transactions",
    sub: "12 unmatched",
    urgent: true,
  },
  {
    href: "/dashboard/transfers",
    icon: HandCoins,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    label: "Process Fund Transfers",
    sub: "5 pending approval",
    urgent: true,
  },
  {
    href: "/dashboard/companies",
    icon: Building2,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    label: "Review Company Sign-ups",
    sub: "4 awaiting review",
    urgent: true,
  },
  {
    href: "/dashboard/reports",
    icon: FileText,
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted/60",
    label: "Generate Report",
    sub: "Q1 2026 available",
    urgent: false,
  },
];

export function AdminQuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
      </div>
      <div className="p-3 space-y-1">
        {QUICK_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/40 transition-colors group"
            >
              <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className={`text-xs ${item.urgent ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                  {item.sub}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
