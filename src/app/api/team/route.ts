import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const team = await getCollection("team");
    return NextResponse.json(team, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("GET team error:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const member = await create("team", data);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("POST team error:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
