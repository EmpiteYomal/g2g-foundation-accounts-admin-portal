"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Search, Plus, ChevronRight,
  Clock, MoreHorizontal, Mail, Phone,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Status = "pending" | "active" | "invited" | "suspended";

type Company = {
  id: string;
  name: string;
  abn: string;
  industry: string;
  status: Status;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  balance: string;
  joinedAt: string;
  charityCount: number;
};

const COMPANIES: Company[] = [
  { id: "kfc-au",       name: "KFC Australia Pty Ltd",        abn: "51 004 220 518", industry: "Food & Beverage",    status: "active",    contactName: "Jane Smith",     contactEmail: "jane@kfc.com.au",               contactPhone: "+61 2 9274 0000", balance: "$48,392",  joinedAt: "Jan 2025",       charityCount: 5  },
  { id: "maccas-au",    name: "McDonald's Australia",          abn: "43 008 496 928", industry: "Food & Beverage",    status: "active",    contactName: "Paul Moore",     contactEmail: "p.moore@mcdonalds.com.au",       contactPhone: "+61 2 9875 7100", balance: "$124,210", joinedAt: "Mar 2025",       charityCount: 8  },
  { id: "jb-hifi",      name: "JB Hi-Fi Limited",              abn: "80 093 112 396", industry: "Electronics Retail", status: "active",    contactName: "Sarah Lee",      contactEmail: "sarah.lee@jbhifi.com.au",        contactPhone: "+61 3 8530 7333", balance: "$32,840",  joinedAt: "Jun 2025",       charityCount: 4  },
  { id: "cotton-on",    name: "Cotton On Group",               abn: "19 125 161 888", industry: "Fashion Retail",     status: "active",    contactName: "Tom Wilson",     contactEmail: "t.wilson@cottonon.com",          contactPhone: "+61 3 5241 0200", balance: "$18,590",  joinedAt: "Aug 2025",       charityCount: 3  },
  { id: "woolworths",   name: "Woolworths Group",              abn: "88 000 014 675", industry: "Retail",             status: "pending",   contactName: "Mark Davies",    contactEmail: "mark.davies@woolworths.com.au",  contactPhone: "+61 2 8885 0000", balance: "—",        joinedAt: "Today",          charityCount: 0  },
  { id: "bunnings",     name: "Bunnings Warehouse",            abn: "26 008 672 179", industry: "Home Improvement",   status: "pending",   contactName: "Lisa Nguyen",    contactEmail: "l.nguyen@bunnings.com.au",       contactPhone: "+61 3 8831 9777", balance: "—",        joinedAt: "Today",          charityCount: 0  },
  { id: "village",      name: "Village Cinemas",               abn: "58 003 073 900", industry: "Entertainment",      status: "pending",   contactName: "Tom Ricci",      contactEmail: "tricci@villagecinemas.com.au",   contactPhone: "+61 3 9667 6565", balance: "—",        joinedAt: "Yesterday",      charityCount: 0  },
  { id: "subway",       name: "Subway Australia",              abn: "42 100 448 565", industry: "Food & Beverage",    status: "pending",   contactName: "Priya Singh",    contactEmail: "priya@subway.com.au",            contactPhone: "+61 7 3010 4444", balance: "—",        joinedAt: "Yesterday",      charityCount: 0  },
  { id: "danmurphys",   name: "Dan Murphy's",                  abn: "12 004 319 948", industry: "Retail",             status: "invited",   contactName: "Chris Ford",     contactEmail: "c.ford@danmurphys.com.au",       contactPhone: "+61 2 9339 0200", balance: "—",        joinedAt: "Invited 3d ago", charityCount: 0  },
  { id: "officeworks",  name: "Officeworks",                   abn: "36 004 763 526", industry: "Office Retail",      status: "suspended", contactName: "Emma Brown",     contactEmail: "e.brown@officeworks.com.au",     contactPhone: "+61 3 9811 7600", balance: "$2,100",   joinedAt: "May 2025",       charityCount: 2  },
];

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  active:    { label: "Active",    className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  pending:   { label: "Pending",   className: "bg-amber-100 text-amber-700 border-amber-200" },
  invited:   { label: "Invited",   className: "bg-blue-100 text-blue-700 border-blue-200" },
  suspended: { label: "Suspended", className: "bg-red-100 text-red-700 border-red-200" },
};

type FilterTab = "all" | "active" | "invited" | "suspended";
const TABS: { key: FilterTab; label: string }[] = [
  { key: "all",       label: "All" },
  { key: "active",    label: "Active" },
  { key: "invited",   label: "Invited" },
  { key: "suspended", label: "Suspended" },
];

const NON_PENDING = COMPANIES.filter((c) => c.status !== "pending");

export function CompaniesPage() {
  const [companies, setCompanies] = useState(NON_PENDING);
  const [tab, setTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ type: "suspend" | "reinstate"; company: Company } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const filtered = companies.filter((c) => {
    const matchesTab = tab === "all" || c.status === tab;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.abn.includes(search) || c.contactName.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: companies.length,
    active: companies.filter((c) => c.status === "active").length,
    invited: companies.filter((c) => c.status === "invited").length,
    suspended: companies.filter((c) => c.status === "suspended").length,
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setInviteLoading(false);
    setInviteOpen(false);
    setInviteEmail("");
  };

  const handleAction = async () => {
    if (!confirmDialog) return;
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const { type, company } = confirmDialog;
    setCompanies((prev) => prev.map((c) => {
      if (c.id !== company.id) return c;
      if (type === "suspend") return { ...c, status: "suspended" as Status };
      if (type === "reinstate") return { ...c, status: "active" as Status };
      return c;
    }));
    setActionLoading(false);
    setConfirmDialog(null);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            View and manage active, invited, and suspended company accounts.
          </p>
        </div>
        <Button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 rounded-xl h-9 text-sm bg-primary hover:bg-primary/90 text-white flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Invite Company
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active", value: counts.active, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Invited", value: counts.invited, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Suspended", value: counts.suspended, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-border/40 px-4 py-3`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-3 flex-wrap">
          {/* Tab filters */}
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
                {counts[t.key] > 0 && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    tab === t.key ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {counts[t.key]}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Search */}
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

        {/* Table */}
        <div className="divide-y divide-border/60">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">No companies found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search.</p>
            </div>
          ) : (
            filtered.map((company, i) => {
              const status = STATUS_CONFIG[company.status];
              return (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-colors"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">{company.name}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      ABN {company.abn} · {company.industry} · {company.contactName}
                    </p>
                    <p className="text-xs text-muted-foreground/70 truncate flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{company.contactEmail}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{company.contactPhone}</span>
                    </p>
                  </div>

                  {/* Balance */}
                  <div className="hidden md:block text-right flex-shrink-0 w-24">
                    <p className="text-sm font-semibold text-foreground">{company.balance}</p>
                    <p className="text-xs text-muted-foreground">balance</p>
                  </div>

                  {/* Charities */}
                  <div className="hidden lg:block text-right flex-shrink-0 w-20">
                    <p className="text-sm font-semibold text-foreground">{company.charityCount}</p>
                    <p className="text-xs text-muted-foreground">charities</p>
                  </div>

                  {/* Joined */}
                  <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" /> {company.joinedAt}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Link href={`/dashboard/companies/${company.id}`}>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => window.location.href = `/dashboard/companies/${company.id}`}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-3.5 h-3.5 mr-2" /> Email Contact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {company.status === "active" && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setConfirmDialog({ type: "suspend", company })}
                          >
                            Suspend Account
                          </DropdownMenuItem>
                        )}
                        {company.status === "suspended" && (
                          <DropdownMenuItem onClick={() => setConfirmDialog({ type: "reinstate", company })}>
                            Reinstate Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {companies.length} companies</p>
        </div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Invite a Company</DialogTitle>
            <DialogDescription>
              Send an invitation email to a company to sign up for a Foundation Account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Company email address</label>
              <Input
                type="email"
                placeholder="admin@company.com.au"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="h-9 rounded-xl text-sm"
                required
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Company name (optional)</label>
              <Input
                placeholder="Acme Corp"
                className="h-9 rounded-xl text-sm"
              />
            </div>
            <DialogFooter className="gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setInviteOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!inviteEmail.includes("@") || inviteLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                {inviteLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Send Invite
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Action Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
        {confirmDialog && (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {confirmDialog.type === "suspend" && "Suspend account?"}
                {confirmDialog.type === "reinstate" && "Reinstate account?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog.type === "suspend" && `${confirmDialog.company.name}'s access will be suspended immediately.`}
                {confirmDialog.type === "reinstate" && `${confirmDialog.company.name}'s access will be restored.`}
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
                  confirmDialog.type === "reinstate"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-destructive hover:bg-destructive/90"
                }`}
              >
                {actionLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Processing…
                  </span>
                ) : (
                  <>
                    {confirmDialog.type === "suspend" && "Suspend"}
                    {confirmDialog.type === "reinstate" && "Reinstate"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
