const fs = require('fs');
let content = fs.readFileSync('components/ExploreSection.tsx', 'utf-8');

// Replace Scene constants
content = content.replace(
  /const SCENE_HEIGHT_PX = 4953;\nconst SCENE_WIDTH_PX = 1440;\nconst pctOf = [^\n]+;/,
  `const yToVw = (pct: number) => \`\${(pct * 4953) / 1440}vw\`;\nconst xToVw = (pct: number) => \`\${pct}vw\`;`
);

// Replace position={{ top: pctOf(...), left: pctOf(...) }} with vw
content = content.replace(/pctOf\(([^,]+),\s*SCENE_HEIGHT_PX\)/g, 'yToVw($1)');
content = content.replace(/pctOf\(([^,]+),\s*SCENE_WIDTH_PX\)/g, 'xToVw($1)');

// Replace specific SD Card position
content = content.replace(/position=\{\{\s*top:\s*"66\.9%",\s*left:\s*"51\.6%"\s*\}\}/g, 'position={{ top: "66vw", left: "51.6vw" }}');

// Replace rem widths
content = content.replace(/w-\[[\d\.]+rem\]\s+md:w-\[([\d\.]+)rem\]/g, (match, mdRem) => {
  const px = parseFloat(mdRem) * 16;
  const vw = (px / 1440 * 100).toFixed(1);
  return `w-[${vw}vw]`;
});

// Replace Card widths
content = content.replace(/width="([\d\.]+)rem"/g, (match, rem) => {
  const px = parseFloat(rem) * 16;
  const vw = (px / 1440 * 100).toFixed(1);
  return `width="${vw}vw"`;
});

// Replace container height and margin
content = content.replace(/className="hidden lg:block relative h-\[200vh\] bg-black mt-\[140px\]"/g, 'className="hidden lg:block relative bg-black my-[10vh] w-full" style={{ height: "85vw" }}');

fs.writeFileSync('components/ExploreSection.tsx', content);
console.log('Conversion complete');
