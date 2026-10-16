# Constant Care Mobile App: Plan

React Native (Expo) app for Constant Care Family Services Inc., built alongside
the existing Next.js website in this repo. It shares one design system, one
backend, and one set of content and validation rules with the website.

---

## 1. What the app is for

A mobile app that only repeats the website adds little value, and Apple can
reject it outright: App Store Review Guideline 4.2 ("minimum functionality")
covers apps that are repackaged websites. The app has to do things the
website can't. It serves the same visitors as the website, but its main
value is speed: it alerts staff when an urgent referral comes in.

| Audience | What they get from the app |
| --- | --- |
| **Families & individuals** | Browse services, tap to call, send a referral or contact request, and save an unfinished referral as a draft. |
| **Referrers** (social workers, healthcare partners) | A fast referral form they can come back to, with saved referrer details so they don't retype them every time. |
| **Job applicants** | See current openings, apply with a resume from their phone's files, and get notified when a new role opens. |
| **Admins / office staff** | Push alerts for new referrals (especially **Urgent** ones), applications, and messages. They can view them and update statuses on the go. |

### Recommended features

**Version 1: public app + admin companion** (uses the current backend, with no new data models besides push tokens)

1. **Home**: hero, "Why choose us", services overview, call / refer / contact buttons.
2. **How We Support You**: all service categories and detail pages, rendered from the same content the website uses (`lib/services-content.ts`).
3. **About & Our Team**: mission, values, and team profiles from the `team_members` table.
4. **Make a Referral**: the same fields and validation as the website, plus an on-device saved draft and remembered referrer details.
5. **Contact**: form, tap-to-call, tap-to-email, open in Maps.
6. **Careers**: live openings, apply with a resume picked from Files or Drive, and an opt-in alert for new openings.
7. **Admin mode** (signed-in staff only):
   - push notifications for new referrals, applications, and messages
   - inbox lists with status filters
   - detail view and status change (the same statuses as `/admin`)
   - resume download/preview
8. **Offline-friendly content**: services, about, and team content are cached, so the app opens instantly and works on a poor signal.

**Later phases (need a privacy review and a new backend; scope these separately)**

- **Caregiver / staff app**: shift schedule, visit check-in/out (with location), care notes, incident reports, mileage.
- **Family portal**: upcoming visits, care updates, secure messaging, invoices.

These involve **personal health information**. In New Brunswick, that falls
under the *Personal Health Information Privacy and Access Act (PHIPAA)*, and
PIPEDA also applies. The current database is hosted in **AWS us-east-1**.
Before storing any client health data, confirm hosting in a Canadian region,
access controls, audit logging, and retention rules with a privacy advisor.
**Do not build these phases on the current setup without that review.**

---

## 2. Architecture

```
constant_care/                ← this repo (pnpm workspace)
├─ app/, components/, lib/    ← Next.js website + API (unchanged location; Vercel config unchanged)
├─ mobile/                    ← Expo app (new)
└─ packages/
   ├─ tokens/                 ← design tokens: the single source of truth for web and app (new)
   └─ shared/                 ← zod schemas, services content, nav, API types (new; moved out of lib/)
```

**Why keep the website at the repo root?** Moving it to `apps/web` would mean
reconfiguring the Vercel project. A pnpm workspace works fine with the Next
app at the root, so only new folders are added.

### Mobile stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Expo** (managed workflow, latest SDK) + **Expo Router** | File-based routing like Next's `app/`; EAS handles builds and store submission. |
| Styling | **Uniwind** (Tailwind v4) | Same Tailwind version and class names as the website (`bg-primary`, `text-muted-foreground`, `rounded-lg`), driven by the same tokens. Chosen over NativeWind, whose stable release (4.x) is still on Tailwind v3. |
| Icons | **lucide-react-native** | The same icon set as the website (`lucide-react`). |
| Animation | **react-native-reanimated** | Recreates the website's GSAP fade-in and accent-dash effects (see §3.6). |
| Data fetching | **TanStack Query** | Caching, offline persistence, retry on poor signal. |
| Forms | **react-hook-form** + the **shared zod schemas** | Validation messages identical to the website. |
| Images | **expo-image** | Disk caching for team photos and banners. |
| Fonts | **expo-font** with the files in `public/fonts/` | Helvetica Neue, the same as the website (**check the licence first**, see §5). |
| Secure storage | **expo-secure-store** | Admin auth token. |
| Notifications | **expo-notifications** (Expo Push Service) | One API for APNs and FCM. |
| Files | **expo-document-picker** | Resume upload. |
| Builds / OTA updates | **EAS Build, EAS Submit, EAS Update** | Store builds without a Mac; small fixes shipped without a store review. |

> Built on Expo SDK 57 / React Native 0.86. Expo configures Metro for the
> pnpm workspace automatically, and pnpm's default isolated installs work,
> so no `node-linker` changes are needed.

### Backend: the existing Next.js app *is* the API

- **Forms already work from the app.** `/api/contact`, `/api/referrals`,
  `/api/applications` (multipart with resume) and `/api/newsletter` accept
  plain HTTP requests. Native apps aren't subject to CORS.
- **New read endpoints** under `/api/v1/`:
  - `GET /api/v1/content`: services, nav, and contact details (from `packages/shared`).
  - `GET /api/v1/team`: active team members, with `photoUrl` built from `teamPhotoSrc()` and made absolute.
  - `GET /api/v1/openings`: active job openings.
  - `GET /api/v1/impact`: active impact stats.
- **Versioning rule:** an app in people's pockets can't be force-updated, so
  **never make breaking changes to an endpoint the app uses**. Add `/api/v2/...`
  instead. Existing form routes are covered by this rule too, from the moment the app ships.
- **Admin auth for mobile:** the web admin uses an HTTP-only cookie, which
  doesn't fit a native app. Add:
  - `POST /api/v1/auth/login` → returns a short-lived signed token (same
    signing secret as `lib/auth/session.ts`), stored in SecureStore.
  - `POST /api/v1/auth/logout` → revokes the token.
  - Extend `requireAdminSession()` to also accept `Authorization: Bearer <token>`.
  - Admin JSON endpoints under `/api/v1/admin/*` that reuse the logic in
    `lib/actions/admin.ts`.
- **Push notifications:**
  - New table `push_tokens` (`id`, `admin_user_id`, `expo_push_token`, `platform`, `created_at`).
  - In the existing referral, application, and contact routes, send a push
    next to the email notification, wrapped in `try/catch` the same way the
    emails are, so a push failure never fails a submission.
  - **Urgent referrals** use a distinct, time-sensitive notification.
  - Push content must not include client details: send "New urgent referral"
    and let the app fetch the details after sign-in.
- **Abuse protection:** the forms become easier to spam once they're
  reachable from an app. Add rate limiting (per IP) to the public POST
  routes before launch.

---

## 3. Design system: keeping web and app consistent

### 3.1 One source of truth

Create `packages/tokens/tokens.ts`, holding colours, radii, type scale, and
motion. Both platforms read from it:

- **Web:** a small script generates `packages/tokens/tokens.css` (the CSS
  variables currently hard-coded in `app/globals.css`). `globals.css`
  imports it. When this lands, check that the website looks **exactly the same**.
- **App:** the same script generates `packages/tokens/uniwind.css`, which `mobile/src/global.css` imports. Where a prop needs a colour value (icons, tab bar), the app imports `tokens.ts` directly.

React Native **does not support `oklch()`**, so the tokens are stored as
**hex**. These are the hex values already documented in the comments in
`globals.css`.

### 3.2 Colours

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `primary` | `#1A4F72` Harmony Blue | `#3AAFA9` | Headings, primary buttons, banners |
| `primary-foreground` | `#FFFFFF` | `#0E2635` | Text on primary |
| `accent` | `#3AAFA9` Calm Care Teal | `#4C7A9A` | Eyebrow labels, dash, icon rings, active nav |
| `accent-foreground` | `#FFFFFF` | `#FFFFFF` | |
| `secondary` / `muted` | `#E8F4F2` Calm Mist | `#2C5670` / `#16394F` | Light section backgrounds, empty states |
| `foreground` | `#0F2E42` | `#FFFFFF` | Body text, card titles |
| `muted-foreground` | `#5C7A88` | `#9CB8C4` | Paragraphs, captions |
| `background` / `card` | `#FFFFFF` | `#0E2635` / `#16394F` | Screens / cards |
| `border` / `input` | `#D6E3E8` | `#2C5670` | Card and input borders |
| `ring` | `#3AAFA9` | `#3AAFA9` | Focus outline |
| `destructive` | `#E7000B` | `#FF6467` | Errors, delete |
| chart 3 / 4 | `#4C7A9A` / `#7FD4CE` | | Secondary accents |

The website defines dark tokens but doesn't currently use them. **Decision
needed:** launch the app light-only (matching the website exactly), or follow
the phone's dark mode using the dark column above.

### 3.3 Typography

- **Family:** Helvetica Neue for everything. Headings use Bold (700) or Heavy
  (800), body uses Roman (400) or Medium (500). Bundle only the weights you
  use. Register each weight as its own font family, because React Native
  doesn't pick weights from a single family the way CSS does.
- **Scale** (match Tailwind): xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30.
- **Recurring patterns from the website:**
  - **Section eyebrow:** 12pt, semibold, UPPERCASE, wide letter-spacing (~0.1em), `accent`.
  - **Accent dash:** a 2pt `accent` line, ~40pt wide, under the eyebrow. This is the brand's signature detail, so use it on every section.
  - **Section heading:** 24pt (30pt on tablets), bold, `primary`, tight leading.
  - **Body:** 14pt, relaxed line height (~1.6), `muted-foreground`.
  - **Tagline:** "Care with Purpose. Support You Can Trust.": italic, medium, `accent`.

### 3.4 Shape and spacing

- **Radius** (base 10): sm 6 · md 8 · lg 10 · xl 14 · 2xl 18. Cards use `lg`, empty-state panels use `2xl`, avatars and icon rings are fully round.
- **Spacing:** Tailwind's 4pt grid. Screen side padding is 16pt (the website uses `w-11/12`). Section vertical padding is 56pt (the website's `py-14`).
- **Card:** white, 1pt `border`, radius `lg`, subtle shadow (`shadow-sm`), padding 24.
- **Icon in a ring:** 56pt circle with a 1pt `accent` border, holding a 28pt `accent` Lucide icon. Used for values, services, and empty states.

### 3.5 Components to build (same names and variants as `components/ui/`)

| App component | Mirrors (web) | Notes |
| --- | --- | --- |
| `Button`: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link` | `components/ui/button.tsx` | **Min height 48pt** on mobile. The website's 36px is too small for touch, and this is the one deliberate difference. |
| `Input`, `Textarea`, `Select`, `Checkbox` | `components/ui/*` | Same border, radius, teal focus ring; error text in `destructive`. |
| `Card` | Repeated `rounded-lg border shadow-sm` pattern | |
| `SectionHeader` (eyebrow + dash + heading + intro) | Repeated in `components/about-us/*` | |
| `Banner` (blue header with pattern) | `components/shared/background.tsx` | See the note below on the pattern image. |
| `EmptyState` | Careers "no openings" / Our Team "coming soon" | `secondary` at 40% opacity, radius `2xl`, icon ring, CTA. |
| `TeamCard` | `components/our-team/team-grid.tsx` | 4:5 photo, initials fallback, name, uppercase teal role, bio. |
| `StatusBadge` | `components/admin/status-badge.tsx` | Same status colours as the web admin. |

**Banner pattern:** the website blends
`public/backgrounds/seamless_2D_vector_background_pattern_*.jpeg` onto the
blue with `mix-blend-mode: multiply` at 40% opacity. React Native has no
general blend modes, so **export a pre-blended banner image** (pattern
already multiplied onto `#1A4F72`) and use it as the background.

### 3.6 Motion (match the website's feel)

| Effect | Website (GSAP) | App (Reanimated) |
| --- | --- | --- |
| Section fade-in | from opacity 0, y +48, 0.9s, `power2.out`, once on scroll | `FadeInDown`-style entering animation, ~600ms, ease-out, once per screen visit |
| Staggered lists | `StaggerChildren` | Entering animation with an index-based delay (~60–80ms per item) |
| Accent dash | scaleX 0 → 1, 0.8s, from the left | Width/scaleX animation, 0.8s |
| Banner pattern drift | 24px pan over 60s, alternating | Optional; skip if it costs battery |
| **Reduced motion** | Website skips all of the above | Honour the OS setting (`useReducedMotion`) and skip the same effects |

Mobile animations should be a little faster than the website's: 0.9s feels slow on a phone.

### 3.7 Brand assets

- App icon and splash: `public/logo/CCFSI_ICON_*.png` (pick one, then export at 1024×1024 with no transparency for iOS).
- Splash background: `#1A4F72`.
- Wordmark: `public/logo/CCFSI_LOGO_A.png` on blue, `CCFSI_LOGO_B.png` on white.
- Copy: all user-facing text comes from `packages/shared` (or the API), so the app and the website never drift apart.

---

## 4. Phased delivery

Each phase ends in something testable. Don't start a phase until the one
before it is accepted.

### Phase 0: Foundations (in this repo, no app yet). **Done, on branch `mobile-app`**

- [x] **Pick one package manager: pnpm.** Vercel already builds with pnpm. Delete `package-lock.json` and use `pnpm` locally. (Having both lockfiles caused the earlier `@next/env` build failure.)
- [x] Add `pnpm-workspace.yaml` listing `mobile` and `packages/*` (pnpm always includes the root).
- [x] Create `packages/tokens` with `tokens.ts` and the CSS generation script, and import the CSS into `app/globals.css`. **Check that the website looks unchanged.**
- [x] Create `packages/shared` and move `lib/validation.ts`, `lib/services-content.ts`, and `lib/nav.ts` into it. Re-export from the old paths so web imports keep working.
- [x] Add the `/api/v1/content`, `/team`, `/openings`, `/impact` read endpoints.
- [x] Add rate limiting to the public POST routes (Postgres-backed, `lib/rate-limit.ts`; fails open).
- [~] **Drafts written** at `/privacy-policy` and `/terms-of-service` (noindex, linked from the footer). **Need review by a privacy advisor before launch.** Publish real **Privacy Policy** and **Terms** pages on the website. Both app stores **require** a privacy policy URL, and the footer links currently point to `/`.
- [ ] Settle the open decisions in §5.

**Done when:** the website deploys unchanged, and the new endpoints return JSON in production.

### Phase 1: Public app. **In progress**

- [x] Scaffold `mobile/` with `create-expo-app` (TypeScript, Expo Router).
- [x] Wire up Uniwind to `packages/tokens`, load the fonts, and build the §3.5 components.
- [x] Screens: Home, Services list + detail, Our Team, Referral, Contact, Careers + Apply.
- [x] About screen.
- [x] Tap-to-call / tap-to-email.
- [x] Remembered referrer details (opt-in). Client details are deliberately *not* saved on the device (health information, see §6).
- [ ] ~~Open in Maps~~: dropped, because the business publishes no street address.
- [x] Offline caching of content (TanStack Query persisted to AsyncStorage for 7 days).
- [x] Accessibility: field labels announced by screen readers, 48pt touch targets, reduced motion. **Open: brand teal text fails WCAG contrast (2.66:1) on web and app; needs a darker text teal.** Screen reader labels, Dynamic Type up to at least 200%, contrast at least as good as the website, 48pt touch targets.
- [~] Internal test builds via EAS: `mobile/eas.json` is ready (preview + production profiles). Needs an Expo account, `eas login`, and app IDs to run.

**Done when:** every form submits to production and shows up in `/admin`
and in the notification email; screens side by side with the website read
as the same brand; it works on a small Android phone and a large iPhone.

### Phase 2: Admin companion + push

- [ ] `push_tokens` table + migration; bearer-token auth endpoints; extend `requireAdminSession()`.
- [ ] Push sending in the referral, application, and contact routes (failures never break a submission; no client details in the notification text).
- [ ] Admin screens: sign-in, inbox tabs (Referrals / Applications / Messages), detail, status change, resume preview.
- [ ] Sign out on all devices (revoke tokens); auto-lock the admin area after inactivity; optional Face ID / fingerprint unlock.
- [ ] Public opt-in pushes: "new job opening" (no account needed; anonymous token).

**Done when:** submitting an Urgent referral on the website delivers a push
to a signed-in admin's phone within seconds, and the status they set in the
app shows up on `/admin`.

### Phase 3: Store release

- [ ] Apple Developer Program (US$99/year, **organisation** account, which needs a D-U-N-S number and takes time to approve, so start early) and Google Play Console (US$25 one-time).
- [ ] Store listings: screenshots, description, privacy "nutrition labels" / Data Safety form (declare: contact info, resumes, push tokens).
- [ ] Apple requires a way to delete accounts *if the app creates accounts*. Admin accounts are provisioned, not created in the app, so document this in the review notes and give reviewers a demo admin login.
- [ ] Error reporting (e.g. Sentry) and basic analytics, consistent with the website's privacy policy.
- [ ] EAS Update channels (`preview`, `production`) for small fixes after launch.

### Phase 4: Discovery for the staff app / family portal

Workshops with office staff and caregivers, a privacy review (PHIPAA, data
residency), and the choice of a scheduling/care-records system: build vs.
integrate with existing home-care software. Produce a separate plan.

---

## 5. Decisions needed before Phase 1

1. **Helvetica Neue licence.** Font licences are usually separate for web and for **app embedding**. Confirm the licence covers bundling the font in a mobile app. If it doesn't, buy an app licence or choose a close alternative for both platforms. Don't ship web and app in different fonts.
2. **Dark mode:** light-only (matches the website) or follow the system setting?
3. **Which admins get push notifications**, and for which events (every referral, or only Urgent)?
4. **App name in the stores:** "Constant Care" or "Constant Care Family Services".
5. **Supported OS versions:** use the Expo SDK's minimum versions unless you have a reason not to.
6. **Languages:** English only, or English and French? New Brunswick is officially bilingual. If French is likely, set up i18n in Phase 1, because it's much cheaper than adding it later; the website would need the same work.

---

## 6. Rules for whoever builds this

- **Native chrome, brand content.** Navigation (tab bar, headers, sheets) uses each platform's own components: Liquid Glass tab bar, SF Symbols, large titles and page sheets on iOS; Material 3 on Android. They're tinted with brand colours but keep the system font. Everything inside the screens (banners, cards, type, colours) matches the website.
- **Tokens, not hex codes.** No colour, radius, or font value is hard-coded in `mobile/` or in web components. If something is missing, add it to `packages/tokens` first.
- **One copy of each schema.** Form validation comes only from `packages/shared`. Don't hand-copy fields into the app.
- **The API is a contract.** Once the app ships, `/api/v1/*` and the form routes don't change shape.
- **Nothing sensitive on the device or in pushes.** Tokens go in SecureStore, client details never appear in notification text, and nothing is logged with personal data.
- **Same voice and copy.** If the website's wording changes, the app gets it from the shared content or the API, not from a hand edit.
- The website's `AGENTS.md` note still applies: this Next.js version has breaking changes, so read `node_modules/next/dist/docs/` before changing the API. Do the same with Expo: read the docs for the SDK version you install rather than relying on memory.

---

## 7. Redesign and roadmap (approved October 2026)

The app is no longer a copy of the website. It's one app with an
experience per audience, following the approved mockups ("Constant Care
App Redesign" canvas): same brand, app-native layout. Since the office runs
on spreadsheets and paper, the app plus the admin panel will become the
scheduling and records system.

| Stage | Who | Status |
| --- | --- | --- |
| **1. Visitors and referrers** | Care finder (4 questions → matched services), callback booking (`/admin/callbacks`), redesigned Home and Account, referral tracker with passwordless email-code sign-in, office "update for the referrer" on each referral | **Built** |
| **2. Accounts and scheduling** | Staff and client/family accounts (invited from the admin panel), admin scheduling of visits and caregivers | Next |
| **3. Caregiver app** | Today's visits, clock in/out with location, care-plan alerts, task checklist, visit notes, incident reports | After stage 2 |
| **4. Family portal** | Today's visit and caregiver, visit reports, care-plan goals, messaging the coordinator, visit change requests | After stage 3 |

**Before stages 2–4 store client health information:** decide where the
database is hosted (currently AWS us-east-1) and complete a privacy review
(PHIPAA / PIPEDA).

**Open content needs:** the funding guide (which New Brunswick programmes to
list); the Privacy Policy and Terms drafts need review.
