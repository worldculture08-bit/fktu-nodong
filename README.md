# 한국노총 노동연대 홈페이지 — 운영 안내

**주소: https://fktu-nodong.vercel.app** (이 주소 하나로 운영)

---

## 1. 사이트 구성

정적 HTML/CSS/JS 사이트입니다. 빌드 없이 파일을 그대로 올립니다.

```
index.html              홈 (최신 소식 + 지식 최신 3편 + 게시판 최신 글 3건)
about.html              소개 (조직·주요 인물)
opinion/index.html      오피니언 (게시판 posts 중 분류=오피니언만 모아 보여줌)
join.html               회원가입 (members 테이블에 명단 접수 — 계정 아님)
direction.html          활동방향 (5개 축)
news/index.html         소식 목록
news/2026-*.html        소식 개별 페이지 (보도·정부자료 요약)
articles/index.html     지식 목록 (검색창 + 분류 버튼, 54편)
articles/*.html         지식 글 (기초 해설, 법률 자문 아님)
board.html              게시판 목록 (DB에서 불러옴)
post.html               게시판 글 보기 (board.html?id=N)
admin.html              운영자 페이지 (로그인 후 문의·게시글 관리)
contact.html            문의 폼 (DB에 접수)
js/site.js              Supabase 연결·공용 함수
styles.css              공통 스타일
logo.svg                로고 (헤더 마크 + 파비콘)
apple-touch-icon.png    아이폰 홈화면 아이콘 (180)
icon-512.png            앱 아이콘 (512)
og.png                  공유 카드 (1200x630)
favicon.ico             브라우저 자동 요청용 (180 PNG 내장)
tools/                  배포·글생성·스키마·점검 도구 (사이트에는 안 올라감)
tools/articles-batch2.mjs   지식 글 2차 배치 20편 데이터
tools/articles-batch3.mjs   지식 글 3차 배치 24편 데이터 (2026-09-18 · 실무 절차·권리구제 위주)
tools/brand.mjs         로고·파비콘·공유메타 일괄 적용기
tools/site-links.mjs    메뉴·푸터 공통 링크 일괄 적용기 (회원가입·문의·운영자 로그인)
tools/schema-members.sql  회원가입 명단 테이블 정의
tools/brand-card.html   공유 카드 원본 (1200x630)
tools/make-ico.mjs      apple-touch-icon.png → favicon.ico
tools/gen-sitemap.mjs   sitemap.xml 생성기 (현재 공개 페이지 74개. 글 추가 뒤 실행)
tools/promo-kit.md      채널별 홍보 문구 모음 — X·카페·페이스북·단체문자 (사이트에 안 올라감)
tools/social-post.mjs   자동 게시기 — telegram·discord·bluesky·facebook (x 는 코드만 유지 · 유료화됨)
tools/test-social-post.mjs  5채널 요청 모양 자기 점검 24항목 (모의서버 · 토큰 불필요)
tools/social-setup.md   채널 토큰(무료) 발급 절차 + 예약·작업 스케줄러 자동 실행 안내
tools/gen-feed.mjs      RSS feed.xml 생성기 (글 추가 뒤 실행 · 지식 54+소식 6=60항목)
tools/search-console-guide.md  Google Search Console 등록·사이트맵 제출 안내
tools/promo-browser.mjs  페이스북 '한국노총 노동연대' 페이지 자동 게시 (--target page 기본, --target profile 로 개인)
tools/promo-blog.mjs     블로거(fktu-nodong.blogspot.com) 자동 발행
tools/promo-daily.cmd    매일 자동 실행 러너 (초안 1건 생성 + 공식 API 채널만 1건)
tools/social-draft.mjs   소셜 초안 생성기 (X·스레드·인스타그램 길이 맞춤 · 브라우저 안 씀 · 게시 안 함)
tools/promo-logs.mjs     실행 로그·발행 기록 점검 (--summary/--tail/--problems/--self-test)
```

## 2. 운영자 페이지

**https://fktu-nodong.vercel.app/admin.html**

사이트 모든 페이지 **푸터 오른쪽 “회원가입 · 문의 · 운영자 로그인”** 링크로 들어갑니다. 메뉴·푸터 일괄 적용은 `node tools/site-links.mjs` (멱등).

운영자 계정 정보는 이 문서에 저장하지 마세요. Supabase Authentication 또는 Vercel 대시보드에서 직접 확인·재설정하고, 비밀번호와 토큰은 개인 비밀번호 관리자 또는 플랫폼의 환경변수 저장소에만 보관하세요.

할 수 있는 일:
- **문의 접수 확인** — contact.html로 들어온 문의를 읽고, 처리완료 표시·삭제
- **게시글 작성** — 공지·현장소식·성명·오피니언·자료 분류로 글 등록, 수정, 삭제, 공개/비공개
- **오피니언** — 분류를 `오피니언`으로 지정해 등록하면 `opinion/index.html` 메뉴에 자동으로 올라옵니다. 수정은 아래 목록에서 글을 눌러 불러온 뒤 고치고 저장하면 됩니다 (별도 배포 불필요)

현재 올라간 오피니언 글:

| id | 제목 | 상태 |
|---|---|---|
| 6 | 고려아연 온산제련소 추락 사망 사고 성명 (2026-09-17) · 원문 `tools/opinion-2026-09-17-churak.txt` | 공개 |
| 5 | 한화오션 하청 산재 은폐 의혹 성명 (2026-09-17) | 비공개 |

⚠️ 문서·채팅·저장소에 비밀번호나 토큰을 남기지 마세요. 노출이 의심되면 즉시 Supabase Authentication과 Vercel Tokens에서 재설정·폐기하고, 새 값은 개인 비밀번호 관리자 또는 플랫폼 환경변수에만 보관하세요.

## 3. 백엔드 (Supabase)

| 항목 | 값 |
|---|---|
| 프로젝트 | `supabase-cobalt-kite` (ref `xbdaelrzfuwfzfstiaoh`) |
| URL | `https://xbdaelrzfuwfzfstiaoh.supabase.co` |
| 리전 | us-east-1 · Free 플랜 |
| 연결 방식 | 정적 페이지에서 REST/Auth 직접 호출 (서버 코드 없음) |
| 환경변수 | Supabase URL·anon 키는 사이트 설정에서, service_role 키와 운영자 비밀번호는 Vercel/Supabase 대시보드 또는 개인 비밀번호 관리자에서 관리 · **문서·저장소에 평문으로 저장 금지** |

### 테이블

- `inquiries` — 문의 접수 (name, email, phone, subject, message, handled, created_at)
- `posts` — 게시판 (category, title, body, published, created_at)
- `members` — 회원가입 명단 (name, email, phone, org, region, interest, agreed, created_at). **계정이 아니라 명단**임 — 비밀번호를 받지 않으므로 가입자가 사이트 권한을 얻지 않습니다

스키마 적용: `node tools/db-apply.mjs schema-members.sql` (기존 테이블은 `schema.sql`)

### 접근 규칙 (RLS)

| 동작 | 권한 |
|---|---|
| 문의 등록 | 누구나 (anon) |
| 문의 조회·수정·삭제 | 로그인한 운영자만 |
| 공개 게시글 조회 | 누구나 |
| 비공개 게시글 조회 | 로그인한 운영자만 |
| 게시글 작성·수정·삭제 | 로그인한 운영자만 |

anon 키는 브라우저에 공개되는 값입니다(설계상 정상). 실제 권한은 위 RLS가 통제합니다.
service_role 키는 **절대 사이트에 넣지 마세요** — RLS를 우회합니다.

## 4. 글 추가하는 법

### 지식 글
`tools/articles-batch2.mjs` 또는 `tools/articles-batch3.mjs` 의 배열 **끝에** 항목을 추가합니다 (2차 20편=2026-09-16, 3차 24편=2026-09-18. 생성기 `build-articles.mjs` 가 두 파일을 합쳐 씁니다).
**분류도 같이 넣어야 합니다** — `build-articles.mjs` 의 `CAT` 표에 `slug: "분류"` 한 줄. 빠졌거나 `CAT_ORDER` 에 없는 분류를 쓰면 생성기가 오류로 멈춥니다(카드 수·분류 합계를 스스로 검산).
```bash
node tools/build-articles.mjs     # articles/*.html + articles/index.html + 홈(index.html) 지식 카드
```
배열 끝에 넣어야 홈 '노동 기초 지식'의 **최신 3편**에 뜝니다. (홈은 최근 3편만 보여줍니다)

홈 지식 구역은 `index.html` 의 `<!-- articles:home:start -->` ~ `<!-- articles:home:end -->` 이고,
스크립트가 이 구역을 통째로 다시 씁니다. **마커 안쪽은 손으로 고치지 마세요** — 다음 실행 때 덮어씁니다.
실행 후 써 놓은 홈을 다시 읽어 카드 수를 세고, 기대값과 다르면 오류로 멈춥니다.

### 소식
확인된 자료(보도·정부 보도자료)만 요약해 `news/YYYY-MM-DD-제목.html` 을 만들고,
`news/index.html` 목록과 `index.html` 최신 소식에 같은 항목을 추가합니다.
원문 링크(`source-link`)를 반드시 넣습니다. 사이트 자체 안내글은 원문이 없으므로
배지(`badge`)를 **사이트 안내**로 달고 날짜 옆 출처를 `자체 안내`로 적습니다. (예: `2026-09-16-site-guide.html`)

### 게시판
`admin.html` 에서 직접 작성합니다. 파일을 고칠 필요 없습니다.

본문에 `http(s)://` 주소를 쓰면 글 보기에서 **자동으로 링크**가 됩니다 (`js/site.js` 의 `linkify`,
`esc()` 뒤에 적용). 주소 끝의 마침표·괄호는 링크에서 빼냅니다. `javascript:` 등 다른 스킴은 링크로 만들지 않습니다.
규칙 점검: `node tools/test-linkify.mjs` (8종)

글쓰기 화면에는 **미리보기**가 있습니다. 내용·제목·분류를 고치면 바로 다시 그려지고,
글 보기와 같은 순서(`esc()` → `linkify()` → 줄바꿈)로 렌더링합니다. 서버를 거치지 않는 로컬 미리보기라
저장 버튼을 누르기 전에 모양을 확인할 수 있습니다.

### 홈 최신 소식
`index.html` 의 `<ul class="list-plain">` 에 항목을 추가합니다.

### 홈 게시판 최신 글
손 안 대도 됩니다. `index.html` 아래쪽 module 스크립트가 `posts` 에서 최근 3건을 불러와
`#board-list` 에 그립니다. 실패하면 `#board-note` 에 안내 문구를 보여주고,
글이 없으면 "아직 등록된 글이 없습니다"를 표시합니다.

## 5. 로고·아이콘·공유 카드

로고는 `logo.svg` 한 개입니다. 붉은 라운드 배지 위에 흰 불꽃 두 갈래(아래에서 위로 타오르는 현장) — 글자 없이도 읽히게 만든 마크라 16px 파비콘까지 같은 파일을 씁니다.

| 파일 | 쓰임 |
|---|---|
| `logo.svg` | 헤더 마크 + SVG 파비콘 (원본) |
| `apple-touch-icon.png` (180) | 아이폰 홈화면 추가 |
| `icon-512.png` (512) | 앱 아이콘용 큰 판 |
| `og.png` (1200x630) | 카카오톡·X·슬래 공유 카드 |
| `favicon.ico` (180 PNG 내장) | 브라우저가 링크와 상관없이 자동 요청하는 `/favicon.ico` |

헤더 마크·파비콘·공유 메타(`og:*`)는 44개 HTML 에 들어 있습니다. **손으로 고치지 말고 스크립트로 도세요** — 멱등이라 몇 번을 돌려도 결과가 같고, 하나라도 빠지면 오류로 멈춥니다.

```bash
node tools/brand.mjs
```

`logo.svg` 를 고쳤으면 그림을 다시 띄웁니다 (Chrome 헤드리스):

```bash
node tools/brand-icons.mjs   # apple-touch-icon.png · icon-512.png · og.png
node tools/make-ico.mjs      # favicon.ico (위 PNG 를 그대로 감쌈)
```

- `brand-icons.mjs` 가 임시 HTML 로 크기를 고정해 뜨고, 결과 PNG 를 열어 **불꽃이 실제로 그려졌는지 비중까지 확인한 뒤** 저장합니다. 크롬이 이미 떠 있거나 뷰포트가 최소 크기보다 작으면 엉뚱한 화면이 찍히는데, 그걸 그대로 배포하지 않으려는 장치입니다.
- 공유 카드 문구는 `tools/brand-card.html` 에서 고칩니다.
- 모양을 눈으로(터미널에서) 확인하려면: `node tools/logo-preview.mjs` — 64px·28px 를 문자로 찍어 줍니다.
- 한글이 카드에서 깨지면 그 PC에 `맑은 고딕` 이 있는지 확인하세요 (headless Chrome 도 시스템 폰트를 씁니다).

## 6. 배포

```bash
# 팀 스코프 토큰
VERCEL_TOKEN=<토큰> node tools/deploy.mjs
# 계정(Full Account) 스코프 토큰 — teamId 를 붙여야 팀 프로젝트를 찾습니다
VERCEL_TOKEN=<토큰> VERCEL_TEAM=team_3HoUweM4zrGrTm1lCaxrYjpI node tools/deploy.mjs
# (프로젝트 이름은 기본 fktu-nodong-v2. 다르게 올리려면 VERCEL_PROJECT=<이름> 추가)
```
- 프로젝트: **`fktu-nodong-v2`** (`prj_WUsBK4YXEtyS8tyjYnlBkI3lwfGE`, 팀 `worldculture0825-2848`) — 2026-10-02 부터
- 도메인: `fktu-nodong.vercel.app` (이 프로젝트 소유)
- ⚠️ 2026-10-02 프로젝트 이전: 구 프로젝트 `fktu-nodong` (`prj_P4tHJiJGn8AFlgW9tdhimQlxUqY0`) 는 백엔드에 레거시 설정이 고착되어 **모든 배포가 `BUILD_FAILED / Resource provisioning failed`**(빌드 컨테이너가 시작되지 않음)로 실패했습니다. 공개 API로 바꿀 수 있는 설정(`fluid: false`, 함수 타임아웃 10s, 배포 보호 해제)을 모두 되돌려도 동일했고, 같은 설정의 임시 신규 프로젝트는 정상 배포되어 **프로젝트 단위 고착**으로 확인했습니다. 도메인은 그대로 `fktu-nodong-v2` 로 옮겼으니 주소·기능은 불변입니다. 구 프로젝트는 **2026-10-02 폐기 완료**했습니다(원인 확인용 진단 정보는 `tools/vercel-support-ticket.md` 에 보관 — 지원팀에는 복구 요청이 아닌 원인·재발 방지 문의용). 같은 증상이 새 프로젝트에서 재발하면 Vercel 지원팀에 위 문구로 문의하세요.
- 토큰은 vercel.com → Settings → Tokens 에서 발급. 만료되면 새로 만들어 쓰세요.
- 토큰 Scope 는 **`worldculture0825-nodong` (팀)** 이 편합니다. Full Account 로 만들었으면 `VERCEL_TEAM=team_3HoUweM4zrGrTm1lCaxrYjpI` 를 같이 넘기세요 (2026-09-17 부터 스크립트가 `teamId` 를 붙입니다).
- 대시보드 토큰 생성 폼에서 **Scope 를 팀으로 고르면 폼 검사가 계속 실패**했습니다(`Select a valid scope.`). 계정 스코프로 만들고 `VERCEL_TEAM` 을 넘기는 쪽이 실제로 됩니다.
- `tools/deploy.mjs` 는 png·jpg·ico·woff 등은 base64 로 올립니다 (`encoding: "base64"`). utf8 로 읽으면 이미지가 깨집니다 — 아이콘 추가 뒤 이 부분을 건드리지 마세요.
- 2026-09-17 현재: 이전 토큰(`codebuff-deploy-20260916`)은 만료. 지금은 계정 스코프 토큰 + `VERCEL_TEAM=team_3HoUweM4zrGrTm1lCaxrYjpI` 로 배포합니다. 토큰은 대시보드 Settings → Tokens 에서 새로 발급하고, 채팅·문서에 남기지 마세요 (만료된 토큰은 revoke).

배포 전 확인:
```bash
node tools/gen-sitemap.mjs     # 새 글 반영 (sitemap.xml 갱신)
node tools/gen-feed.mjs        # 새 글 반영 (feed.xml RSS 갱신)
node tools/check-links.mjs     # 내부 링크 전수 검사 (깨진 링크 0 이어야 함)
```

## 7. 검증 기록 (2026-09-16)

| 항목 | 결과 |
|---|---|
| 내부 링크 | 23개 페이지 · 252개 링크 · 깨짐 **0** |
| 배포 후 페이지 | 16/16 **200** |
| 소식 자체 안내글 추가 (2026-09-16) | 24개 페이지 · 264개 링크 · 깨짐 **0** · 주요 페이지 전부 **200** |
| 게시판 공지 등록 (2026-09-16) | `posts` #4 로 같은 안내글 등록 · anon 조회에 노출 확인 · `post.html?id=4` **200** |
| 홈 게시판 최신 글 (2026-09-16) | 브라우저 실측 — 홈에 #4·#3 표시 · 첫 링크 클릭 → `/post.html?id=4` 본문 23줄 렌더링 ✅ |
| 홈 지식 최신 3편 (2026-09-16) | 브라우저 실측 — 최저임금·주휴수당 / 노조 설립 / 부당해고 3장 표시 ✅ · 생성기 2회 실행 결과 동일(드리프트 0) · 카드 수 자체 점검 통과 |
| 본문 주소 자동 링크 (2026-09-16) | 브라우저 실측 — `post.html?id=4` 주소 1개가 링크화(href·`target=_blank`·`rel` 확인) · 주소 없는 `id=3` 은 링크 0 · `test-linkify.mjs` 8종 ✅ |
| 글쓰기 미리보기 (2026-09-16) | 브라우저 실측(로그인 후) — 빈 상태 안내문 · 제목→`h1` · 분류→배지 · 주소→링크 · `<b>` 태그 미실행(0개) · 줄바꿈 4줄 유지 ✅ · 점검 중 글 등록 안 됨(게시글 2건 그대로) |
| 문의 폼 | 브라우저에서 실제 제출 → DB 저장 → 운영자 페이지에서 확인 ✅ |
| 관리자 로그인 | 실제 로그인 → 문의·글 목록 표시 ✅ |
| 게시판 | 목록·글 보기 (post.html?id=N) ✅ |
| RLS | anon 문의 조회 차단 · anon 글쓰기 401 · 운영자만 쓰기 ✅ |
| 지식 목록 분류·검색 (2026-09-17) | 브라우저 실측 — 기본 30편 노출 · 검색 “임금” 7편 · “파업” 1편(쟁의행위) · 없는 말 0편+안내문 · 상단 분류 버튼 산업안전·재해 3편 · 직장문화 2편 · 분류+검색 동시 걸기 1편 · 전체 복귀 30편 · 자체 검산(분류 합계=전체) 통과 ✅ |
| 표기 정리 — 홈 섹션·이름 (2026-09-17) | 홈 섹션 제목 `지식 안내` → **`노동 기초 지식`**(지식 목록 `h1` 도 동일) · 공개 페이지에서 `박강원 상임본부장` → **`한국노총 노동연대 상임본부장`**(소개·문의·사이트 안내글·게시판 #4 본문) · 라이브 실측 주요 페이지 이름 **0건** · 44개 파일 · 588개 링크 · 깨짐 **0** · 배포 `dpl_Hoy7gtJ7yy4SbhL9fpN3KCiZC9pb` READY |
| 로고 교체 — 불꽃 (2026-09-17) | 요청 로고(붉은 라운드 배지 + 흰 불꽃 두 갈래)로 교체 — `logo.svg` path 2개 · `brand-icons.mjs` 새로 작성(아이콘 PNG 를 뜨고 흰 영역 비중·가운데 픽셀까지 검사해 통과한 것만 저장) · `apple-touch-icon.png` 180 · `icon-512.png` 512 · `og.png` 1200x630 · `favicon.ico` 재생성 · 47개 페이지 · 884개 링크 · 깨짐 **0** · 배포 READY |
| 로고 불꽃 굵기 조정 (2026-09-17) | 헤더 28px 에서 흰 불꽃이 얇은 사선으로 보이던 문제 — 갈래를 굵히고(큰 갈래 3→7px, 작은 갈래 1.5→2.5px) 사이 홈을 좁힘 · `logo-preview.mjs` 에 **줄 폭 측정** 추가해 28px 실측 확인 · 흰 영역 18.3→**21.9%** · `apple-touch-icon.png` 180 · `icon-512.png` 512 · `favicon.ico` · 라이브 5장 **해시 일치** · `brand.mjs` 재실행 수정 0 · 배포 `dpl_4SSwtvWmHL5PVooZWnMvoV6ssgkF` READY |
| 로고·파비콘·공유 카드 (2026-09-17) | 브라우저 실측(라이브) — 헤더 마크 **28x28** · natural 64x64 · 헤더 안에 들어감 · 하위 글 페이지는 `../logo.svg` · `og:image` 1200x630 · `favicon.ico` 180x180 · 내려받은 PNG 3장 **해시 일치**(바이트 그대로) ✅ · `brand.mjs` 재실행 시 수정 0(멱등) · 44개 페이지 · 615개 링크 · 깨짐 **0** · 배포 `dpl_GBUPB7ECV5uybcvQgoraHXTR3s4W` READY |
| 지식 글 20편 추가 (2026-09-16) | 20편 생성 → 목록·홈 자동 갱신 · 생성기 2회 실행 드리프트 0 · 44개 페이지 · 483개 링크 · 깨짐 **0** · 배포 후 신규 20편 전부 **200** · 지식 목록 **30편** 표시 · 홈 지식 카드 최신 3편 확인 ✅ |

| 홍보·검색 노출 준비 (2026-09-17) | `sitemap.xml` 생성 (공개 45개 URL, admin·post 제외 자체 검사 통과) · `robots.txt` 에 Sitemap 추가 · 홈에 Organization JSON-LD · `tools/promo-kit.md` 채널별 문구 키트 · 47개 페이지 · 884개 링크 · 깨짐 **0** · 라이브 `sitemap.xml` **200** (45 URL) · 배포 `dpl_GifUcieoQUgnFtkWhZ9EU14mpu2m` READY |
| 홍보 자동화 완성 — RSS·연습 모드 (2026-09-17) | `tools/gen-feed.mjs` 신규 — `feed.xml` **36항목**(지식 30·소식 6) + 45개 페이지 head 에 RSS 자동발견 링크(멱등) · `tools/social-post.mjs` 에 **`--dry-run`** 추가 → 토큰 없이 게시 경로 끝까지 연습(저장 2건 · 링크·본문 포함 확인) · `--check` 10항목 전부 통과(연습 파이프라인 2항목 포함) · `tools/social.env.example`·`tools/install-task.ps1`·상위 폴더 `홍보실행.cmd` 신규 · 대기열 36건 · 47개 페이지 · 929개 링크 · 깨짐 **0** |
| feed 라이브·채널 검사·X 유료화 확인 (2026-09-17) | `feed.xml` **배포 후 라이브 검증** (200 · `application/xml` · 항목 36건 · 45개 페이지 자동발견 링크) · `tools/test-social-post.mjs` 신규 — 모의서버로 5채널 요청의 **경로·헤더·본문 필드명 24항목 통과** (블루스카이 facet 바이트 위치·X OAuth1 헤더 포함) · **X API 유료화 확인**(공식 문서에서 무료 등급 없음 · 크레딧 선구매) → 무료 대상에서 제외 · 상위 폴더 `채널설정.cmd` 신규(발급 페이지 → 메모장 → 검사 한번에) · `--check` 10항목 통과 · 배포 `dpl_3vubv3vmK5CxxyjRmcUpKkVcmD9d` READY |
| **홍보 자동 게시 실제 가동 (2026-09-18)** | `tools/promo-browser.mjs` 신규 — Aside 브라우저로 페이스북 작성창 → 본문 → `다음` → **전체 공개** → `게시` 까지 자동. `--check` 8항목 통과 · `--rehearse` 통과 · **실제 전체 공개 게시 2건**(연차휴가 · 단체교섭) 프로필에서 `공유 대상: 전체 공개` 확인 · 첫 시도는 `나만 보기` 로 나가 원인(공개범위 라디오는 실제 마우스 클릭 필요) 찾아 수정, 나간 글도 전체 공개로 정정 · `tools/promo-daily.cmd` + `tools/install-task.ps1`(ScheduledTasks 모듈) 개편 → `nodong-promo` 매일 09:00 등록, **무인 실행 결과 코드 0** |
| **페이스북 페이지 개설 · 게시 대상 전환 (2026-09-18)** | `facebook.com/pages/creation/` 에서 **한국노총 노동연대** 페이지 생성 (카테고리 `노동 조합` · id `61594440182410` · 소개·웹사이트 `fktu-nodong.vercel.app`·이메일 입력). `promo-browser.mjs` 에 **`--target` 추가(기본 page)** — 페이지 모드 전환(`지금 전환`→`페이지 사용`) 경로 포함. 페이지 게시 5건 · 개인 프로필 2건, 전부 `공유 대상: 전체 공개` 확인. 검증 실패 원인 1건 수정: 페이지의 공개범위 표시는 **img alt** 라 `innerText` 로는 안 잡힘 → snapshot 으로 확인 |
| **블로거 개설 · 자동 발행 (2026-09-18)** | Blogger 에서 **한국노총 노동연대** 블로그 생성 → `https://fktu-nodong.blogspot.com` (id `3322947475780930115`, 계정 `nodongstyle01@gmail.com`). `tools/promo-blog.mjs` 신규 — 본문이 iframe 안 contenteditable 이라 **좌표 클릭 + insertText**. `--check` 12항목 · `--rehearse` 통과 · **실제 발행 3건** 라이브 확인(연차휴가·평균임금·산재 은폐) |
| **지식 글 24편 추가 — 노동OK 벤치마킹 (2026-09-18)** | 노동OK(`nodong.kr`)의 분야·정보 구성을 참고해 **실무형 24편** 추가 → 지식 글 **30 → 54편**. 새 분류 `권리구제·절차` 신설. 주제: 평균임금·통상임금, 임금명세서, 퇴직급여 제도, 최저임금 점검, 가산수당 청구, 해고 절차, 징계, 취업규칙, 기간제·단시간, 직업병, 산재 급여, 산재 은폐, 진정서, 노동위 구제신청, 증거 정리, 소멸시효, 내용증명, 괴롭힘 신고 절차, 괴롭힘 예방, 실업급여, 육아휴직 급여, 근로자성 판단, 플랫폼 보험, 교섭 창구 단일화. 생성기 자체 검산(분류 합계=전체) 통과 · 71개 페이지 · **1307개 링크 · 깨짐 0** |
| **로그 점검 도구 (2026-09-18)** | `tools/promo-logs.mjs` 신규 — `social-state.json`(채널별 발행 건수·최근 시각) + `promo-log.txt`(회차별 성공/실패·실패 줄) + 남은 대기열을 한 화면에. `--self-test` **7항목 통과** · 실측 출력: 페이스북 페이지 5건 · 블로그 3건 · 회차 3회 성공 3 실패 0 |
| **배포·라이브 검증 (2026-09-18)** | 배포 `dpl_3FXJLsSKsUCFrdRTNZ7TnqVigpXN` READY. 라이브: `/articles/index.html` **200 · 카드 54개** · 신규 글 3편 **200** · `/sitemap.xml` **200 · 69 URL** · `/feed.xml` **200 · 60항목** · 홈 카드 최신 3편 = 신규 글 |
| 계정 자동 생성 시도 (2026-09-18) | 블루스카이 `com.atproto.server.createAccount` → `Verification is now required on this server` (전화번호 인증 필수) 로 **자동 생성 불가 확정**. `tools/create-bluesky.mjs` 는 남겨둠(가입만 되면 앱 비밀번호 자동 발급). 텔레그램·디스코드도 계정 미보유 확인(브라우저 로그아웃 상태 실측) |
| **GitHub 저장소 최신화 (2026-10-02)** | `worldculture08-bit/fktu-nodong` 이 2026-09-16 이후 구버전(6파일)에 머물러 있어 현재 배포본을 `main` 에 직접 푸시 — 커밋 `f9949bf`, **113파일**(로고·파비콘·OG·차트 SVG·HTML 86·지식 64편·소식·게시판·`js/site.js`·`sitemap.xml`·`feed.xml`·검증 파일·README). `tools/` 는 의도적으로 미포함(운영 스크립트), `.gitignore` 로 `.env*`·`.vercel`·`*.docx`·소셜 채널 자격증명 제외. 원격 재귀 트리 118엔트리/113블롭(`truncated=false`), `logo.svg`·`index.html`·`articles/index.html`·`about.html`·`contact.html`·`welcome.html` 6개 blob SHA 로컬-원격 일치 확인. **열린 PR #1 은 구버전 포크(`opo642506-cmyk`)에서 온 10편 스냅샷이라 병합 충돌 — 사유 ком댓 후 닫음** |
| **배포 장애 복구 — Vercel 프로젝트 이전 + 문구 반영 (2026-10-02)** | 홈·소개·문의 문구 다듬기 반영 배포 — 구 프로젝트는 전 배포 `BUILD_FAILED / Resource provisioning failed`(빌드 컨테이너 미시작)라 CLI·API 모두 실패 · 공개 API 설정 정리(`fluid:false` · 함수 타임아웃 10s · 배포 보호 해제) 후에도 동일 · 임시 신규 프로젝트는 READY → **프로젝트 단위 고착** 확인 · **`fktu-nodong-v2` (`prj_WUsBK4YXEtyS8tyjYnlBkI3lwfGE`) 로 이전**하고 도메인 `fktu-nodong.vercel.app` 이전(verified) · 배포 `dpl_FHMMjrZTzVeBHhgqKq6uMy1oHwNA` **READY** · 라이브 9개 페이지 **200** · 새 문구·`64편` 반영 · 박강원 **8곳**(공개 7 + README 1, 승인 유지) · `check-links` 86 HTML · 2,197 링크 · 깨짐 **0** · `_사이트사본-2026-09-16/` 재생성 **110파일 · diff 차이 0** |
| **계정 정지 방지 — 무인 브라우저 자동 게시 중단 (2026-09-19)** | 인스타·스레드·X 봇 탐지 정지 계기에 브라우저 자동 조작을 전부 중단 · `promo-browser.mjs`·`promo-blog.mjs` 에 **`process.stdin.isTTY` 가드**(스케줄러 회차 `exit 2`, 실측 확인) · `social-post.mjs` `AUTO_CHANNELS` 에서 **`x` 제외**(토큰을 채워도 예약 회차에 안 붙음) · `promo-daily.cmd` 개편(초안 1건 + 공식 API 1건) · `홍보실행.cmd` 를 **y/N 확인 뒤에만** 브라우저 게시 · `tools/social-draft.mjs` 신규(X 140자·스레드 500자·인스타 2,200자 자동 자르기, 브라우저·계정 미접촉) · 검사 `social-post --check` 10항목 · `test-social-post` 24항목 · `test-linkify` 8종 전부 통과 |

## 8. 아직 없는 것

- **새 문의 알림** — 문의가 들어와도 메일로 알려주지 않습니다. `admin.html` 을 열어 확인해야 합니다. 알림이 필요하면 Supabase Edge Function + 메일 서비스 연결이 필요합니다.
- **게시판 댓글·첨부파일** — 없습니다.
- **게시판 전문검색** — 없습니다 (목록이 길어지면 필요해집니다).
- **첨부 이미지** — 없습니다 (Supabase Storage 연결 시 가능).
- **도메인 연결** — 지금은 `*.vercel.app` 무료 주소입니다. 자체 도메인을 사면 연결할 수 있습니다.
- **검색엔진 등록** — `sitemap.xml`·`robots.txt` 는 준비됨. Google Search Console · 네이버 서치어드바이저 · 다음 · Bing 등록은 아직 안 했습니다. 소유권 확인 코드를 받으면 사이트 head 에 넣어 드립니다. 절차는 `tools/promo-kit.md` 참고.
- **토큰 채널(텔레그램·디스코드·블루스카이·페이스북 페이지) 미등록** — `tools/social.env` 에 토큰이 하나도 없어 자동 게시가 돌지 않습니다. 브라우저 자동 게시로 실제 게시가 검증된 경로(페이스북 페이지·블로거)는 2026-09-19 계정 정지 방지를 위해 **브라우저 조작을 중단**했습니다. 공식 API 경로(`social-post.mjs`)에 토큰을 넣으면 그쪽만 다시 자동으로 돕니다. 2026-09-18 실측: 블루스카이 가입 API 가 `Verification is now required on this server` 로 **전화번호 인증 필수**가 되어 자동 생성이 막혔습니다. 텔레그램(BotFather)·디스코드(서버·워크플로)도 같은 이유로 전화·이메일 인증이 필요합니다. 계정만 만들면 `채널설정.cmd` 로 3분에 붙습니다. 검사 도구는 "코드가 올바른 요청을 만드는가"를 확인하는 것이고, "계정에 실제로 올라가는가"(권한·한도)는 토큰을 넣어야 알 수 있습니다.
- **스레드·인스타그램·X 자동 게시** — 하지 않습니다. 2026-09-19 계정 정지 계기로 `tools/social-draft.mjs` 로 초안만 뽑아 사람이 올리는 방식으로 고정했습니다. 공식 API 경로(인스타그램 Graph API 등)를 쓰려면 별도 승인 절차가 필요합니다.
- **네이버 카페·블로그** — 글쓰기 API 가 없어 자동 게시 불가. 지금 브라우저에 네이버 로그인도 없습니다. 네이버 카페 자동 게시를 브라우저 자동 조작으로 붙이는 것은 위 원칙에 **어긋납니다** — 자동화가 필요하면 사람 직접 게시가 유일한 경로입니다.
- **예약 발행** — 사람이 정한 시각에만 나갑니다(`social-queue.json` 의 `at`). 반응 보고 자동 조정하는 기능은 없습니다.

## 9. GitHub 백업 저장소

`worldculture08-bit/fktu-nodong` — 현재 배포본과 동일한 소스를 `main` 에 둡니다.

```bash
git -C fktu-nodong push origin main          # 로컬 커밋 반영
gh api repos/worldculture08-bit/fktu-nodong/git/trees/main?recursive=1   # 원격 파일 수 확인
```

- **인증**: 이 PC 는 `aannss800124` 계정으로 로그인돼 있고(2026-10-02 Collaborator 추가), `repo` 스코프가 있어 바로 푸시됩니다. 토큰을 따로 만들지 않습니다.
- **포함**: 사이트 파일 113개 (HTML 86 · CSS · `js/site.js` · 로고·파비콘·apple-touch-icon·icon-512·og.png · `img/` 차트 SVG · `sitemap.xml` · `feed.xml` · 검색엔진·네이버 인증 파일 · `README.md`)
- **미포함(의도)**: `tools/` 운영 스크립트 — 공개 저장소에 노출하지 않기 위해 커밋 대상에서 뺐습니다. 필요하면 `-- tools` 로 스테이징하고 커밋하면 들어갑니다.
- **제외(보안)**: `.env*` · `.vercel/` · `*.docx` · `tools/social.env` · `tools/social-state.json` · `tools/social-queue.json` — `.gitignore` 가 막습니다.

---

## 10. 홍보 자동화 (무료)

전체 절차는 `tools/social-setup.md`. 유료 플랜 없이 돌아가며, 채널이 하나도 없어도 연습·문구 추출은 됩니다.

```bash
node tools/social-post.mjs --draft              # 사이트 70편(지식 64+소식 6)에서 홍보글 자동 작성
node tools/social-post.mjs                      # 미리보기 (아무 데도 안 올림)
node tools/social-post.mjs --dry-run --post     # 토큰 없이 전 과정 연습 → tools/social-outbox/
node tools/social-post.mjs --post --max 1       # 연결된 채널에 1건 게시
node tools/social-post.mjs --next               # 네이버 카페·블로그 수동 게시용 문구 → tools/next-post.txt
node tools/social-post.mjs --check              # 자기 점검 10항목 (네트워크 안 씀)
node tools/test-social-post.mjs                 # 5채널 요청 모양 검사 24항목 (모의서버·네트워크 안 씀)
```

**입력이 창을 안 열고 하려면**: 상위 폴더의 `홍보실행.cmd` 를 더블클릭 (새 글 확인 → 홍보글 생성 → 1건 게시).
**토큰 넣는 것도 창으로 하려면**: 상위 폴더의 `채널설정.cmd` 를 더블클릭 (발급 페이지 열기 → `social.env` 메모장 → 검사까지 한 번에).

무료 채널 — 텔레그램 봇 · 디스코드 웹훅 · 블루스카이 앱 비밀번호 · 페이스북 페이지. 카카오톡 채널·단체 문자는 유료라 자동화 불가.

### ⚠️ 2026-09-19 — 무인 브라우저 자동 게시를 중단했습니다

인스타그램·스레드·X 계정이 봇으로 정지된 것을 계기로, 사람이 로그인한 브라우저 화면을 자동 조작해 글을 올리는 방식을 **전부 그댔습니다**. 원칙은 하나입니다.

> **공식 API 로만 자동, 나머지는 사람이 누른다.**

- 매일 같은 시각에 같은 문장으로 자동 게시하는 패턴이 계정 정지의 가장 흔한 원인입니다.
- 랜덤 지연·마우스 흔들기·지문 위장 같은 "사람 흉내" 기법은 탐지를 피하는 게 아니라 **탐지 규칙이 겨냥하는 바로 그 지표**라서 오히려 위험을 키웁니다. 하지 않습니다.
- 차단된 뒤 재가입하는 것도 위반이 되어 정지가 영구화됩니다.

코드 레벨에서 막아 뒀습니다.

| 파일 | 보호 |
|---|---|
| `tools/promo-browser.mjs` | `--rehearse`·`--post` 는 `process.stdin.isTTY` 일 때만 동작. 스케줄러 회차는 `exit 2` 로 거부 |
| `tools/promo-blog.mjs` | 동일 |
| `tools/social-post.mjs` | `AUTO_CHANNELS` 에서 `x` 제외 — 토큰을 채워도 예약 회차에 X 가 붙지 않음 |
| `tools/promo-daily.cmd` | 브라우저 게시 삭제 → 초안 생성 + 공식 API 채널만 |

**사람이 직접 올리는 흐름 (스레드·인스타그램·X)**

```bash
node tools/social-draft.mjs                      # 다음 글 1건, 채널 3종 길이 맞춤 초안
node tools/social-draft.mjs --max 3 --platform x  # 3건만, X 만
node tools/social-draft.mjs --list               # 남은 글
node tools/social-draft.mjs --mark <id> x threads instagram   # 올렸다고 기록
```

`social-draft.mjs` 는 **브라우저도 계정도 건드리지 않고** 로컬 파일(`tools/social-outbox/`)만 씁니다.
X 는 140자(한글 가중치 2 기준), 스레드 500자, 인스타그램 2,200자에 맞춰 자릅니다.
인스타그램은 이미지 1장이 먼저 필요합니다(`og.png` 또는 `tools/brand-card.html`).

**X 는 자동 게시 대상이 아닙니다** — 2026-09-17 확인 결과 X API 는 무료 등급이 없어지고 크레딧 선구매(사용량 과금) 방식만 남았습니다(공식 문서 `docs.x.com/x-api/getting-started/about-x-api` 의 Pricing). 계정 정지 이력이 있어 `AUTO_CHANNELS` 에서 제외했습니다. 게시 코드는 살려 두었으나 `--only x` 를 사람이 명시할 때만 동작합니다.

### 브라우저 수동 게시 — 사람이 직접 실행할 때만 (토큰 불필요)

아래 경로는 **사람이 터미널에서 직접 실행할 때만** 동작합니다. 작업 스케줄러로 돌아가면 `TTY 가드` 에 막혀 `exit 2` 입니다.

| 대상 | 도구 | 명의·공개범위 |
|---|---|---|
| 페이스북 **페이지** (id `61594440182410`) | `tools/promo-browser.mjs` | 한국노총 노동연대 · **전체 공개 고정** |
| 페이스북 개인 타임라인 | `tools/promo-browser.mjs --target profile` | 개인 계정 · 기본 `나만 보기`(선택 필요) |
| 블로거 `fktu-nodong.blogspot.com` | `tools/promo-blog.mjs` | 한국노총 노동연대 |

```bash
node tools/promo-browser.mjs --check        # 자기 점검 12항목 (CLI·대기열·브라우저)
node tools/promo-browser.mjs --next         # 다음에 올라갈 글 보기 (브라우저 안 씀)
node tools/promo-browser.mjs --rehearse     # 연습 — 게시 직전까지 (제출 안 함)
node tools/promo-browser.mjs --post         # 페이지에 실제 게시 1건
node tools/promo-browser.mjs --post --target profile --audience friends   # 개인 프로필로

node tools/promo-blog.mjs --check           # 자기 점검 12항목
node tools/promo-blog.mjs --rehearse        # 제목·본문 입력까지만
node tools/promo-blog.mjs --post            # 블로거에 실제 발행 1건

node tools/promo-logs.mjs                   # 채널별 발행 기록 + 남은 대기열 + 최근 실행 회차
node tools/promo-logs.mjs --problems        # 실패한 회차만
node tools/promo-logs.mjs --self-test       # 로그 파싱 규칙 자체 점검 7항목
```

다시 손댈 때 걸리는 것 (실측):
- **페이지** 게시: 페이지 관리자 모드가 아니면 먼저 `지금 전환` → `페이지 사용` 을 눌러야 작성 버튼이 생깁니다. 페이지 작성창은 공개범위가 **이미 전체 공개**라 라디오를 건드릴 필요가 없습니다(개인 프로필은 `나만 보기` 가 기본).
- **개인 프로필** 게시: 공개범위 라디오는 **JS `.click()` 으로는 반영되지 않습니다.** 실제 마우스 클릭(`page.mouse.click`)을 써야 적용됩니다. 처음에 이걸 놓쳐 글이 `나만 보기` 로 나갔고, 나간 글은 게시물 메뉴 → `공개 대상 수정` 으로 고쳤습니다. 같은 글자(`생각을 올려보세요`)를 가진 폭 0짜리 요소를 집으면 `새 메모` 창이 열립니다 — 폭이 있는 쪽을 골라야 합니다.
- 화면 요소는 `aria-label` 질의보다 **snapshot ref** 가 훨씬 안정적입니다. 다만 ref 는 화면이 다시 그려지면 바로 무효가 되므로 **스냅샷 직후에 클릭**해야 합니다.
- **블로거**: 본문이 **iframe 안 contenteditable** 이라 `locator.fill` 이 안 먹습니다. 좌표 클릭 + `keyboard.insertText` 로 넣습니다. 새 글 주소는 대시보드의 `새 글 작성` 버튼으로만 열립니다(`/blog/post/edit/<id>/new` 는 목록으로 튕김).
- 페이스북 페이지의 `공유 대상: 전체 공개` 는 **img 의 alt** 라서 `innerText` 에 안 나옵니다 — `snapshot` 으로 확인해야 합니다.

**매일 자동 실행 (등록 완료)**

```bash
powershell -ExecutionPolicy Bypass -File tools/install-task.ps1                       # 매일 09:00 등록
powershell -ExecutionPolicy Bypass -File tools/install-task.ps1 -Time 08:30 -Force    # 시각 변경
powershell -ExecutionPolicy Bypass -File tools/install-task.ps1 -Remove               # 끄기
```

작업 이름 `nodong-promo` → `tools/promo-daily.cmd` → **초안 1건 생성 + 공식 API 채널 1건**, 로그는 `tools/promo-log.txt` (점검 `node tools/promo-logs.mjs`). 2026-09-19 변경: 브라우저 자동 게시(페이스북 페이지·블로거)를 러너에서 뺐다 — 계정 정지 방지. 브라우저 자동화가 필요한 채널은 공식 API 경로(`social-post.mjs`)로 옮기고, 나머지는 `tools/social-draft.mjs` 초안을 사람이 직접 올린다.

⚠️ `.cmd` 파일은 **CRLF 줄바꿈**이어야 합니다. LF 로 저장하면 cmd.exe 가 줄을 잘못 잘라 `'t' is not recognized...` 같은 오류가 납니다(실측). 편집 후 `python -c "..."` 로 CRLF 로 바꾸거나 메모장으로 저장하세요.

※ `schtasks` 명령은 없는 작업을 조회할 때도 오류를 내서(`ERROR: The system cannot find the file specified.`) 스크립트가 중간에 멈춥니다 → `ScheduledTasks` 모듈만 씁니다.

**블루스카이 계정 자동 생성 도구** — `tools/create-bluesky.mjs` (`--create` → `--confirm` → `--app-password` → `--test`). 지금은 전화 인증 벽에 막혀 있지만, 가입만 끝나면 `--app-password` 한 줄로 앱 비밀번호가 `tools/social.env` 에 기록되고 그대로 자동 게시에 쓰입니다.

### RSS 로 퍼뜨리기 (채널 없이도 됨)

`https://fktu-nodong.vercel.app/feed.xml` — 지식 54편 + 소식 6건 = **60항목**. 2026-09-18 라이브 재검증(200 · `application/xml` · 69개 페이지 head 에 자동발견 링크). 글을 추가하면 `node tools/gen-feed.mjs` 로 갱신.

이 주소를 **Make(월 1,000회 무료) · IFTTT(앱릿 2개 무료) · Zapier(월 100회 무료)** 에 넣으면 RSS → 텔레그램·페이스북 자동 배포가 됩니다(설정 5분, 코딩 없음). X 로 보내려면 그 서비스도 X API 접근을 따로 사야 합니다. RSS 는 노동 뉴스 수집기·카페 자동 글봇도 그냥 가져가기 때문에 채널을 안 붙여도 퍼지는 통로입니다.

### 그 밖의 파일

- 토큰: 플랫폼의 환경변수 저장소 또는 개인 비밀번호 관리자 (평문 `.env` 파일 금지)
- 채널 검사: `tools/test-social-post.mjs` — 로컬 모의서버로 5채널의 요청 경로·헤더·본문 필드 이름을 확인(24항목). 실제 계정 권한은 토큰을 넣어야 확인됨
- 중복 방지: `tools/social-state.json`. 같은 글을 두 번 올리지 않음. 기본은 회차당 1건(스팸 방지)
- 매일 자동 실행: `powershell -ExecutionPolicy Bypass -File tools/install-task.ps1` (작업 스케줄러 등록·삭제·시각 변경 지원)

## 11. 안내 문서를 HWP 로 만들기

운영 안내 같은 문서를 한글(HWP) 파일로 내보낼 때 쓴다. 원본은 HTML 로 쓰고 변환만 한다.

```powershell
cd "E:\AI 프로젝트 결과물\한국노총 노동연대 홈페이지\fktu-nodong"
powershell -ExecutionPolicy Bypass -File tools/hwp-export.ps1 -Source "..\문서.source.html"
```

- 결과는 원본과 같은 이름의 `.hwp` (상위 폴더). 같은 이름이 있으면 멈춘다 — 지우고 다시 돌릴 것.
- 사전 검사로 본문 글자 수를 확인한다. 한글이 200자 미만이면 "변환이 잘못됐다"며 저장하지 않는다.
- 본문 대조용 텍스트: `%TEMP%\hwp-last-extract.txt`
- 주의: 이 PC는 기본 코드페이지가 UTF-8 이라 한글이 UTF-8 원본을 그대로 읽는다. `GetTextFile` 로 문자열을 받으면 깨지므로 본문 확인은 `SaveAs(..., "TEXT", ...)` 로 파일을 뽑아 cp949 로 읽는다(스크립트에 반영됨).
- 원본 HTML 에서 피할 것: `—` → `-`, `&gt;` → `→`, `<br>` 대신 `<p>` 로 문단 나누기. 변환 스크립트가 앞의 둘은 자동 처리한다.
