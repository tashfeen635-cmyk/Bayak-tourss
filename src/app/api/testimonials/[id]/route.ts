import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await getById("testimonials", id);
    if (!testimonial) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("GET testimonial error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    await update("testimonials", id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT testimonial error:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await remove("testimonials", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE testimonial error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
