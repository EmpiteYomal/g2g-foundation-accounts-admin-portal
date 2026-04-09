"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Search, Download, Check, X, ArrowLeftRight,
  Building2, HandCoins, Settings, User, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AuditEntry = {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  entity: string;
  details: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
};

const ENTRIES: AuditEntry[] = [
  { id: "a1",  timestamp: "9 Apr 2026, 11:32 AM", admin: "Sarah Admin",  action: "Approved",    entity: "Company",       details: "Approved Woolworths Group sign-up request",                            icon: Building2,       iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
  { id: "a2",  timestamp: "9 Apr 2026, 11:14 AM", admin: "Sarah Admin",  action: "Matched",     entity: "Reconciliation",details: "Matched transaction RWUPAY992 to Ridgeway University ($6,167.50)",      icon: ArrowLeftRight,  iconColor: "text-blue-600",    iconBg: "bg-blue-50"    },
  { id: "a3",  timestamp: "9 Apr 2026, 10:58 AM", admin: "James Ops",    action: "Approved",    entity: "Transfer",      details: "Approved GIVE-0451 Cancer Council AU transfer ($4,200.00)",             icon: HandCoins,       iconColor: "text-violet-600",  iconBg: "bg-violet-50"  },
  { id: "a4",  timestamp: "9 Apr 2026, 10:30 AM", admin: "James Ops",    action: "Generated",   entity: "ABA File",      details: "Generated ABA file for GIVE-0441 Cancer Council AU ($5,600.00)",        icon: HandCoins,       iconColor: "text-violet-600",  iconBg: "bg-violet-50"  },
  { id: "a5",  timestamp: "8 Apr 2026, 4:15 PM",  admin: "Anna Finance", action: "Added",       entity: "Charity",       details: "Added OzGreen (ABN 58 003 014 367) to charity registry",               icon: Heart,           iconColor: "text-rose-500",    iconBg: "bg-rose-50"    },
  { id: "a6",  timestamp: "8 Apr 2026, 3:40 PM",  admin: "Sarah Admin",  action: "Denied",      entity: "Company",       details: "Denied Village Cinemas sign-up request",                               icon: Building2,       iconColor: "text-red-600",     iconBg: "bg-red-50"     },
  { id: "a7",  timestamp: "8 Apr 2026, 2:10 PM",  admin: "James Ops",    action: "Updated",     entity: "Company",       details: "Updated charity list for KFC Australia — added Foodbank Australia",     icon: Building2,       iconColor: "text-blue-600",    iconBg: "bg-blue-50"    },
  { id: "a8",  timestamp: "7 Apr 2026, 5:00 PM",  admin: "Anna Finance", action: "Imported",    entity: "Statement",     details: "Imported April bank statement — 34 transactions loaded",                icon: ArrowLeftRight,  iconColor: "text-blue-600",    iconBg: "bg-blue-50"    },
  { id: "a9",  timestamp: "7 Apr 2026, 11:00 AM", admin: "Sarah Admin",  action: "Updated",     entity: "Settings",      details: "Updated ABA file APCA user ID and remitting account",                  icon: Settings,        iconColor: "text-muted-foreground", iconBg: "bg-muted/60" },
  { id: "a10", timestamp: "6 Apr 2026, 9:00 AM",  admin: "James Ops",    action: "Invited",     entity: "Admin User",    details: "Invited anna@goodstack.org as Finance admin",                          icon: User,            iconColor: "text-amber-600",   iconBg: "bg-amber-50"   },
];

const ACTION_COLORS: Record<string, string> = {
  Approved:  "bg-emerald-100 text-emerald-700",
  Denied:    "bg-red-100 text-red-700",
  Matched:   "bg-blue-100 text-blue-700",
  Generated: "bg-violet-100 text-violet-700",
  Added:     "bg-emerald-100 text-emerald-700",
  Updated:   "bg-amber-100 text-amber-700",
  Imported:  "bg-blue-100 text-blue-700",
  Invited:   "bg-blue-100 text-blue-700",
};

export function AuditLogPage() {
  const [search, setSearch] = useState("");
  const [adminFilter, setAdminFilter] = useState("all");

  const filtered = ENTRIES.filter((e) => {
    const matchesSearch = e.details.toLowerCase().includes(search.toLowerCase()) ||
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.entity.toLowerCase().includes(search.toLowerCase());
    const matchesAdmin = adminFilter === "all" || e.admin === adminFilter;
    return matchesSearch && matchesAdmin;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Complete record of all admin actions in the portal.
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl h-9 text-sm gap-1.5">
          <Download className="w-3.5 h-3.5" /> Export Log
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-3 flex-wrap">
          <Select value={adminFilter} onValueChange={(v) => setAdminFilter(v ?? "all")}>
            <SelectTrigger className="w-40 h-8 text-sm rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All admins</SelectItem>
              <SelectItem value="Sarah Admin">Sarah Admin</SelectItem>
              <SelectItem value="James Ops">James Ops</SelectItem>
              <SelectItem value="Anna Finance">Anna Finance</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1" />
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search audit log…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-xl"
            />
          </div>
        </div>

        <div className="divide-y divide-border/60">
          {filtered.map((entry, i) => {
            const Icon = entry.icon;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-muted/10 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg ${entry.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${entry.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${ACTION_COLORS[entry.action] ?? "bg-muted text-muted-foreground"}`}>
                      {entry.action}
                    </span>
                    <span className="text-xs text-muted-foreground">{entry.entity}</span>
                  </div>
                  <p className="text-sm text-foreground mt-0.5">{entry.details}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {entry.admin} · {entry.timestamp}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {ENTRIES.length} entries</p>
        </div>
      </div>
    </div>
  );
}
