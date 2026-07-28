import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const trips = await getCollection("customTrips");
    return NextResponse.json(trips);
  } catch (error) {
    console.error("GET custom-trips error:", error);
    return NextResponse.json({ error: "Failed to fetch custom trips" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const trip = await create("customTrips", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country || "",
      city: data.city || "",
      groupType: data.groupType || "",
      adults: Number(data.adults) || 1,
      children: Number(data.children) || 0,
      specialRequests: data.specialRequests || "",
      status: "pending",
    });
    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("POST custom-trips error:", error);
    return NextResponse.json({ error: "Failed to create custom trip" }, { status: 500 });
  }
}
