import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

export async function GET() {
  try {
    const customers = await getCollection("customers");
    return NextResponse.json(customers);
  } catch (error) {
    console.error("GET customers error:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const customer = await create("customers", data);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("POST customer error:", error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
