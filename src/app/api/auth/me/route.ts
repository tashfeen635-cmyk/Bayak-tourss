import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { findUserById } from "@/lib/users";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user._id?.toString() ?? session.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
