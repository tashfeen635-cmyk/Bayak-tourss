import { NextRequest, NextResponse } from "next/server";
import { getCollection, create } from "@/lib/db";

const DEFAULT_CATEGORIES = ["Adventure", "Family", "Honeymoon", "Cultural", "Luxury"];

export async function GET() {
  try {
    let categories = await getCollection("categories");
    if (categories.length === 0) {
      for (const name of DEFAULT_CATEGORIES) {
        await create("categories", { name });
      }
      categories = await getCollection("categories");
    }
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const existing = await getCollection("categories");
    if (existing.some((c) => c.name.toLowerCase() === data.name.trim().toLowerCase())) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    const category = await create("categories", { name: data.name.trim() });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
