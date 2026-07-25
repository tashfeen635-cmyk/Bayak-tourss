import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const destinations = await getCollection("destinations");
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("GET destinations error:", error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const destination = await create("destinations", data);
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error("POST destination error:", error);
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}
