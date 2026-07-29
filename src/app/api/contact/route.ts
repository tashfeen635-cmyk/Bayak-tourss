import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const inquiry = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("inquiries").insertOne(inquiry);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("POST contact error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}