#!/usr/bin/env node
/* eslint-disable no-console */
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, basename } from "node:path";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname;

const MIN_BYTES = 600 * 1024;

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const DRY = args.has("--dry");
const ONLY_HEAVY = args.has("--heavy");

const HEAVY = new Set([
  "Clapper v1.gif",
  "Converse.gif",
  "Vinyl.gif",
  "Drone.gif",
  "Films.gif",
  "Photography.gif",
  "Design.gif",
  "HomePage.gif",
]);

async function listGifs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && extname(e.name).toLowerCase() === ".gif")
    .map((e) => join(dir, e.name));
}

function run(args) {
  const r = spawnSync(ffmpegPath, args, { stdio: "pipe" });
  if (r.status !== 0) {
    throw new Error(
      `ffmpeg failed (${r.status}): ${r.stderr?.toString().slice(-400)}`
    );
  }
  return r;
}

function fmt(n) {
  return n >= 1024 * 1024
    ? `${(n / 1024 / 1024).toFixed(1)}M`
    : `${(n / 1024).toFixed(0)}K`;
}

const files = await listGifs(PUBLIC_DIR);
let totalIn = 0;
let totalOut = 0;

for (const src of files) {
  const name = basename(src);
  if (ONLY_HEAVY && !HEAVY.has(name)) continue;
  const s = await stat(src);
  if (s.size < MIN_BYTES && !HEAVY.has(name)) {
    console.log(`-  skip   ${name} (too small)`);
    continue;
  }

  const stem = basename(src, extname(src));
  const dir = src.slice(0, -name.length);
  const mp4 = `${dir}${stem}.mp4`;
  const webm = `${dir}${stem}.webm`;

  if (!FORCE && existsSync(mp4) && existsSync(webm)) {
    console.log(`-  skip   ${name} (already converted)`);
    continue;
  }

  if (DRY) {
    console.log(`?  plan   ${name} ${fmt(s.size)} -> ${stem}.mp4 + ${stem}.webm`);
    continue;
  }

  // h.264 mp4 (broad compat, hardware decode everywhere)
  run([
    "-y",
    "-i",
    src,
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=24",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "23",
    "-an",
    mp4,
  ]);

  // VP9 webm (smaller, slightly slower decode but transparent if needed)
  run([
    "-y",
    "-i",
    src,
    "-vf",
    "scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=24",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    "34",
    "-row-mt",
    "1",
    "-an",
    webm,
  ]);

  const o1 = await stat(mp4);
  const o2 = await stat(webm);
  totalIn += s.size;
  totalOut += Math.min(o1.size, o2.size);
  console.log(
    `+  video  ${name} ${fmt(s.size)} -> mp4 ${fmt(o1.size)} | webm ${fmt(o2.size)}`
  );
}

if (!DRY && totalIn) {
  console.log(
    `\nTotal: ${fmt(totalIn)} -> ${fmt(totalOut)} (best codec, ${(((1 - totalOut / totalIn) * 100)).toFixed(1)}% smaller)`
  );
}
