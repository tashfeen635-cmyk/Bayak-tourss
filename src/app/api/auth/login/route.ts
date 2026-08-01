import { NextRequest, NextResponse } from "next/server";
import { findUserByLogin, verifyPassword } from "@/lib/users";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await findUserByLogin(String(email).trim());
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const session = await createSession({
      userId: user._id?.toString() || "",
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
      token: session,
    });
  } catch (error) {
    console.error("Login error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { error: "Database not configured. Please set MONGODB_URI environment variable." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
