import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { findUserById, findUserByEmail, verifyPassword } from "@/lib/users";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, name, email, newPassword } = body;

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required" },
        { status: 400 }
      );
    }

    if (!name && !email && !newPassword) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 }
      );
    }

    const user = await findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await verifyPassword(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    const updates: Record<string, unknown> = {};

    if (name && name.trim()) {
      updates.name = name.trim();
    }

    if (email && email.trim()) {
      const trimmedEmail = email.trim().toLowerCase();
      if (trimmedEmail !== user.email.toLowerCase()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
          return NextResponse.json(
            { error: "Please enter a valid email address" },
            { status: 400 }
          );
        }
        const existing = await findUserByEmail(trimmedEmail);
        if (existing && existing._id?.toString() !== session.userId) {
          return NextResponse.json(
            { error: "That email is already in use" },
            { status: 400 }
          );
        }
        updates.email = trimmedEmail;
      }
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters" },
          { status: 400 }
        );
      }
      updates.password = await bcrypt.hash(newPassword, 12);
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = await import("mongodb");
    await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(session.userId) },
        { $set: { ...updates, updatedAt: new Date() } }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change credentials error:", error);
    return NextResponse.json(
      { error: "Failed to update credentials" },
      { status: 500 }
    );
  }
}
