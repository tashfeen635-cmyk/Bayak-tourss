import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { MongoClient, type Document } from "mongodb";

const BATCH_SIZE = 1000;

async function migrate() {
  const sourceUri = process.env.MONGODB_URI;
  const targetUri = process.env.TARGET_MONGODB_URI;
  if (!sourceUri) throw new Error("MONGODB_URI not found in .env.local");
  if (!targetUri) throw new Error("TARGET_MONGODB_URI env var is required");

  const source = new MongoClient(sourceUri, { tls: true, serverSelectionTimeoutMS: 25000 });
  const target = new MongoClient(targetUri, { tls: true, serverSelectionTimeoutMS: 25000 });

  await source.connect();
  await target.connect();

  const sourceDb = source.db();
  const targetDb = target.db();

  const collections = await sourceDb.listCollections().toArray();
  console.log(`Found ${collections.length} collections in source database.\n`);

  let total = 0;

  for (const { name } of collections) {
    const docs = await sourceDb.collection(name).find({}).toArray();

    if (docs.length === 0) {
      console.log(`${name}: 0 docs (skipping)`);
      continue;
    }

    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = docs.slice(i, i + BATCH_SIZE);
      await targetDb.collection(name).insertMany(batch as Document[], { ordered: false });
    }

    total += docs.length;
    console.log(`${name}: ${docs.length} docs migrated`);
  }

  console.log(`\nDone. Total ${total} documents migrated.`);
  await source.close();
  await target.close();
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
