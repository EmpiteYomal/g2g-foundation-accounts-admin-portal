"use client";

/**
 * Template: Account Manager Assigned
 * Trigger: Sent when a G2G admin assigns or changes the account manager for a company.
 * Recipients: Company primary contact
 */

type Props = {
  contactName?: string;
  companyName?: string;
  managerName?: string;
  managerEmail?: string;
  managerPhone?: string;
  assignedDate?: string;
};

export function AccountManagerAssignedEmail({
  contactName = "Mark Davies",
  companyName = "Woolworths Group",
  managerName = "Sarah Admin",
  managerEmail = "sarah@goodstack.org",
  managerPhone = "+61 2 9000 1234",
  assignedDate = "10 April 2026",
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
                      <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="5" stroke="white" strokeWidth="2"/><path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>Account Update</p>
                      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.25 }}>Your account manager</h1>
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
                      <p style={{ margin: "0 0 28px", fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        We've assigned a dedicated account manager to your Foundation Account at <strong>{companyName}</strong>. They will be your primary point of contact for any questions, support, or account changes.
                      </p>

                      {/* Manager card */}
                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fef7f3", border: "1px solid #fed7aa", borderRadius: 14, marginBottom: 28 }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "24px" }}>
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ verticalAlign: "middle", width: 56 }}>
                                      <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#f97316", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
                                          {managerName.split(" ").map((n) => n[0]).join("")}
                                        </span>
                                      </div>
                                    </td>
                                    <td style={{ paddingLeft: 16 }}>
                                      <p style={{ margin: "0 0 2px", fontSize: 17, fontWeight: 700, color: "#111827" }}>{managerName}</p>
                                      <p style={{ margin: "0 0 2px", fontSize: 13, color: "#f97316", fontWeight: 600 }}>Account Manager · Good2Give</p>
                                      <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>Assigned {assignedDate}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div style={{ height: 1, backgroundColor: "#fed7aa", margin: "18px 0" }} />
                              <table width="100%" cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: "4px 0", fontSize: 13, color: "#6b7280", width: "20%" }}>Email</td>
                                    <td style={{ padding: "4px 0" }}>
                                      <a href={`mailto:${managerEmail}`} style={{ fontSize: 13, fontWeight: 600, color: "#f97316", textDecoration: "none" }}>{managerEmail}</a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ padding: "4px 0", fontSize: 13, color: "#6b7280" }}>Phone</td>
                                    <td style={{ padding: "4px 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{managerPhone}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827" }}>How your account manager can help</p>
                      {[
                        { title: "Onboarding & setup",     desc: "Guide you through funding your account, setting giving rules, and inviting your team." },
                        { title: "Ongoing support",        desc: "Answer questions about transactions, charity eligibility, and reporting." },
                        { title: "Account changes",        desc: "Assist with updates to your organisation details, team roles, or giving preferences." },
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

                      <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: 28, marginBottom: 8 }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}>
                              <a href={`mailto:${managerEmail}`} style={{ display: "inline-block", backgroundColor: "#f97316", color: "#ffffff", fontSize: 15, fontWeight: 700, textDecoration: "none", padding: "13px 32px", borderRadius: 50 }}>
                                Email your account manager
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
