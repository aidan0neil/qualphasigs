# Alpha Sigma Phi – Theta Tau Chapter Website

A polished, responsive chapter website for the **Theta Tau Chapter of Alpha Sigma Phi
at Quinnipiac University**. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

Public pages introduce the chapter, list the brothers, show an events calendar, and
surface the current newsletter. A feature-flagged **Welcome Week Potluck** page lets
parents sign up to bring a dish, and a password-protected **admin dashboard** lets
officers view sign-ups and toggle features.

> **New officer? Start here.** [`PERSONALIZATION.md`](PERSONALIZATION.md) lists everything
> to change to make the site your chapter's, and where. A styled, printable version for
> sharing/handoff lives at [`docs/personalization-guide.html`](docs/personalization-guide.html)
> (open it in a browser).

---

## 1. What's included

| Area | Route | Notes |
| --- | --- | --- |
| Home | `/` | Hero, chapter stats, about preview, upcoming events, potluck banner (flagged), newsletter preview |
| Brothers | `/brothers` | Executive board + filterable roster (by class year / leadership) |
| Events | `/events` | Month calendar with category color-coding + upcoming list |
| Newsletter | `/newsletter` | Current edition (single source of truth) |
| About | `/about` | Chapter story, values, join CTA |
| Potluck | `/potluck` | **Feature-flagged.** Sign-up form + live, privacy-safe summary |
| Admin | `/admin` | Password-protected dashboard (stats, feature toggles, potluck management) |

## 2. Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, global metadata
│   ├── globals.css             # Tailwind + design tokens
│   ├── (public)/               # Public site (shares header/footer chrome)
│   │   ├── layout.tsx          #   → SiteHeader + main + SiteFooter
│   │   ├── page.tsx            #   Home
│   │   ├── brothers/…          #   Brothers directory
│   │   ├── events/…            #   Events calendar
│   │   ├── newsletter/…        #   Newsletter
│   │   ├── about/…             #   About
│   │   └── potluck/…           #   Potluck page + server action
│   ├── admin/
│   │   ├── login/…             # Public login screen + action
│   │   ├── actions.ts          # Admin server actions (logout, toggle, delete)
│   │   └── (dashboard)/        # Auth-gated dashboard (requireAdmin in layout)
│   │       ├── layout.tsx      #   AdminShell + auth guard
│   │       ├── page.tsx        #   Overview + feature toggles
│   │       ├── brothers/…      #   Roster table
│   │       ├── events/…        #   Events table (incl. private)
│   │       ├── newsletter/…    #   Current newsletter
│   │       └── potluck/…       #   Sign-ups (w/ emails), delete, CSV export
│   ├── sitemap.ts / robots.ts / manifest.ts / not-found.tsx
├── components/                 # Reusable UI (ui/, layout/, home/, brothers/, events/, …)
├── config/
│   ├── site.ts                 # ← Chapter content (name, socials, stats, contact)
│   ├── features.ts             # ← Feature-flag defaults + env parsing
│   └── nav.ts                  # ← Navigation items (each can require a flag)
├── data/                       # ← Placeholder content (brothers, events, newsletter, potluck seed)
└── lib/
    ├── types.ts                # Domain types (Brother, ChapterEvent, Newsletter, …)
    ├── data.ts                 # Read accessors over the content data
    ├── features.ts             # Resolves effective flags (env > admin > default)
    ├── store.ts                # JSON persistence (potluck sign-ups + flag overrides)
    ├── auth.ts                 # Admin session auth (HMAC-signed cookie)
    ├── validation.ts           # Zod schema for the potluck form
    └── utils.ts                # cn(), date formatting, category styles
```

## 3. How data is managed

Content is **data-driven** and separated from presentation. UI never hard-codes a
brother, event, or the newsletter URL — it reads through accessors in `lib/data.ts`.

- **Brothers** → `src/data/brothers.ts` (array of `Brother`). Set `isActive: false`
  to hide someone, `isExecutiveBoard: true` to put them on the exec board, and
  `displayOrder` to order the board.
- **Events** → `src/data/events.ts` (array of `ChapterEvent`). Set `isPublic: false`
  to keep an event off the public calendar; `category` drives its color.
- **Newsletter** → `src/data/newsletter.ts` (single `Newsletter` object). Used by
  **both** the homepage preview and the `/newsletter` page, so you only edit it once.
- **Potluck sign-ups** → live in a small JSON store (`lib/store.ts`), written by the
  public form and managed from the admin dashboard.

> Moving to a database later (e.g. Supabase/Postgres) means re-implementing the few
> functions in `lib/data.ts` / `lib/store.ts` to return the same types — no UI changes.

## 4. Turning the Potluck feature ON / OFF

The Potluck is a real feature flag. When **off**: it disappears from the nav and
homepage, and `/potluck` returns a 404 (enforced on the server). Three ways to control it:

1. **Admin dashboard (no redeploy):** sign in at `/admin`, flip **Welcome Week Potluck**.
   Takes effect immediately across the whole site.
2. **Environment variable:** set `FEATURE_POTLUCK=false` (wins over the admin toggle).
3. **Code default:** `src/config/features.ts` → `defaultFeatures.potluck`.

Precedence: **env override → admin runtime toggle → code default**. The same system
powers `brothers`, `events`, `newsletter`, `about`, and reserved future flags
(`alumni`, `recruitment`, `donations`).

## 5–7. How an administrator updates content

- **Brothers:** two options —
  - **Google Sheet sync (recommended):** set `GOOGLE_SHEET_CSV_URL` to a published
    sheet and the roster syncs automatically. Pair it with a Google Form so brothers
    can submit/update their own info. See "Roster sync (Google Sheet)" below.
  - **Static:** edit `src/data/brothers.ts` (add/edit/deactivate/reorder). The admin
    **Brothers** page shows the live roster and which source is active.
- **Events:** two options —
  - **Google Calendar sync (recommended):** set `GOOGLE_CALENDAR_ICS_URL` to your
    calendar's iCal feed and events sync automatically (recurring events expanded,
    refreshed hourly). See "Google Calendar sync" below.
  - **Static:** edit `src/data/events.ts`. The admin **Events** page lists all events
    (incl. private) and shows which source is active.
- **Newsletter:** edit `src/data/newsletter.ts` (title, date, description, URL) — or set
  `NEXT_PUBLIC_NEWSLETTER_URL` to swap just the link per deployment.
- **Potluck sign-ups:** managed live in the admin **Potluck** page — view (with emails),
  delete, and **Export CSV**. Emails are never shown on the public page.

> This build keeps roster/events/newsletter in version-controlled data files (easy to
> review and diff). The architecture is ready to swap those reads for database-backed
> CRUD without touching the UI.

## Roster sync (Google Sheet)

The Brothers directory can pull live from a **published Google Sheet** — no login
or API key — so a Google Form can feed it and keep the roster current.

1. Create a sheet with a header row using these columns (order/extra columns don't
   matter; only First Name + Last Name are required):

   | First Name | Last Name | Class Year | Major | Position | Bio | Image URL | Executive Board | Active | Display Order |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | Anders | Cole | 2026 | Finance | President | Leads the chapter… | https://…/anders.jpg | yes | yes | 1 |

   - **Executive Board / Active** accept yes/no (Active defaults to yes if blank).
   - **Position** filled + no Executive Board value → treated as exec automatically.
   - **Image URL** must be a public image link; blank shows a monogram avatar.
2. Feed it with a **Google Form**: create the form, then in its responses tab link
   a sheet — or point officers to edit the sheet directly.
3. **File → Share → Publish to web → [roster tab] → CSV**, copy the URL, and set it as
   `GOOGLE_SHEET_CSV_URL` (in `.env.local` and Vercel).

Behavior: cached ~1 hour (`GOOGLE_SHEET_REVALIDATE`), and if the sheet is ever
unreachable the site falls back to `src/data/brothers.ts`, so it never breaks.

**Privacy:** the roster is public. Only publish safe columns (name, class year,
major, position). If your form also collects emails/phones for internal use, keep
those out of the published sheet/tab — they should not appear on the site.

## Google Calendar sync

The Events page and homepage can pull live from a chapter Google Calendar via its
**iCal (.ics) feed** — no Google Cloud project or API key required.

1. In Google Calendar: **Settings → [your calendar] → Integrate calendar**.
2. Copy the **"Secret address in iCal format"** (works even if the calendar is private),
   or the public iCal URL if the calendar is public.
3. Set `GOOGLE_CALENDAR_ICS_URL` to that address (in `.env.local` and in Vercel).

Then:
- Events are fetched and cached (default 1 hour; tune with `GOOGLE_CALENDAR_REVALIDATE`).
- **Recurring events** (e.g. weekly chapter meeting) are expanded into individual dates.
- **All-day** and multi-day events are handled.
- **Categories** are inferred from each event's title/description (keywords like
  "service" → Philanthropy, "formal" → Social, "meeting" → Chapter). To set one
  explicitly, add a tag in the event title or description: `#philanthropy` or `[Social]`.
  The tag is hidden from the public site.
- If the feed is ever unreachable, the site automatically falls back to
  `src/data/events.ts`, so it never breaks.

Keep the feed URL secret-ish — the iCal "secret address" grants read access to your
calendar. It's a server-side env var and is never exposed to the browser.

## 8. Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | prod | Password for `/admin/login`. |
| `ADMIN_SESSION_SECRET` | prod | ≥16-char secret signing the admin cookie. Generate: `openssl rand -base64 32`. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Base URL for SEO / OpenGraph / sitemap. |
| `NEXT_PUBLIC_NEWSLETTER_URL` | optional | Overrides the newsletter link. |
| `GOOGLE_CALENDAR_ICS_URL` | optional | Google Calendar iCal feed → live event sync (see above). |
| `GOOGLE_CALENDAR_MONTHS_AHEAD` | optional | How far ahead to show events (default 12). |
| `GOOGLE_CALENDAR_REVALIDATE` | optional | Calendar feed cache seconds (default 3600). |
| `GOOGLE_SHEET_CSV_URL` | optional | Published Google Sheet CSV → live roster sync (see above). |
| `GOOGLE_SHEET_REVALIDATE` | optional | Roster sheet cache seconds (default 3600). |
| `FEATURE_*` | optional | Force a flag on/off (`FEATURE_POTLUCK`, `FEATURE_BROTHERS`, …). |
| `DATA_DIR` | optional | Where the JSON store is written. |

In development, safe fallbacks are used (`ADMIN_PASSWORD=changeme`); in **production the
app fails closed** if `ADMIN_SESSION_SECRET` is missing. No secrets are committed.

## 9. Run locally

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm start` (serve build),
`npm run lint`.

## 10. Deploy (Vercel)

1. Push the repo to GitHub and import it into Vercel.
2. Add the environment variables above in **Project → Settings → Environment Variables**
   (at minimum `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`).
3. Deploy. Next.js is detected automatically.

### Data & persistence (important)

Potluck sign-ups and runtime flag overrides use a **JSON file store** so the site works
without provisioning a database. On serverless platforms (Vercel) the filesystem is
ephemeral, so these writes **do not persist** across deploys/instances. For production
sign-ups that must survive, replace `src/lib/store.ts` with a real database
(e.g. Supabase/Postgres) — the rest of the app only calls its functions.

## Accessibility & SEO

Semantic landmarks, labeled forms, keyboard-navigable controls, visible focus rings, a
skip link, category info conveyed by text (not color alone), per-page titles/descriptions,
OpenGraph tags, `sitemap.xml`, `robots.txt` (admin disallowed), and a web manifest.

## Security notes

- Admin routes are guarded **server-side** (`requireAdmin()` in the dashboard layout and
  in every admin action / the CSV route) — not by client checks.
- Session cookie is `httpOnly`, `sameSite=lax`, `secure` in production, HMAC-signed, 8h TTL.
- Passwords/signatures are compared in constant time.
- The potluck form is validated on the server with Zod; emails are never exposed publicly.
- Keep Next.js updated: `npm i next@latest` (this template pins a patched 14.2.x).
# qualphasigs
