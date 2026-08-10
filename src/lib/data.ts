import { currentNewsletter } from "@/data/newsletter";
import type { Newsletter } from "@/lib/types";

/**
 * Read API for newsletter content. Presentation code calls this accessor
 * instead of importing the raw object, so the underlying source can change
 * without touching the UI.
 *
 * Roster accessors live in `@/lib/roster` and event accessors in `@/lib/events`
 * (both async — they may hit a live Google Sheet / calendar feed).
 */

/* ------------------------------ Newsletter ------------------------------- */

export function getCurrentNewsletter(): Newsletter {
  return currentNewsletter;
}
