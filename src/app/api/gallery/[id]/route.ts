import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/db";
import { deleteImage, extractPublicId } from "@/lib/cloudinary";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const image = await getById("gallery", id);
    if (!image) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(image);
  } catch (error) {
    console.error("GET gallery image error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery image" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (data.src !== undefined) {
      const existing = await getById("gallery", id);
      if (existing && "src" in existing && existing.src && existing.src !== data.src) {
        const publicId = extractPublicId(existing.src);
        if (publicId) {
          await deleteImage(publicId).catch(() => {});
        }
      }
    }

    await update("gallery", id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT gallery image error:", error);
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getById("gallery", id);
    if (existing && "src" in existing && existing.src) {
      const publicId = extractPublicId(existing.src);
      if (publicId) {
        await deleteImage(publicId).catch(() => {});
      }
    }
    await remove("gallery", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE gallery image error:", error);
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
