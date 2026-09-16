// Supabase 스키마 적용 + 관리자 계정 생성
// 사용: node tools/db-apply.mjs
// 자격증명: ../../.supabase/env.txt (Vercel 환경변수에서 추출한 값, 저장소에 커밋하지 않음)
// ponytail: DDL은 여기서 한 번만. 이후 스키마 변경은 Supabase 대시보드나 새 SQL 파일로.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";

const HERE = import.meta.dirname;
const ENV_PATH = join(HERE, "..", "..", ".supabase", "env.txt");
const PG_MODULE = join(HERE, "..", "..", ".supabase", "node_modules", "pg");

const env = Object.fromEntries(
  readFileSync(ENV_PATH, "utf8").split(/\r?\n/).filter(Boolean)
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i), l.slice(i + 1)]; }),
);

const require = createRequire(import.meta.url);
const { Client } = require(PG_MODULE);

const url = new URL(env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL);
const client = new Client({
  host: url.hostname,
  port: Number(url.port || 5432),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, "") || "postgres",
  ssl: { rejectUnauthorized: false },
});

const sql = readFileSync(join(HERE, "schema.sql"), "utf8");
await client.connect();
await client.query(sql);
console.log("스키마 적용 완료");

const tables = await client.query(
  "select tablename from pg_tables where schemaname='public' order by tablename",
);
console.log("public 테이블:", tables.rows.map((r) => r.tablename).join(", "));

const policies = await client.query(
  "select tablename, policyname from pg_policies where schemaname='public' order by tablename, policyname",
);
console.log("RLS 정책", policies.rowCount + "개");
await client.end();

// 관리자 계정 (Auth) — 리셋 가능하도록 upsert
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "fktu-nodong@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (ADMIN_PASSWORD) {
  const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, email_confirm: true }),
  });
  const body = await res.json();
  console.log(res.ok
    ? `관리자 계정 생성: ${ADMIN_EMAIL}`
    : `관리자 계정 생성 실패(${res.status}): ${body.msg || body.message || JSON.stringify(body)}`);
} else {
  console.log("ADMIN_PASSWORD 미지정 — 관리자 계정 생성 생략");
}
