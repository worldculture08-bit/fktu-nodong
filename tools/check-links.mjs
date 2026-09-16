// 내부 링크 검사 — 외부(http/mailto) 제외, 상대경로만 실제 파일 존재 확인
// 사용: node tools/check-links.mjs
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SKIP = new Set([".git", ".vercel", "node_modules", "tools"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const missing = [];
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(raw)) continue;
    const target = raw.split("#")[0].split("?")[0];
    if (!target) continue;
    checked++;
    const abs = target.startsWith("/") ? join(ROOT, target) : resolve(dirname(file), target);
    if (!existsSync(abs)) {
      missing.push(`${relative(ROOT, file).replace(/\\/g, "/")} -> ${raw}`);
    }
  }
}

console.log(`HTML 파일 ${files.length}개 · 내부 링크 ${checked}개 검사`);
if (missing.length) {
  console.log(`\n깨진 링크 ${missing.length}개:`);
  for (const m of missing) console.log("  " + m);
  process.exit(1);
}
console.log("깨진 링크 0");
