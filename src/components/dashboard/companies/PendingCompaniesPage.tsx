"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Search, CheckCircle2, XCircle, Clock, ChevronRight, MoreHorizontal, Mail, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type PendingCompany = {
  id: string;
  name: string;
  abn: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  appliedAt: string;
};

const PENDING_COMPANIES: PendingCompany[] = [
  { id: "woolworths",  name: "Woolworths Group",   abn: "88 000 014 675", industry: "Retail",           contactName: "Mark Davies",  contactEmail: "mark.davies@woolworths.com.au",    contactPhone: "+61 2 8885 0000", appliedAt: "Today, 9:14 AM"     },
  { id: "bunnings",   name: "Bunnings Warehouse",  abn: "26 008 672 179", industry: "Home Improvement", contactName: "Lisa Nguyen",  contactEmail: "l.nguyen@bunnings.com.au",         contactPhone: "+61 3 8831 9777", appliedAt: "Today, 7:02 AM"     },
  { id: "village",    name: "Village Cinemas",      abn: "58 003 073 900", industry: "Entertainment",    contactName: "Tom Ricci",    contactEmail: "tricci@villagecinemas.com.au",     contactPhone: "+61 3 9667 6565", appliedAt: "Yesterday, 4:30 PM" },
  { id: "subway",     name: "Subway Australia",     abn: "42 100 448 565", industry: "Food & Beverage",  contactName: "Priya Singh",  contactEmail: "priya@subway.com.au",              contactPhone: "+61 7 3010 4444", appliedAt: "Yesterday, 11:15 AM"},
];

export function PendingCompaniesPage() {
  const [companies, setCompanies] = useState(PENDING_COMPANIES);
  const [search, setSearch] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{ type: "approve" | "deny"; company: PendingCompany } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.abn.includes(search) ||
    c.contactName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = async () => {
    if (!confirmDialog) return;
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setCompanies((prev) => prev.filter((c) => c.id !== confirmDialog.company.id));
    setActionLoading(false);
    setConfirmDialog(null);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pending Approvals</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Review and approve or deny companies requesting Foundation Account access.
        </p>
      </div>

      {/* Summary banner */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {companies.length} {companies.length === 1 ? "company" : "companies"} awaiting review
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            Approve to grant portal access, or deny to decline the sign-up request.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {/* Search bar */}
        <div className="px-5 py-3 border-b border-border flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            {filtered.length} {filtered.length === 1 ? "application" : "applications"}
          </p>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search companies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_180px_200px_72px] gap-4 px-5 py-2 bg-muted/30 border-b border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Company</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Applied</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">Actions</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide" />
        </div>

        <div className="divide-y divide-border/60">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Building2 className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">No pending applications</p>
              <p className="text-xs text-muted-foreground mt-1">All caught up — nothing to review right now.</p>
            </div>
          ) : (
            filtered.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[1fr_180px_200px_72px] gap-4 items-center px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                {/* Company info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{company.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      ABN {company.abn} · {company.industry} · {company.contactName}
                    </p>
                    <p className="text-xs text-muted-foreground/70 truncate flex items-center gap-2">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{company.contactEmail}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{company.contactPhone}</span>
                    </p>
                  </div>
                </div>

                {/* Applied date */}
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {company.appliedAt}
                </div>

                {/* Approve / Deny */}
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl h-8 px-3 text-xs border-red-200 text-red-800 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
                    onClick={() => setConfirmDialog({ type: "deny", company })}
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Decline
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-xl h-8 px-3 text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                    onClick={() => setConfirmDialog({ type: "approve", company })}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                  </Button>
                </div>

                {/* Chevron + More menu */}
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/dashboard/companies/pending/${company.id}`}>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/companies/pending/${company.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-3.5 h-3.5 mr-2" /> Email Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {companies.length} pending applications</p>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
        {confirmDialog && (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.type === "approve" ? "Approve company?" : "Deny sign-up?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog.type === "approve"
                  ? `${confirmDialog.company.name} will be granted access to the Foundation Account portal.`
                  : `${confirmDialog.company.name}'s sign-up request will be declined.`}
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{confirmDialog.company.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">ABN {confirmDialog.company.abn}</p>
              <p className="text-xs text-muted-foreground">{confirmDialog.company.contactEmail}</p>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setConfirmDialog(null)} className="flex-1">Cancel</Button>
              <Button
                onClick={handleAction}
                disabled={actionLoading}
                className={`flex-1 text-white ${
                  confirmDialog.type === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-destructive hover:bg-destructive/90"
                }`}
              >
                {actionLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Processing…
                  </span>
                ) : confirmDialog.type === "approve" ? "Approve" : "Deny"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
