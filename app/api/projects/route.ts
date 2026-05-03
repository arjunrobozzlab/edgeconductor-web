import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const { data, error } = await supabase
    .from("companies")
    .select("name, projects")
    .eq("slug", "edge-conductor")
    .eq("active", true)
    .single();

  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let projects = data.projects || [];
  if (category) {
    projects = projects.filter((p: { category: string }) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  return NextResponse.json({ company: data.name, total: projects.length, projects });
}
