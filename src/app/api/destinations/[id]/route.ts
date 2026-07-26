import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/db";
import { deleteImage, extractPublicId } from "@/lib/cloudinary";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const destination = await getById("destinations", id);
    if (!destination) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(destination);
  } catch (error) {
    console.error("GET destination error:", error);
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (data.image !== undefined) {
      const existing = await getById("destinations", id);
      if (existing && "image" in existing && existing.image && existing.image !== data.image) {
        const publicId = extractPublicId(existing.image);
        if (publicId) {
          await deleteImage(publicId).catch(() => {});
        }
      }
    }

    await update("destinations", id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT destination error:", error);
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getById("destinations", id);
    if (existing && "image" in existing && existing.image) {
      const publicId = extractPublicId(existing.image);
      if (publicId) {
        await deleteImage(publicId).catch(() => {});
      }
    }
    await remove("destinations", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE destination error:", error);
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 });
  }
}
