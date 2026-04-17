"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HandCoins, Download, X,
  Building2, User, Heart, Clock, CheckCircle2, XCircle, FileText,
  Search, Info,
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
type AccountType = "company" | "individual";

type FundTransfer = {
  id: string;
  ref: string;
  accountName: string;
  accountId: string;
  accountType: AccountType;
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
  { id: "ft1",  ref: "GIVE-0451", accountName: "KFC Australia Pty Ltd",  accountId: "kfc-au",      accountType: "company",    charity: "Cancer Council Australia",        charityAbn: "91 130 429 061", charityBsb: "062-000", charityAccount: "11223344", amount: 4200.00, requestedAt: "9 Apr 2026, 10:14 AM",  status: "pending"                },
  { id: "ft2",  ref: "GIVE-0452", accountName: "McDonald's Australia",    accountId: "maccas-au",   accountType: "company",    charity: "RSPCA Australia",                 charityAbn: "99 668 654 249", charityBsb: "063-000", charityAccount: "22334455", amount: 3100.00, requestedAt: "9 Apr 2026, 9:02 AM",   status: "pending"                },
  { id: "ft3",  ref: "IGIVE-0101",accountName: "Jane Smith",              accountId: "jane-smith",  accountType: "individual", charity: "Cancer Council Australia",        charityAbn: "91 130 429 061", charityBsb: "062-000", charityAccount: "11223344", amount: 2400.00, requestedAt: "9 Apr 2026, 10:05 AM",  status: "pending"                },
  { id: "ft4",  ref: "GIVE-0453", accountName: "KFC Australia Pty Ltd",  accountId: "kfc-au",      accountType: "company",    charity: "The Salvation Army Australia",    charityAbn: "57 507 607 336", charityBsb: "064-000", charityAccount: "33445566", amount: 1800.00, requestedAt: "8 Apr 2026, 3:30 PM",   status: "pending"                },
  { id: "ft5",  ref: "IGIVE-0102",accountName: "Sarah Jones",             accountId: "sarah-jones", accountType: "individual", charity: "RSPCA Australia",                 charityAbn: "99 668 654 249", charityBsb: "063-000", charityAccount: "22334455", amount: 1800.00, requestedAt: "9 Apr 2026, 8:44 AM",   status: "pending"                },
  { id: "ft6",  ref: "GIVE-0454", accountName: "JB Hi-Fi Limited",       accountId: "jb-hifi",     accountType: "company",    charity: "Beyond Blue",                    charityAbn: "87 093 865 840", charityBsb: "065-000", charityAccount: "44556677", amount: 950.00,  requestedAt: "8 Apr 2026, 11:15 AM",  status: "pending"                },
  { id: "ft7",  ref: "IGIVE-0103",accountName: "Robert Chen",             accountId: "robert-chen", accountType: "individual", charity: "Beyond Blue",                    charityAbn: "87 093 865 840", charityBsb: "065-000", charityAccount: "44556677", amount: 750.00,  requestedAt: "8 Apr 2026, 2:15 PM",   status: "pending"                },
  { id: "ft8",  ref: "GIVE-0455", accountName: "Cotton On Group",        accountId: "cotton-on",   accountType: "company",    charity: "Foodbank Australia",             charityAbn: "34 119 962 177", charityBsb: "066-000", charityAccount: "55667788", amount: 650.00,  requestedAt: "7 Apr 2026, 4:45 PM",   status: "pending"                },
  { id: "ft9",  ref: "GIVE-0441", accountName: "McDonald's Australia",    accountId: "maccas-au",   accountType: "company",    charity: "Cancer Council Australia",        charityAbn: "91 130 429 061", charityBsb: "062-000", charityAccount: "11223344", amount: 5600.00, requestedAt: "5 Apr 2026, 2:00 PM",   status: "completed", abaGenerated: true },
  { id: "ft10", ref: "IGIVE-0091",accountName: "Jane Smith",              accountId: "jane-smith",  accountType: "individual", charity: "RSPCA Australia",                 charityAbn: "99 668 654 249", charityBsb: "063-000", charityAccount: "22334455", amount: 950.00,  requestedAt: "5 Apr 2026, 11:00 AM",  status: "completed", abaGenerated: true },
  { id: "ft11", ref: "GIVE-0442", accountName: "KFC Australia Pty Ltd",  accountId: "kfc-au",      accountType: "company",    charity: "RSPCA Australia",                 charityAbn: "99 668 654 249", charityBsb: "063-000", charityAccount: "22334455", amount: 2400.00, requestedAt: "4 Apr 2026, 9:00 AM",   status: "completed", abaGenerated: true },
  { id: "ft12", ref: "IGIVE-0092",accountName: "Michael Tan",             accountId: "michael-tan", accountType: "individual", charity: "The Salvation Army Australia",    charityAbn: "57 507 607 336", charityBsb: "064-000", charityAccount: "33445566", amount: 400.00,  requestedAt: "4 Apr 2026, 9:30 AM",   status: "completed", abaGenerated: true },
  { id: "ft13", ref: "GIVE-0443", accountName: "JB Hi-Fi Limited",       accountId: "jb-hifi",     accountType: "company",    charity: "Beyond Blue",                    charityAbn: "87 093 865 840", charityBsb: "065-000", charityAccount: "44556677", amount: 1200.00, requestedAt: "3 Apr 2026, 11:30 AM",  status: "declined"               },
  { id: "ft14", ref: "IGIVE-0093",accountName: "Sarah Jones",             accountId: "sarah-jones", accountType: "individual", charity: "Beyond Blue",                    charityAbn: "87 093 865 840", charityBsb: "065-000", charityAccount: "44556677", amount: 600.00,  requestedAt: "3 Apr 2026, 3:45 PM",   status: "declined"               },
];

const STATUS_CONFIG: Record<TransferStatus, { label: string; className: string; icon: React.ElementType }> = {
  pending:    { label: "Pending",    className: "bg-amber-100 text-amber-700 border-amber-200",       icon: Clock        },
  approved:   { label: "Approved",   className: "bg-blue-100 text-blue-700 border-blue-200",          icon: CheckCircle2 },
  processing: { label: "Processing", className: "bg-violet-100 text-violet-700 border-violet-200",    icon: Clock        },
  completed:  { label: "Completed",  className: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  declined:   { label: "Declined",   className: "bg-red-100 text-red-700 border-red-200",             icon: X            },
};

const ACCOUNT_TYPE_CONFIG: Record<AccountType, { label: string; className: string; icon: React.ElementType }> = {
  company:    { label: "Organisation", className: "bg-violet-100 text-violet-700 border-violet-200", icon: Building2 },
  individual: { label: "Individual",   className: "bg-sky-100 text-sky-700 border-sky-200",          icon: User      },
};

type FilterTab = "all" | "pending" | "completed";
type AccountFilter = "all" | "company" | "individual";

export function TransfersPage() {
  const [transfers, setTransfers] = useState(TRANSFERS);
  const [tab, setTab] = useState<FilterTab>("all");
  const [accountFilter, setAccountFilter] = useState<AccountFilter>("all");
  const [search, setSearch] = useState("");
  const [actionDialog, setActionDialog] = useState<{ type: "approve" | "decline"; transfer: FundTransfer } | null>(null);
  const [loading, setLoading] = useState(false);

  const pending   = transfers.filter((t) => t.status === "pending");
  const completed = transfers.filter((t) => t.status === "completed");

  const totalPending   = pending.reduce((s, t) => s + t.amount, 0);
  const totalCompleted = completed.reduce((s, t) => s + t.amount, 0);

  const filtered = transfers.filter((t) => {
    const matchesTab =
      tab === "all"       ? true :
      tab === "pending"   ? t.status === "pending" :
      t.status === "completed" || t.status === "processing" || t.status === "approved";
    const matchesAccount = accountFilter === "all" || t.accountType === accountFilter;
    const matchesSearch =
      t.ref.toLowerCase().includes(search.toLowerCase()) ||
      t.accountName.toLowerCase().includes(search.toLowerCase()) ||
      t.charity.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesAccount && matchesSearch;
  });

  const handleAction = async () => {
    if (!actionDialog) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setTransfers((prev) => prev.map((t) =>
      t.id === actionDialog.transfer.id
        ? { ...t, status: actionDialog.type === "approve" ? "completed" as TransferStatus : "declined" as TransferStatus, abaGenerated: actionDialog.type === "approve" ? true : t.abaGenerated }
        : t
    ));
    setLoading(false);
    setActionDialog(null);
  };

  const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: "all",       label: "All",       count: transfers.length },
    { key: "pending",   label: "Pending",   count: pending.length   },
    { key: "completed", label: "Completed", count: completed.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fund Transfers</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Approve charity fund allocations from company and individual Foundation Accounts and generate ABA files.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending approval",  value: pending.length,   color: "text-amber-600",   bg: "bg-amber-50"   },
          { label: "Pending value",     value: `$${totalPending.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`,   color: "text-amber-700",   bg: "bg-amber-50"   },
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
          {/* Status tabs */}
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

          {/* Account type filter */}
          <div className="flex items-center gap-1 border-l border-border pl-3">
            {(["all", "company", "individual"] as AccountFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setAccountFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  accountFilter === f
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {f === "all" ? "All types" : f === "company" ? "Organisations" : "Individuals"}
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
                const typeConfig = ACCOUNT_TYPE_CONFIG[transfer.accountType];
                const TypeIcon = typeConfig.icon;

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
                      {/* Charity icon */}
                      <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-rose-500" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-foreground">{transfer.charity}</p>
                          {/* Account type badge */}
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 ${typeConfig.className}`}>
                            <TypeIcon className="w-2.5 h-2.5" /> {typeConfig.label}
                          </span>
                          <span className="text-xs text-muted-foreground">← {transfer.accountName}</span>
                          {/* Status badge */}
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
                              className="rounded-xl h-8 px-3 text-xs border-red-200 text-red-800 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
                              onClick={() => setActionDialog({ type: "decline", transfer })}
                            >
                              <XCircle className="w-3.5 h-3.5 mr-1" /> Decline
                            </Button>
                            <Button
                              size="sm"
                              className="rounded-xl h-8 px-3 text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                              onClick={() => setActionDialog({ type: "approve", transfer })}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                            </Button>
                          </>
                        )}
                        {transfer.status === "completed" && transfer.abaGenerated && (
                          <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs rounded-lg">
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
          <DialogContent className={actionDialog.type === "approve" ? "max-w-md" : "max-w-sm"}>
            <DialogHeader>
              <DialogTitle>
                {actionDialog.type === "approve" ? "Approve & generate ABA file?" : "Decline fund transfer?"}
              </DialogTitle>
              <DialogDescription>
                {actionDialog.type === "approve"
                  ? "Approving will immediately generate the ABA file and mark this transfer as completed."
                  : `The ${actionDialog.transfer.accountType === "company" ? "company" : "individual"} will be notified that this allocation was declined.`}
              </DialogDescription>
            </DialogHeader>

            {actionDialog.type === "approve" ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-2">
                  {/* Account type indicator */}
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="text-xs text-muted-foreground">Account type</span>
                    {(() => {
                      const cfg = ACCOUNT_TYPE_CONFIG[actionDialog.transfer.accountType];
                      const Icon = cfg.icon;
                      return (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 ${cfg.className}`}>
                          <Icon className="w-2.5 h-2.5" /> {cfg.label}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Charity</span>
                    <span className="font-semibold text-foreground">{actionDialog.transfer.charity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-medium text-foreground">{actionDialog.transfer.accountName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">BSB</span>
                    <span className="font-medium text-foreground">{actionDialog.transfer.charityBsb}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-medium text-foreground">{actionDialog.transfer.charityAccount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ABN</span>
                    <span className="font-medium text-foreground">{actionDialog.transfer.charityAbn}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-foreground text-base">
                      ${actionDialog.transfer.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })} AUD
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reference</span>
                    <span className="font-medium text-foreground">{actionDialog.transfer.ref}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    The ABA file will be generated in CEMTEX format and made available for download. The account holder will be notified automatically.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-muted/40 border border-border p-3 space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  {(() => {
                    const cfg = ACCOUNT_TYPE_CONFIG[actionDialog.transfer.accountType];
                    const Icon = cfg.icon;
                    return (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 ${cfg.className}`}>
                        <Icon className="w-2.5 h-2.5" /> {cfg.label}
                      </span>
                    );
                  })()}
                </div>
                <p className="text-sm font-semibold text-foreground">{actionDialog.transfer.charity}</p>
                <p className="text-xs text-muted-foreground">From: {actionDialog.transfer.accountName}</p>
                <p className="text-xs text-muted-foreground">Ref: {actionDialog.transfer.ref}</p>
                <p className="text-base font-bold text-foreground mt-1">
                  ${actionDialog.transfer.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })} AUD
                </p>
              </div>
            )}

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
                    {actionDialog.type === "approve" ? "Generating…" : "Processing…"}
                  </span>
                ) : actionDialog.type === "approve" ? (
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Approve & Generate ABA
                  </span>
                ) : "Decline Transfer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
