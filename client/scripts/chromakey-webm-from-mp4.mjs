#!/usr/bin/env node
/**
 * Re-encode MP4s to VP9 WebM with white keyed out (approximate alpha).
 * Browsers load `<source src="*.webm">` before `*.mp4` in Asset/Card.
 *
 * Usage (from repo root):
 *   node client/scripts/chromakey-webm-from-mp4.mjs
 *
 * Tweak similarity/blend if edges look harsh: CHROMA_SIM, CHROMA_BLEND below.
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const PUBLIC = new URL("../public/", import.meta.url).pathname;

/** Stems under public/ (files must be `{stem}.mp4`). Skip HomePage — keep hand-authored WebM. */
const STEMS = [
  "Design",
  "Clapperv1",
  "Converse",
  "Vinyl",
  "Drone",
  "Films",
  "Photography",
];

const CHROMA_SIM = "0.08";
const CHROMA_BLEND = "0.04";

function run(args) {
  const r = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const stem of STEMS) {
  const input = `${PUBLIC}${stem}.mp4`;
  const output = `${PUBLIC}${stem}.webm`;
  if (!existsSync(input)) {
    console.warn(`skip (no mp4): ${stem}`);
    continue;
  }
  console.log(`encode: ${stem}.webm`);
  run([
    "-y",
    "-i",
    input,
    "-vf",
    `chromakey=white:${CHROMA_SIM}:${CHROMA_BLEND},format=yuva420p`,
    "-c:v",
    "libvpx-vp9",
    "-pix_fmt",
    "yuva420p",
    "-an",
    "-b:v",
    "0",
    "-crf",
    "32",
    "-row-mt",
    "1",
    output,
  ]);
}

console.log("done");
