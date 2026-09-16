-- 한국노총 노동연대 사이트 — Supabase 스키마
-- 적용: node tools/db-apply.mjs  (자격증명은 ../.supabase/env.txt 에서 읽음)

-- 1. 문의 접수
create table if not exists public.inquiries (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- 2. 게시판 (공지·소식)
create table if not exists public.posts (
  id          bigint generated always as identity primary key,
  category    text not null default '공지',
  title       text not null,
  body        text not null,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

-- 3. RLS
alter table public.inquiries enable row level security;
alter table public.posts enable row level security;

-- 문의: 누구나 등록, 로그인한 관리자만 조회·수정
drop policy if exists inquiries_anon_insert on public.inquiries;
create policy inquiries_anon_insert on public.inquiries
  for insert to anon, authenticated with check (true);

drop policy if exists inquiries_admin_read on public.inquiries;
create policy inquiries_admin_read on public.inquiries
  for select to authenticated using (true);

drop policy if exists inquiries_admin_update on public.inquiries;
create policy inquiries_admin_update on public.inquiries
  for update to authenticated using (true) with check (true);

-- 게시글: 공개 글은 누구나 조회, 쓰기는 로그인한 관리자만
drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select to anon, authenticated using (published = true);

drop policy if exists posts_admin_read on public.posts;
create policy posts_admin_read on public.posts
  for select to authenticated using (true);

drop policy if exists posts_admin_insert on public.posts;
create policy posts_admin_insert on public.posts
  for insert to authenticated with check (true);

drop policy if exists posts_admin_update on public.posts;
create policy posts_admin_update on public.posts
  for update to authenticated using (true) with check (true);

drop policy if exists posts_admin_delete on public.posts;
create policy posts_admin_delete on public.posts
  for delete to authenticated using (true);
