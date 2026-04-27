"use client";

/**
 * Template: Invite Admin User to Admin Portal
 * Trigger: Sent when a super admin invites a new staff member to the admin portal via a setup link.
 * Recipients: The newly invited admin user
 */

type Props = {
  adminName?: string;
  adminRole?: string;
  invitedBy?: string;
  setupUrl?: string;
  expiresInHours?: number;
  portalUrl?: string;
};

export function InviteAdminUserEmail({
  adminName = "James Taylor",
  adminRole = "Account Manager",
  invitedBy = "Sarah Admin",
  setupUrl = "https://admin.goodstack.io/setup?token=setup123abc",
  expiresInHours = 48,
  portalUrl = "https://admin.goodstack.io",
}: Props) {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "#FAF9F8", minHeight: "100%", padding: "40px 16px" }}>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, margin: "0 auto" }}>
        <tbody>
          <tr>
            <td>

              {/* Header */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff", borderRadius: "16px 16px 0 0", borderBottom: "1px solid #f0ece8" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "28px 40px" }}>
                      <img src="/logo.svg" alt="Goodstack Foundation Accounts" height={36} style={{ display: "block" }} />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Banner */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "48px 40px", textAlign: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <circle cx="16" cy="10" r="5" stroke="white" strokeWidth="2"/>
                          <path d="M6 27c0-5.523 4.477-10 10-10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <rect x="20" y="19" width="9" height="9" rx="2" stroke="white" strokeWidth="1.8"/>
                          <path d="M22.5 23.5l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>Admin Portal · Staff Invitation</p>
                      <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>You've been invited</h1>
                      <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.78)" }}>Set up your Goodstack admin portal account</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Body */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "40px 40px 32px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: 16, color: "#111827", lineHeight: 1.6 }}>Hi <strong>{adminName}</strong>,</p>
                      <p style={{ margin: "0 0 24px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        <strong>{invitedBy}</strong> has invited you to join the Goodstack admin portal as <strong>{adminRole}</strong>. Click the button below to set up your account and choose your password.
                      </p>

                      {/* Role summary */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a3412" }}>Your Invitation</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Portal",      value: "Goodstack Admin Portal" },
                                    { label: "Role",        value: adminRole },
                                    { label: "Invited By",  value: invitedBy },
                                  ].map(({ label, value }) => (
                                    <tr key={label}>
                                      <td style={{ padding: "5px 0", fontSize: 13, color: "#6b7280", width: "40%" }}>{label}</td>
                                      <td style={{ padding: "5px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={setupUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "14px 40px", borderRadius: 50 }}>
                                Set up your account →
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Expiry notice */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "14px 18px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ verticalAlign: "top", width: 22, paddingTop: 1 }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="6" stroke="#d97706" strokeWidth="1.5"/>
                                        <path d="M8 5v3.5l2 1.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </td>
                                    <td style={{ paddingLeft: 10 }}>
                                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#92400e" }}>Invitation expires in {expiresInHours} hours</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.5 }}>
                                        If the link expires, ask {invitedBy} to send you a new invitation.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* What you can do */}
                      <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>What you'll be able to do</p>
                      {[
                        { title: "Manage company accounts",    desc: "Review applications, approve or decline companies, and manage active Foundation Accounts." },
                        { title: "Oversee fund transfers",     desc: "Approve disbursement requests and generate ABA files for charity fund allocations." },
                        { title: "Bank reconciliation",        desc: "Match incoming deposits to Foundation Accounts and flag discrepancies." },
                      ].map((item, i) => (
                        <table key={i} width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 12 }}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: "top", width: 20, paddingTop: 2 }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f97316", marginTop: 5 }} />
                              </td>
                              <td style={{ paddingLeft: 10 }}>
                                <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#111827" }}>{item.title}</p>
                                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}

                      {/* Fallback link */}
                      <div style={{ marginTop: 24 }}>
                        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#f97316", wordBreak: "break-all" }}>
                          <a href={setupUrl} style={{ color: "#f97316" }}>{setupUrl}</a>
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f9fafb", borderRadius: "0 0 16px 16px", border: "1px solid #f0ece8", borderTop: "none" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "24px 40px", textAlign: "center" }}>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#9ca3af" }}>Goodstack Admin Portal · Internal use only — do not forward</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>© {new Date().getFullYear()} Goodstack Pty Ltd. All rights reserved.</p>
                    </td>
                  </tr>
                </tbody>
              </table>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
