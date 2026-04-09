"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, XCircle, ChevronRight, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

type Company = {
  id: string;
  name: string;
  abn: string;
  industry: string;
  submittedAt: string;
  contactName: string;
  contactEmail: string;
};

const PENDING: Company[] = [
  { id: "c1", name: "Woolworths Group", abn: "88 000 014 675", industry: "Retail", submittedAt: "Today, 9:14 AM", contactName: "Mark Davies", contactEmail: "mark.davies@woolworths.com.au" },
  { id: "c2", name: "Bunnings Warehouse", abn: "26 008 672 179", industry: "Home Improvement", submittedAt: "Today, 7:02 AM", contactName: "Lisa Nguyen", contactEmail: "l.nguyen@bunnings.com.au" },
  { id: "c3", name: "Village Cinemas", abn: "58 003 073 900", industry: "Entertainment", submittedAt: "Yesterday, 4:30 PM", contactName: "Tom Ricci", contactEmail: "tricci@villagecinemas.com.au" },
  { id: "c4", name: "Subway Australia", abn: "42 100 448 565", industry: "Food & Beverage", submittedAt: "Yesterday, 11:15 AM", contactName: "Priya Singh", contactEmail: "priya@subway.com.au" },
];

export function AdminPendingCompanies() {
  const [companies, setCompanies] = useState(PENDING);
  const [confirmDialog, setConfirmDialog] = useState<{ type: "approve" | "deny"; company: Company } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!confirmDialog) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setCompanies((prev) => prev.filter((c) => c.id !== confirmDialog.company.id));
    setLoading(false);
    setConfirmDialog(null);
  };

  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Pending Company Approvals</h2>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
            <Check className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-foreground">All caught up</p>
          <p className="text-xs text-muted-foreground mt-1">No pending company sign-ups.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">Pending Company Approvals</h2>
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              {companies.length}
            </span>
          </div>
          <Link href="/dashboard/companies" className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-border/60">
          {companies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{company.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  ABN {company.abn} · {company.industry}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="w-3 h-3" />
                {company.submittedAt}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
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
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
        {confirmDialog && (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.type === "approve" ? "Approve company?" : "Deny sign-up?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog.type === "approve"
                  ? `${confirmDialog.company.name} will be granted access to the Foundation Accounts portal. They'll receive a welcome email.`
                  : `${confirmDialog.company.name}'s sign-up request will be declined. You can provide a reason via email.`}
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{confirmDialog.company.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">ABN {confirmDialog.company.abn}</p>
              <p className="text-xs text-muted-foreground">Contact: {confirmDialog.company.contactName} · {confirmDialog.company.contactEmail}</p>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setConfirmDialog(null)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleAction}
                disabled={loading}
                className={`flex-1 ${confirmDialog.type === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-destructive hover:bg-destructive/90"} text-white`}
              >
                {loading ? (
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
    </>
  );
}
