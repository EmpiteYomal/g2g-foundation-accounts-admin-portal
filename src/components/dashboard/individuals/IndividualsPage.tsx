"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Search, Plus, ChevronRight,
  Clock, MoreHorizontal, Mail, Phone, UserCircle2,
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Status = "active" | "invited" | "suspended";

type AdminUser = {
  id: string;
  name: string;
  initials: string;
  email: string;
};

const ADMIN_USERS: AdminUser[] = [
  { id: "sa", name: "Sarah Admin",  initials: "SA", email: "sarah@goodstack.org"    },
  { id: "jt", name: "James Taylor", initials: "JT", email: "j.taylor@goodstack.org" },
  { id: "mp", name: "Maria Patel",  initials: "MP", email: "m.patel@goodstack.org"  },
  { id: "rl", name: "Ryan Lee",     initials: "RL", email: "r.lee@goodstack.org"    },
];

type Individual = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: Status;
  balance: string;
  charityCount: number;
  joinedAt: string;
  accountManagerId: string | null;
  familyMemberCount: number;
};

const INDIVIDUALS: Individual[] = [
  { id: "jane-smith",    name: "Jane Smith",    email: "jane.smith@gmail.com",       phone: "+61 412 345 678", status: "active",    balance: "$12,450",  charityCount: 4, joinedAt: "Jan 2025",        accountManagerId: "sa",  familyMemberCount: 3 },
  { id: "robert-chen",  name: "Robert Chen",   email: "r.chen@outlook.com",          phone: "+61 423 567 890", status: "active",    balance: "$8,200",   charityCount: 2, joinedAt: "Mar 2025",        accountManagerId: "jt",  familyMemberCount: 2 },
  { id: "sarah-jones",  name: "Sarah Jones",   email: "sarah.jones@icloud.com",      phone: "+61 434 678 901", status: "active",    balance: "$31,080",  charityCount: 7, joinedAt: "Jun 2025",        accountManagerId: "mp",  familyMemberCount: 4 },
  { id: "michael-tan",  name: "Michael Tan",   email: "m.tan@gmail.com",             phone: "+61 445 789 012", status: "active",    balance: "$5,320",   charityCount: 1, joinedAt: "Aug 2025",        accountManagerId: null,  familyMemberCount: 1 },
  { id: "emily-white",  name: "Emily White",   email: "emily.white@hotmail.com",     phone: "+61 456 890 123", status: "invited",   balance: "—",        charityCount: 0, joinedAt: "Invited 2d ago",  accountManagerId: "rl",  familyMemberCount: 0 },
  { id: "david-nguyen", name: "David Nguyen",  email: "d.nguyen@gmail.com",          phone: "+61 467 901 234", status: "suspended", balance: "$740",     charityCount: 1, joinedAt: "May 2025",        accountManagerId: "sa",  familyMemberCount: 2 },
];

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  active:    { label: "Active",    className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
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

export function IndividualsPage() {
  const [individuals, setIndividuals] = useState(INDIVIDUALS);
  const [tab, setTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ type: "suspend" | "reinstate"; individual: Individual } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [assignDialog, setAssignDialog] = useState<Individual | null>(null);
  const [assignSelected, setAssignSelected] = useState<string>("");
  const [assignLoading, setAssignLoading] = useState(false);

  const filtered = individuals.filter((ind) => {
    const matchesTab = tab === "all" || ind.status === tab;
    const matchesSearch =
      ind.name.toLowerCase().includes(search.toLowerCase()) ||
      ind.email.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: individuals.length,
    active: individuals.filter((i) => i.status === "active").length,
    invited: individuals.filter((i) => i.status === "invited").length,
    suspended: individuals.filter((i) => i.status === "suspended").length,
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
    const { type, individual } = confirmDialog;
    setIndividuals((prev) => prev.map((ind) => {
      if (ind.id !== individual.id) return ind;
      if (type === "suspend") return { ...ind, status: "suspended" as Status };
      if (type === "reinstate") return { ...ind, status: "active" as Status };
      return ind;
    }));
    setActionLoading(false);
    setConfirmDialog(null);
  };

  const handleAssign = async () => {
    if (!assignDialog) return;
    setAssignLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIndividuals((prev) => prev.map((ind) =>
      ind.id === assignDialog.id ? { ...ind, accountManagerId: assignSelected || null } : ind
    ));
    setAssignLoading(false);
    setAssignDialog(null);
    setAssignSelected("");
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Individuals</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            View and manage active, invited, and suspended individual Foundation Accounts.
          </p>
        </div>
        <Button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 rounded-xl h-9 text-sm bg-primary hover:bg-primary/90 text-white flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Invite Individual
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active",    value: counts.active,    color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Invited",   value: counts.invited,   color: "text-blue-600",    bg: "bg-blue-50"    },
          { label: "Suspended", value: counts.suspended, color: "text-red-600",     bg: "bg-red-50"     },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-border/40 px-4 py-3`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
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
        <div className="hidden lg:grid grid-cols-[2fr_160px_100px_80px_130px_72px] gap-4 px-5 py-2 bg-muted/30 border-b border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Individual</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Account Manager</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Balance</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">Charities</p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Joined</p>
          <p />
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/60">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">No individuals found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search.</p>
            </div>
          ) : (
            filtered.map((ind, i) => {
              const status = STATUS_CONFIG[ind.status];
              return (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-1 lg:grid-cols-[2fr_160px_100px_80px_130px_72px] gap-4 px-5 py-3.5 items-center hover:bg-muted/20 transition-colors"
                >
                  {/* Main info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-bold">{getInitials(ind.name)}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">{ind.name}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.className}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/70 truncate flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{ind.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{ind.phone}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {ind.familyMemberCount} family {ind.familyMemberCount === 1 ? "member" : "members"}
                      </p>
                    </div>
                  </div>

                  {/* Account Manager */}
                  <div className="hidden lg:flex items-center gap-1.5 min-w-0">
                    {(() => {
                      const mgr = ADMIN_USERS.find((a) => a.id === ind.accountManagerId);
                      return mgr ? (
                        <>
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-primary">{mgr.initials}</span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate">{mgr.name}</span>
                        </>
                      ) : (
                        <button
                          onClick={() => { setAssignDialog(ind); setAssignSelected(""); }}
                          className="flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-primary transition-colors"
                        >
                          <UserCircle2 className="w-3.5 h-3.5" /> Assign
                        </button>
                      );
                    })()}
                  </div>

                  {/* Balance */}
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-semibold text-foreground">{ind.balance}</p>
                    <p className="text-xs text-muted-foreground">balance</p>
                  </div>

                  {/* Charities */}
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-semibold text-foreground">{ind.charityCount}</p>
                    <p className="text-xs text-muted-foreground">charities</p>
                  </div>

                  {/* Joined */}
                  <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 flex-shrink-0" /> {ind.joinedAt}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 justify-end">
                    <Link href={`/dashboard/individuals/${ind.id}`}>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => window.location.href = `/dashboard/individuals/${ind.id}`}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-3.5 h-3.5 mr-2" /> Email Individual
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setAssignDialog(ind); setAssignSelected(ind.accountManagerId ?? ""); }}>
                          <UserCircle2 className="w-3.5 h-3.5 mr-2" /> Assign Account Manager
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {ind.status === "active" && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setConfirmDialog({ type: "suspend", individual: ind })}
                          >
                            Suspend Account
                          </DropdownMenuItem>
                        )}
                        {ind.status === "suspended" && (
                          <DropdownMenuItem onClick={() => setConfirmDialog({ type: "reinstate", individual: ind })}>
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
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {individuals.length} individuals</p>
        </div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Invite an Individual</DialogTitle>
            <DialogDescription>
              Send an invitation email to a person to sign up for a personal Foundation Account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email address</label>
              <Input
                type="email"
                placeholder="person@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="h-9 rounded-xl text-sm"
                required
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full name (optional)</label>
              <Input
                placeholder="Jane Smith"
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
                {confirmDialog.type === "suspend" ? "Suspend account?" : "Reinstate account?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog.type === "suspend"
                  ? `${confirmDialog.individual.name}'s access will be suspended immediately.`
                  : `${confirmDialog.individual.name}'s access will be restored.`}
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{confirmDialog.individual.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{confirmDialog.individual.email}</p>
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
                ) : confirmDialog.type === "suspend" ? "Suspend" : "Reinstate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Assign Account Manager Dialog */}
      <Dialog open={!!assignDialog} onOpenChange={() => { setAssignDialog(null); setAssignSelected(""); }}>
        {assignDialog && (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Assign Account Manager</DialogTitle>
              <DialogDescription>
                Choose an admin to be the primary point of contact for {assignDialog.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{assignDialog.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{assignDialog.email}</p>
            </div>
            <div className="space-y-2">
              {ADMIN_USERS.map((admin) => (
                <button
                  key={admin.id}
                  onClick={() => setAssignSelected(admin.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
                    assignSelected === admin.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{admin.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{admin.name}</p>
                    <p className="text-xs text-muted-foreground">{admin.email}</p>
                  </div>
                  {assignSelected === admin.id && (
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
              {assignDialog.accountManagerId && (
                <button
                  onClick={() => setAssignSelected("")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left ${
                    assignSelected === ""
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <UserCircle2 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Remove assignment</p>
                </button>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => { setAssignDialog(null); setAssignSelected(""); }} className="flex-1">Cancel</Button>
              <Button
                onClick={handleAssign}
                disabled={assignLoading || (assignSelected === (assignDialog.accountManagerId ?? ""))}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                {assignLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving…
                  </span>
                ) : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
