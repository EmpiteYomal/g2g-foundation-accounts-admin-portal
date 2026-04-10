"use client";

/**
 * Template: Company Approved
 * Trigger: Sent when a G2G admin approves a pending company application.
 * Recipients: Company primary contact (Account Founder)
 */

type Props = {
  contactName?: string;
  companyName?: string;
  accountNumber?: string;
  accountManagerName?: string;
  accountManagerEmail?: string;
  approvedDate?: string;
  dashboardUrl?: string;
};

export function CompanyApprovedEmail({
  contactName = "Mark Davies",
  companyName = "Woolworths Group",
  accountNumber = "GFA-00422",
  accountManagerName = "Sarah Admin",
  accountManagerEmail = "sarah@goodstack.org",
  approvedDate = "10 April 2026",
  dashboardUrl = "https://accounts.goodstack.io/dashboard",
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

              {/* Hero */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "48px 40px", textAlign: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16L13 23L26 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>Application Approved</p>
                      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>Welcome to Good2Give!</h1>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Body */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "40px 40px 32px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: 16, color: "#111827", lineHeight: 1.6 }}>Hi <strong>{contactName}</strong>,</p>
                      <p style={{ margin: "0 0 24px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        We're thrilled to let you know that <strong>{companyName}</strong>'s Foundation Account application has been approved. Your account is now active and ready to use.
                      </p>

                      {/* Account details */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#166534" }}>Your Account</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Organisation",    value: companyName },
                                    { label: "Account Number", value: accountNumber },
                                    { label: "Account Holder", value: contactName },
                                    { label: "Approved Date",  value: approvedDate },
                                  ].map(({ label, value }) => (
                                    <tr key={label}>
                                      <td style={{ padding: "5px 0", fontSize: 13, color: "#6b7280", width: "42%" }}>{label}</td>
                                      <td style={{ padding: "5px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Account manager */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "18px 24px" }}>
                              <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a3412" }}>Your Account Manager</p>
                              <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#111827" }}>{accountManagerName}</p>
                              <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{accountManagerEmail} · Good2Give</p>
                              <p style={{ margin: "10px 0 0", fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                                Your account manager is your primary point of contact for any questions or support regarding your Foundation Account.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Steps */}
                      <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Getting started</p>
                      {[
                        { num: "1", title: "Fund your account", desc: "Transfer funds to your Foundation Account to begin making donations to G2G-verified charities." },
                        { num: "2", title: "Invite your team", desc: "Add trustees and report viewers to collaborate on giving decisions." },
                        { num: "3", title: "Start donating", desc: "Browse the Good2Give charity registry and submit disbursements for trustee approval." },
                      ].map((step) => (
                        <table key={step.num} width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 12 }}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: "top", width: 36 }}>
                                <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: "#f97316", color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "center", lineHeight: "26px" }}>{step.num}</div>
                              </td>
                              <td style={{ verticalAlign: "top", paddingLeft: 8 }}>
                                <p style={{ margin: "2px 0 2px", fontSize: 14, fontWeight: 600, color: "#111827" }}>{step.title}</p>
                                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{step.desc}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: 32, marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={dashboardUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "14px 36px", borderRadius: 50 }}>
                                Access your dashboard →
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Support */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "0 40px 24px" }}>
                      <div style={{ height: 1, backgroundColor: "#f3f4f6", marginBottom: 24 }} />
                      <p style={{ margin: 0, fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>
                        Questions? Contact your account manager {accountManagerName} at{" "}
                        <a href={`mailto:${accountManagerEmail}`} style={{ color: "#f97316", textDecoration: "none" }}>{accountManagerEmail}</a>{" "}
                        or our support team at{" "}
                        <a href="mailto:support@goodstack.io" style={{ color: "#f97316", textDecoration: "none" }}>support@goodstack.io</a>.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f9fafb", borderRadius: "0 0 16px 16px", border: "1px solid #f0ece8", borderTop: "none" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "24px 40px", textAlign: "center" }}>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#9ca3af" }}>Goodstack Foundation Accounts · Level 5, 55 Clarence St, Sydney NSW 2000</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
                        © {new Date().getFullYear()} Goodstack Pty Ltd. All rights reserved.{" · "}
                        <a href="#" style={{ color: "#9ca3af" }}>Privacy Policy</a>{" · "}
                        <a href="#" style={{ color: "#9ca3af" }}>Unsubscribe</a>
                      </p>
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
