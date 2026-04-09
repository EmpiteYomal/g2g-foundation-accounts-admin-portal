"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Building2, Heart, Users, ArrowLeftRight,
  Plus, X, Search, Check, Mail, Phone, ExternalLink,
  Wallet, TrendingUp, HandCoins, MoreHorizontal,
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
  assigned: boolean;
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
  { id: "cancer",    name: "Cancer Council Australia",        abn: "91 130 429 061", category: "Health",        assigned: true  },
  { id: "rspca",     name: "RSPCA Australia",                 abn: "99 668 654 249", category: "Animals",       assigned: true  },
  { id: "salvos",    name: "The Salvation Army Australia",    abn: "57 507 607 336", category: "Community",     assigned: true  },
  { id: "ozgreen",   name: "OzGreen",                         abn: "58 003 014 367", category: "Environment",   assigned: false },
  { id: "redcross",  name: "Australian Red Cross",            abn: "50 169 561 394", category: "Humanitarian",  assigned: false },
  { id: "beyondblue",name: "Beyond Blue",                     abn: "87 093 865 840", category: "Mental Health", assigned: true  },
  { id: "wwf",       name: "WWF Australia",                   abn: "57 001 594 074", category: "Environment",   assigned: false },
  { id: "starlight", name: "Starlight Children's Foundation", abn: "51 003 073 295", category: "Children",      assigned: false },
  { id: "foodbank",  name: "Foodbank Australia",              abn: "34 119 962 177", category: "Hunger Relief", assigned: true  },
  { id: "headspace", name: "headspace",                       abn: "26 137 533 843", category: "Mental Health", assigned: false },
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

export function CompanyDetailPage({ id }: { id: string }) {
  const [charities, setCharities] = useState(ALL_CHARITIES);
  const [charitySearch, setCharitySearch] = useState("");
  const [addCharityOpen, setAddCharityOpen] = useState(false);
  const [savingCharity, setSavingCharity] = useState<string | null>(null);

  const assignedCharities = charities.filter((c) => c.assigned);
  const availableCharities = charities.filter(
    (c) => !c.assigned && c.name.toLowerCase().includes(charitySearch.toLowerCase())
  );

  const toggleCharity = async (charityId: string, assign: boolean) => {
    setSavingCharity(charityId);
    await new Promise((r) => setTimeout(r, 400));
    setCharities((prev) => prev.map((c) => c.id === charityId ? { ...c, assigned: assign } : c));
    setSavingCharity(null);
  };

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
                <DropdownMenuItem>Edit Company Info</DropdownMenuItem>
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
            <Heart className="w-3.5 h-3.5 mr-1.5" /> Charities ({assignedCharities.length})
          </TabsTrigger>
          <TabsTrigger value="transactions" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" /> Transactions
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users className="w-3.5 h-3.5 mr-1.5" /> Team
          </TabsTrigger>
        </TabsList>

        {/* ── Charities tab ── */}
        <TabsContent value="charities" className="mt-4">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Assigned Charities</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Charities this company can allocate funds to.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setAddCharityOpen(true)}
                className="h-8 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Charity
              </Button>
            </div>

            <div className="divide-y divide-border/60">
              {assignedCharities.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <Heart className="w-7 h-7 text-muted-foreground/40 mb-2" />
                  <p className="text-sm font-medium text-foreground">No charities assigned</p>
                  <p className="text-xs text-muted-foreground mt-1">Add charities from the prevetted list.</p>
                </div>
              ) : (
                assignedCharities.map((charity, i) => (
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                      disabled={savingCharity === charity.id}
                      onClick={() => toggleCharity(charity.id, false)}
                    >
                      {savingCharity === charity.id ? (
                        <span className="w-3 h-3 rounded-full border-2 border-red-400/40 border-t-red-600 animate-spin" />
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
      </Tabs>

      {/* Add Charity Dialog */}
      <Dialog open={addCharityOpen} onOpenChange={setAddCharityOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Charity to KFC Australia</DialogTitle>
            <DialogDescription>
              Select from the prevetted Good2Give charity registry. The company will be able to allocate funds to these charities.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search charities…"
                value={charitySearch}
                onChange={(e) => setCharitySearch(e.target.value)}
                className="pl-8 h-9 text-sm rounded-xl"
              />
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-border/60 rounded-xl border border-border">
              {availableCharities.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">No available charities match your search.</p>
                </div>
              ) : (
                availableCharities.map((charity) => (
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
                      className="h-7 px-2.5 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={savingCharity === charity.id}
                      onClick={async () => {
                        await toggleCharity(charity.id, true);
                      }}
                    >
                      {savingCharity === charity.id ? (
                        <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <><Check className="w-3 h-3 mr-1" /> Add</>
                      )}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCharityOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
