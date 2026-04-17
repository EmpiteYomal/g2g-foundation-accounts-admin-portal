"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Search, CheckCircle2, XCircle, Clock, ChevronRight, MoreHorizontal, Mail, Phone, UserCircle2,
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

type PendingIndividual = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedAt: string;
};

const ADMIN_USERS = [
  { id: "sa", name: "Sarah Admin",  initials: "SA", email: "sarah@goodstack.org"    },
  { id: "jt", name: "James Taylor", initials: "JT", email: "j.taylor@goodstack.org" },
  { id: "mp", name: "Maria Patel",  initials: "MP", email: "m.patel@goodstack.org"  },
  { id: "rl", name: "Ryan Lee",     initials: "RL", email: "r.lee@goodstack.org"    },
];

const PENDING_INDIVIDUALS: PendingIndividual[] = [
  { id: "anna-liu",       name: "Anna Liu",       email: "anna.liu@gmail.com",       phone: "+61 411 222 333", appliedAt: "Today, 10:02 AM"     },
  { id: "james-morrison", name: "James Morrison", email: "j.morrison@icloud.com",    phone: "+61 422 333 444", appliedAt: "Today, 8:47 AM"      },
  { id: "priya-mehta",    name: "Priya Mehta",    email: "priya.mehta@hotmail.com",  phone: "+61 433 444 555", appliedAt: "Yesterday, 3:21 PM"  },
];

export function PendingIndividualsPage() {
  const [individuals, setIndividuals] = useState(PENDING_INDIVIDUALS);
  const [search, setSearch] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{ type: "approve" | "deny"; individual: PendingIndividual } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(null);

  const filtered = individuals.filter((ind) =>
    ind.name.toLowerCase().includes(search.toLowerCase()) ||
    ind.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = async () => {
    if (!confirmDialog) return;
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setIndividuals((prev) => prev.filter((ind) => ind.id !== confirmDialog.individual.id));
    setActionLoading(false);
    setConfirmDialog(null);
    setSelectedManagerId(null);
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pending Approvals</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Review and approve or deny individuals requesting a personal Foundation Account.
        </p>
      </div>

      {/* Summary banner */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {individuals.length} {individuals.length === 1 ? "individual" : "individuals"} awaiting review
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            Approve to grant portal access, or deny to decline the sign-up request.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            {filtered.length} {filtered.length === 1 ? "application" : "applications"}
          </p>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search individuals…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_180px_200px_72px] gap-4 px-5 py-2 bg-muted/30 border-b border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Individual</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Applied</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">Actions</p>
          <p />
        </div>

        <div className="divide-y divide-border/60">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <User className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">No pending applications</p>
              <p className="text-xs text-muted-foreground mt-1">All caught up — nothing to review right now.</p>
            </div>
          ) : (
            filtered.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[1fr_180px_200px_72px] gap-4 items-center px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                {/* Individual info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">{getInitials(ind.name)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{ind.name}</p>
                    <p className="text-xs text-muted-foreground/70 truncate flex items-center gap-2">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{ind.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{ind.phone}</span>
                    </p>
                  </div>
                </div>

                {/* Applied date */}
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {ind.appliedAt}
                </div>

                {/* Approve / Deny */}
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl h-8 px-3 text-xs border-red-200 text-red-800 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
                    onClick={() => setConfirmDialog({ type: "deny", individual: ind })}
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Decline
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-xl h-8 px-3 text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                    onClick={() => setConfirmDialog({ type: "approve", individual: ind })}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                  </Button>
                </div>

                {/* Chevron + More */}
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/dashboard/individuals/pending/${ind.id}`}>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => window.location.href = `/dashboard/individuals/pending/${ind.id}`}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-3.5 h-3.5 mr-2" /> Email Individual
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {individuals.length} pending applications</p>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog
        open={!!confirmDialog}
        onOpenChange={() => { setConfirmDialog(null); setSelectedManagerId(null); }}
      >
        {confirmDialog && (
          <DialogContent className={confirmDialog.type === "approve" ? "max-w-md" : "max-w-sm"}>
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.type === "approve" ? "Approve individual?" : "Deny sign-up?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog.type === "approve"
                  ? `${confirmDialog.individual.name} will be granted access to a personal Foundation Account.`
                  : `${confirmDialog.individual.name}'s sign-up request will be declined.`}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{confirmDialog.individual.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{confirmDialog.individual.email}</p>
              <p className="text-xs text-muted-foreground">{confirmDialog.individual.phone}</p>
            </div>

            {/* Account manager picker — approve only */}
            {confirmDialog.type === "approve" && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <UserCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-xs font-semibold text-foreground">Assign Account Manager</p>
                  <span className="text-xs text-muted-foreground">(optional)</span>
                </div>
                <div className="space-y-1.5">
                  {ADMIN_USERS.map((admin) => (
                    <button
                      key={admin.id}
                      onClick={() => setSelectedManagerId((prev) => prev === admin.id ? null : admin.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all text-left ${
                        selectedManagerId === admin.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{admin.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight">{admin.name}</p>
                        <p className="text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                      {selectedManagerId === admin.id && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => { setConfirmDialog(null); setSelectedManagerId(null); }}
                className="flex-1"
              >
                Cancel
              </Button>
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
