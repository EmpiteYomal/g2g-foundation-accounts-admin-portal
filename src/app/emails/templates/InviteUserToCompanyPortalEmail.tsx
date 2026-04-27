"use client";

/**
 * Template: Invite User to Company Portal
 * Trigger: Sent when a company admin invites a colleague to join their Foundation Account.
 * Recipients: The invited user
 */

type Props = {
  inviteeName?: string;
  inviterName?: string;
  companyName?: string;
  userRole?: string;
  acceptUrl?: string;
  expiresInDays?: number;
  portalUrl?: string;
};

export function InviteUserToCompanyPortalEmail({
  inviteeName = "Casey Morgan",
  inviterName = "Mark Davies",
  companyName = "Woolworths Group",
  userRole = "Report Viewer",
  acceptUrl = "https://accounts.goodstack.io/accept-invite?token=inv123abc",
  expiresInDays = 7,
  portalUrl = "https://accounts.goodstack.io",
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
                          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
                          <path d="M4 26c0-4.418 3.582-8 8-8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="24" cy="20" r="5" stroke="white" strokeWidth="2"/>
                          <path d="M24 18v4M22 20h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>You're invited</p>
                      <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>Join {companyName}</h1>
                      <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.78)" }}>on the Good2Give Foundation Accounts portal</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Body */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "40px 40px 32px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: 16, color: "#111827", lineHeight: 1.6 }}>
                        {inviteeName ? <>Hi <strong>{inviteeName}</strong>,</> : "Hi there,"}
                      </p>
                      <p style={{ margin: "0 0 24px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        <strong>{inviterName}</strong> has invited you to join <strong>{companyName}</strong>'s Foundation Account on the Good2Give portal. Once you accept, you'll have access to the account as a <strong>{userRole}</strong>.
                      </p>

                      {/* Invite details */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a3412" }}>Invitation Details</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Organisation", value: companyName },
                                    { label: "Your Role",    value: userRole },
                                    { label: "Invited By",  value: inviterName },
                                    { label: "Expires",     value: `${expiresInDays} days from now` },
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

                      {/* What is this? */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "18px 24px" }}>
                              <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#374151" }}>What is Good2Give Foundation Accounts?</p>
                              <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                                A Foundation Account lets organisations hold and manage charitable giving funds. As a <strong>{userRole}</strong>, you can monitor the account's giving activity, view reports, and stay informed on how your organisation's charitable contributions are being distributed.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={acceptUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "14px 40px", borderRadius: 50 }}>
                                Accept invitation →
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style={{ margin: "16px 0 0", fontSize: 13, color: "#9ca3af", textAlign: "center" }}>
                        This invitation expires in {expiresInDays} days.
                      </p>
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
                        Not expecting this? Contact {inviterName} directly, or reach our support team at{" "}
                        <a href="mailto:support@goodstack.io" style={{ color: "#f97316", textDecoration: "none" }}>support@goodstack.io</a>.
                        You can also visit <a href={portalUrl} style={{ color: "#f97316", textDecoration: "none" }}>{portalUrl}</a>.
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
