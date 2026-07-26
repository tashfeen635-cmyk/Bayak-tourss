import { NextRequest, NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/db";
import { deleteImage, extractPublicId } from "@/lib/cloudinary";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const member = await getById("team", id);
    if (!member) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error("GET team member error:", error);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
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
      const existing = await getById("team", id);
      if (existing && "image" in existing && existing.image && existing.image !== data.image) {
        const publicId = extractPublicId(existing.image);
        if (publicId) {
          await deleteImage(publicId).catch(() => {});
        }
      }
    }

    await update("team", id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT team member error:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await getById("team", id);
    if (existing && "image" in existing && existing.image) {
      const publicId = extractPublicId(existing.image);
      if (publicId) {
        await deleteImage(publicId).catch(() => {});
      }
    }
    await remove("team", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE team member error:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
