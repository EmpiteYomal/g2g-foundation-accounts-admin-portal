"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Download, TrendingUp, Building2, Heart,
  ArrowLeftRight, Calendar, Filter, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const REPORTS = [
  {
    id: "r1",
    title: "Q1 2026 Foundation Accounts Summary",
    description: "All company foundation account activity, reconciliation status, and fund transfers for Jan–Mar 2026.",
    period: "Jan–Mar 2026",
    generatedAt: "1 Apr 2026",
    type: "Quarterly",
    size: "284 KB",
  },
  {
    id: "r2",
    title: "Q4 2025 Foundation Accounts Summary",
    description: "All company foundation account activity, reconciliation status, and fund transfers for Oct–Dec 2025.",
    period: "Oct–Dec 2025",
    generatedAt: "2 Jan 2026",
    type: "Quarterly",
    size: "312 KB",
  },
  {
    id: "r3",
    title: "March 2026 Bank Reconciliation Report",
    description: "Full reconciliation log for March 2026 — matched transactions, unmatched items, and resolutions.",
    period: "Mar 2026",
    generatedAt: "1 Apr 2026",
    type: "Reconciliation",
    size: "145 KB",
  },
  {
    id: "r4",
    title: "March 2026 Charity Fund Transfers",
    description: "All approved charity fund transfers for March 2026, including ABA file references.",
    period: "Mar 2026",
    generatedAt: "1 Apr 2026",
    type: "Transfers",
    size: "98 KB",
  },
  {
    id: "r5",
    title: "Company Onboarding Summary — 2026",
    description: "New company sign-ups, approvals, denials, and invitations for the year to date.",
    period: "Jan–Apr 2026",
    generatedAt: "9 Apr 2026",
    type: "Companies",
    size: "62 KB",
  },
];

const METRICS = [
  { label: "Total Funds Held",    value: "$1,284,390", change: "+12.4%", positive: true  },
  { label: "Total Disbursed",     value: "$423,760",   change: "+18.2%", positive: true  },
  { label: "Active Companies",    value: "14",         change: "+3",     positive: true  },
  { label: "Charities Supported", value: "10",         change: "+2",     positive: true  },
];

const TYPE_COLORS: Record<string, string> = {
  Quarterly:      "bg-violet-100 text-violet-700",
  Reconciliation: "bg-blue-100 text-blue-700",
  Transfers:      "bg-emerald-100 text-emerald-700",
  Companies:      "bg-amber-100 text-amber-700",
};

export function AdminReportsPage() {
  const [period, setPeriod] = useState("q1-2026");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Generate and download reports for foundation accounts, reconciliation, and fund transfers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v ?? "q1-2026")}>
            <SelectTrigger className="w-40 h-9 text-sm rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2026">Q1 2026</SelectItem>
              <SelectItem value="q4-2025">Q4 2025</SelectItem>
              <SelectItem value="q3-2025">Q3 2025</SelectItem>
              <SelectItem value="ytd-2026">YTD 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="h-9 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Generating…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5" /> Generate Report
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-4 border border-border"
          >
            <p className="text-xs text-muted-foreground font-medium mb-1">{m.label}</p>
            <p className="text-xl font-bold text-foreground">{m.value}</p>
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full mt-1.5 inline-block ${
              m.positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}>
              {m.change} vs last period
            </span>
          </motion.div>
        ))}
      </div>

      {/* Giving by charity — simplified bar chart */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Fund Distribution by Charity — Q1 2026</h2>
        <div className="space-y-3">
          {[
            { name: "Australian Red Cross",         amount: 341280, pct: 80 },
            { name: "Cancer Council Australia",     amount: 284390, pct: 67 },
            { name: "The Salvation Army Australia", amount: 198200, pct: 47 },
            { name: "RSPCA Australia",              amount: 112840, pct: 27 },
            { name: "Beyond Blue",                  amount: 94100,  pct: 22 },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-36 text-xs text-muted-foreground truncate flex-shrink-0">{item.name}</div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <div className="text-xs font-semibold text-foreground w-20 text-right flex-shrink-0">
                ${item.amount.toLocaleString("en-AU")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available reports */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Available Reports</h2>
        </div>
        <div className="divide-y divide-border/60">
          {REPORTS.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-muted/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">{report.title}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${TYPE_COLORS[report.type]}`}>
                    {report.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {report.period} · Generated {report.generatedAt} · {report.size}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs rounded-lg flex-shrink-0 gap-1"
              >
                <Download className="w-3 h-3" /> Download
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
