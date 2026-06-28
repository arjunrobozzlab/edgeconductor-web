import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json({
      error: "Missing env vars",
      GMAIL_USER: user ? "set" : "MISSING",
      GMAIL_APP_PASSWORD: pass ? "set" : "MISSING",
    }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"EdgeConductor Test" <${user}>`,
      to: "edgeconductor@gmail.com",
      subject: "✅ EdgeConductor Email Test",
      html: `<p>Email system working.<br>Sent from: ${user}<br>Time: ${new Date().toLocaleString()}</p>`,
    });

    return NextResponse.json({ success: true, sent_from: user, sent_to: "edgeconductor@gmail.com" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, code: e.code }, { status: 500 });
  }
}
