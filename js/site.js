// 사이트 공용 스크립트 — Supabase REST/Auth 직접 호출
// anon 키는 브라우저에 공개되는 값이다(설계상 공개). 실제 권한은 RLS가 통제한다.
// ponytail: supabase-js SDK를 CDN으로 불러오지 않고 fetch로 직접 호출. 쓰는 기능이 4개뿐이라.

export const SB_URL = "https://xbdaelrzfuwfzfstiaoh.supabase.co";
export const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZGFlbHJ6ZnV3Znpmc3RpYW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NTgxNDgsImV4cCI6MjEwNTEzNDE0OH0.tHQ5Ofaa_h2h_GnY54GuvkII88qXrbUX1mb5ridR4rE";

const SESSION_KEY = "fktu_admin_session";

export function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!s || !s.access_token) return null;
    return s;
  } catch {
    return null;
  }
}

export function saveSession(s) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function authHeaders(extra = {}) {
  const s = getSession();
  return {
    apikey: SB_KEY,
    Authorization: `Bearer ${s ? s.access_token : SB_KEY}`,
    ...extra,
  };
}

// 토큰 만료 시 refresh_token으로 갱신
async function refresh() {
  const s = getSession();
  if (!s || !s.refresh_token) return false;
  const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: SB_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: s.refresh_token }),
  });
  if (!res.ok) return false;
  const j = await res.json();
  saveSession(j);
  return true;
}

export async function signIn(email, password) {
  const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SB_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(j.error_description || j.msg || "로그인에 실패했습니다.");
  saveSession(j);
  return j;
}

export function signOut() {
  clearSession();
}

// REST 호출 — table: 'inquiries' | 'posts'
export async function rest(table, { method = "GET", query = "", body = null, prefer = "" } = {}) {
  const send = () =>
    fetch(`${SB_URL}/rest/v1/${table}${query}`, {
      method,
      headers: authHeaders({
        "Content-Type": "application/json",
        ...(prefer ? { Prefer: prefer } : {}),
      }),
      body: body ? JSON.stringify(body) : undefined,
    });

  let res = await send();
  if (res.status === 401 && getSession() && (await refresh())) res = await send();
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error((data && (data.message || data.hint)) || `요청 실패 (${res.status})`);
  return data;
}

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const fmtDate = (iso) => {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
};

export const fmtDateTime = (iso) => {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${fmtDate(iso)} ${p(d.getHours())}:${p(d.getMinutes())}`;
};
