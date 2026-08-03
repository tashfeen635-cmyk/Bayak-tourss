import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function GET() {
  try {
    const inquiries = await getCollection("inquiries");
    return NextResponse.json(inquiries, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("GET inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
