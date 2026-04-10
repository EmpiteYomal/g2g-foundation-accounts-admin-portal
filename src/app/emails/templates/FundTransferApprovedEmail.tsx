"use client";

/**
 * Template: Fund Transfer Approved
 * Trigger: Sent when a G2G admin approves a fund disbursement and generates the ABA file.
 * Recipients: Company primary contact + all account users
 */

type Props = {
  contactName?: string;
  companyName?: string;
  charityName?: string;
  charityAbn?: string;
  amount?: string;
  transferRef?: string;
  bsb?: string;
  accountNumber?: string;
  approvedDate?: string;
  approvedBy?: string;
  dashboardUrl?: string;
};

export function FundTransferApprovedEmail({
  contactName = "Jane Smith",
  companyName = "KFC Australia Pty Ltd",
  charityName = "Cancer Council Australia",
  charityAbn = "91 130 429 061",
  amount = "$4,200.00",
  transferRef = "GIVE-0451",
  bsb = "062-000",
  accountNumber = "11223344",
  approvedDate = "10 April 2026, 10:14 AM",
  approvedBy = "Sarah Admin",
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
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 100%)" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "44px 40px", textAlign: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16L13 23L26 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>Transfer Approved</p>
                      <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>Funds are on their way</h1>
                      <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>Your donation to {charityName} has been approved</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Amount highlight */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #bbf7d0" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "24px 40px", textAlign: "center" }}>
                      <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>Transfer amount</p>
                      <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#059669", letterSpacing: "-0.02em" }}>{amount}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>AUD · Ref {transferRef}</p>
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
                        Great news — your fund disbursement request from <strong>{companyName}</strong> to <strong>{charityName}</strong> has been approved and the ABA file has been generated. The transfer is now being processed by your bank.
                      </p>

                      {/* Transfer details */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 24 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280" }}>Transfer Details</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Charity",        value: charityName },
                                    { label: "Charity ABN",    value: charityAbn },
                                    { label: "BSB",            value: bsb },
                                    { label: "Account",        value: accountNumber },
                                    { label: "Amount",         value: `${amount} AUD` },
                                    { label: "Reference",      value: transferRef },
                                    { label: "Approved",       value: approvedDate },
                                    { label: "Approved by",    value: `${approvedBy} · Good2Give` },
                                  ].map(({ label, value }) => (
                                    <tr key={label}>
                                      <td style={{ padding: "5px 0", fontSize: 13, color: "#6b7280", width: "36%", verticalAlign: "top" }}>{label}</td>
                                      <td style={{ padding: "5px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* ABA info */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "16px 20px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ verticalAlign: "top", width: 22, paddingTop: 1 }}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    </td>
                                    <td style={{ paddingLeft: 10 }}>
                                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#1e3a5f" }}>ABA file generated</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#1e40af", lineHeight: 1.6 }}>
                                        The CEMTEX-format ABA file has been generated and your bank is processing the transfer. Allow 1–3 business days for the funds to reach {charityName}.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={dashboardUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "13px 32px", borderRadius: 50 }}>
                                View transfer in dashboard →
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
