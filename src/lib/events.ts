import "server-only";
import { events as staticEvents } from "@/data/events";
import { fetchGoogleCalendarEvents, isCalendarConfigured } from "@/lib/google-calendar";
import type { ChapterEvent } from "@/lib/types";

/**
 * Async read layer for events. When a Google Calendar feed is configured it
 * becomes the source of truth (falling back to the static file if the feed is
 * unreachable); otherwise the static `src/data/events.ts` file is used.
 *
 * Pages call these accessors and never touch the source directly — swapping
 * data sources requires no UI changes.
 */

async function getSourceEvents(): Promise<ChapterEvent[]> {
  const fromCalendar = await fetchGoogleCalendarEvents();
  return fromCalendar ?? staticEvents;
}

/** True when events are being served from the Google Calendar feed. */
export function eventsSourcedFromCalendar(): boolean {
  return isCalendarConfigured();
}

function byStart(a: ChapterEvent, b: ChapterEvent) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
}

/** All events (admin view — includes private). */
export async function getAllEvents(): Promise<ChapterEvent[]> {
  const all = await getSourceEvents();
  return [...all].sort(byStart);
}

export async function getPublicEvents(): Promise<ChapterEvent[]> {
  return (await getAllEvents()).filter((e) => e.isPublic);
}

/** Upcoming public events (end date, or start date, in the future). */
export async function getUpcomingEvents(
  limit?: number,
  now: Date = new Date(),
): Promise<ChapterEvent[]> {
  const upcoming = (await getPublicEvents()).filter((e) => {
    const end = new Date(e.endDate ?? e.startDate);
    return end.getTime() >= now.getTime();
  });
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
