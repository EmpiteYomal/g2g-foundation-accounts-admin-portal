"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Building2, HandCoins, CheckCircle2, FileText } from "lucide-react";

type Activity = {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  badge?: { label: string; color: string };
};

const ACTIVITY: Activity[] = [
  {
    id: "a1",
    icon: ArrowLeftRight,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    title: "Bank statement imported",
    description: "34 transactions loaded from BSB 062-000 — 22 auto-matched",
    time: "10 min ago",
    badge: { label: "12 unmatched", color: "bg-amber-100 text-amber-700" },
  },
  {
    id: "a2",
    icon: Building2,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "KFC Australia reconciled",
    description: "AUD 12,450.00 matched to BSB 063-000 · Acc 10249876",
    time: "2h ago",
    badge: { label: "Matched", color: "bg-emerald-100 text-emerald-700" },
  },
  {
    id: "a3",
    icon: HandCoins,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    title: "ABA file generated",
    description: "Cancer Council AU · AUD 4,200.00 · Ref GIVE-0441",
    time: "4h ago",
    badge: { label: "Downloaded", color: "bg-violet-100 text-violet-700" },
  },
  {
    id: "a4",
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "Company approved",
    description: "McDonald's Australia Pty Ltd onboarded successfully",
    time: "Yesterday",
  },
  {
    id: "a5",
    icon: FileText,
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted/60",
    title: "Quarterly report generated",
    description: "Q1 2026 giving summary — 14 companies, AUD 284,390.00",
    time: "2 days ago",
  },
];

export function AdminRecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
      </div>
      <div className="divide-y divide-border/60">
        {ACTIVITY.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-muted/20 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                {item.badge && (
                  <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badge.color}`}>
                    {item.badge.label}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
