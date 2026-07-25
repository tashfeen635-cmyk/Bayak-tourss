import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not found in .env.local");
  }

  const client = new MongoClient(uri, { tls: true });
  await client.connect();
  const db = client.db();

  const email = process.env.ADMIN_EMAIL || "admin@bayaktours.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    console.log("Admin user already exists.");
    await client.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await db.collection("users").insertOne({
    name: "Admin",
    email,
    password: hashedPassword,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log(`Admin user created: ${email}`);
  await client.close();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
