/**
 * Delete all Content documents for the Photography page.
 *
 * Usage (from server/ directory, with MONGO_URI in .env):
 *   node scripts/clear-photography-content.cjs
 *   node scripts/clear-photography-content.cjs --dry-run
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");

const dryRun = process.argv.includes("--dry-run");

async function main() {
  const uri = (process.env.MONGO_URI || "").trim();
  if (!uri) {
    console.error("MONGO_URI is not set. Add it to server/.env and retry.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const col = mongoose.connection.collection("contents");
  const filter = { page: "photography" };
  const n = await col.countDocuments(filter);

  console.log(`Found ${n} photography document(s) in "contents".`);

  if (n === 0) {
    await mongoose.disconnect();
    console.log("Nothing to delete.");
    return;
  }

  if (dryRun) {
    const sample = await col.find(filter).project({ section: 1, title: 1, images: 1 }).limit(5).toArray();
    console.log("[dry-run] Would delete all photography content. Sample:");
    for (const doc of sample) {
      console.log(`  - ${doc.section}: ${doc.title} (${doc.images?.length ?? 0} image URL(s))`);
    }
    if (n > 5) console.log(`  ... and ${n - 5} more`);
  } else {
    const res = await col.deleteMany(filter);
    console.log(`Deleted ${res.deletedCount} document(s).`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
