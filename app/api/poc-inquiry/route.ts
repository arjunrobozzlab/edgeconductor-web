import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "EdgeConductor <alerts@edgeconductor.com>";
const ADMIN  = "edgeconductor@gmail.com";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, company, hardware, protocols, useCase, fleet } = body;

  if (!email || !company) {
    return NextResponse.json({ error: "email and company are required" }, { status: 400 });
  }

  const selectionTable = `
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280">Hardware</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${hardware?.join(", ") || "—"}</td></tr>
      <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280">Protocols</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${protocols?.join(", ") || "—"}</td></tr>
      <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280">Use Case</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${useCase || "—"}</td></tr>
      <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280">Fleet Size</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${fleet || "—"}</td></tr>
      <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280">Email</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${email}</td></tr>
      <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;color:#6b7280">Company</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${company}</td></tr>
    </table>
  `;

  const [adminResult, userResult] = await Promise.all([
    // Admin notification
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `New PoC Inquiry: ${company} — ${useCase}`,
      html: `<div style="font-family:sans-serif;max-width:560px"><h2>New Hardware Fit / PoC Inquiry</h2>${selectionTable}</div>`,
    }),
    // Confirmation to user
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your EdgeConductor Architecture Brief — we'll be in touch",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;padding:32px">
          <h2 style="color:#3b82f6;margin:0 0 4px">EdgeConductor</h2>
          <p style="color:#666;font-size:13px;margin:0 0 24px">IoT Platform for Hardware Teams</p>
          <p>Hi <strong>${company}</strong>,</p>
          <p style="color:#444;line-height:1.6">Thanks for your interest! We've received your hardware fit details and will send a tailored architecture brief within <strong>24 hours</strong>, along with a calendar link for a 15-min engineering review.</p>
          <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0">
            <p style="margin:0 0 10px;font-weight:600;font-size:14px">Your selections:</p>
            ${selectionTable}
          </div>
          <p style="color:#888;font-size:12px;margin-top:24px;border-top:1px solid #eee;padding-top:16px">EdgeConductor · edgeconductor.com</p>
        </div>
      `,
    }),
  ]);

  if (adminResult.error) console.error("[poc-inquiry] admin email error:", adminResult.error);
  if (userResult.error)  console.error("[poc-inquiry] user email error:", userResult.error);

  return NextResponse.json({
    success: true,
    adminSent: !adminResult.error,
    userSent:  !userResult.error,
    userError: userResult.error ?? null,
  });
}
