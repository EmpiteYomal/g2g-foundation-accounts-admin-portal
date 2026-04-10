"use client";

/**
 * Template: Company Application Declined
 * Trigger: Sent when a G2G admin declines a pending company application.
 * Recipients: Company primary contact (Account Founder)
 */

type Props = {
  contactName?: string;
  companyName?: string;
  declinedDate?: string;
  reason?: string;
  supportEmail?: string;
};

export function CompanyDeclinedEmail({
  contactName = "Mark Davies",
  companyName = "Woolworths Group",
  declinedDate = "10 April 2026",
  reason = "We were unable to verify the ABN or company registration details provided in your application.",
  supportEmail = "support@goodstack.io",
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
                    <td style={{ padding: "44px 40px", textAlign: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.15)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 8l12 12M20 8L8 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Application Update</p>
                      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.25 }}>Application not approved</h1>
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
                        Thank you for your interest in a Good2Give Foundation Account. After reviewing your application for <strong>{companyName}</strong>, we are unable to approve it at this time.
                      </p>

                      {/* Reason card */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ verticalAlign: "top", width: 20, paddingTop: 1 }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    </td>
                                    <td style={{ paddingLeft: 10 }}>
                                      <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#991b1b" }}>Reason for decline</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#7f1d1d", lineHeight: 1.6 }}>{reason}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Application summary */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "18px 24px" }}>
                              <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280" }}>Application Summary</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Organisation",  value: companyName },
                                    { label: "Contact",       value: contactName },
                                    { label: "Date Reviewed", value: declinedDate },
                                  ].map(({ label, value }) => (
                                    <tr key={label}>
                                      <td style={{ padding: "4px 0", fontSize: 13, color: "#6b7280", width: "38%" }}>{label}</td>
                                      <td style={{ padding: "4px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#111827" }}>What to do next</p>
                      <p style={{ margin: "0 0 24px", fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>
                        If you believe this decision was made in error, or if you'd like to clarify the details of your application, please contact our support team — we're happy to review your case.
                      </p>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={`mailto:${supportEmail}`} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "13px 32px", borderRadius: 50 }}>
                                Contact Support
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
