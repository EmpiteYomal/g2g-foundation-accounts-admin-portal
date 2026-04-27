"use client";

import { useState } from "react";
import { NewApplicationNotification } from "./templates/NewApplicationNotification";
import { CompanyDeclinedEmail } from "./templates/CompanyDeclinedEmail";
import { CompanyApprovedEmail } from "./templates/CompanyApprovedEmail";
import { AccountManagerAssignedEmail } from "./templates/AccountManagerAssignedEmail";
import { FundTransferApprovedEmail } from "./templates/FundTransferApprovedEmail";
import { FundTransferDeclinedEmail } from "./templates/FundTransferDeclinedEmail";
import { AdminWelcomeEmail } from "./templates/AdminWelcomeEmail";
import { InviteAdminUserEmail } from "./templates/InviteAdminUserEmail";
import { UserPendingConfirmationEmail } from "./templates/UserPendingConfirmationEmail";
import { UserAccessGrantedEmail } from "./templates/UserAccessGrantedEmail";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";
import { InviteUserToCompanyPortalEmail } from "./templates/InviteUserToCompanyPortalEmail";
import { Copy, Check, ChevronRight, Mail, Download, Shield, Building2 } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

// ─── Template registry ────────────────────────────────────────────────────────

type TemplateGroup = {
  id: string;
  label: string;
  icon: typeof Shield;
  color: string;
  templates: Template[];
};

type Template = {
  id: string;
  label: string;
  description: string;
  trigger: string;
  recipient: string;
  subject: string;
  component: React.ComponentType;
};

const GROUPS: TemplateGroup[] = [
  {
    id: "admin",
    label: "Admin Portal",
    icon: Shield,
    color: "#f97316",
    templates: [
      {
        id: "new-application",
        label: "New Application Notification",
        description: "Sent to the G2G admin team when a company submits a Foundation Account application.",
        trigger: "Company submits application",
        recipient: "Admin team (ops@goodstack.io)",
        subject: "[Admin] New Foundation Account application — Woolworths Group",
        component: NewApplicationNotification,
      },
      {
        id: "admin-invite",
        label: "Invite Admin User",
        description: "Sent to new Goodstack staff when invited to the admin portal. Uses a one-click setup link to set their own password.",
        trigger: "Super admin invites new staff member",
        recipient: "Newly invited admin user",
        subject: "You've been invited to the Goodstack admin portal",
        component: InviteAdminUserEmail,
      },
      {
        id: "admin-welcome",
        label: "Admin Welcome (Temp Password)",
        description: "Sent to new Goodstack staff when added to the admin portal with a temporary password.",
        trigger: "Admin invites new staff member",
        recipient: "Newly invited admin user",
        subject: "You've been added to the Goodstack admin portal",
        component: AdminWelcomeEmail,
      },
    ],
  },
  {
    id: "customer",
    label: "Customer Portal",
    icon: Building2,
    color: "#f97316",
    templates: [
      {
        id: "user-pending-confirmation",
        label: "Pending Email Confirmation",
        description: "Sent when a user registers on the customer portal and needs to verify their email address before their account is activated.",
        trigger: "User registers on customer portal",
        recipient: "Newly registered user",
        subject: "Confirm your email address — Good2Give",
        component: UserPendingConfirmationEmail,
      },
      {
        id: "invite-user-company",
        label: "Invite User to Company Portal",
        description: "Sent when a company admin invites a colleague to join their Foundation Account on the customer portal.",
        trigger: "Company admin invites a colleague",
        recipient: "Invited user",
        subject: "Mark Davies has invited you to join Woolworths Group's Foundation Account",
        component: InviteUserToCompanyPortalEmail,
      },
      {
        id: "user-access-granted",
        label: "User Access Granted",
        description: "Sent when a company admin grants a user access to their Foundation Account.",
        trigger: "Company admin grants user access",
        recipient: "User receiving access",
        subject: "You now have access to Woolworths Group's Foundation Account",
        component: UserAccessGrantedEmail,
      },
      {
        id: "reset-password",
        label: "Reset Password",
        description: "Sent when a user requests a password reset from the login page. Works for both admin and customer portal users.",
        trigger: "User requests password reset",
        recipient: "The requesting user",
        subject: "Reset your password — Good2Give",
        component: ResetPasswordEmail,
      },
      {
        id: "company-approved",
        label: "Application Approved",
        description: "Sent to the company when their Foundation Account application is approved.",
        trigger: "Admin approves application",
        recipient: "Company primary contact",
        subject: "Your Foundation Account application has been approved",
        component: CompanyApprovedEmail,
      },
      {
        id: "company-declined",
        label: "Application Declined",
        description: "Sent to the company when their Foundation Account application is declined.",
        trigger: "Admin declines application",
        recipient: "Company primary contact",
        subject: "Update on your Foundation Account application",
        component: CompanyDeclinedEmail,
      },
      {
        id: "account-manager-assigned",
        label: "Account Manager Assigned",
        description: "Sent to the company when an account manager is assigned to their account.",
        trigger: "Admin assigns account manager",
        recipient: "Company primary contact",
        subject: "Meet your Good2Give account manager",
        component: AccountManagerAssignedEmail,
      },
      {
        id: "transfer-approved",
        label: "Fund Transfer Approved",
        description: "Sent when an admin approves a disbursement and generates the ABA file.",
        trigger: "Admin approves & generates ABA",
        recipient: "Company primary contact + all users",
        subject: "Fund transfer approved — funds are on their way",
        component: FundTransferApprovedEmail,
      },
      {
        id: "transfer-declined",
        label: "Fund Transfer Declined",
        description: "Sent when an admin declines a fund disbursement request.",
        trigger: "Admin declines transfer",
        recipient: "Company primary contact + all users",
        subject: "Your fund transfer request has been declined",
        component: FundTransferDeclinedEmail,
      },
    ],
  },
];

const ALL_TEMPLATES = GROUPS.flatMap((g) => g.templates);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmailTemplatesPage() {
  const [selected, setSelected] = useState("new-application");
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "html">("preview");

  const template = ALL_TEMPLATES.find((t) => t.id === selected)!;
  const Component = template.component;

  const getHtml = () => {
    try {
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${template.label}</title>\n</head>\n<body style="margin:0;padding:0;">\n${renderToStaticMarkup(<Component />)}\n</body>\n</html>`;
    } catch {
      return "<!-- Unable to render HTML -->";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getHtml()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([getHtml()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalCount = ALL_TEMPLATES.length;

  return (
    <div className="min-h-screen bg-[#F5F4F2] flex flex-col" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
            <Mail className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Email Templates</span>
            <span className="ml-2 text-xs text-gray-400">Goodstack · Admin &amp; Customer Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-medium">
            {(["preview", "html"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
                  viewMode === mode ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {mode === "html" ? "HTML" : "Preview"}
              </button>
            ))}
          </div>
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy HTML"}
          </button>
          {/* Download button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download HTML
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="px-4 pt-5 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {totalCount} Templates
            </p>
          </div>

          <nav className="px-2 pb-4">
            {GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.id} className="mb-4">
                  {/* Group header */}
                  <div className="flex items-center gap-2 px-3 py-2 mb-1">
                    <div className="w-5 h-5 rounded-md bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-orange-500" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{group.label}</span>
                    <span className="ml-auto text-[10px] font-semibold text-gray-300 tabular-nums">{group.templates.length}</span>
                  </div>

                  {/* Templates */}
                  <div className="space-y-0.5">
                    {group.templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelected(t.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between group ${
                          selected === t.id
                            ? "bg-orange-50 text-orange-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{t.label}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{t.trigger}</p>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ml-2 transition-colors ${
                          selected === t.id ? "text-orange-500" : "text-gray-300 group-hover:text-gray-400"
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Template meta */}
          <div className="mx-3 mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2 mb-4">
            <p className="text-xs font-semibold text-gray-500">About this template</p>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Trigger</p>
                <p className="text-xs text-gray-700 font-medium mt-0.5">{template.trigger}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Recipient</p>
                <p className="text-xs text-gray-700 font-medium mt-0.5">{template.recipient}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Description</p>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{template.description}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main preview area ── */}
        <main className="flex-1 overflow-y-auto">
          {viewMode === "preview" ? (
            <div className="py-8 px-6">
              {/* Label */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-xs text-gray-400 font-medium">{template.label}</span>
                <span className="text-xs text-gray-300">·</span>
                <span className="text-xs text-gray-400">600px width · Email client preview</span>
              </div>

              {/* Email client frame */}
              <div className="mx-auto max-w-[640px] rounded-2xl overflow-hidden shadow-xl shadow-gray-200/60 ring-1 ring-gray-200">
                {/* Fake email chrome */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex gap-2">
                      <span className="font-semibold w-14 text-right flex-shrink-0">From:</span>
                      <span>Goodstack Foundation Accounts &lt;noreply@goodstack.io&gt;</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold w-14 text-right flex-shrink-0">To:</span>
                      <span className="text-gray-600 italic">{template.recipient}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold w-14 text-right flex-shrink-0">Subject:</span>
                      <span className="font-medium text-gray-700">{template.subject}</span>
                    </div>
                  </div>
                </div>

                {/* Email body */}
                <div className="bg-white">
                  <Component />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-6 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
                {getHtml()}
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
