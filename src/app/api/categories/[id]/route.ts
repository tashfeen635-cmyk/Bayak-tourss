import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove, getCollection } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await getById("categories", id);
    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("GET category error:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const existing = await getCollection("categories");
    if (existing.some((c) => c.name.toLowerCase() === data.name.trim().toLowerCase() && c._id?.toString() !== id)) {
      return NextResponse.json({ error: "Category name already exists" }, { status: 409 });
    }

    await update("categories", id, { name: data.name.trim() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT category error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await remove("categories", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE category error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
