import { cache } from "react";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId, WithId, type Filter } from "mongodb";
import type {
  Destination,
  Booking,
  TeamMember,
  Testimonial,
  GalleryImage,
  Reel,
  CustomTrip,
} from "@/types";

type CollectionMap = {
  destinations: Destination;
  bookings: Booking;
  team: TeamMember;
  testimonials: Testimonial;
  gallery: GalleryImage;
  reels: Reel;
  customTrips: CustomTrip;
};

export type CollectionName = keyof CollectionMap;

const ARRAY_FIELDS = ["category", "included", "availableDates", "languages"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeData(data: Record<string, any>): Record<string, any> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(data)) {
    if (ARRAY_FIELDS.includes(key) && typeof val === "string") {
      out[key] = val.split(",").map((s: string) => s.trim()).filter(Boolean);
    } else {
      out[key] = val;
    }
  }
  return out;
}

export interface GetCollectionOptions {
  limit?: number;
  projection?: Record<string, number>;
}

export const getCollection = cache(async function getCollection<K extends CollectionName>(
  name: K,
  filter: Filter<CollectionMap[K]> = {},
  options: GetCollectionOptions = {}
): Promise<WithId<CollectionMap[K]>[]> {
  const { db } = await connectToDatabase();
  let query = db.collection<CollectionMap[K]>(name).find(filter).sort({ createdAt: -1 });
  if (options.limit) query = query.limit(options.limit);
  if (options.projection) query = query.project(options.projection);
  const docs = await query.toArray();
  return JSON.parse(JSON.stringify(docs));
});

export async function getById<K extends CollectionName>(
  name: K,
  id: string
): Promise<WithId<CollectionMap[K]> | null> {
  const { db } = await connectToDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (db.collection(name) as any).findOne({ _id: new ObjectId(id) });
}

export async function create<K extends CollectionName>(
  name: K,
  data: Omit<CollectionMap[K], "_id" | "createdAt" | "updatedAt">
): Promise<CollectionMap[K]> {
  const { db } = await connectToDatabase();
  const normalized = normalizeData(data as Record<string, unknown>);
  const doc = { ...normalized, createdAt: new Date(), updatedAt: new Date() };
  const result = await db.collection(name).insertOne(doc);
  return { ...doc, _id: result.insertedId } as unknown as CollectionMap[K];
}

export async function update<K extends CollectionName>(
  name: K,
  id: string,
  data: Partial<Omit<CollectionMap[K], "_id" | "createdAt">>
): Promise<void> {
  const { db } = await connectToDatabase();
  const normalized = normalizeData(data as Record<string, unknown>);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db.collection(name) as any)
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...normalized, updatedAt: new Date() } });
}

export async function remove<K extends CollectionName>(
  name: K,
  id: string
): Promise<void> {
  const { db } = await connectToDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db.collection(name) as any).deleteOne({ _id: new ObjectId(id) });
}

export async function count<K extends CollectionName>(name: K): Promise<number> {
  const { db } = await connectToDatabase();
  return db.collection(name).countDocuments();
}
