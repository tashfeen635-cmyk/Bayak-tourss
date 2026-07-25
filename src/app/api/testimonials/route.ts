import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const testimonials = await getCollection("testimonials");
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonial = await create("testimonials", data);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
