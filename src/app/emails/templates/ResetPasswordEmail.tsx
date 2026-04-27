"use client";

/**
 * Template: Reset Password
 * Trigger: Sent when a user requests a password reset via the login page.
 * Recipients: The user who requested the reset
 */

type Props = {
  userName?: string;
  resetUrl?: string;
  expiresInMinutes?: number;
  portalName?: string;
  isAdminPortal?: boolean;
};

export function ResetPasswordEmail({
  userName = "Alex Johnson",
  resetUrl = "https://accounts.goodstack.io/reset-password?token=xyz789abc",
  expiresInMinutes = 60,
  portalName = "Good2Give Foundation Accounts",
  isAdminPortal = false,
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
                          <rect x="8" y="14" width="16" height="13" rx="2" stroke="white" strokeWidth="2"/>
                          <path d="M11 14V10a5 5 0 0110 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M16 19v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="16" cy="18.5" r="1.5" fill="white"/>
                          <path d="M22 6l2 2-2 2M26 8H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>Password Reset</p>
                      <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>Reset your password</h1>
                      <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.78)" }}>{portalName}</p>
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
                      <p style={{ margin: "0 0 28px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        We received a request to reset the password for your {isAdminPortal ? "admin portal" : "Foundation Account"} account. Click the button below to choose a new password.
                      </p>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={resetUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "14px 40px", borderRadius: 50 }}>
                                Reset password →
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Expiry notice */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, marginBottom: 20 }}>
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
                                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#92400e" }}>Link expires in {expiresInMinutes} minutes</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.5 }}>After that, you'll need to request a new reset link from the login page.</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Security notice */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "14px 18px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ verticalAlign: "top", width: 22, paddingTop: 1 }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 2L2 5v4c0 3.314 2.686 6 6 6s6-2.686 6-6V5L8 2z" stroke="#c2410c" strokeWidth="1.5" strokeLinejoin="round"/>
                                        <path d="M5.5 8l2 2 3-3" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </td>
                                    <td style={{ paddingLeft: 10 }}>
                                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#9a3412" }}>Didn't request this?</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.5 }}>
                                        If you didn't request a password reset, you can safely ignore this email. Your password will not change.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Fallback link */}
                      <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>If the button doesn't work, copy and paste this link into your browser:</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#f97316", wordBreak: "break-all" }}>
                        <a href={resetUrl} style={{ color: "#f97316" }}>{resetUrl}</a>
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
                        Need help? Contact our support team at{" "}
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
                        <a href="#" style={{ color: "#9ca3af" }}>Privacy Policy</a>
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
