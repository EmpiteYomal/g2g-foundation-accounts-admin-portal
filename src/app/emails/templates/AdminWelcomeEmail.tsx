"use client";

/**
 * Template: Admin Welcome / New Admin Invitation
 * Trigger: Sent when a new staff member is added to the Goodstack admin portal.
 * Recipients: The newly invited admin user
 */

type Props = {
  adminName?: string;
  adminRole?: string;
  invitedBy?: string;
  tempPassword?: string;
  portalUrl?: string;
};

export function AdminWelcomeEmail({
  adminName = "James Taylor",
  adminRole = "Account Manager",
  invitedBy = "Sarah Admin",
  tempPassword = "Temp@2026!",
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
                      <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.12)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="5" stroke="white" strokeWidth="2"/><path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Admin Portal Access</p>
                      <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>Welcome to the team!</h1>
                      <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.75)" }}>You've been added to the Goodstack admin portal</p>
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
                        <strong>{invitedBy}</strong> has added you to the Goodstack Foundation Accounts admin portal as <strong>{adminRole}</strong>. You can now log in and start managing company accounts.
                      </p>

                      {/* Credentials */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a3412" }}>Your Login Details</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: "5px 0", fontSize: 13, color: "#6b7280", width: "40%" }}>Portal URL</td>
                                    <td style={{ padding: "5px 0" }}>
                                      <a href={portalUrl} style={{ fontSize: 13, fontWeight: 600, color: "#f97316", textDecoration: "none" }}>{portalUrl}</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: "5px 0", fontSize: 13, color: "#6b7280" }}>Role</td>
                                    <td style={{ padding: "5px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{adminRole}</td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: "5px 0", fontSize: 13, color: "#6b7280" }}>Temp Password</td>
                                    <td style={{ padding: "5px 0" }}>
                                      <code style={{ fontSize: 13, fontWeight: 700, color: "#111827", backgroundColor: "#ffedd5", padding: "2px 8px", borderRadius: 4, fontFamily: "monospace" }}>{tempPassword}</code>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Security notice */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "14px 18px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ verticalAlign: "top", width: 22, paddingTop: 1 }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 5v4c0 3.314 2.686 6 6 6s6-2.686 6-6V5L8 2z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 7v3M8 5.5v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    </td>
                                    <td style={{ paddingLeft: 10 }}>
                                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#92400e" }}>Change your password on first login</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.5 }}>Your temporary password will expire after 24 hours. Please update it immediately after signing in.</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* What you can do */}
                      <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>What you can do in the portal</p>
                      {[
                        { title: "Manage company accounts",    desc: "Review pending applications, approve or decline companies, and manage active accounts." },
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

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: 28, marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={portalUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "14px 36px", borderRadius: 50 }}>
                                Sign in to admin portal →
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
