"use client";

import {
  ArrowLeft, Building2, Mail, Phone, MapPin, Globe,
  FileText, Info, Clock, CheckCircle2, XCircle, ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type PendingCompanyDetail = {
  id: string;
  name: string;
  tradingName: string;
  abn: string;
  acn: string;
  industry: string;
  entityType: string;
  incorporated: string;
  financialYearEnd: string;
  appliedAt: string;
  contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
    secondaryEmail: string;
  };
  registeredAddress: string[];
  mailingAddress: string[];
  website: string;
};

const COMPANY_DATA: Record<string, PendingCompanyDetail> = {
  woolworths: {
    id: "woolworths",
    name: "Woolworths Group",
    tradingName: "Woolworths",
    abn: "88 000 014 675",
    acn: "000 014 675",
    industry: "Retail",
    entityType: "Public Company",
    incorporated: "21 September 1924",
    financialYearEnd: "30 June",
    appliedAt: "Today, 9:14 AM",
    contact: {
      name: "Mark Davies",
      title: "Foundation Manager",
      email: "mark.davies@woolworths.com.au",
      phone: "+61 2 8885 0000",
      secondaryEmail: "foundation@woolworths.com.au",
    },
    registeredAddress: ["1 Woolworths Way", "Bella Vista NSW 2153", "Australia"],
    mailingAddress: ["Locked Bag 7777", "Bella Vista NSW 2153", "Australia"],
    website: "www.woolworthsgroup.com.au",
  },
  bunnings: {
    id: "bunnings",
    name: "Bunnings Warehouse",
    tradingName: "Bunnings",
    abn: "26 008 672 179",
    acn: "008 672 179",
    industry: "Home Improvement",
    entityType: "Proprietary Limited",
    incorporated: "14 June 1952",
    financialYearEnd: "30 June",
    appliedAt: "Today, 7:02 AM",
    contact: {
      name: "Lisa Nguyen",
      title: "Corporate Giving Lead",
      email: "l.nguyen@bunnings.com.au",
      phone: "+61 3 8831 9777",
      secondaryEmail: "giving@bunnings.com.au",
    },
    registeredAddress: ["Bunnings Head Office", "PO Box 1167", "Bentley WA 6102", "Australia"],
    mailingAddress: ["PO Box 1167", "Bentley WA 6102", "Australia"],
    website: "www.bunnings.com.au",
  },
  village: {
    id: "village",
    name: "Village Cinemas",
    tradingName: "Village Cinemas",
    abn: "58 003 073 900",
    acn: "003 073 900",
    industry: "Entertainment",
    entityType: "Proprietary Limited",
    incorporated: "3 March 1954",
    financialYearEnd: "31 December",
    appliedAt: "Yesterday, 4:30 PM",
    contact: {
      name: "Tom Ricci",
      title: "Community Relations Manager",
      email: "tricci@villagecinemas.com.au",
      phone: "+61 3 9667 6565",
      secondaryEmail: "community@villagecinemas.com.au",
    },
    registeredAddress: ["206 Bourke Street", "Melbourne VIC 3000", "Australia"],
    mailingAddress: ["GPO Box 1536", "Melbourne VIC 3001", "Australia"],
    website: "www.villagecinemas.com.au",
  },
  subway: {
    id: "subway",
    name: "Subway Australia",
    tradingName: "Subway",
    abn: "42 100 448 565",
    acn: "100 448 565",
    industry: "Food & Beverage",
    entityType: "Proprietary Limited",
    incorporated: "8 November 1988",
    financialYearEnd: "31 December",
    appliedAt: "Yesterday, 11:15 AM",
    contact: {
      name: "Priya Singh",
      title: "Partnerships Manager",
      email: "priya@subway.com.au",
      phone: "+61 7 3010 4444",
      secondaryEmail: "partnerships@subway.com.au",
    },
    registeredAddress: ["Level 9, 222 Queen Street", "Brisbane QLD 4000", "Australia"],
    mailingAddress: ["GPO Box 888", "Brisbane QLD 4001", "Australia"],
    website: "www.subway.com/en-AU",
  },
};

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-3.5">
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-sm text-foreground font-semibold mt-0.5">{value}</p>
    </div>
  );
}

export function PendingCompanyDetailPage({ id }: { id: string }) {
  const company = COMPANY_DATA[id];
  const [confirmDialog, setConfirmDialog] = useState<"approve" | "deny" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actioned, setActioned] = useState<"approved" | "denied" | null>(null);

  const handleAction = async () => {
    if (!confirmDialog) return;
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setActioned(confirmDialog === "approve" ? "approved" : "denied");
    setActionLoading(false);
    setConfirmDialog(null);
  };

  if (!company) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/companies/pending" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Pending Approvals
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Building2 className="w-10 h-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm font-medium text-foreground">Company not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href="/dashboard/companies/pending" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Pending Approvals
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
              {actioned ? (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  actioned === "approved"
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }`}>
                  {actioned === "approved" ? "Approved" : "Denied"}
                </span>
              ) : (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-700 border-amber-200">
                  Pending
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">
              ABN {company.abn} · {company.industry}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Applied {company.appliedAt}
            </p>
          </div>
        </div>

        {!actioned && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl h-8 px-3 text-xs border-red-200 text-red-800 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
              onClick={() => setConfirmDialog("deny")}
            >
              <XCircle className="w-3.5 h-3.5 mr-1" /> Decline
            </Button>
            <Button
              size="sm"
              className="rounded-xl h-8 px-3 text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
              onClick={() => setConfirmDialog("approve")}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details">
        <TabsList className="rounded-xl bg-muted/50 p-1 h-auto gap-1">
          <TabsTrigger value="details" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Info className="w-3.5 h-3.5 mr-1.5" /> Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4 space-y-4">
          {/* Registration */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Registration</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              <DetailField label="Legal name"         value={company.name} />
              <DetailField label="Trading name"       value={company.tradingName} />
              <DetailField label="ABN"                value={company.abn} />
              <DetailField label="ACN"                value={company.acn} />
              <DetailField label="Industry"           value={company.industry} />
              <DetailField label="Entity type"        value={company.entityType} />
              <DetailField label="Incorporated"       value={company.incorporated} />
              <DetailField label="Financial year end" value={company.financialYearEnd} />
            </div>
          </div>

          {/* Contact details */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Contact Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              <DetailField label="Primary contact" value={company.contact.name} />
              <DetailField label="Title / Role"    value={company.contact.title} />
              <DetailField label="Email"           value={company.contact.email} />
              <DetailField label="Phone"           value={company.contact.phone} />
              <DetailField label="Secondary email" value={company.contact.secondaryEmail} />
              <DetailField label="Fax"             value="—" />
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
                { type: "Registered address", lines: company.registeredAddress },
                { type: "Mailing address",    lines: company.mailingAddress },
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
                <p className="text-sm text-primary font-semibold mt-0.5">{company.website}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Confirm Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
        {confirmDialog && (
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {confirmDialog === "approve" ? "Approve company?" : "Deny sign-up?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog === "approve"
                  ? `${company.name} will be granted access to the Foundation Account portal.`
                  : `${company.name}'s sign-up request will be declined.`}
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{company.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">ABN {company.abn}</p>
              <p className="text-xs text-muted-foreground">{company.contact.email}</p>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setConfirmDialog(null)} className="flex-1">Cancel</Button>
              <Button
                onClick={handleAction}
                disabled={actionLoading}
                className={`flex-1 text-white ${
                  confirmDialog === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-destructive hover:bg-destructive/90"
                }`}
              >
                {actionLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Processing…
                  </span>
                ) : confirmDialog === "approve" ? "Approve" : "Deny"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
