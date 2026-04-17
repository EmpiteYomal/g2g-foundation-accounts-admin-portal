"use client";

import {
  ArrowLeft, User, Mail, Phone, MapPin,
  FileText, Info, Clock, CheckCircle2, XCircle, UserCircle2,
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

type PendingIndividualDetail = {
  id: string;
  name: string;
  preferredName: string;
  dob: string;
  tfnProvided: boolean;
  appliedAt: string;
  contact: {
    email: string;
    phone: string;
    secondaryEmail: string;
  };
  residentialAddress: string[];
};

const INDIVIDUAL_DATA: Record<string, PendingIndividualDetail> = {
  "anna-liu": {
    id: "anna-liu",
    name: "Anna Liu",
    preferredName: "Anna",
    dob: "22 July 1985",
    tfnProvided: true,
    appliedAt: "Today, 10:02 AM",
    contact: {
      email: "anna.liu@gmail.com",
      phone: "+61 411 222 333",
      secondaryEmail: "—",
    },
    residentialAddress: ["14 Rosewood Crescent", "Chatswood NSW 2067", "Australia"],
  },
  "james-morrison": {
    id: "james-morrison",
    name: "James Morrison",
    preferredName: "James",
    dob: "5 November 1972",
    tfnProvided: true,
    appliedAt: "Today, 8:47 AM",
    contact: {
      email: "j.morrison@icloud.com",
      phone: "+61 422 333 444",
      secondaryEmail: "james.morrison@work.com.au",
    },
    residentialAddress: ["7 Blue Gum Lane", "Neutral Bay NSW 2089", "Australia"],
  },
  "priya-mehta": {
    id: "priya-mehta",
    name: "Priya Mehta",
    preferredName: "Priya",
    dob: "18 March 1990",
    tfnProvided: false,
    appliedAt: "Yesterday, 3:21 PM",
    contact: {
      email: "priya.mehta@hotmail.com",
      phone: "+61 433 444 555",
      secondaryEmail: "—",
    },
    residentialAddress: ["33 Wattle Street", "Ultimo NSW 2007", "Australia"],
  },
};

const FALLBACK: PendingIndividualDetail = {
  id: "unknown",
  name: "Unknown Applicant",
  preferredName: "—",
  dob: "—",
  tfnProvided: false,
  appliedAt: "—",
  contact: { email: "—", phone: "—", secondaryEmail: "—" },
  residentialAddress: ["—"],
};

const ADMIN_USERS = [
  { id: "sa", name: "Sarah Admin",  initials: "SA", email: "sarah@goodstack.org"    },
  { id: "jt", name: "James Taylor", initials: "JT", email: "j.taylor@goodstack.org" },
  { id: "mp", name: "Maria Patel",  initials: "MP", email: "m.patel@goodstack.org"  },
  { id: "rl", name: "Ryan Lee",     initials: "RL", email: "r.lee@goodstack.org"    },
];

export function PendingIndividualDetailPage({ id }: { id: string }) {
  const individual = INDIVIDUAL_DATA[id] ?? FALLBACK;
  const [confirmDialog, setConfirmDialog] = useState<"approve" | "deny" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleAction = async () => {
    if (!confirmDialog) return;
    setActionLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (confirmDialog === "approve") setApproved(true);
    if (confirmDialog === "deny") setDenied(true);
    setActionLoading(false);
    setConfirmDialog(null);
    setSelectedManagerId(null);
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link href="/dashboard/individuals/pending" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Pending Approvals
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-700 text-xl font-bold">{getInitials(individual.name)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{individual.name}</h1>
                {approved && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-200">Approved</span>
                )}
                {denied && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-red-100 text-red-700 border-red-200">Denied</span>
                )}
                {!approved && !denied && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-700 border-amber-200">Pending Review</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Applied {individual.appliedAt}
              </p>
            </div>
          </div>

          {!approved && !denied && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-8 px-3 text-sm border-red-200 text-red-800 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
                onClick={() => setConfirmDialog("deny")}
              >
                <XCircle className="w-3.5 h-3.5 mr-1.5" /> Decline
              </Button>
              <Button
                size="sm"
                className="rounded-xl h-8 px-3 text-sm bg-emerald-700 hover:bg-emerald-800 text-white"
                onClick={() => setConfirmDialog("approve")}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Approve
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Approved / Denied banners */}
      {approved && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-semibold text-emerald-800">
            This individual has been approved and granted access to a personal Foundation Account.
          </p>
        </div>
      )}
      {denied && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-center gap-3">
          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm font-semibold text-red-800">
            This sign-up request has been declined.
          </p>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="personal">
        <TabsList className="rounded-xl bg-muted/50 p-1 h-auto gap-1">
          <TabsTrigger value="personal" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <User className="w-3.5 h-3.5 mr-1.5" /> Personal Details
          </TabsTrigger>
          <TabsTrigger value="contact" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Info className="w-3.5 h-3.5 mr-1.5" /> Contact &amp; Address
          </TabsTrigger>
        </TabsList>

        {/* ── Personal Details tab ── */}
        <TabsContent value="personal" className="mt-4 space-y-4">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              {[
                { label: "Full name",       value: individual.name                         },
                { label: "Preferred name",  value: individual.preferredName                },
                { label: "Date of birth",   value: individual.dob                          },
                { label: "TFN provided",    value: individual.tfnProvided ? "Yes" : "No"  },
                { label: "Account type",    value: "Personal Foundation"                   },
                { label: "Applied",         value: individual.appliedAt                    },
              ].map((field) => (
                <div key={field.label} className="px-5 py-3.5">
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                  <p className={`text-sm font-semibold mt-0.5 ${
                    field.label === "TFN provided" && !individual.tfnProvided
                      ? "text-amber-600"
                      : "text-foreground"
                  }`}>{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {!individual.tfnProvided && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-sm font-semibold text-amber-800">TFN not provided</p>
              <p className="text-xs text-amber-600 mt-0.5">
                This applicant has not provided their Tax File Number. You may still approve the account but withholding tax may apply to donations.
              </p>
            </div>
          )}
        </TabsContent>

        {/* ── Contact & Address tab ── */}
        <TabsContent value="contact" className="mt-4 space-y-4">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Contact Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              {[
                { label: "Email",           value: individual.contact.email          },
                { label: "Phone",           value: individual.contact.phone          },
                { label: "Secondary email", value: individual.contact.secondaryEmail },
              ].map((field) => (
                <div key={field.label} className="px-5 py-3.5">
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                  <p className="text-sm text-foreground font-semibold mt-0.5">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Residential Address</h2>
            </div>
            <div className="px-5 py-3.5">
              {individual.residentialAddress.map((line) => (
                <p key={line} className="text-sm text-foreground leading-5">{line}</p>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Confirm Dialog */}
      <Dialog
        open={!!confirmDialog}
        onOpenChange={() => { setConfirmDialog(null); setSelectedManagerId(null); }}
      >
        {confirmDialog && (
          <DialogContent className={confirmDialog === "approve" ? "max-w-md" : "max-w-sm"}>
            <DialogHeader>
              <DialogTitle>
                {confirmDialog === "approve" ? "Approve individual?" : "Deny sign-up?"}
              </DialogTitle>
              <DialogDescription>
                {confirmDialog === "approve"
                  ? `${individual.name} will be granted access to a personal Foundation Account.`
                  : `${individual.name}'s sign-up request will be declined.`}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-xl bg-muted/40 border border-border p-3 text-sm">
              <p className="font-semibold text-foreground">{individual.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{individual.contact.email}</p>
              <p className="text-xs text-muted-foreground">{individual.contact.phone}</p>
            </div>

            {confirmDialog === "approve" && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <UserCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-xs font-semibold text-foreground">Assign Account Manager</p>
                  <span className="text-xs text-muted-foreground">(optional)</span>
                </div>
                <div className="space-y-1.5">
                  {ADMIN_USERS.map((admin) => (
                    <button
                      key={admin.id}
                      onClick={() => setSelectedManagerId((prev) => prev === admin.id ? null : admin.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all text-left ${
                        selectedManagerId === admin.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{admin.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight">{admin.name}</p>
                        <p className="text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                      {selectedManagerId === admin.id && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => { setConfirmDialog(null); setSelectedManagerId(null); }}
                className="flex-1"
              >
                Cancel
              </Button>
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
