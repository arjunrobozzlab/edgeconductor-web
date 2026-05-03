import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("companies")
    .select("name, tagline, description, location, serving, experience_years, founded, contact, how_to_hire")
    .eq("slug", "edge-conductor")
    .eq("active", true)
    .single();

  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}
