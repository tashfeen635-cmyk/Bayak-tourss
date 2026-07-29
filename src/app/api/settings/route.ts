import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

const SETTINGS_KEY = "global";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const settings = await db.collection("settings").findOne({ key: SETTINGS_KEY });
    return NextResponse.json(
      settings || {
        siteName: "Bayak Tours",
        contactEmail: "info@bayaktours.com",
        contactPhone: "+92 314 6605966",
        address: "Islamabad, Pakistan",
        socialLinks: {
          instagram: "https://instagram.com/travelwith_arrehman",
          facebook: "https://facebook.com/Travelwitharrehman",
          tiktok: "https://tiktok.com/@travelwith_arrehman",
        },
        seo: {
          title: "Bayak Tours | Premium Pakistan Travel Experiences",
          description:
            "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more.",
          keywords: ["Pakistan tourism", "Hunza Valley tours", "Skardu trips"],
        },
      }
    );
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { db } = await connectToDatabase();

    await db
      .collection("settings")
      .updateOne(
        { key: SETTINGS_KEY },
        { $set: { ...data, key: SETTINGS_KEY, updatedAt: new Date() } },
        { upsert: true }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
