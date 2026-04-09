"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowLeftRight, Building2, HandCoins } from "lucide-react";

const stats = [
  {
    label: "Total Funds Held",
    value: "$1,284,390",
    sub: "",
    trend: "+$48,220 this month",
    positive: true,
    icon: Wallet,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Pending Reconciliation",
    value: "12",
    sub: "Unmatched bank transactions",
    trend: "Action needed",
    positive: false,
    icon: ArrowLeftRight,
    color: "text-amber-600",
    bg: "bg-amber-50",
    urgent: true,
  },
  {
    label: "Company Approvals",
    value: "4",
    sub: "Sign-ups awaiting review",
    trend: "Action needed",
    positive: false,
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    urgent: true,
  },
  {
    label: "Pending Transfers",
    value: "5",
    sub: "Charity allocations to process",
    trend: "Action needed",
    positive: false,
    icon: HandCoins,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    urgent: true,
  },
];

export function AdminStatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl p-5 border border-border transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon style={{ width: "18px", height: "18px" }} className={stat.color} />
            </div>
            {stat.urgent && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Urgent
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground leading-none mb-1.5">{stat.value}</p>
          <div className="flex items-center gap-1.5">
            {stat.positive && (
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full text-emerald-800 bg-emerald-50">
                {stat.trend}
              </span>
            )}
            <span className="text-xs text-muted-foreground">{stat.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
