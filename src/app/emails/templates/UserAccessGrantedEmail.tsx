"use client";

/**
 * Template: User Access Granted
 * Trigger: Sent when a company admin grants a user access to their Foundation Account portal.
 * Recipients: The user being granted access
 */

type Props = {
  userName?: string;
  companyName?: string;
  grantedByName?: string;
  userRole?: string;
  dashboardUrl?: string;
};

export function UserAccessGrantedEmail({
  userName = "Jordan Lee",
  companyName = "Woolworths Group",
  grantedByName = "Mark Davies",
  userRole = "Report Viewer",
  dashboardUrl = "https://accounts.goodstack.io/dashboard",
}: Props) {
  const capabilities = userRole === "Report Viewer"
    ? [
        { title: "View account overview",    desc: "See fund balances, transaction history, and giving reports for the organisation." },
        { title: "Download reports",         desc: "Export giving summaries and financial reports for your records." },
        { title: "Monitor disbursements",    desc: "Track the status of charity fund transfers and allocations." },
      ]
    : [
        { title: "Manage disbursements",     desc: "Submit and approve fund transfer requests to G2G-verified charities." },
        { title: "Invite team members",      desc: "Grant report access to colleagues within your organisation." },
        { title: "View account details",     desc: "Access fund balances, transaction history, and giving reports." },
      ];

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
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "48px 40px", textAlign: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <rect x="8" y="14" width="16" height="13" rx="2" stroke="white" strokeWidth="2"/>
                          <path d="M11 14V10a5 5 0 0110 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="16" cy="21" r="2" fill="white"/>
                        </svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>Access granted</p>
                      <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>You're in!</h1>
                      <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.78)" }}>You now have access to {companyName}'s Foundation Account</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Body */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "40px 40px 32px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: 16, color: "#111827", lineHeight: 1.6 }}>Hi <strong>{userName}</strong>,</p>
                      <p style={{ margin: "0 0 24px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        <strong>{grantedByName}</strong> has granted you access to <strong>{companyName}</strong>'s Good2Give Foundation Account. You can now log in and view the account based on your role.
                      </p>

                      {/* Access details */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#166534" }}>Your Access Details</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Organisation", value: companyName },
                                    { label: "Your Role",    value: userRole },
                                    { label: "Granted By",  value: grantedByName },
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

                      {/* What you can do */}
                      <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>What you can do</p>
                      {capabilities.map((item, i) => (
                        <table key={i} width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 12 }}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: "top", width: 20, paddingTop: 2 }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22c55e", marginTop: 5 }} />
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
                              <a href={dashboardUrl} style={{ display: "inline-block", backgroundColor: "#16a34a", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "14px 36px", borderRadius: 50 }}>
                                Go to dashboard →
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
                        Questions about your access? Contact {grantedByName} or reach our support team at{" "}
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
