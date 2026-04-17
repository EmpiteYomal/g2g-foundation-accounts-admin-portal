"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, User, Heart, Users, ArrowLeftRight,
  X, Search, Mail, Phone, ExternalLink,
  Wallet, TrendingUp, HandCoins, MoreHorizontal,
  MapPin, FileText, Info, UserCircle2, Ban, Shield, Eye,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from "next/link";

type Charity = {
  id: string;
  name: string;
  abn: string;
  category: string;
  blacklisted: boolean;
};

type Transaction = {
  id: string;
  date: string;
  description: string;
  type: "inflow" | "disbursement";
  amount: number;
  status: "completed" | "pending" | "processing";
};

type FamilyMember = {
  id: string;
  name: string;
  email: string;
  relationship: string;
  role: "Co-Holder" | "Viewer";
  status: "active" | "invited";
  joinedAt: string;
  lastActive: string | null;
};

const ALL_CHARITIES: Charity[] = [
  { id: "cancer",     name: "Cancer Council Australia",        abn: "91 130 429 061", category: "Health",        blacklisted: false },
  { id: "rspca",      name: "RSPCA Australia",                 abn: "99 668 654 249", category: "Animals",       blacklisted: false },
  { id: "salvos",     name: "The Salvation Army Australia",    abn: "57 507 607 336", category: "Community",     blacklisted: false },
  { id: "ozgreen",    name: "OzGreen",                         abn: "58 003 014 367", category: "Environment",   blacklisted: false },
  { id: "redcross",   name: "Australian Red Cross",            abn: "50 169 561 394", category: "Humanitarian",  blacklisted: false },
  { id: "beyondblue", name: "Beyond Blue",                     abn: "87 093 865 840", category: "Mental Health", blacklisted: false },
  { id: "wwf",        name: "WWF Australia",                   abn: "57 001 594 074", category: "Environment",   blacklisted: true  },
  { id: "starlight",  name: "Starlight Children's Foundation", abn: "51 003 073 295", category: "Children",      blacklisted: false },
];

const DONATED_CHARITIES = [
  { id: "cancer",     name: "Cancer Council Australia", abn: "91 130 429 061", category: "Health",        totalDonated: 2400,  lastDonation: "5 Apr 2026"  },
  { id: "rspca",      name: "RSPCA Australia",          abn: "99 668 654 249", category: "Animals",       totalDonated: 1800,  lastDonation: "22 Mar 2026" },
  { id: "beyondblue", name: "Beyond Blue",              abn: "87 093 865 840", category: "Mental Health", totalDonated: 950,   lastDonation: "10 Mar 2026" },
];

const TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "9 Apr 2026",  description: "Fund transfer — bank deposit",   type: "inflow",       amount: 5000.00, status: "completed"  },
  { id: "t2", date: "5 Apr 2026",  description: "Cancer Council allocation",      type: "disbursement", amount: 2400.00, status: "completed"  },
  { id: "t3", date: "22 Mar 2026", description: "RSPCA Australia allocation",     type: "disbursement", amount: 1800.00, status: "processing" },
  { id: "t4", date: "1 Mar 2026",  description: "Fund transfer — bank deposit",   type: "inflow",       amount: 4000.00, status: "completed"  },
  { id: "t5", date: "10 Mar 2026", description: "Beyond Blue allocation",         type: "disbursement", amount: 950.00,  status: "pending"    },
];

const FAMILY_MEMBERS: FamilyMember[] = [
  { id: "f1", name: "Tom Smith",    email: "tom.smith@gmail.com",   relationship: "Spouse",   role: "Co-Holder", status: "active",  joinedAt: "12 Jan 2025", lastActive: "Today"       },
  { id: "f2", name: "Emily Smith",  email: "emily.s@gmail.com",     relationship: "Daughter", role: "Viewer",    status: "active",  joinedAt: "3 Mar 2025",  lastActive: "7 Apr 2026"  },
  { id: "f3", name: "Oliver Smith", email: "o.smith@outlook.com",   relationship: "Son",      role: "Viewer",    status: "invited", joinedAt: "6 Apr 2026",  lastActive: null          },
];

const ADMIN_USERS = [
  { id: "sa", name: "Sarah Admin",  initials: "SA", email: "sarah@goodstack.org"    },
  { id: "jt", name: "James Taylor", initials: "JT", email: "j.taylor@goodstack.org" },
  { id: "mp", name: "Maria Patel",  initials: "MP", email: "m.patel@goodstack.org"  },
  { id: "rl", name: "Ryan Lee",     initials: "RL", email: "r.lee@goodstack.org"    },
];

export function IndividualDetailPage({ id }: { id: string }) {
  const [charities, setCharities] = useState(ALL_CHARITIES);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [blacklistSearch, setBlacklistSearch] = useState("");
  const [blacklistSaving, setBlacklistSaving] = useState<string | null>(null);
  const [accountManagerId, setAccountManagerId] = useState<string>("sa");
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSelected, setAssignSelected] = useState<string>("sa");
  const [assignLoading, setAssignLoading] = useState(false);

  void id;

  const blacklistedCharities = charities.filter((c) => c.blacklisted);
  const blacklistableCharities = charities.filter(
    (c) => !c.blacklisted && c.name.toLowerCase().includes(blacklistSearch.toLowerCase())
  );

  const toggleBlacklist = async (charityId: string, blacklist: boolean) => {
    setBlacklistSaving(charityId);
    await new Promise((r) => setTimeout(r, 400));
    setCharities((prev) => prev.map((c) => c.id === charityId ? { ...c, blacklisted: blacklist } : c));
    setBlacklistSaving(null);
  };

  const handleAssign = async () => {
    setAssignLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setAccountManagerId(assignSelected);
    setAssignLoading(false);
    setAssignOpen(false);
  };

  const currentManager = ADMIN_USERS.find((a) => a.id === accountManagerId);

  const coHolders = FAMILY_MEMBERS.filter((m) => m.role === "Co-Holder");
  const viewers = FAMILY_MEMBERS.filter((m) => m.role === "Viewer");

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link href="/dashboard/individuals" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Individuals
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-border flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-xl font-bold">JS</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">Jane Smith</h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-0.5">Personal Foundation Account · Joined Jan 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl h-8 text-sm gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Individual
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-border text-muted-foreground hover:bg-muted/60 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem variant="destructive">Suspend Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Account Balance",   value: "$12,450",  icon: Wallet,    color: "text-violet-600", bg: "bg-violet-50"  },
          { label: "Total Donated",     value: "$5,150",   icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Transfers", value: "$950",     icon: HandCoins, color: "text-amber-600",  bg: "bg-amber-50"   },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-border">
            <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="charities">
        <TabsList className="rounded-xl bg-muted/50 p-1 h-auto gap-1">
          <TabsTrigger value="charities" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Heart className="w-3.5 h-3.5 mr-1.5" /> Charities
          </TabsTrigger>
          <TabsTrigger value="transactions" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" /> Transactions
          </TabsTrigger>
          <TabsTrigger value="family" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users className="w-3.5 h-3.5 mr-1.5" /> Family &amp; Friends
          </TabsTrigger>
          <TabsTrigger value="details" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Info className="w-3.5 h-3.5 mr-1.5" /> Details
          </TabsTrigger>
        </TabsList>

        {/* ── Charities tab ── */}
        <TabsContent value="charities" className="mt-4 space-y-4">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Donation History</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Charities this individual has allocated funds to via Good2Give.
              </p>
            </div>
            <div className="divide-y divide-border/60">
              {DONATED_CHARITIES.map((charity, i) => (
                <motion.div
                  key={charity.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{charity.name}</p>
                    <p className="text-xs text-muted-foreground">ABN {charity.abn} · {charity.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">
                      ${charity.totalDonated.toLocaleString("en-AU")}
                    </p>
                    <p className="text-xs text-muted-foreground">Last {charity.lastDonation}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Blacklisted Charities</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  These charities are hidden from this individual's account.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setBlacklistSearch(""); setBlacklistOpen(true); }}
                className="h-8 text-sm rounded-xl gap-1.5 border-red-200 text-red-800 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
              >
                <Ban className="w-3.5 h-3.5" /> Blacklist Charity
              </Button>
            </div>
            <div className="divide-y divide-border/60">
              {blacklistedCharities.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <Ban className="w-7 h-7 text-muted-foreground/30 mb-2" />
                  <p className="text-sm font-medium text-foreground">No charities blacklisted</p>
                  <p className="text-xs text-muted-foreground mt-1">This individual has access to the full Good2Give charity registry.</p>
                </div>
              ) : (
                blacklistedCharities.map((charity, i) => (
                  <motion.div
                    key={charity.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 px-5 py-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{charity.name}</p>
                      <p className="text-xs text-muted-foreground">ABN {charity.abn} · {charity.category}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-xs rounded-lg border-border text-muted-foreground hover:bg-muted/60"
                      disabled={blacklistSaving === charity.id}
                      onClick={() => toggleBlacklist(charity.id, false)}
                    >
                      {blacklistSaving === charity.id ? (
                        <span className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
                      ) : (
                        <><X className="w-3 h-3 mr-1" /> Remove</>
                      )}
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        {/* ── Transactions tab ── */}
        <TabsContent value="transactions" className="mt-4">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Transaction History</h2>
            </div>
            <div className="divide-y divide-border/60">
              {TRANSACTIONS.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-3.5"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    tx.type === "inflow" ? "bg-emerald-50" : "bg-violet-50"
                  }`}>
                    {tx.type === "inflow"
                      ? <TrendingUp className="w-4 h-4 text-emerald-600" />
                      : <HandCoins className="w-4 h-4 text-violet-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-semibold ${tx.type === "inflow" ? "text-emerald-600" : "text-foreground"}`}>
                      {tx.type === "inflow" ? "+" : "−"}${tx.amount.toLocaleString("en-AU", { minimumFractionDigits: 2 })}
                    </p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      tx.status === "completed"  ? "bg-emerald-100 text-emerald-700" :
                      tx.status === "processing" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── Family & Friends tab ── */}
        <TabsContent value="family" className="mt-4 space-y-4">
          {/* Stats strip */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total People",    value: FAMILY_MEMBERS.length,                               sub: "With account access"    },
              { label: "Co-Holders",      value: coHolders.length,                                    sub: "Full access"            },
              { label: "Active",          value: FAMILY_MEMBERS.filter((m) => m.status === "active").length, sub: "Currently active" },
              { label: "Pending Invite",  value: FAMILY_MEMBERS.filter((m) => m.status === "invited").length, sub: "Awaiting acceptance" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-border px-4 py-3">
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Co-Holders */}
          {coHolders.length > 0 && (
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-500" />
                <div>
                  <h2 className="text-base font-semibold text-foreground">Co-Holders</h2>
                  <p className="text-xs text-muted-foreground">Full access to view and submit givings on this account.</p>
                </div>
              </div>
              <div className="divide-y divide-border/60">
                {coHolders.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 px-5 py-3.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-600 text-xs font-bold">{getInitials(member.name)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{member.relationship}</span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {member.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-right">
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        <p>Joined {member.joinedAt}</p>
                        {member.lastActive && <p>Last active {member.lastActive}</p>}
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border bg-rose-50 text-rose-700 border-rose-200 flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5" /> Co-Holder
                      </span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Viewers */}
          {viewers.length > 0 && (
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <div>
                  <h2 className="text-base font-semibold text-foreground">Viewers</h2>
                  <p className="text-xs text-muted-foreground">Can view the account dashboard and reports.</p>
                </div>
              </div>
              <div className="divide-y divide-border/60">
                {viewers.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 px-5 py-3.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-bold">{getInitials(member.name)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{member.relationship}</span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {member.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-right">
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        <p>Joined {member.joinedAt}</p>
                        {member.lastActive && <p>Last active {member.lastActive}</p>}
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-border bg-muted/50 text-muted-foreground flex items-center gap-1">
                        <Eye className="w-2.5 h-2.5" /> Viewer
                      </span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Access level reference */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Access Levels</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              <div className="px-5 py-4 bg-rose-50/30">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-rose-500" />
                  <p className="text-sm font-semibold text-rose-700">Co-Holder</p>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["View dashboard & balance", "Submit giving requests", "Manage charities", "View all reports"].map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-semibold text-foreground">Viewer</p>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["View dashboard & balance", "View reports"].map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Details tab ── */}
        <TabsContent value="details" className="mt-4 space-y-4">
          {/* Account Manager */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-base font-semibold text-foreground">Account Manager</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-8 text-xs gap-1.5"
                onClick={() => { setAssignSelected(accountManagerId); setAssignOpen(true); }}
              >
                Change
              </Button>
            </div>
            <div className="px-5 py-4">
              {currentManager ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{currentManager.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{currentManager.name}</p>
                    <p className="text-xs text-muted-foreground">{currentManager.email}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setAssignSelected(""); setAssignOpen(true); }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <UserCircle2 className="w-4 h-4" /> No account manager assigned
                </button>
              )}
            </div>
          </div>

          {/* Personal details */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              {[
                { label: "Full name",     value: "Jane Smith"           },
                { label: "Date of birth", value: "14 March 1978"        },
                { label: "TFN status",    value: "Provided"             },
                { label: "Account type",  value: "Personal Foundation"  },
              ].map((field) => (
                <div key={field.label} className="px-5 py-3.5">
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                  <p className="text-sm text-foreground font-semibold mt-0.5">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Contact Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              {[
                { label: "Email",           value: "jane.smith@gmail.com" },
                { label: "Phone",           value: "+61 412 345 678"      },
                { label: "Secondary email", value: "—"                    },
                { label: "Preferred name",  value: "Jane"                 },
              ].map((field) => (
                <div key={field.label} className="px-5 py-3.5">
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                  <p className="text-sm text-foreground font-semibold mt-0.5">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Address</h2>
            </div>
            <div className="px-5 py-3.5">
              <p className="text-xs text-muted-foreground font-medium mb-1">Residential address</p>
              {["42 Harbour View Drive", "Mosman NSW 2088", "Australia"].map((line) => (
                <p key={line} className="text-sm text-foreground leading-5">{line}</p>
              ))}
            </div>
          </div>

          {/* Account notes */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Account Notes</h2>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-muted-foreground italic">No notes recorded for this account.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Blacklist Charity Dialog */}
      <Dialog open={blacklistOpen} onOpenChange={setBlacklistOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Blacklist a Charity</DialogTitle>
            <DialogDescription>
              Select a charity from the Good2Give registry to hide it from Jane Smith's account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search charities…"
                value={blacklistSearch}
                onChange={(e) => setBlacklistSearch(e.target.value)}
                className="pl-8 h-9 text-sm rounded-xl"
              />
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-border/60 rounded-xl border border-border">
              {blacklistableCharities.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">No charities match your search.</p>
                </div>
              ) : (
                blacklistableCharities.map((charity) => (
                  <div key={charity.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{charity.name}</p>
                      <p className="text-xs text-muted-foreground">{charity.category} · ABN {charity.abn}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-xs rounded-lg border-red-200 text-red-800 hover:bg-red-50 hover:border-red-300"
                      disabled={blacklistSaving === charity.id}
                      onClick={() => toggleBlacklist(charity.id, true)}
                    >
                      {blacklistSaving === charity.id ? (
                        <span className="w-3 h-3 rounded-full border-2 border-red-400/40 border-t-red-600 animate-spin" />
                      ) : (
                        <><Ban className="w-3 h-3 mr-1" /> Blacklist</>
                      )}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlacklistOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Account Manager Dialog */}
      <Dialog open={assignOpen} onOpenChange={() => setAssignOpen(false)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change Account Manager</DialogTitle>
            <DialogDescription>
              Select an admin to be the primary point of contact for Jane Smith.
            </DialogDescription>
          </DialogHeader>
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
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAssignOpen(false)} className="flex-1">Cancel</Button>
            <Button
              onClick={handleAssign}
              disabled={assignLoading || assignSelected === accountManagerId}
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
      </Dialog>
    </div>
  );
}
