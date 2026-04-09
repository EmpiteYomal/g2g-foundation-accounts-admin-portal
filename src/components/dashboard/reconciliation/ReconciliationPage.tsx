"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight, Upload, Check, X, Search, ChevronDown,
  Building2, CheckCircle2, AlertCircle, Clock, Info,
  RefreshCw, Download, Filter, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MatchStatus = "auto-matched" | "manual-matched" | "unmatched" | "ignored";

type BankTransaction = {
  id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  bsb: string;
  accountNo: string;
  status: MatchStatus;
  matchedCompany?: string;
  matchedCompanyId?: string;
  confidence?: number;
};

const TRANSACTIONS: BankTransaction[] = [
  {
    id: "bt1", date: "09 Apr 2026", description: "PAYMENT RIDGEWAY UNIVERSITY",
    reference: "RWUPAY992", amount: 6167.50, bsb: "062-000", accountNo: "10249876",
    status: "auto-matched", matchedCompany: "Ridgeway University", matchedCompanyId: "ridgeway", confidence: 98,
  },
  {
    id: "bt2", date: "09 Apr 2026", description: "PAYMENT TUITION PROPERTY MGMT",
    reference: "PROP4491", amount: 1181.25, bsb: "062-111", accountNo: "20381923",
    status: "auto-matched", matchedCompany: "Tuition Property Management", matchedCompanyId: "tuition-prop", confidence: 95,
  },
  {
    id: "bt3", date: "08 Apr 2026", description: "CITY LIMOUSINES AHNM24",
    reference: "AHNM24", amount: 100.50, bsb: "063-000", accountNo: "30123456",
    status: "unmatched",
  },
  {
    id: "bt4", date: "08 Apr 2026", description: "PAYMENT GATEWAY MOTORS",
    reference: "GWMOT881", amount: 411.36, bsb: "062-500", accountNo: "40293847",
    status: "auto-matched", matchedCompany: "Gateway Motors", matchedCompanyId: "gateway-motors", confidence: 100,
  },
  {
    id: "bt5", date: "08 Apr 2026", description: "E-BANK 365",
    reference: "EBANK365", amount: 1000.00, bsb: "064-000", accountNo: "50123789",
    status: "unmatched",
  },
  {
    id: "bt6", date: "07 Apr 2026", description: "7-ELEVEN STORES PTY LTD",
    reference: "7EL00213", amount: 52.50, bsb: "065-000", accountNo: "60293847",
    status: "unmatched",
  },
  {
    id: "bt7", date: "07 Apr 2026", description: "SWANSTON SECURITY",
    reference: "SWAN992", amount: 58.00, bsb: "066-000", accountNo: "70293847",
    status: "unmatched",
  },
  {
    id: "bt8", date: "06 Apr 2026", description: "PAYMENT RIDGEWAY BANKING CORP BANK FEES",
    reference: "RBCFEE04", amount: 13.00, bsb: "062-000", accountNo: "10249876",
    status: "auto-matched", matchedCompany: "Ridgeway Banking Corporation", matchedCompanyId: "ridgeway-bank", confidence: 92,
  },
  {
    id: "bt9", date: "06 Apr 2026", description: "COPPER ST BAKERY",
    reference: "CSB0044", amount: 10.75, bsb: "067-000", accountNo: "80293847",
    status: "unmatched",
  },
  {
    id: "bt10", date: "05 Apr 2026", description: "CENTRAL CITY PARKING",
    reference: "CCP1234", amount: 12.00, bsb: "068-000", accountNo: "90293847",
    status: "unmatched",
  },
  {
    id: "bt11", date: "04 Apr 2026", description: "KFC AUSTRALIA PTY LTD TRANSFER",
    reference: "KFCAU0042", amount: 12450.00, bsb: "063-000", accountNo: "10249876",
    status: "auto-matched", matchedCompany: "KFC Australia Pty Ltd", matchedCompanyId: "kfc-au", confidence: 99,
  },
  {
    id: "bt12", date: "03 Apr 2026", description: "MCDONALD'S AUSTRALIA TRANSFER",
    reference: "MCDAU0018", amount: 8200.00, bsb: "064-000", accountNo: "20381923",
    status: "auto-matched", matchedCompany: "McDonald's Australia", matchedCompanyId: "maccas-au", confidence: 97,
  },
];

const COMPANIES = [
  { id: "kfc-au",           name: "KFC Australia Pty Ltd" },
  { id: "maccas-au",        name: "McDonald's Australia" },
  { id: "ridgeway",         name: "Ridgeway University" },
  { id: "ridgeway-bank",    name: "Ridgeway Banking Corporation" },
  { id: "tuition-prop",     name: "Tuition Property Management" },
  { id: "gateway-motors",   name: "Gateway Motors" },
  { id: "jb-hifi",          name: "JB Hi-Fi Limited" },
  { id: "cotton-on",        name: "Cotton On Group" },
];

type FilterTab = "all" | "unmatched" | "matched" | "ignored";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all",       label: "All" },
  { key: "unmatched", label: "Needs Matching" },
  { key: "matched",   label: "Matched" },
  { key: "ignored",   label: "Ignored" },
];

export function ReconciliationPage() {
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [tab, setTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [matchDialog, setMatchDialog] = useState<BankTransaction | null>(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const counts = {
    all: transactions.length,
    unmatched: transactions.filter((t) => t.status === "unmatched").length,
    matched: transactions.filter((t) => t.status === "auto-matched" || t.status === "manual-matched").length,
    ignored: transactions.filter((t) => t.status === "ignored").length,
  };

  const totalIn = transactions.reduce((s, t) => s + t.amount, 0);
  const matchedIn = transactions.filter((t) => t.status !== "unmatched" && t.status !== "ignored").reduce((s, t) => s + t.amount, 0);

  const filtered = transactions.filter((t) => {
    const matchesTab =
      tab === "all" ? true :
      tab === "unmatched" ? t.status === "unmatched" :
      tab === "matched" ? (t.status === "auto-matched" || t.status === "manual-matched") :
      t.status === "ignored";
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleMatch = async () => {
    if (!matchDialog || !selectedCompany) return;
    setMatchLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const company = COMPANIES.find((c) => c.id === selectedCompany);
    setTransactions((prev) => prev.map((t) =>
      t.id === matchDialog.id
        ? { ...t, status: "manual-matched" as MatchStatus, matchedCompany: company?.name, matchedCompanyId: selectedCompany }
        : t
    ));
    setMatchLoading(false);
    setMatchDialog(null);
    setSelectedCompany("");
  };

  const handleIgnore = (txId: string) => {
    setTransactions((prev) => prev.map((t) => t.id === txId ? { ...t, status: "ignored" as MatchStatus } : t));
  };

  const handleUnmatch = (txId: string) => {
    setTransactions((prev) => prev.map((t) =>
      t.id === txId ? { ...t, status: "unmatched" as MatchStatus, matchedCompany: undefined, matchedCompanyId: undefined } : t
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bank Reconciliation</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Match incoming bank transactions to company foundation accounts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl h-9 text-sm gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
          <Button
            size="sm"
            className="rounded-xl h-9 text-sm gap-1.5 bg-primary hover:bg-primary/90 text-white"
            onClick={() => setImportOpen(true)}
          >
            <Upload className="w-3.5 h-3.5" /> Import Statement
          </Button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Statement total",   value: `$${totalIn.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`,   color: "text-foreground",    bg: "bg-white" },
          { label: "Matched",           value: `$${matchedIn.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`, color: "text-emerald-600",   bg: "bg-emerald-50" },
          { label: "Transactions",      value: `${counts.all}`,                                                        color: "text-foreground",    bg: "bg-white" },
          { label: "Needs matching",    value: `${counts.unmatched}`,                                                  color: "text-amber-600",     bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-border px-4 py-3`}>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Auto-match info banner */}
      {counts.matched > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">{counts.matched} transactions</span> were auto-matched based on known bank account numbers. Review and confirm below.
          </p>
        </div>
      )}

      {/* Main table */}
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
                  {counts[t.key]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search transactions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_160px] gap-4 px-5 py-2 bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Description</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status / Match</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/60">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3" />
                <p className="text-sm font-medium text-foreground">All done here</p>
                <p className="text-xs text-muted-foreground mt-1">No transactions match this filter.</p>
              </div>
            ) : (
              filtered.map((tx, i) => {
                const isMatched = tx.status === "auto-matched" || tx.status === "manual-matched";
                const isIgnored = tx.status === "ignored";

                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ delay: i * 0.02 }}
                    className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_160px] gap-2 md:gap-4 px-5 py-3.5 items-center transition-colors hover:bg-muted/10 ${
                      isMatched ? "bg-emerald-50/40" : isIgnored ? "bg-muted/30 opacity-60" : ""
                    }`}
                  >
                    {/* Description */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {isMatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                        {!isMatched && !isIgnored && <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                        {isIgnored && <X className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                        <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 ml-5.5">
                        Ref: {tx.reference} · BSB {tx.bsb} · {tx.accountNo}
                      </p>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-muted-foreground hidden md:block">{tx.date}</p>

                    {/* Amount */}
                    <p className="text-sm font-semibold text-foreground hidden md:block">
                      ${tx.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })}
                    </p>

                    {/* Status / Match */}
                    <div className="hidden md:block">
                      {isMatched ? (
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                              tx.status === "auto-matched"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              {tx.status === "auto-matched" ? "Auto" : "Manual"}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-700 font-medium">{tx.matchedCompany}</p>
                          {tx.confidence && (
                            <p className="text-[10px] text-muted-foreground">{tx.confidence}% confidence</p>
                          )}
                        </div>
                      ) : isIgnored ? (
                        <span className="text-xs text-muted-foreground">Ignored</span>
                      ) : (
                        <span className="text-xs text-amber-600 font-medium">Unmatched</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!isMatched && !isIgnored && (
                        <>
                          <Button
                            size="sm"
                            className="h-7 px-2.5 text-xs rounded-lg bg-primary hover:bg-primary/90 text-white"
                            onClick={() => setMatchDialog(tx)}
                          >
                            Match
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2.5 text-xs rounded-lg"
                            onClick={() => handleIgnore(tx.id)}
                          >
                            Ignore
                          </Button>
                        </>
                      )}
                      {isMatched && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2.5 text-xs rounded-lg"
                          onClick={() => handleUnmatch(tx.id)}
                        >
                          Unmatch
                        </Button>
                      )}
                      {isIgnored && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2.5 text-xs rounded-lg"
                          onClick={() => setTransactions((prev) => prev.map((t) => t.id === tx.id ? { ...t, status: "unmatched" as MatchStatus } : t))}
                        >
                          Restore
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {transactions.length} transactions</p>
          {counts.unmatched === 0 && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> All transactions reconciled
            </div>
          )}
        </div>
      </div>

      {/* Match Dialog */}
      <Dialog open={!!matchDialog} onOpenChange={() => { setMatchDialog(null); setSelectedCompany(""); }}>
        {matchDialog && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Match Transaction to Company</DialogTitle>
              <DialogDescription>
                Select the company foundation account this bank transaction belongs to.
                Once matched, this bank account will be remembered for future auto-matching.
              </DialogDescription>
            </DialogHeader>

            {/* Transaction summary */}
            <div className="rounded-xl bg-muted/40 border border-border p-3 space-y-1">
              <p className="text-sm font-semibold text-foreground">{matchDialog.description}</p>
              <p className="text-xs text-muted-foreground">Ref: {matchDialog.reference} · {matchDialog.date}</p>
              <p className="text-xs text-muted-foreground">BSB {matchDialog.bsb} · Acc {matchDialog.accountNo}</p>
              <p className="text-sm font-bold text-foreground mt-1">
                ${matchDialog.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Company Foundation Account</label>
              <Select value={selectedCompany} onValueChange={(v) => setSelectedCompany(v ?? "")}>
                <SelectTrigger className="rounded-xl h-9 text-sm">
                  <SelectValue placeholder="Select company…" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                BSB {matchDialog.bsb} · {matchDialog.accountNo} will be saved and auto-matched in future statements.
              </p>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => { setMatchDialog(null); setSelectedCompany(""); }} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleMatch}
                disabled={!selectedCompany || matchLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                {matchLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Matching…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5" /> Confirm Match
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import Bank Statement</DialogTitle>
            <DialogDescription>
              Upload a CSV or OFX bank statement file. Transactions will be loaded and auto-matched where possible.
            </DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/40 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">Drop file here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">Supports CSV, OFX, QIF formats</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Statement period</label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" className="h-9 text-sm rounded-xl" defaultValue="2026-04-01" />
              <Input type="date" className="h-9 text-sm rounded-xl" defaultValue="2026-04-09" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setImportOpen(false)} className="flex-1">Cancel</Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={() => setImportOpen(false)}>
              <Upload className="w-3.5 h-3.5 mr-1.5" /> Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
