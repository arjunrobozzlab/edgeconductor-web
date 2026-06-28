import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const PLATFORM = "https://ec-platform-ten.vercel.app";
const AUTH_CB  = `${PLATFORM}/auth/callback?next=/org`;

const DEMO_ORGS: Record<string, { id: string; name: string }> = {
  climate: { id: "238422ba-f809-4014-ad1a-f33c0090f839", name: "EC Platform Demo"  },
  tracker: { id: "44ba8fc2-99c8-4c9f-b53f-bfd859c5b6e6", name: "EC Tracker Demo"   },
  home:    { id: "238422ba-f809-4014-ad1a-f33c0090f839", name: "EC Platform Demo"  }, // reuse climate for now
};

export async function POST(req: NextRequest) {
  const { name, email, password, company, product_type } = await req.json();
  const demo = DEMO_ORGS[product_type as string] || DEMO_ORGS.climate;

  if (!name || !email || !password)
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  if (password.length < 6)
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });

  // Use PLATFORM Supabase credentials
  const platformUrl     = process.env.PLATFORM_SUPABASE_URL  || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const platformAnon    = process.env.PLATFORM_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const platformService = process.env.PLATFORM_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase      = createClient(platformUrl, platformAnon);
  const supabaseAdmin = createClient(platformUrl, platformService);

  // Create user with demo org assigned immediately
  const { data: signupData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name:    name,
        role:         "org_admin",
        company:      company || null,
        source:       "website",
        product_type: product_type || "climate",
        org_id:       demo.id,
        org_name:     demo.name,
      },
      emailRedirectTo: AUTH_CB,
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  // Update metadata via admin client to ensure org_id is set even before email confirm
  if (signupData.user?.id) {
    await supabaseAdmin.auth.admin.updateUserById(signupData.user.id, {
      user_metadata: {
        full_name:    name,
        role:         "org_admin",
        company:      company || null,
        source:       "website",
        product_type: product_type || "climate",
        org_id:       demo.id,
        org_name:     demo.name,
      },
    });
  }

  // Welcome email + admin notification
  try {
    await sendEmails(name, email, company);
  } catch (e: any) {
    console.error("Email error:", e.message);
    // Don't fail signup if email fails — just log
  }

  return NextResponse.json({ success: true });
}

async function sendEmails(name: string, email: string, company?: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  // Welcome email to user — simple format (same as working /api/inquire)
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Welcome to EdgeConductor — Your account is ready",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111;padding:32px">
        <h2 style="color:#3b82f6;margin:0 0 4px">EdgeConductor</h2>
        <p style="color:#666;margin:0 0 24px;font-size:13px">IoT Platform for Hardware Teams</p>

        <p>Hi <strong>${name}</strong>,</p>
        <p style="color:#444;line-height:1.6">
          Welcome to EdgeConductor! Your account has been created successfully.
          Please confirm your email using the link from Supabase to activate it.
        </p>

        <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0">
          <p style="margin:0 0 12px;font-weight:600">After confirming, open your dashboard:</p>
          <a href="${PLATFORM}/portal"
            style="display:inline-block;background:#3b82f6;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:600">
            Open Dashboard →
          </a>
        </div>

        <p style="color:#555;font-size:14px"><strong>Your Starter plan includes:</strong></p>
        <ul style="color:#555;font-size:14px;line-height:1.8;padding-left:20px">
          <li>5 devices · 1 organization</li>
          <li>Live telemetry &amp; historical charts</li>
          <li>OTA firmware updates</li>
          <li>QR device claiming</li>
          <li>Rules engine (threshold + schedule)</li>
        </ul>

        <p style="color:#888;font-size:12px;margin-top:24px;border-top:1px solid #eee;padding-top:16px">
          EdgeConductor · edgeconductor.com · ${email}
        </p>
      </div>
    `,
  });

  // Admin notification → always goes to edgeconductor@gmail.com
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "edgeconductor@gmail.com",
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
