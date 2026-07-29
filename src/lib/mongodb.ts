import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let connecting: Promise<{ client: MongoClient; db: Db }> | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (connecting) {
    return connecting;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  connecting = MongoClient.connect(MONGODB_URI, { tls: true, maxPoolSize: 10, minPoolSize: 1 }).then(
    (client) => {
      cachedClient = client;
      cachedDb = client.db();
      connecting = null;
      return { client: cachedClient, db: cachedDb };
    }
  );

  return connecting;
}
