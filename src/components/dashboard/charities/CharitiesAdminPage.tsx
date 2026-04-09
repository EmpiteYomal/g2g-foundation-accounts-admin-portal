"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Plus, Search, ExternalLink, MoreHorizontal,
  Check, X, Filter, Building2, CheckCircle2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CharityStatus = "active" | "inactive";

type Charity = {
  id: string;
  name: string;
  abn: string;
  category: string;
  status: CharityStatus;
  companiesCount: number;
  totalDonated: string;
  website: string;
};

const CATEGORIES = ["All", "Health", "Animals", "Community", "Environment", "Mental Health", "Children", "Hunger Relief", "Humanitarian", "Education"];

const CHARITIES: Charity[] = [
  { id: "cancer",     name: "Cancer Council Australia",        abn: "91 130 429 061", category: "Health",        status: "active",   companiesCount: 8,  totalDonated: "$284,390", website: "cancer.org.au"         },
  { id: "rspca",      name: "RSPCA Australia",                 abn: "99 668 654 249", category: "Animals",       status: "active",   companiesCount: 5,  totalDonated: "$112,840", website: "rspca.org.au"          },
  { id: "salvos",     name: "The Salvation Army Australia",    abn: "57 507 607 336", category: "Community",     status: "active",   companiesCount: 7,  totalDonated: "$198,200", website: "salvationarmy.org.au"  },
  { id: "beyondblue", name: "Beyond Blue",                     abn: "87 093 865 840", category: "Mental Health", status: "active",   companiesCount: 6,  totalDonated: "$94,100",  website: "beyondblue.org.au"     },
  { id: "foodbank",   name: "Foodbank Australia",              abn: "34 119 962 177", category: "Hunger Relief", status: "active",   companiesCount: 4,  totalDonated: "$68,450",  website: "foodbank.org.au"       },
  { id: "redcross",   name: "Australian Red Cross",            abn: "50 169 561 394", category: "Humanitarian",  status: "active",   companiesCount: 9,  totalDonated: "$341,280", website: "redcross.org.au"       },
  { id: "wwf",        name: "WWF Australia",                   abn: "57 001 594 074", category: "Environment",   status: "active",   companiesCount: 3,  totalDonated: "$42,100",  website: "wwf.org.au"            },
  { id: "starlight",  name: "Starlight Children's Foundation", abn: "51 003 073 295", category: "Children",      status: "active",   companiesCount: 2,  totalDonated: "$28,900",  website: "starlight.org.au"      },
  { id: "headspace",  name: "headspace",                       abn: "26 137 533 843", category: "Mental Health", status: "active",   companiesCount: 4,  totalDonated: "$51,200",  website: "headspace.org.au"      },
  { id: "ozgreen",    name: "OzGreen",                         abn: "58 003 014 367", category: "Environment",   status: "active",   companiesCount: 1,  totalDonated: "$12,300",  website: "ozgreen.org.au"        },
  { id: "smith-fam",  name: "The Smith Family",                abn: "28 000 030 179", category: "Education",     status: "inactive", companiesCount: 0,  totalDonated: "$0",        website: "thesmithfamily.com.au" },
  { id: "kids-help",  name: "Kids Helpline",                   abn: "37 007 946 016", category: "Children",      status: "inactive", companiesCount: 0,  totalDonated: "$0",        website: "kidshelpline.com.au"   },
];

export function CharitiesAdminPage() {
  const [charities, setCharities] = useState(CHARITIES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | CharityStatus>("all");
  const [addOpen, setAddOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [newCharity, setNewCharity] = useState({ name: "", abn: "", category: "Health", website: "" });

  const filtered = charities.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.abn.includes(search);
    const matchesCategory = category === "All" || c.category === category;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleStatus = (id: string) => {
    setCharities((prev) => prev.map((c) =>
      c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
    ));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setCharities((prev) => [...prev, {
      id: Math.random().toString(36).slice(2),
      name: newCharity.name,
      abn: newCharity.abn,
      category: newCharity.category,
      status: "active",
      companiesCount: 0,
      totalDonated: "$0",
      website: newCharity.website,
    }]);
    setAddLoading(false);
    setAddOpen(false);
    setNewCharity({ name: "", abn: "", category: "Health", website: "" });
  };

  const activeCount = charities.filter((c) => c.status === "active").length;
  const totalDonated = "$1,233,760";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Charity Registry</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Prevetted Good2Give charity list. Companies can only assign funds to charities listed here.
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="h-9 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Charity
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Active charities",  value: activeCount,   color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total disbursed",   value: totalDonated,  color: "text-violet-700",  bg: "bg-violet-50"  },
          { label: "Companies served",  value: "14",          color: "text-blue-600",    bg: "bg-blue-50"    },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-border/40 px-4 py-3`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-3 flex-wrap">
          {/* Status filter */}
          <div className="flex items-center gap-1">
            {[
              { key: "all" as const, label: "All" },
              { key: "active" as const, label: "Active" },
              { key: "inactive" as const, label: "Inactive" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setStatusFilter(s.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === s.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Category filter */}
          <Select value={category} onValueChange={(v) => setCategory(v ?? "All")}>
            <SelectTrigger className="w-44 h-8 text-sm rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search charities…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-border/60">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Heart className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">No charities found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters.</p>
            </div>
          ) : (
            filtered.map((charity, i) => (
              <motion.div
                key={charity.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-muted/10 transition-colors ${
                  charity.status === "inactive" ? "opacity-60" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{charity.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${
                      charity.status === "active"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : "bg-muted text-muted-foreground border-border"
                    }`}>
                      {charity.status}
                    </span>
                    <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full border border-border">
                      {charity.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">ABN {charity.abn}</p>
                </div>

                <div className="hidden sm:flex flex-col items-end flex-shrink-0 w-20">
                  <p className="text-sm font-semibold text-foreground">{charity.companiesCount}</p>
                  <p className="text-xs text-muted-foreground">companies</p>
                </div>

                <div className="hidden md:flex flex-col items-end flex-shrink-0 w-24">
                  <p className="text-sm font-semibold text-foreground">{charity.totalDonated}</p>
                  <p className="text-xs text-muted-foreground">total donated</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <a
                    href={`https://${charity.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => toggleStatus(charity.id)}>
                        {charity.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Remove from Registry</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {charities.length} charities</p>
        </div>
      </div>

      {/* Add Charity Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Charity to Registry</DialogTitle>
            <DialogDescription>
              Add an ACNC-registered charity to the prevetted Good2Give list.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Charity name</label>
              <Input
                placeholder="Cancer Council Australia"
                value={newCharity.name}
                onChange={(e) => setNewCharity((p) => ({ ...p, name: e.target.value }))}
                className="h-9 text-sm rounded-xl"
                required
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">ABN</label>
              <Input
                placeholder="91 130 429 061"
                value={newCharity.abn}
                onChange={(e) => setNewCharity((p) => ({ ...p, abn: e.target.value }))}
                className="h-9 text-sm rounded-xl"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={newCharity.category} onValueChange={(v) => setNewCharity((p) => ({ ...p, category: v ?? "Health" }))}>
                <SelectTrigger className="h-9 text-sm rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Website</label>
              <Input
                placeholder="cancer.org.au"
                value={newCharity.website}
                onChange={(e) => setNewCharity((p) => ({ ...p, website: e.target.value }))}
                className="h-9 text-sm rounded-xl"
              />
            </div>
            <DialogFooter className="gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)} className="flex-1">Cancel</Button>
              <Button
                type="submit"
                disabled={!newCharity.name || !newCharity.abn || addLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                {addLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Adding…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-3.5 h-3.5" /> Add Charity
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
