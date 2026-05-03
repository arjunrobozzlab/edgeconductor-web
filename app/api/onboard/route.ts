import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, name, contact } = body;

  // 1 — Save to Supabase
  const { error: dbError } = await supabase.from("companies").upsert({
    slug,
    name: body.name,
    tagline: body.tagline,
    description: body.description,
    location: body.location,
    serving: body.serving,
    experience_years: body.experience_years,
    founded: body.founded,
    contact: body.contact,
    services: body.services,
    projects: body.projects,
    how_to_hire: body.how_to_hire,
    active: true,
  }, { onConflict: "slug" });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  // 2 — Auto-deploy agentic-profile on Vercel for this client
  const projectName = `${slug}-agents`;

  const vercelRes = await fetch("https://api.vercel.com/v10/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
      framework: "nextjs",
      gitRepository: {
        type: "github",
        repo: "arjunrobozzlab/agentic-profile",
      },
      environmentVariables: [
        { key: "COMPANY_SLUG", value: slug, target: ["production", "preview"] },
        { key: "NEXT_PUBLIC_SUPABASE_URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL, target: ["production", "preview"] },
        { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, target: ["production", "preview"] },
        { key: "SUPABASE_SERVICE_ROLE_KEY", value: process.env.SUPABASE_SERVICE_ROLE_KEY, target: ["production", "preview"] },
        { key: "GMAIL_USER", value: process.env.GMAIL_USER, target: ["production", "preview"] },
        { key: "GMAIL_APP_PASSWORD", value: process.env.GMAIL_APP_PASSWORD, target: ["production", "preview"] },
      ],
    }),
  });

  const vercelData = await vercelRes.json();
  const apiUrl = `https://${projectName}.vercel.app`;

  // 3 — Email client with their live API URL
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: contact?.email,
    subject: `Your Agentic API is live — ${name}`,
    html: `
      <h2>Your Agentic Profile API is ready</h2>
      <p>Your API is deploying now. It will be live at:</p>
      <p><b>${apiUrl}/api/services</b></p>
      <p><b>${apiUrl}/api/projects</b></p>
      <p><b>${apiUrl}/api/inquire</b> (POST)</p>
      <p>AI agents can now find and contact your business without any forms or buttons.</p>
      <p>Want to point this to your own domain? Reply to this email and we will help you set it up.</p>
      <br/>
      <p>— Edge Conductor</p>
    `,
  });

  return NextResponse.json({
    success: true,
    api_url: apiUrl,
    message: `Agentic profile deploying. Email sent to ${contact?.email}`,
    vercel_project: vercelData.id || projectName,
  });
}
