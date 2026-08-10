# Personalization Guide

Everything you need to change to make this site your chapter's, and exactly where
to find it. Work top to bottom — the first few sections cover 90% of what matters.

**Priority key:** 🔴 Essential · 🟡 Recommended · ⚪ Optional

**After editing**, preview locally with `npm run dev` (see [README](README.md) → "Run
locally"), then deploy. Most content lives in **plain config/data files** — you edit a
value between quotes, save, done.

---

## 1. 🔴 Core chapter identity

**File:** [`src/config/site.ts`](src/config/site.ts)

This one file drives the site name, footer, contact info, social links, and homepage
stats. Change the text between the quotes:

| Field | What it is | Current value |
| --- | --- | --- |
| `organization` | Fraternity name | "Alpha Sigma Phi" |
| `chapter` | Your chapter | "Theta Tau Chapter" |
| `university` | School | "Quinnipiac University" |
| `title` | Browser tab + SEO title | "Alpha Sigma Phi – Theta Tau \| Quinnipiac University" |
| `tagline` | Short slogan (hero + footer) | "Building Better Men Through…" |
| `description` | SEO / social-share summary | one sentence about the chapter |
| `contactEmail` | Shown in footer + "Contact" buttons | "fsl@quinnipiac.edu" |
| `values` | Motto words (shown as chips in the hero) | see note below |
| `socials` | Instagram / Facebook / LinkedIn / Email links | update each `href` + `handle` |
| `stats` | The 4 big homepage numbers | Active Brothers, Founded, Years, Events |

> **Note on `values`:** the hero shows each array item as its own chip. It's currently
> one combined entry (`["Silence, Charity, Purity, Honor, Patriotism"]`) so it renders as
> a single chip. To show them separately, split into individual strings:
> `["Silence", "Charity", "Purity", "Honor", "Patriotism"]`.

> **Note on `url`:** leave the code default alone; set the real site URL via the
> `NEXT_PUBLIC_SITE_URL` environment variable instead (Section 2).

---

## 2. 🔴 Environment variables (secrets & links)

**File:** [`.env.local`](.env.local) (create from [`.env.example`](.env.example) if missing)

These are **not** committed to git. Set them locally and again in Vercel (Project →
Settings → Environment Variables) when you deploy.

| Variable | Priority | What it does |
| --- | --- | --- |
| `ADMIN_PASSWORD` | 🔴 | Password to sign in at `/admin`. **Change this.** |
| `ADMIN_SESSION_SECRET` | 🔴 | Random ≥16-char string that secures admin logins. Generate with `openssl rand -base64 32`. |
| `NEXT_PUBLIC_SITE_URL` | 🟡 | Your real domain, e.g. `https://alphasigqu.com` (for SEO/sharing). |
| `NEXT_PUBLIC_NEWSLETTER_URL` | ⚪ | Optional shortcut to change the newsletter link (Section 5). |
| `GOOGLE_CALENDAR_ICS_URL` | ⚪ | Sync events from Google Calendar (Section 4). |
| `GOOGLE_SHEET_CSV_URL` | ⚪ | Sync the roster from a Google Sheet (Section 3). |

Full details for each are in [README](README.md) → "Environment variables."

---

## 3. 🔴 Brothers roster

You have **two ways** to manage the roster — pick one.

**Option A — Google Sheet (recommended, no code):**
Set `GOOGLE_SHEET_CSV_URL` in `.env.local` to a published sheet. Officers/brothers keep
it current via the sheet or a linked Google Form. Full setup: [README](README.md) →
"Roster sync (Google Sheet)."

**Option B — Edit the file directly:**
**File:** [`src/data/brothers.ts`](src/data/brothers.ts)

Each brother is an object. Copy an existing one and edit the fields:

```ts
{
  id: "b-jane-doe",          // any unique id
  firstName: "First",
  lastName: "Last",
  classYear: 2027,
  major: "Finance",
  position: "President",     // omit for a regular member
  bio: "Short bio…",         // optional
  imageUrl: "https://…/headshot.jpg", // optional; blank = monogram avatar
  isExecutiveBoard: true,    // true → shows in Executive Board section
  isActive: true,            // false → hidden from the site
  displayOrder: 1,           // orders the exec board (lower = first)
}
```

- **Headshots:** set `imageUrl` to a public image link. No link = a clean initials
  avatar (looks intentional, so fine to leave blank).
- **Remove someone:** set `isActive: false` (keeps history) or delete the object.

The placeholder names in this file are fictional — **replace them all** with your real
roster.

---

## 4. 🟡 Events / calendar

**Two ways** — pick one.

**Option A — Google Calendar (recommended):** set `GOOGLE_CALENDAR_ICS_URL` and manage
everything in Google Calendar. Recurring events, categories, etc. are handled for you.
Full setup: [README](README.md) → "Google Calendar sync."

**Option B — Edit the file directly:**
**File:** [`src/data/events.ts`](src/data/events.ts)

```ts
{
  id: "e-fall-bbq",
  title: "Welcome Back BBQ",
  description: "Optional short description.",
  startDate: "2026-08-25T17:00:00",  // YYYY-MM-DDThh:mm:ss
  endDate: "2026-08-25T20:00:00",    // optional
  location: "The Quad",
  category: "Brotherhood",           // see categories below
  isPublic: true,                    // false = hidden from public calendar
}
```

**Categories** (drive the color-coding): Brotherhood, Recruitment, Philanthropy, Social,
Academic, Chapter, Alumni, University, Other. Defined in
[`src/lib/types.ts`](src/lib/types.ts) (`EVENT_CATEGORIES`).

---

## 5. 🟡 Newsletter

**File:** [`src/data/newsletter.ts`](src/data/newsletter.ts)

One object powers both the homepage preview and the `/newsletter` page:

```ts
{
  title: "The Talisman — Fall 2026 Edition",
  publishedDate: "2026-08-01",
  description: "Short summary of the issue.",
  url: "https://…/newsletter.pdf",  // link or hosted PDF
}
```

To change just the link without editing code, set `NEXT_PUBLIC_NEWSLETTER_URL` instead.

---

## 6. 🟡 Recruitment page & IFC forms

**File:** [`src/config/recruitment.ts`](src/config/recruitment.ts)

- `headline`, `intro`, `steps` — the recruitment page copy.
- `interestFormUrl` — optional "Express Interest" button (leave `""` to hide it).
- **`forms`** — the IFC/chapter forms new members complete. **Paste your real links into
  each `url`.** A blank `url` shows a "Link coming soon" chip until you add it:

```ts
{
  title: "IFC New Member Registration",
  description: "Register your intake with the Quinnipiac IFC.",
  url: "https://…",   // ← your link here
  required: true,
}
```

Recruitment **events** on this page come automatically from your calendar/events —
anything with category `Recruitment` (Section 4) shows up here.

---

## 7. ⚪ Welcome Week Potluck

- **Turn it on/off:** the admin dashboard (`/admin`) has a toggle, or set
  `FEATURE_POTLUCK` in `.env.local`. See Section 8.
- **Intro text:** [`src/app/(public)/potluck/page.tsx`](src/app/(public)/potluck/page.tsx)
  (the two paragraphs near the top).
- **Sample sign-ups** (seed data): [`src/data/potluck.ts`](src/data/potluck.ts) — delete
  these once real sign-ups come in, or from the admin Potluck page.

---

## 8. 🟡 Feature flags (which pages exist)

**File:** [`src/config/features.ts`](src/config/features.ts)

Turn whole sections on/off. `defaultFeatures` sets the baseline:

```ts
export const defaultFeatures = {
  brothers: true,
  events: true,
  newsletter: true,
  about: true,
  potluck: true,
  recruitment: true,
  alumni: false,      // reserved for future pages
  donations: false,
};
```

- `potluck` and `recruitment` can also be flipped live from the **admin dashboard**
  (no redeploy).
- An environment variable always wins, e.g. `FEATURE_POTLUCK=false`.

---

## 9. ⚪ About page content

**File:** [`src/app/(public)/about/page.tsx`](src/app/(public)/about/page.tsx)

- **History paragraphs** — the 3 paragraphs under "The Better Man since the beginning."
- **`values` array** (top of file) — the 4 core-value cards.
- **Chapter Facts card** — the `<Fact>` rows (National Founding, Philanthropy, etc.).
- **Join CTA** — the "Interested in joining?" box at the bottom.

---

## 10. ⚪ Homepage content

- **Hero** — [`src/components/home/hero.tsx`](src/components/home/hero.tsx). The tagline
  and stats pull from `site.ts`, but the big **"Alpha Sigma Phi / Theta Tau Chapter"**
  heading text is written directly here (lines ~27–30) if you ever need to change it.
- **"Who We Are" preview + pillars** —
  [`src/components/home/about-preview.tsx`](src/components/home/about-preview.tsx)
  (`pillars` array + the heading/description).
- **Stats numbers** — `site.ts` → `stats` (Section 1).
- **Section order / which sections show** —
  [`src/app/(public)/page.tsx`](src/app/(public)/page.tsx).

---

## 11. ⚪ Branding — logo, crest, colors, favicon

- **Crest letters + wordmark** —
  [`src/components/brand/logo.tsx`](src/components/brand/logo.tsx). The Greek letters
  `ΑΣΦ` are in the `<text>` element (~line 36); the "Alpha Sigma Phi" / "Theta Tau
  Chapter" wordmark is near the bottom (~lines 64, 72). To use a real logo image instead
  of the drawn crest, replace the `Crest` SVG with an `<img>`.
- **Colors** — [`tailwind.config.ts`](tailwind.config.ts). The palette is `navy` (dark
  base), `cardinal` (the red accent — Alpha Sig's Cardinal), and `stone` (neutrals).
  Adjust the hex values there to shift the whole site's colors.
- **Favicon** — replace [`src/app/favicon.ico`](src/app/favicon.ico) with your own
  `.ico` file (same filename).

---

## 12. 🔴 Admin access

- Sign in at `/admin/login` with `ADMIN_PASSWORD` (Section 2).
- From the dashboard you can: toggle Potluck/Recruitment, view & delete potluck
  sign-ups, export them as CSV, and see the current roster/events/newsletter.
- **Before launch:** set a strong `ADMIN_PASSWORD` and a random `ADMIN_SESSION_SECRET`.

---

## Quick-start checklist

- [ ] 🔴 `site.ts` — name, university, tagline, contact, socials, stats
- [ ] 🔴 `.env.local` — `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` (+ `NEXT_PUBLIC_SITE_URL`)
- [ ] 🔴 Roster — connect a Google Sheet **or** edit `src/data/brothers.ts`
- [ ] 🟡 Events — connect Google Calendar **or** edit `src/data/events.ts`
- [ ] 🟡 Newsletter — `src/data/newsletter.ts` (title, date, link)
- [ ] 🟡 Recruitment — paste real IFC form links in `src/config/recruitment.ts`
- [ ] 🟡 Feature flags — decide what's on in `src/config/features.ts`
- [ ] ⚪ About / homepage copy, branding colors, favicon
- [ ] 🔴 Deploy: push to GitHub → Vercel → add env vars (see [README](README.md))

Questions on any step? The [README](README.md) has deeper setup notes for the Google
Sheet, Google Calendar, environment variables, and deployment.
