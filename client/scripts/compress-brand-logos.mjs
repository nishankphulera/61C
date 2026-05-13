/**
 * Reads client/public/1.png … 28.png and writes client/public/brands/1.webp … 28.webp.
 * Targets <= 200KB per file (best effort if not achievable at min width/quality).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const outDir = path.join(publicDir, "brands");
const MAX_BYTES = 200 * 1024;
const WIDTHS = [512, 448, 384, 320, 256, 200];

async function compressOne(i) {
  const input = path.join(publicDir, `${i}.png`);
  if (!fs.existsSync(input)) {
    console.error(`Missing: ${input}`);
    process.exitCode = 1;
    return;
  }

  const outPath = path.join(outDir, `${i}.webp`);
  let globalBest = null;

  for (const w of WIDTHS) {
    for (let q = 85; q >= 38; q -= 4) {
      const buf = await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: q, effort: 5 })
        .toBuffer();

      if (buf.length <= MAX_BYTES) {
        await fs.promises.writeFile(outPath, buf);
        console.log(
          `${i}.webp  ${(buf.length / 1024).toFixed(1)} KB  (maxWidth=${w}, quality=${q})`
        );
        return;
      }
      if (!globalBest || buf.length < globalBest.length) {
        globalBest = { buf, w, q };
      }
    }
  }

  await fs.promises.writeFile(outPath, globalBest.buf);
  console.warn(
    `${i}.webp  ${(globalBest.buf.length / 1024).toFixed(1)} KB  still >200KB (best: maxWidth=${globalBest.w}, quality=${globalBest.q})`
  );
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (let i = 1; i <= 28; i++) {
    await compressOne(i);
  }
  console.log("Done. Output:", outDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
