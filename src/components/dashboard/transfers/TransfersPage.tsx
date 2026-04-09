"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HandCoins, Download, Check, X, ChevronRight,
  Building2, Heart, Clock, CheckCircle2, FileText,
  AlertCircle, Filter, Search, Info,
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

type TransferStatus = "pending" | "approved" | "processing" | "completed" | "declined";

type FundTransfer = {
  id: string;
  ref: string;
  company: string;
  companyId: string;
  charity: string;
  charityAbn: string;
  charityBsb: string;
  charityAccount: string;
  amount: number;
  requestedAt: string;
  status: TransferStatus;
  abaGenerated?: boolean;
};

const TRANSFERS: FundTransfer[] = [
  { id: "ft1",  ref: "GIVE-0451", company: "KFC Australia Pty Ltd",    companyId: "kfc-au",    charity: "Cancer Council Australia",        charityAbn: "91 130 429 061", charityBsb: "062-000", charityAccount: "11223344", amount: 4200.00, requestedAt: "9 Apr 2026, 10:14 AM",  status: "pending"    },
  { id: "ft2",  ref: "GIVE-0452", company: "McDonald's Australia",      companyId: "maccas-au", charity: "RSPCA Australia",                 charityAbn: "99 668 654 249", charityBsb: "063-000", charityAccount: "22334455", amount: 3100.00, requestedAt: "9 Apr 2026, 9:02 AM",   status: "pending"    },
  { id: "ft3",  ref: "GIVE-0453", company: "KFC Australia Pty Ltd",    companyId: "kfc-au",    charity: "The Salvation Army Australia",    charityAbn: "57 507 607 336", charityBsb: "064-000", charityAccount: "33445566", amount: 1800.00, requestedAt: "8 Apr 2026, 3:30 PM",   status: "pending"    },
  { id: "ft4",  ref: "GIVE-0454", company: "JB Hi-Fi Limited",         companyId: "jb-hifi",   charity: "Beyond Blue",                    charityAbn: "87 093 865 840", charityBsb: "065-000", charityAccount: "44556677", amount: 950.00,  requestedAt: "8 Apr 2026, 11:15 AM",  status: "pending"    },
  { id: "ft5",  ref: "GIVE-0455", company: "Cotton On Group",          companyId: "cotton-on", charity: "Foodbank Australia",             charityAbn: "34 119 962 177", charityBsb: "066-000", charityAccount: "55667788", amount: 650.00,  requestedAt: "7 Apr 2026, 4:45 PM",   status: "pending"    },
  { id: "ft6",  ref: "GIVE-0441", company: "McDonald's Australia",      companyId: "maccas-au", charity: "Cancer Council Australia",        charityAbn: "91 130 429 061", charityBsb: "062-000", charityAccount: "11223344", amount: 5600.00, requestedAt: "5 Apr 2026, 2:00 PM",   status: "completed", abaGenerated: true  },
  { id: "ft7",  ref: "GIVE-0442", company: "KFC Australia Pty Ltd",    companyId: "kfc-au",    charity: "RSPCA Australia",                 charityAbn: "99 668 654 249", charityBsb: "063-000", charityAccount: "22334455", amount: 2400.00, requestedAt: "4 Apr 2026, 9:00 AM",   status: "completed", abaGenerated: true  },
  { id: "ft8",  ref: "GIVE-0443", company: "JB Hi-Fi Limited",         companyId: "jb-hifi",   charity: "Beyond Blue",                    charityAbn: "87 093 865 840", charityBsb: "065-000", charityAccount: "44556677", amount: 1200.00, requestedAt: "3 Apr 2026, 11:30 AM",  status: "declined"   },
];

const STATUS_CONFIG: Record<TransferStatus, { label: string; className: string; icon: React.ElementType }> = {
  pending:    { label: "Pending",    className: "bg-amber-100 text-amber-700 border-amber-200",    icon: Clock         },
  approved:   { label: "Approved",   className: "bg-blue-100 text-blue-700 border-blue-200",       icon: CheckCircle2  },
  processing: { label: "Processing", className: "bg-violet-100 text-violet-700 border-violet-200", icon: Clock         },
  completed:  { label: "Completed",  className: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  declined:   { label: "Declined",   className: "bg-red-100 text-red-700 border-red-200",          icon: X             },
};

type FilterTab = "all" | "pending" | "completed";

export function TransfersPage() {
  const [transfers, setTransfers] = useState(TRANSFERS);
  const [tab, setTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [actionDialog, setActionDialog] = useState<{ type: "approve" | "decline"; transfer: FundTransfer } | null>(null);
  const [abaDialog, setAbaDialog] = useState<FundTransfer | null>(null);
  const [loading, setLoading] = useState(false);

  const pending = transfers.filter((t) => t.status === "pending");
  const completed = transfers.filter((t) => t.status === "completed");

  const totalPending = pending.reduce((s, t) => s + t.amount, 0);
  const totalCompleted = completed.reduce((s, t) => s + t.amount, 0);

  const filtered = transfers.filter((t) => {
    const matchesTab =
      tab === "all" ? true :
      tab === "pending" ? t.status === "pending" :
      t.status === "completed" || t.status === "processing" || t.status === "approved";
    const matchesSearch =
      t.ref.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.charity.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAction = async () => {
    if (!actionDialog) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setTransfers((prev) => prev.map((t) =>
      t.id === actionDialog.transfer.id
        ? { ...t, status: actionDialog.type === "approve" ? "approved" as TransferStatus : "declined" as TransferStatus }
        : t
    ));
    setLoading(false);
    setActionDialog(null);
  };

  const generateAba = async (transfer: FundTransfer) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setTransfers((prev) => prev.map((t) =>
      t.id === transfer.id ? { ...t, status: "completed" as TransferStatus, abaGenerated: true } : t
    ));
    setLoading(false);
    setAbaDialog(null);
  };

  const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: "all",       label: "All",       count: transfers.length },
    { key: "pending",   label: "Pending",   count: pending.length   },
    { key: "completed", label: "Completed", count: completed.length },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fund Transfers</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Approve charity fund allocations and generate ABA files for each transfer.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending approval",  value: pending.length,   color: "text-amber-600",   bg: "bg-amber-50"   },
          { label: "Pending value",     value: `$${totalPending.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`, color: "text-amber-700", bg: "bg-amber-50" },
          { label: "Completed (month)", value: completed.length, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Completed value",   value: `$${totalCompleted.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`, color: "text-emerald-700", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-border/40 px-4 py-3`}>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {/* Filters */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {t.label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  tab === t.key ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search transfers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/60">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3" />
                <p className="text-sm font-medium text-foreground">No transfers here</p>
              </div>
            ) : (
              filtered.map((transfer, i) => {
                const status = STATUS_CONFIG[transfer.status];
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="px-5 py-4 hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-rose-500" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-foreground">{transfer.charity}</p>
                          <span className="text-xs text-muted-foreground">← {transfer.company}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${status.className} flex items-center gap-1`}>
                            <StatusIcon className="w-2.5 h-2.5" /> {status.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {transfer.ref} · Requested {transfer.requestedAt}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          BSB {transfer.charityBsb} · Acc {transfer.charityAccount} · ABN {transfer.charityAbn}
                        </p>
                      </div>

                      {/* Amount */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-base font-bold text-foreground">
                          ${transfer.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-muted-foreground">AUD</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {transfer.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2.5 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => setActionDialog({ type: "decline", transfer })}
                            >
                              <X className="w-3 h-3 mr-1" /> Decline
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 px-2.5 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                              onClick={() => setActionDialog({ type: "approve", transfer })}
                            >
                              <Check className="w-3 h-3 mr-1" /> Approve
                            </Button>
                          </>
                        )}
                        {(transfer.status === "approved") && (
                          <Button
                            size="sm"
                            className="h-7 px-2.5 text-xs rounded-lg bg-primary hover:bg-primary/90 text-white"
                            onClick={() => setAbaDialog(transfer)}
                          >
                            <FileText className="w-3 h-3 mr-1" /> Generate ABA
                          </Button>
                        )}
                        {transfer.status === "completed" && transfer.abaGenerated && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2.5 text-xs rounded-lg"
                          >
                            <Download className="w-3 h-3 mr-1" /> ABA File
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {transfers.length} transfers</p>
        </div>
      </div>

      {/* Approve / Decline Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        {actionDialog && (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {actionDialog.type === "approve" ? "Approve fund transfer?" : "Decline fund transfer?"}
              </DialogTitle>
              <DialogDescription>
                {actionDialog.type === "approve"
                  ? "This will mark the transfer as approved. You'll then generate an ABA file to execute the payment."
                  : "The company will be notified that this allocation was declined."}
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-muted/40 border border-border p-3 space-y-1">
              <p className="text-sm font-semibold text-foreground">{actionDialog.transfer.charity}</p>
              <p className="text-xs text-muted-foreground">From: {actionDialog.transfer.company}</p>
              <p className="text-xs text-muted-foreground">Ref: {actionDialog.transfer.ref}</p>
              <p className="text-base font-bold text-foreground mt-1">
                ${actionDialog.transfer.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })} AUD
              </p>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setActionDialog(null)} className="flex-1">Cancel</Button>
              <Button
                onClick={handleAction}
                disabled={loading}
                className={`flex-1 text-white ${
                  actionDialog.type === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-destructive hover:bg-destructive/90"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Processing…
                  </span>
                ) : actionDialog.type === "approve" ? "Approve Transfer" : "Decline Transfer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* ABA Generation Dialog */}
      <Dialog open={!!abaDialog} onOpenChange={() => setAbaDialog(null)}>
        {abaDialog && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate ABA File</DialogTitle>
              <DialogDescription>
                Review the transfer details then generate the ABA file. The file will be available for download and the company will be notified.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Charity</span>
                  <span className="font-semibold text-foreground">{abaDialog.charity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">BSB</span>
                  <span className="font-medium text-foreground">{abaDialog.charityBsb}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-medium text-foreground">{abaDialog.charityAccount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ABN</span>
                  <span className="font-medium text-foreground">{abaDialog.charityAbn}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-foreground text-base">
                    ${abaDialog.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })} AUD
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-medium text-foreground">{abaDialog.ref}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  The ABA file will be generated in the standard CEMTEX format compatible with Australian banking systems. The company will receive a notification and can view the file from their portal.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setAbaDialog(null)} className="flex-1">Cancel</Button>
              <Button
                onClick={() => generateAba(abaDialog)}
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Generating…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Generate & Download ABA
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
