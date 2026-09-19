import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, company, hardware, protocols, useCase, fleet } = body;

  if (!email || !company) {
    return NextResponse.json({ error: "email and company are required" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  // Notify admin
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "edgeconductor@gmail.com",
    subject: `New PoC Inquiry: ${company} — ${useCase}`,
    html: `
      <h2>New Hardware Fit / PoC Inquiry — EdgeConductor</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${company}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Hardware</td><td style="padding:8px;border:1px solid #ddd">${hardware?.join(", ") || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Protocols</td><td style="padding:8px;border:1px solid #ddd">${protocols?.join(", ") || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Use Case</td><td style="padding:8px;border:1px solid #ddd">${useCase || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Fleet Size</td><td style="padding:8px;border:1px solid #ddd">${fleet || "—"}</td></tr>
      </table>
    `,
  });

  // Confirmation to user
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your EdgeConductor Architecture Brief — we'll be in touch",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
        <h2 style="margin-bottom:8px">Thanks, ${company}!</h2>
        <p style="color:#444;line-height:1.6">We've received your hardware fit details and will send a tailored architecture brief within <strong>24 hours</strong>, along with a calendar link for a 15-min engineering review.</p>
        <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:20px 0;font-size:14px;color:#555">
          <strong>Your selections:</strong><br/>
          Hardware: ${hardware?.join(", ") || "—"}<br/>
          Protocols: ${protocols?.join(", ") || "—"}<br/>
          Use Case: ${useCase || "—"}<br/>
          Fleet Size: ${fleet || "—"}
        </div>
        <p style="color:#888;font-size:13px">— EdgeConductor Team</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
