import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const USERS_COLLECTION = "users";

export interface User {
  _id?: unknown;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor";
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const { db } = await connectToDatabase();
  return db.collection<User>(USERS_COLLECTION).findOne({ email });
}

export async function findUserById(id: string): Promise<User | null> {
  const { db } = await connectToDatabase();
  const { ObjectId } = await import("mongodb");
  return db.collection<User>(USERS_COLLECTION).findOne({ _id: new ObjectId(id) });
}

export async function findUserByLogin(login: string): Promise<User | null> {
  const { db } = await connectToDatabase();
  return db.collection<User>(USERS_COLLECTION).findOne(
    { $or: [{ email: login }, { name: login }] },
    { collation: { locale: "en", strength: 2 } }
  );
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
