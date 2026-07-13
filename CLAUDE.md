# Portfolio ver.2 — Project Brief (CLAUDE.md)

## Why this project exists (context — read this first)
- The developer (Cona) is a UI/UX design student finishing a vocational academy
  program in Korea, preparing for a job search. This portfolio is a hiring
  deliverable, not a toy project. Code quality matters because interviewers
  may read it.
- A portfolio **ver.1 already exists** (macOS-style bento grid, restrained,
  whitespace-driven, 1200px canvas, fluorescent yellow accent #F6FF00, deployed
  at github.com/QuincyS2S2/portfolio). **Do NOT reuse its visual language.**
- ver.2 is the deliberate opposite: image-first, full-bleed, screen-filling,
  visually loud. Target audience: agencies/companies that prefer immersive
  visual portfolios. The two versions must feel like two different design
  worlds by the same designer.
- Design reference: Figma community file "JUICY drink animation" — full-bleed
  background color per slide, oversized typography crossing the screen behind
  a hero image, staggered element entrance on slide change.

## Architecture (already decided — do not re-litigate)
- Vanilla HTML/CSS/JS only. No frameworks, no build step. jQuery is NOT used
  in this project. Swiper 11 via CDN is the only library.
- Single page. Screen switching via a `go(id)` function pattern (same pattern
  as the developer's IKOKA project: screens are sections toggled by id).
- Screen 1 (100vh): hover accordion with 3 vertical panels =
  웹사이트 / 모바일 / 그래픽. Panels are flex children; collapsed `flex: 1`,
  hovered `flex: 4`, animated with CSS transition. Desktop-only (hover-based);
  no mobile responsiveness required for now.
  - Visual style (decided 2026-07-05, from the developer's own sketch frames
    inside the JUICY community file, nodes 2013-2 / 2013-39 / 2013-91):
    light neutral bg; each panel = oversized colored number (01/02/03) +
    category name + one-line description + "view more" pill. On hover the
    panel expands, fills with the category's representative color, and the
    category's hero mockup fades in.
- Clicking a panel enters that category's fullscreen carousel (Swiper 11,
  one project per 100vh slide). Flow is deliberately 2 levels deep
  (home → carousel); NO intermediate per-category index screen — this was
  discussed and rejected on 2026-07-05.
- Carousel UX (decided 2026-07-05): a top nav inside the carousel screen
  lists ALL project names of the current category as custom Swiper
  pagination (current one highlighted, click to jump) — this is the
  "모아보기" answer. Mousewheel + keyboard modules ON. Each slide reserves a
  metadata area: 사용 프로그램, 팀/개인 여부, 기획서 link/section where applicable.
- CRITICAL carousel technique: the slide background color does NOT live inside
  Swiper slides. A separate fixed background layer sits behind the Swiper.
  On `slideChange`, JS reads the active slide's `data-project` attribute and
  swaps a class/CSS variables on that layer. `transition: background-color .6s`
  produces the smooth color-morph. Text/ink color swaps as a pair with the
  background (see tokens).
- Element entrance: on slide activation, toggle an `.is-active` class;
  children animate in sequence via `transition-delay` (staggered).
- Oversized project-title typography sits as a layer BEHIND the hero image.

## Color tokens (finalized — use exactly these)
Define as background+ink pairs in `:root`:

| Project        | bg       | ink     | Category | Slide order |
|----------------|----------|---------|----------|-------------|
| 다나와 리디자인 | #61BD14  | #FFFFFF | 웹사이트 | 1 |
| 애나이더 수족관 | #3EC6C6  | dark    | 웹사이트 | 2 |
| KEJ            | #4ECBA0  | dark    | 웹사이트 | 3 |
| 그외 (Starbucks + 장학재단, non-coded works) | #C9A227 | dark | 웹사이트 | 4 |
| IKOKA          | #FF8E8E  | dark    | 모바일   | 1 |
| 약쏙           | #FFDA4F  | dark    | 모바일   | 2 |
| 해독제         | #A3E635  | dark    | 모바일   | 3 |
| 그래픽 (all 4 slides: 편집디자인/제품 패키지/배너/AI 생성물) | #1C1B1A warm charcoal, fixed | #FFFFFF | 그래픽 | — |

- 웹사이트 slide order is intentional: green → teal → mint → gold reads as a
  designed color progression. Keep it.
- "dark" ink = a near-black like #1C1B1A, define once as a token.

## Project links & facts (avoid confabulating)
- Coded/live projects: 다나와 리디자인 (quincys2s2.github.io/DANAWA-re/),
  애나이더 수족관 (GitHub Pages), KEJ, IKOKA. 
- NOT coded (design-only): 약쏙, 해독제 (partial scaffold), Starbucks, 장학재단,
  all 그래픽 items. Their slides show imagery, not live links.
- KEJ = "Keep Every Joy", the developer's fictional personal brand: an AI
  auto-diary/counseling app concept site, dark theme with green accent.
- IKOKA is 100% coded; in ver.1 it was embedded as a PLAYABLE live iframe
  inside a phone mockup (not static images). Consider the same treatment for
  its ver.2 carousel slide. ver.1 is live at quincys2s2.github.io/portfolio/.
- Image assets live in `img/` (renamed to ASCII on 2026-07-05):
  `img/Work-Image/<project>/`, `img/mockup/` (device frames), `img/logo/`,
  `img/tool-icon/` (for the 사용 프로그램 metadata), `img/thum/`. Some filenames
  still contain spaces; URL-encode or rename when wiring them.
- Do not invent paths for files that are not in `img/` — ask the developer.

## Working style (important)
- Respond in casual Korean (반말 섞인 편한 톤 OK). Explain what the code does
  and why — the developer must be able to defend every line in an interview.
- Iterate collaboratively: build in small steps and check in, rather than
  dumping a complete solution at once. The developer learns by building.
- Keep code beginner-readable: clear class names, comments in Korean where
  logic is non-obvious, no clever one-liners.
- Code style (2026-07-07, per instructor feedback that the code "looked
  AI-generated"): NO strict BEM — use simple hyphenated class names
  (panel-num, mockup-frame, slide-hero-phone). Comments are short casual
  Korean one-liners, no banner/divider comments, no circled numbers,
  no column-aligned declarations. Keep this style for all new code.
- Build order: ① :root tokens + reset → ② accordion (with hover expansion)
  → ③ carousel shell + background-layer color swap → ④ stagger animations
  last. Do not start with animations.
- Git: initialize the repo and connect GitHub remote (repo name `portfolio-v2`,
  account QuincyS2S2) BEFORE writing feature code. Academy shared computers
  have a history of credential/remote conflicts — verify `git remote -v` and
  committed identity early. Deploy target: GitHub Pages.

## Roadmap after carousel shell (agreed 2026-07-05, tracked as tasks #1–#6)
1. Mockup frames on carousel heroes (monitor for web, iPhone for mobile).
2. Web slides: hover = the screenshot scrolls inside the mockup screen
   (long full-page captures in `img/Work-Image/<project>/<name> main.png`),
   click = open live site. Needs 애나이더/KEJ/IKOKA live URLs from developer.
3. Per-slide metadata: 기획서 PDF button (`pdf/` has 8 plan PDFs, link only —
   do not open/inspect contents), 사이트로 이동 button, tool icons, 팀/개인.
4. Right-center vertical category quick-jump nav (subtle; jump between
   web/mobile/graphic carousels without going home).
5. Stagger entrance animations LAST (get Figma reference again then).
6. About/자기소개 panel in the home accordion — deferred until 1–5 done;
   deliberately NOT detailed yet per developer request.

## Session memo — next up (written 2026-07-05, end of day)
Done so far: accordion + carousel + mockup heroes (hover page-scroll on web,
hover screen-slideshow on phones) + metadata/PDF links + quick-jump nav +
stagger animations + graphic layouts (gallery/grid/dual marquee) + About screen.
All pushed through commit 5511d22.

Status update (2026-07-06): tasks #9/#10/#11 done — back button (History API),
Pretendard+Anton fonts, polish pass (lightbox, arrows, About stagger,
accordion micro-interaction), lightbox modal, detail-page phone mockup
(thumb + data-full original), wheel flow between categories, mockup fixes.
Image compression (#8) deliberately SKIPPED by developer choice — quality
concern outweighs size; may compress individual files later if needed.
Remaining: GitHub Pages deploy (developer enables in repo Settings →
Pages → main branch). 장터.png / damawa filename cleanup still pending.

## Out of scope (for now)
- Mobile/responsive layout, accessibility beyond basics, the 그외/그래픽 slide
  inner layouts (placeholder first), SEO.