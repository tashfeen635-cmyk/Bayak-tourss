import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const all = await getCollection("testimonials");

    let results = all;
    if (status === "approved") {
      results = all.filter((t) => t.status === "approved" || !t.status);
    } else if (status === "pending") {
      results = all.filter((t) => t.status === "pending");
    } else if (status === "rejected") {
      results = all.filter((t) => t.status === "rejected");
    }

    return NextResponse.json(results);
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
