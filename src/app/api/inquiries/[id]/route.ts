import { NextRequest, NextResponse } from "next/server";
import { remove } from "@/lib/db";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await remove("inquiries", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE inquiry error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
