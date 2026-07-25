import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reel = await getById("reels", id);
    if (!reel) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(reel);
  } catch (error) {
    console.error("GET reel error:", error);
    return NextResponse.json({ error: "Failed to fetch reel" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    await update("reels", id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT reel error:", error);
    return NextResponse.json({ error: "Failed to update reel" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await remove("reels", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE reel error:", error);
    return NextResponse.json({ error: "Failed to delete reel" }, { status: 500 });
  }
}
