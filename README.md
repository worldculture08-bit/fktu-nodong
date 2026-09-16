# fktu-nodong

한국노총 노동연대 정적 사이트.

- 사이트: https://fktu-nodong.vercel.app
- 구성: 정적 HTML/CSS/JS (빌드 없음) + Supabase 백엔드 (게시판, 문의 접수)
- 배포: `VERCEL_TOKEN=<토큰> node tools/deploy.mjs`
- 링크 검사: `node tools/check-links.mjs`
- 글 생성: `node tools/build-articles.mjs`
- DB 스키마: `tools/schema.sql` (적용: `node tools/db-apply.mjs` — 자격증명은 저장소 밖 `.supabase/env.txt`)

운영자 문서와 자격증명은 저장소에 포함하지 않습니다.
