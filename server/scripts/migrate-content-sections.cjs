/**
 * One-time migration: rename Content.section values to match new site slugs.
 *
 * Usage (from server/ directory, with MONGO_URI in .env):
 *   node scripts/migrate-content-sections.cjs
 *   node scripts/migrate-content-sections.cjs --dry-run
 *
 * Optional: move legacy product-fnb into a single new bucket (split in admin if needed):
 *   PRODUCT_FNB_TO=fnb node scripts/migrate-content-sections.cjs
 *   PRODUCT_FNB_TO=product node scripts/migrate-content-sections.cjs
 *
 * Maps:
 *   films + page=films          -> brand-films
 *   more-films + page=films     -> documentaries
 *   automobile + page=photography -> automobiles
 *   events-shows + page=photography -> events
 *   product-fnb + page=photography -> fnb OR product (only if PRODUCT_FNB_TO set)
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");

const dryRun = process.argv.includes("--dry-run");
const productFnbTo = (process.env.PRODUCT_FNB_TO || "").trim();

async function main() {
  const uri = (process.env.MONGO_URI || "").trim();
  if (!uri) {
    console.error("MONGO_URI is not set. Add it to server/.env and retry.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const col = mongoose.connection.collection("contents");
  const count = await col.countDocuments();
  console.log(`Connected. Collection "contents" has ${count} document(s).`);

  const renames = [
    { page: "films", from: "films", to: "brand-films" },
    { page: "films", from: "more-films", to: "documentaries" },
    { page: "photography", from: "automobile", to: "automobiles" },
    { page: "photography", from: "events-shows", to: "events" },
  ];

  for (const { page, from, to } of renames) {
    const filter = { page, section: from };
    const n = await col.countDocuments(filter);
    if (n === 0) {
      console.log(`Skip ${page}/${from} -> ${to}: no documents.`);
      continue;
    }
    console.log(`${dryRun ? "[dry-run] " : ""}Would update ${n} doc(s): ${page} section "${from}" -> "${to}"`);
    if (!dryRun) {
      const res = await col.updateMany(filter, { $set: { section: to } });
      console.log(`  Matched: ${res.matchedCount}, modified: ${res.modifiedCount}`);
    }
  }

  if (productFnbTo === "fnb" || productFnbTo === "product") {
    const filter = { page: "photography", section: "product-fnb" };
    const n = await col.countDocuments(filter);
    if (n === 0) {
      console.log(`Skip product-fnb -> ${productFnbTo}: no documents.`);
    } else {
      console.log(
        `${dryRun ? "[dry-run] " : ""}Would update ${n} doc(s): photography section "product-fnb" -> "${productFnbTo}"`,
      );
      if (!dryRun) {
        const res = await col.updateMany(filter, { $set: { section: productFnbTo } });
        console.log(`  Matched: ${res.matchedCount}, modified: ${res.modifiedCount}`);
      }
    }
  } else {
    const n = await col.countDocuments({ page: "photography", section: "product-fnb" });
    if (n > 0) {
      console.log(
        `Note: ${n} document(s) still use section "product-fnb". Split manually in admin, or rerun with PRODUCT_FNB_TO=fnb or PRODUCT_FNB_TO=product.`,
      );
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
