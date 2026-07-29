import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const gallery = await getCollection("gallery");
    return NextResponse.json(gallery, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.error("GET gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const image = await create("gallery", data);
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("POST gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
