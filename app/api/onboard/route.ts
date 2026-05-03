import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabase.from("companies").upsert({
    slug: body.slug,
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

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, slug: body.slug });
}
