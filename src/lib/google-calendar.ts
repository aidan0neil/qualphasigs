import "server-only";
import IcalExpander, { type IcalEvent, type IcalOccurrence, type IcalTime } from "ical-expander";
import { EVENT_CATEGORIES, type ChapterEvent, type EventCategory } from "@/lib/types";

/**
 * Google Calendar (iCal / .ics) integration.
 *
 * Reads a chapter's Google Calendar via its **iCal feed URL** — either the
 * public address or the private "Secret address in iCal format" from Google
 * Calendar settings. Recurring events are expanded into individual dates, and
 * each event is mapped onto our `ChapterEvent` shape so the rest of the app is
 * unchanged.
 *
 * Configure with `GOOGLE_CALENDAR_ICS_URL`. When unset, callers fall back to
 * the static events in `src/data/events.ts`.
 */

/** How many months ahead to expand recurring events. */
const MONTHS_AHEAD = Number(process.env.GOOGLE_CALENDAR_MONTHS_AHEAD ?? 12);
/** Cache TTL (seconds) for the feed. */
const REVALIDATE = Number(process.env.GOOGLE_CALENDAR_REVALIDATE ?? 3600);

export function isCalendarConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CALENDAR_ICS_URL);
}

/**
 * Guess an event category from its text. An explicit tag wins — put
 * `#social` or `[Philanthropy]` in the calendar event's title/description —
 * otherwise keyword heuristics apply, defaulting to "Chapter".
 */
function detectCategory(summary: string, description: string): EventCategory {
  const text = `${summary} ${description}`.toLowerCase();

  // Explicit override: #category or [category] using any real category name.
  for (const category of EVENT_CATEGORIES) {
    const key = category.toLowerCase();
    if (text.includes(`#${key.replace(/\s+/g, "")}`) || text.includes(`[${key}]`)) {
      return category;
    }
  }

  const rules: [RegExp, EventCategory][] = [
    [/service|philanthrop|volunteer|fundrais|charity|clean.?up|donation/, "Philanthropy"],
    [/recruit|rush|interest night|info(rmation)? night|smoker/, "Recruitment"],
    [/formal|semi-formal|mixer|social|party|dance|tailgate|date night/, "Social"],
    [/study|academic|gpa|tutor|exam|scholarship hours/, "Academic"],
    [/alumni|networking|mentor/, "Alumni"],
    [/brotherhood|bbq|retreat|bonding|game night|intramural/, "Brotherhood"],
    [/homecoming|university|campus wide|orientation/, "University"],
    [/meeting|chapter|elections|initiation|ritual/, "Chapter"],
  ];
  for (const [re, category] of rules) {
    if (re.test(text)) return category;
  }
  return "Chapter";
}

/** Remove category tags like `#social` or `[Philanthropy]` from display text. */
function stripCategoryTags(text: string): string {
  const names = EVENT_CATEGORIES.map((c) => c.toLowerCase().replace(/\s+/g, "")).join("|");
  return text
    .replace(new RegExp(`#(${names})\\b`, "gi"), "")
    .replace(new RegExp(`\\[(${names})\\]`, "gi"), "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Floating local ISO (no timezone) for all-day dates, e.g. "2026-10-10T00:00:00". */
function floatingDateISO(t: IcalTime): string {
  return `${t.year}-${pad(t.month)}-${pad(t.day)}T00:00:00`;
}

function normalize(
  summary: string | undefined,
  description: string | undefined,
  location: string | undefined,
  uid: string,
  start: IcalTime,
  end: IcalTime | null,
): ChapterEvent {
  const rawTitle = (summary ?? "Untitled Event").trim();
  const rawDesc = (description ?? "").trim();
  const category = detectCategory(rawTitle, rawDesc);
  const title = stripCategoryTags(rawTitle) || "Untitled Event";
  const desc = stripCategoryTags(rawDesc);
  const allDay = start.isDate;

  let startDate: string;
  let endDate: string | undefined;

  if (allDay) {
    startDate = floatingDateISO(start);
    // iCal all-day DTEND is exclusive → step back one day for our inclusive model.
    if (end) {
      const inclusive = new Date(end.toJSDate());
      inclusive.setDate(inclusive.getDate() - 1);
      const endKey = `${inclusive.getFullYear()}-${pad(inclusive.getMonth() + 1)}-${pad(
        inclusive.getDate(),
      )}T00:00:00`;
      endDate = endKey > startDate ? endKey : undefined;
    }
  } else {
    startDate = start.toJSDate().toISOString();
    endDate = end ? end.toJSDate().toISOString() : undefined;
  }

  return {
    id: `gc_${uid}_${startDate}`,
    title,
    description: desc || undefined,
    startDate,
    endDate,
    location: location?.trim() || undefined,
    category,
    isPublic: true,
    allDay,
  };
}

/**
 * Parse raw ICS text into expanded `ChapterEvent`s within the look-ahead
 * window. Exported for testing; `fetchGoogleCalendarEvents` wraps it.
 */
export function parseIcsToEvents(ics: string, now: Date = new Date()): ChapterEvent[] {
  const expander = new IcalExpander({ ics, maxIterations: 2000 });
  const after = new Date(now);
  after.setDate(after.getDate() - 1); // include events happening today
  const before = new Date(now);
  before.setMonth(before.getMonth() + MONTHS_AHEAD);

  const { events, occurrences } = expander.between(after, before);

  const mapped: ChapterEvent[] = [
    ...events.map((e: IcalEvent) =>
      normalize(e.summary, e.description, e.location, e.uid, e.startDate, e.endDate),
    ),
    ...occurrences.map((o: IcalOccurrence) =>
      normalize(
        o.item.summary,
        o.item.description,
        o.item.location,
        o.item.uid,
        o.startDate,
        o.endDate,
      ),
    ),
  ];

  return mapped.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}

/**
 * Fetch + parse the configured calendar feed. Returns `null` when the feed is
 * not configured or the fetch/parse fails, signalling callers to fall back to
 * static data.
 */
export async function fetchGoogleCalendarEvents(): Promise<ChapterEvent[] | null> {
  const url = process.env.GOOGLE_CALENDAR_ICS_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) {
      console.warn(`[calendar] feed responded ${res.status}; using static events.`);
      return null;
    }
    const ics = await res.text();
    const events = parseIcsToEvents(ics);
    return events;
  } catch (err) {
    console.warn("[calendar] failed to load feed; using static events.", err);
    return null;
  }
}
