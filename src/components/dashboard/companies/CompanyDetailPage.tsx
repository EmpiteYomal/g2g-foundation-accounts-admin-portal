"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Building2, Heart, Users, ArrowLeftRight,
  Plus, X, Search, Mail, Phone, ExternalLink,
  Wallet, TrendingUp, HandCoins, MoreHorizontal,
  MapPin, Globe, FileText, Info, UserCircle2, Ban,
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

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited";
};

const ALL_CHARITIES: Charity[] = [
  { id: "cancer",    name: "Cancer Council Australia",        abn: "91 130 429 061", category: "Health",        blacklisted: false },
  { id: "rspca",     name: "RSPCA Australia",                 abn: "99 668 654 249", category: "Animals",       blacklisted: false },
  { id: "salvos",    name: "The Salvation Army Australia",    abn: "57 507 607 336", category: "Community",     blacklisted: false },
  { id: "ozgreen",   name: "OzGreen",                         abn: "58 003 014 367", category: "Environment",   blacklisted: false },
  { id: "redcross",  name: "Australian Red Cross",            abn: "50 169 561 394", category: "Humanitarian",  blacklisted: false },
  { id: "beyondblue",name: "Beyond Blue",                     abn: "87 093 865 840", category: "Mental Health", blacklisted: false },
  { id: "wwf",       name: "WWF Australia",                   abn: "57 001 594 074", category: "Environment",   blacklisted: true  },
  { id: "starlight", name: "Starlight Children's Foundation", abn: "51 003 073 295", category: "Children",      blacklisted: false },
  { id: "foodbank",  name: "Foodbank Australia",              abn: "34 119 962 177", category: "Hunger Relief", blacklisted: false },
  { id: "headspace", name: "headspace",                       abn: "26 137 533 843", category: "Mental Health", blacklisted: true  },
];

// Charities this company has donated to, derived from TRANSACTIONS descriptions
const DONATED_CHARITIES = [
  { id: "cancer",     name: "Cancer Council Australia",  abn: "91 130 429 061", category: "Health",        totalDonated: 4200,  lastDonation: "5 Apr 2026"  },
  { id: "rspca",      name: "RSPCA Australia",           abn: "99 668 654 249", category: "Animals",       totalDonated: 3100,  lastDonation: "28 Mar 2026" },
  { id: "beyondblue", name: "Beyond Blue",               abn: "87 093 865 840", category: "Mental Health", totalDonated: 1400,  lastDonation: "15 Mar 2026" },
];

const TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "9 Apr 2026",  description: "Fund transfer — bank deposit",          type: "inflow",       amount: 12450.00, status: "completed"  },
  { id: "t2", date: "5 Apr 2026",  description: "Cancer Council allocation",             type: "disbursement", amount: 4200.00,  status: "completed"  },
  { id: "t3", date: "1 Apr 2026",  description: "Fund transfer — bank deposit",          type: "inflow",       amount: 9800.00,  status: "completed"  },
  { id: "t4", date: "28 Mar 2026", description: "RSPCA Australia allocation",            type: "disbursement", amount: 3100.00,  status: "processing" },
  { id: "t5", date: "15 Mar 2026", description: "Beyond Blue allocation",                type: "disbursement", amount: 1400.00,  status: "pending"    },
  { id: "t6", date: "1 Mar 2026",  description: "Fund transfer — bank deposit",          type: "inflow",       amount: 8200.00,  status: "completed"  },
];

const TEAM: TeamMember[] = [
  { id: "m1", name: "Jane Smith",    email: "jane@kfc.com.au",      role: "Trustee",  status: "active"  },
  { id: "m2", name: "Robert Chan",   email: "r.chan@kfc.com.au",    role: "Admin",    status: "active"  },
  { id: "m3", name: "Priya Sharma",  email: "p.sharma@kfc.com.au",  role: "Viewer",   status: "invited" },
];

const ADMIN_USERS = [
  { id: "sa", name: "Sarah Admin",  initials: "SA", email: "sarah@goodstack.org"    },
  { id: "jt", name: "James Taylor", initials: "JT", email: "j.taylor@goodstack.org" },
  { id: "mp", name: "Maria Patel",  initials: "MP", email: "m.patel@goodstack.org"  },
  { id: "rl", name: "Ryan Lee",     initials: "RL", email: "r.lee@goodstack.org"    },
];

export function CompanyDetailPage({ id }: { id: string }) {
  const [charities, setCharities] = useState(ALL_CHARITIES);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [blacklistSearch, setBlacklistSearch] = useState("");
  const [blacklistSaving, setBlacklistSaving] = useState<string | null>(null);
  const [accountManagerId, setAccountManagerId] = useState<string>("sa");
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSelected, setAssignSelected] = useState<string>("sa");
  const [assignLoading, setAssignLoading] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link href="/dashboard/companies" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border flex items-center justify-center flex-shrink-0">
              <Building2 className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">KFC Australia Pty Ltd</h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-0.5">ABN 51 004 220 518 · Food & Beverage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl h-8 text-sm gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Contact
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
          { label: "Account Balance", value: "$48,392", icon: Wallet, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Total Donated",   value: "$184,220", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Transfers", value: "$8,700", icon: HandCoins, color: "text-amber-600", bg: "bg-amber-50" },
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
          <TabsTrigger value="team" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users className="w-3.5 h-3.5 mr-1.5" /> Team
          </TabsTrigger>
          <TabsTrigger value="details" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Info className="w-3.5 h-3.5 mr-1.5" /> Details
          </TabsTrigger>
        </TabsList>

        {/* ── Charities tab ── */}
        <TabsContent value="charities" className="mt-4 space-y-4">
          {/* Donation history */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Donation History</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Charities this company has allocated funds to via Good2Give.
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

          {/* Blacklisted charities */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Blacklisted Charities</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  These charities are hidden from this company. By default they have access to the full Good2Give registry.
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
                  <p className="text-xs text-muted-foreground mt-1">This company has access to the full Good2Give charity registry.</p>
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
                      tx.status === "completed" ? "bg-emerald-100 text-emerald-700" :
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

        {/* ── Team tab ── */}
        <TabsContent value="team" className="mt-4">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Team Members</h2>
            </div>
            <div className="divide-y divide-border/60">
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{member.role}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {member.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── Details tab ── */}
        <TabsContent value="details" className="mt-4 space-y-4">
          {/* Account Manager — editable */}
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

          {/* Registration */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Registration</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              {[
                { label: "Legal name",        value: "KFC Australia Pty Ltd" },
                { label: "Trading name",      value: "KFC Australia" },
                { label: "ABN",               value: "51 004 220 518" },
                { label: "ACN",               value: "004 220 518" },
                { label: "Industry",          value: "Food & Beverage" },
                { label: "Entity type",       value: "Proprietary Limited" },
                { label: "Incorporated",      value: "12 March 1968" },
                { label: "Financial year end",value: "30 June" },
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
                { label: "Primary contact",  value: "Jane Smith" },
                { label: "Title / Role",     value: "Trustee" },
                { label: "Email",            value: "jane@kfc.com.au" },
                { label: "Phone",            value: "+61 2 9274 0000" },
                { label: "Secondary email",  value: "accounts@kfc.com.au" },
                { label: "Fax",              value: "—" },
              ].map((field) => (
                <div key={field.label} className="px-5 py-3.5">
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                  <p className="text-sm text-foreground font-semibold mt-0.5">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Addresses</h2>
            </div>
            <div className="divide-y divide-border/60">
              {[
                {
                  type: "Registered address",
                  lines: ["Level 5, 68 Alfred Street", "Milsons Point NSW 2061", "Australia"],
                },
                {
                  type: "Mailing address",
                  lines: ["PO Box 399", "North Sydney NSW 2059", "Australia"],
                },
              ].map((addr) => (
                <div key={addr.type} className="px-5 py-3.5">
                  <p className="text-xs text-muted-foreground font-medium mb-1">{addr.type}</p>
                  {addr.lines.map((line) => (
                    <p key={line} className="text-sm text-foreground leading-5">{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Online presence */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Online Presence</h2>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Website</p>
                <p className="text-sm text-primary font-semibold mt-0.5">www.kfc.com.au</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
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
              Select a charity from the Good2Give registry to hide it from KFC Australia. They will no longer see it when allocating funds.
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
              Select an admin to be the primary point of contact for KFC Australia Pty Ltd.
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
