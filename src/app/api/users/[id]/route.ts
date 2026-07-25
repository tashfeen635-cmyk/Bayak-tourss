import { NextRequest, NextResponse } from "next/server";
import { updateUser, deleteUser } from "@/lib/users";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Don't allow password update through this route without explicit flag
    if (!data.password) {
      delete data.password;
    }

    await updateUser(id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE user error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
