// Vercel 정적 배포 — 프로젝트 fktu-nodong (도메인 fktu-nodong.vercel.app)
// 사용: VERCEL_TOKEN=... node tools/deploy.mjs
// ponytail: 빌드 없음. 파일을 그대로 올린다. Next.js 등으로 바뀌면 이 스크립트를 버리고 CLI를 쓸 것.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const TOKEN = process.env.VERCEL_TOKEN;
if (!TOKEN) throw new Error("VERCEL_TOKEN 환경변수가 필요합니다");

const ROOT = join(import.meta.dirname, "..");
const SKIP = new Set([".git", ".vercel", "node_modules", "tools", ".env.local", "README.md"]);
const API = "https://api.vercel.com";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(ROOT).map((p) => ({
  file: relative(ROOT, p).replace(/\\/g, "/"),
  data: readFileSync(p, "utf8"),
}));
console.log(`업로드 파일 ${files.length}개`);

const res = await fetch(`${API}/v13/deployments?forceNew=1`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({ name: "fktu-nodong", target: "production", files }),
});
const dep = await res.json();
if (!res.ok) throw new Error(`배포 생성 실패: ${JSON.stringify(dep)}`);
console.log(`생성됨 ${dep.id} → https://${dep.url}`);

let state = dep.readyState;
for (let i = 0; i < 60 && state !== "READY" && state !== "ERROR"; i++) {
  await new Promise((r) => setTimeout(r, 3000));
  const r = await fetch(`${API}/v13/deployments/${dep.id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  state = (await r.json()).readyState;
}
console.log(`상태: ${state}`);
if (state !== "READY") process.exit(1);
