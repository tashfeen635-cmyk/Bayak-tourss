import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filter = {};
    if (status === "approved") {
      filter = { $or: [{ status: "approved" }, { status: { $exists: false } }] };
    } else if (status === "pending") {
      filter = { status: "pending" };
    } else if (status === "rejected") {
      filter = { status: "rejected" };
    }

    const results = await getCollection("testimonials", filter);

    return NextResponse.json(results, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonial = await create("testimonials", {
      ...data,
      status: data.status || "pending",
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
