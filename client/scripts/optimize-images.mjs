#!/usr/bin/env node
/* eslint-disable no-console */
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, basename } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname;

const MAX_EDGE = 1600;
const WEBP_QUALITY = 82;
const MIN_BYTES = 300 * 1024;

const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const DRY = args.has("--dry");

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.isFile()) files.push(join(dir, e.name));
  }
  return files;
}

function webpPathFor(srcPath) {
  const dir = srcPath.slice(0, -basename(srcPath).length);
  const stem = basename(srcPath, extname(srcPath));
  return `${dir}${stem}.webp`;
}

async function processOne(srcPath) {
  const ext = extname(srcPath).toLowerCase();
  if (!SUPPORTED.has(ext)) return null;

  const s = await stat(srcPath);
  if (s.size < MIN_BYTES) return { srcPath, skipped: "too small" };

  const dst = webpPathFor(srcPath);
  if (!FORCE && existsSync(dst)) return { srcPath, skipped: "exists" };

  const img = sharp(srcPath, { failOnError: false });
  const meta = await img.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const resize =
    longest > MAX_EDGE
      ? { width: meta.width >= meta.height ? MAX_EDGE : null, height: meta.width >= meta.height ? null : MAX_EDGE }
      : null;

  if (DRY) {
    return {
      srcPath,
      dst,
      from: `${meta.width}x${meta.height}`,
      to: resize ? `${resize.width ?? "auto"}x${resize.height ?? "auto"}` : "no-resize",
      bytes: s.size,
    };
  }

  let pipeline = img;
  if (resize) pipeline = pipeline.resize(resize);
  await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 5, alphaQuality: 90 })
    .toFile(dst);

  const out = await stat(dst);
  return {
    srcPath,
    dst,
    from: `${meta.width}x${meta.height}`,
    fromBytes: s.size,
    toBytes: out.size,
    saved: `${((1 - out.size / s.size) * 100).toFixed(1)}%`,
  };
}

const files = await listFiles(PUBLIC_DIR);
const results = [];
for (const f of files) {
  try {
    const r = await processOne(f);
    if (r) results.push(r);
  } catch (err) {
    console.error("FAIL", f, err.message);
  }
}

const fmt = (n) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)}M` : `${(n / 1024).toFixed(0)}K`);

let totalIn = 0;
let totalOut = 0;
for (const r of results) {
  if (r.skipped) {
    console.log(`-  skip   ${basename(r.srcPath)} (${r.skipped})`);
    continue;
  }
  if (DRY) {
    console.log(`?  plan   ${basename(r.srcPath)} ${r.from} -> ${r.to} (${fmt(r.bytes)})`);
    continue;
  }
  totalIn += r.fromBytes;
  totalOut += r.toBytes;
  console.log(
    `+  webp   ${basename(r.srcPath)} ${r.from} ${fmt(r.fromBytes)} -> ${fmt(r.toBytes)} (${r.saved})`
  );
}
if (!DRY && totalIn) {
  console.log(
    `\nTotal: ${fmt(totalIn)} -> ${fmt(totalOut)} (${(((1 - totalOut / totalIn) * 100)).toFixed(1)}% smaller)`
  );
}
