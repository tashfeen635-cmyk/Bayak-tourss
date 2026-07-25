import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import type { User } from "@/types";

const USERS_COLLECTION = "users";

export async function findUserByEmail(email: string): Promise<User | null> {
  const { db } = await connectToDatabase();
  return db.collection<User>(USERS_COLLECTION).findOne({ email });
}

export async function createUser(
  data: Omit<User, "_id" | "createdAt" | "updatedAt">
): Promise<User> {
  const { db } = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = {
    ...data,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(USERS_COLLECTION).insertOne(user);
  return { ...user, _id: result.insertedId } as unknown as User;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getAllUsers(): Promise<User[]> {
  const { db } = await connectToDatabase();
  return db
    .collection<User>(USERS_COLLECTION)
    .find({}, { projection: { password: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, "_id" | "createdAt">>
) {
  const { db } = await connectToDatabase();
  const { ObjectId } = await import("mongodb");

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  }

  return db
    .collection(USERS_COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } });
}

export async function deleteUser(id: string) {
  const { db } = await connectToDatabase();
  const { ObjectId } = await import("mongodb");
  return db.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
