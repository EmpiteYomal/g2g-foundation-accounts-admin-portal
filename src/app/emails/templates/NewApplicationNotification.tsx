"use client";

/**
 * Template: New Application Notification (Admin)
 * Trigger: Sent to G2G admin team when a company submits a Foundation Account application.
 * Recipients: Admin team / ops@goodstack.io
 */

type Props = {
  companyName?: string;
  abn?: string;
  industry?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  appliedAt?: string;
  reviewUrl?: string;
};

export function NewApplicationNotification({
  companyName = "Woolworths Group",
  abn = "88 000 014 675",
  industry = "Retail",
  contactName = "Mark Davies",
  contactEmail = "mark.davies@woolworths.com.au",
  contactPhone = "+61 2 8885 0000",
  appliedAt = "10 April 2026, 9:14 AM",
  reviewUrl = "https://admin.goodstack.io/dashboard/companies/pending/woolworths",
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
                    <td style={{ padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <img src="/logo.svg" alt="Goodstack" height={36} style={{ display: "block" }} />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Banner */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "40px 40px 36px", textAlign: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="8" width="22" height="17" rx="2" stroke="white" strokeWidth="2"/><path d="M9 25V14h10v11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14h22" stroke="white" strokeWidth="2"/><path d="M8 3h12l2 5H6l2-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/><rect x="12" y="18" width="4" height="7" rx="1" fill="white"/></svg>
                      </div>
                      <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>Action Required</p>
                      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.25 }}>New company application</h1>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Body */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "36px 40px 28px" }}>
                      <p style={{ margin: "0 0 6px", fontSize: 15, color: "#111827", lineHeight: 1.6 }}>Hi team,</p>
                      <p style={{ margin: "0 0 24px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        A new Foundation Account application has been submitted and is waiting for review in the admin portal.
                      </p>

                      {/* Company card */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 12, marginBottom: 24 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "20px 24px" }}>
                              <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a3412" }}>Applicant Details</p>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  {[
                                    { label: "Company",  value: companyName },
                                    { label: "ABN",      value: abn },
                                    { label: "Industry", value: industry },
                                    { label: "Contact",  value: contactName },
                                    { label: "Email",    value: contactEmail },
                                    { label: "Phone",    value: contactPhone },
                                    { label: "Submitted",value: appliedAt },
                                  ].map(({ label, value }) => (
                                    <tr key={label}>
                                      <td style={{ padding: "4px 0", fontSize: 13, color: "#6b7280", width: "35%", verticalAlign: "top" }}>{label}</td>
                                      <td style={{ padding: "4px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style={{ margin: "0 0 24px", fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
                        Please review the application details, verify the company's ABN and registration, and approve or decline within 2 business days.
                      </p>

                      {/* CTA */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={reviewUrl} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "13px 32px", borderRadius: 50 }}>
                                Review Application →
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
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#9ca3af" }}>Goodstack Admin Portal · Internal notification — do not reply</p>
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
