import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const PLATFORM = "https://ec-platform-ten.vercel.app";

export async function POST(req: NextRequest) {
  const { name, email, password, company } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  if (password.length < 6)
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });

  // Use anon key for auth.signUp (sends Supabase confirmation email)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, role: "customer", company: company || null },
      emailRedirectTo: `${PLATFORM}/portal/login`,
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  // Welcome email + admin notification (fire-and-forget)
  sendEmails(name, email, company).catch(e => console.error("Email error:", e));

  return NextResponse.json({ success: true });
}

async function sendEmails(name: string, email: string, company?: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  // Welcome email to user
  await transporter.sendMail({
    from: `"EdgeConductor" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to EdgeConductor — Confirm your account",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:16px">
        <div style="margin-bottom:28px">
          <h1 style="margin:0;font-size:24px;color:#3b82f6;letter-spacing:-0.5px">EdgeConductor</h1>
          <p style="margin:4px 0 0;color:#475569;font-size:13px">IoT Platform for Hardware Teams</p>
        </div>

        <p style="color:#e2e8f0">Hi <strong>${name}</strong>,</p>
        <p style="color:#94a3b8;line-height:1.6">
          Your EdgeConductor account has been created. One more step — confirm your email
          to activate it (check for an email from Supabase in your inbox).
        </p>

        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:20px;margin:24px 0">
          <p style="margin:0 0 12px;font-size:12px;color:#475569;text-transform:uppercase;letter-spacing:.08em">After confirming, sign in at</p>
          <a href="${PLATFORM}/portal/login"
            style="display:inline-block;background:#3b82f6;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
            Open Dashboard →
          </a>
          <p style="margin:12px 0 0;font-size:12px;color:#334155">${PLATFORM}/portal/login</p>
        </div>

        <div style="border-top:1px solid #1e293b;padding-top:24px;margin-top:8px">
          <p style="color:#475569;font-size:13px;margin:0 0 8px;font-weight:600">Your Starter plan includes:</p>
          <p style="color:#64748b;font-size:13px;margin:4px 0">✓ 5 devices · 1 organization</p>
          <p style="color:#64748b;font-size:13px;margin:4px 0">✓ Live telemetry &amp; historical charts</p>
          <p style="color:#64748b;font-size:13px;margin:4px 0">✓ OTA firmware updates</p>
          <p style="color:#64748b;font-size:13px;margin:4px 0">✓ QR device claiming</p>
          <p style="color:#64748b;font-size:13px;margin:16px 0 0">
            Need more devices or multi-tenant access?
            <a href="https://edgeconductor.com/contact" style="color:#3b82f6"> Upgrade to Pro →</a>
          </p>
        </div>

        <p style="color:#1e293b;font-size:11px;margin-top:32px;border-top:1px solid #0f172a;padding-top:16px">
          EdgeConductor · edgeconductor.com · Sent to ${email}
        </p>
      </div>
    `,
  });

  // Admin notification
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `🚀 New Signup: ${name}${company ? ` — ${company}` : ""}`,
    html: `
      <h3>New EdgeConductor Signup</h3>
      <table style="border-collapse:collapse">
        <tr><td style="padding:6px 12px;color:#666">Name</td><td style="padding:6px 12px"><strong>${name}</strong></td></tr>
        <tr><td style="padding:6px 12px;color:#666">Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:6px 12px;color:#666">Company</td><td style="padding:6px 12px">${company || "—"}</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Plan</td><td style="padding:6px 12px">Starter (Free)</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Time</td><td style="padding:6px 12px">${new Date().toLocaleString()}</td></tr>
      </table>
    `,
  });
}
