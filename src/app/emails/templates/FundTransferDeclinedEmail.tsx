"use client";

/**
 * Template: Fund Transfer Declined
 * Trigger: Sent when a G2G admin declines a fund disbursement request.
 * Recipients: Company primary contact + all account users
 */

type Props = {
  contactName?: string;
  companyName?: string;
  charityName?: string;
  amount?: string;
  transferRef?: string;
  declinedDate?: string;
  declinedBy?: string;
  reason?: string;
  dashboardUrl?: string;
};

export function FundTransferDeclinedEmail({
  contactName = "Jane Smith",
  companyName = "KFC Australia Pty Ltd",
  charityName = "Beyond Blue",
  amount = "$950.00",
  transferRef = "GIVE-0454",
  declinedDate = "10 April 2026",
  declinedBy = "Sarah Admin",
  reason = "The requested transfer amount exceeds the available disbursable balance in your Foundation Account.",
  dashboardUrl = "https://accounts.goodstack.io/dashboard/transfers",
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
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #dc2626 0%, #f87171 100%)" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "44px 40px", textAlign: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 8l12 12M20 8L8 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>Transfer Update</p>
                      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.25 }}>Transfer request declined</h1>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Body */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "36px 40px 28px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: 16, color: "#111827", lineHeight: 1.6 }}>Hi <strong>{contactName}</strong>,</p>
                      <p style={{ margin: "0 0 24px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        We're writing to let you know that the fund disbursement request from <strong>{companyName}</strong> to <strong>{charityName}</strong> has been declined by the Good2Give team.
                      </p>

                      {/* Reason */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, marginBottom: 24 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "18px 22px" }}>
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

                      {/* Transfer summary */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "18px 24px" }}>
                              <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280" }}>Transfer Summary</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Charity",     value: charityName },
                                    { label: "Amount",      value: `${amount} AUD` },
                                    { label: "Reference",   value: transferRef },
                                    { label: "Declined",    value: declinedDate },
                                    { label: "Declined by", value: `${declinedBy} · Good2Give` },
                                  ].map(({ label, value }) => (
                                    <tr key={label}>
                                      <td style={{ padding: "4px 0", fontSize: 13, color: "#6b7280", width: "36%" }}>{label}</td>
                                      <td style={{ padding: "4px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style={{ margin: "0 0 24px", fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>
                        No funds have been transferred. You may submit a new disbursement request after resolving the issue noted above. If you believe this was declined in error, please contact our support team.
                      </p>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={dashboardUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "13px 32px", borderRadius: 50 }}>
                                View in dashboard →
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
                        Questions? Contact our support team at{" "}
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
