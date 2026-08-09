import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const reels = await getCollection("reels");
    return NextResponse.json(reels, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("GET reels error:", error);
    return NextResponse.json({ error: "Failed to fetch reels" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const reel = await create("reels", data);
    return NextResponse.json(reel, { status: 201 });
  } catch (error) {
    console.error("POST reel error:", error);
    return NextResponse.json({ error: "Failed to create reel" }, { status: 500 });
  }
}
