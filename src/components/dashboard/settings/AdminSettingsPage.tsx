"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings, Bell, Shield, Users, Building2, Key,
  Save, Mail, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Toggle = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export function AdminSettingsPage() {
  const [saving, setSaving] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<Toggle[]>([
    { id: "new-company",    label: "New company sign-ups",           description: "Alert when a company submits an onboarding request.", enabled: true  },
    { id: "reconciliation", label: "Bank statement imported",         description: "Alert when a new statement is ready to reconcile.",   enabled: true  },
    { id: "fund-transfer",  label: "Fund transfer requests",          description: "Alert when a company initiates a charity allocation.", enabled: true  },
    { id: "aba-generated",  label: "ABA file generated",             description: "Alert when an ABA file is ready for download.",        enabled: false },
    { id: "daily-summary",  label: "Daily summary email",            description: "Morning digest of pending actions and activity.",       enabled: true  },
  ]);

  const [orgForm, setOrgForm] = useState({
    orgName: "Goodstack Foundation Accounts",
    supportEmail: "admin@goodstack.org",
    supportPhone: "+61 2 8000 1234",
    abn: "12 345 678 900",
  });

  const [autoMatch, setAutoMatch] = useState<Toggle[]>([
    { id: "auto-match-known",  label: "Auto-match known bank accounts",    description: "Automatically match transactions from previously seen BSB/account numbers.", enabled: true },
    { id: "auto-match-ref",    label: "Match by reference number",         description: "Use payment reference codes as secondary matching criteria.",                  enabled: true },
    { id: "notify-unmatched",  label: "Alert on unmatched transactions",   description: "Send notification when statements contain unmatched items after import.",      enabled: true },
  ]);

  const save = async (section: string) => {
    setSaving(section);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(null);
  };

  const toggleNotif = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const toggleAutoMatch = (id: string) => {
    setAutoMatch((prev) => prev.map((n) => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Configure admin portal preferences, notifications, and reconciliation rules.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="rounded-xl bg-muted/50 p-1 h-auto gap-1 flex-wrap">
          <TabsTrigger value="general"        className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"><Building2 className="w-3.5 h-3.5 mr-1.5" />General</TabsTrigger>
          <TabsTrigger value="notifications"  className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"><Bell className="w-3.5 h-3.5 mr-1.5" />Notifications</TabsTrigger>
          <TabsTrigger value="reconciliation" className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"><Settings className="w-3.5 h-3.5 mr-1.5" />Reconciliation</TabsTrigger>
          <TabsTrigger value="security"       className="rounded-lg text-sm px-4 py-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"><Shield className="w-3.5 h-3.5 mr-1.5" />Security</TabsTrigger>
        </TabsList>

        {/* ── General ── */}
        <TabsContent value="general" className="mt-4">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
            <h2 className="text-base font-semibold text-foreground">Organisation Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Organisation name</Label>
                <Input
                  value={orgForm.orgName}
                  onChange={(e) => setOrgForm((p) => ({ ...p, orgName: e.target.value }))}
                  className="h-9 text-sm rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">ABN</Label>
                <Input
                  value={orgForm.abn}
                  onChange={(e) => setOrgForm((p) => ({ ...p, abn: e.target.value }))}
                  className="h-9 text-sm rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Support email</Label>
                <Input
                  type="email"
                  value={orgForm.supportEmail}
                  onChange={(e) => setOrgForm((p) => ({ ...p, supportEmail: e.target.value }))}
                  className="h-9 text-sm rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Support phone</Label>
                <Input
                  value={orgForm.supportPhone}
                  onChange={(e) => setOrgForm((p) => ({ ...p, supportPhone: e.target.value }))}
                  className="h-9 text-sm rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => save("general")}
                disabled={saving === "general"}
                className="h-9 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5"
              >
                {saving === "general" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving…
                  </span>
                ) : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 mt-4 space-y-4">
            <h2 className="text-base font-semibold text-foreground">Admin Users</h2>
            <p className="text-sm text-muted-foreground">Manage admin portal access. Role-based permissions control what each admin can do.</p>
            {[
              { name: "Sarah Admin",   email: "sarah@goodstack.org",  role: "Super Admin" },
              { name: "James Ops",     email: "james@goodstack.org",  role: "Operations"  },
              { name: "Anna Finance",  email: "anna@goodstack.org",   role: "Finance"     },
            ].map((user) => (
              <div key={user.email} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                  {user.role}
                </span>
              </div>
            ))}
            <Button variant="outline" size="sm" className="rounded-xl h-8 text-sm gap-1.5 mt-1">
              <Users className="w-3.5 h-3.5" /> Invite Admin User
            </Button>
          </div>
        </TabsContent>

        {/* ── Notifications ── */}
        <TabsContent value="notifications" className="mt-4">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
            <h2 className="text-base font-semibold text-foreground">Notification Preferences</h2>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                  </div>
                  <button
                    onClick={() => toggleNotif(n.id)}
                    className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                      n.enabled ? "bg-primary" : "bg-muted"
                    }`}
                    style={{ height: "22px" }}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      n.enabled ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => save("notifications")}
                disabled={saving === "notifications"}
                className="h-9 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5"
              >
                {saving === "notifications" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving…
                  </span>
                ) : <><Save className="w-3.5 h-3.5" /> Save</>}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Reconciliation ── */}
        <TabsContent value="reconciliation" className="mt-4">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
            <h2 className="text-base font-semibold text-foreground">Auto-Matching Rules</h2>
            <p className="text-sm text-muted-foreground">
              Configure how the system matches incoming bank transactions to company foundation accounts.
            </p>
            <div className="space-y-4">
              {autoMatch.map((n) => (
                <div key={n.id} className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                  </div>
                  <button
                    onClick={() => toggleAutoMatch(n.id)}
                    className={`relative w-10 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                      n.enabled ? "bg-primary" : "bg-muted"
                    }`}
                    style={{ height: "22px" }}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      n.enabled ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">ABA File Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">APCA user ID</Label>
                  <Input defaultValue="301500" className="h-9 text-sm rounded-xl font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Bank / financial institution</Label>
                  <Input defaultValue="CBA" className="h-9 text-sm rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">BSB (remitting account)</Label>
                  <Input defaultValue="062-000" className="h-9 text-sm rounded-xl font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Account number</Label>
                  <Input defaultValue="10249876" className="h-9 text-sm rounded-xl font-mono" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => save("reconciliation")}
                disabled={saving === "reconciliation"}
                className="h-9 text-sm rounded-xl bg-primary hover:bg-primary/90 text-white gap-1.5"
              >
                {saving === "reconciliation" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving…
                  </span>
                ) : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Security ── */}
        <TabsContent value="security" className="mt-4">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
            <h2 className="text-base font-semibold text-foreground">Security Settings</h2>
            <div className="space-y-4">
              {[
                { label: "Require MFA for all admin users", description: "Enforce two-factor authentication on every admin login.", enabled: true },
                { label: "Session timeout (30 min)",         description: "Automatically sign out after 30 minutes of inactivity.", enabled: true },
                { label: "IP allowlist",                     description: "Restrict admin portal access to specific IP ranges.",     enabled: false },
                { label: "Full audit logging",               description: "Log every admin action to the audit trail.",              enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold flex-shrink-0 ${
                    item.enabled ? "text-emerald-600" : "text-muted-foreground"
                  }`}>
                    {item.enabled ? <Check className="w-3.5 h-3.5" /> : null}
                    {item.enabled ? "On" : "Off"}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">API Keys</h3>
              <p className="text-xs text-muted-foreground mb-3">Manage API keys for integrating with external systems.</p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                <Key className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-foreground">sk_live_••••••••••••••••••••••••••••</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Production key · Created 1 Jan 2026</p>
                </div>
                <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs rounded-lg">Reveal</Button>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl h-8 text-sm gap-1.5 mt-3">
                <Key className="w-3.5 h-3.5" /> Generate New Key
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
