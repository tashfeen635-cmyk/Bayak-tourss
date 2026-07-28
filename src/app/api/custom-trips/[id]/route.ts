import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trip = await getById("customTrips", id);
    if (!trip) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(trip);
  } catch (error) {
    console.error("GET custom-trip error:", error);
    return NextResponse.json({ error: "Failed to fetch custom trip" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    await update("customTrips", id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT custom-trip error:", error);
    return NextResponse.json({ error: "Failed to update custom trip" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await remove("customTrips", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE custom-trip error:", error);
    return NextResponse.json({ error: "Failed to delete custom trip" }, { status: 500 });
  }
}
