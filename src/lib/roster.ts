import "server-only";
import { brothers as staticBrothers } from "@/data/brothers";
import { fetchRosterFromSheet, isRosterSheetConfigured } from "@/lib/google-sheet";
import type { Brother } from "@/lib/types";

/**
 * Async read layer for the roster. When a published Google Sheet is configured
 * it becomes the source of truth (falling back to the static file if the sheet
 * is unreachable); otherwise `src/data/brothers.ts` is used.
 *
 * Pages call these accessors and never touch the source directly — swapping
 * data sources requires no UI changes.
 */

async function getSourceBrothers(): Promise<Brother[]> {
  const fromSheet = await fetchRosterFromSheet();
  return fromSheet ?? staticBrothers;
}

/** True when the roster is being served from the Google Sheet. */
export function rosterSourcedFromSheet(): boolean {
  return isRosterSheetConfigured();
}

/** All brothers, active and inactive (admin view). */
export async function getAllBrothers(): Promise<Brother[]> {
  return getSourceBrothers();
}

export async function getActiveBrothers(): Promise<Brother[]> {
  return (await getSourceBrothers())
    .filter((b) => b.isActive)
    .sort((a, b) => a.lastName.localeCompare(b.lastName));
}

export async function getExecutiveBoard(): Promise<Brother[]> {
  return (await getSourceBrothers())
    .filter((b) => b.isActive && b.isExecutiveBoard)
    .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
}

export async function getBrotherCount(): Promise<number> {
  return (await getSourceBrothers()).filter((b) => b.isActive).length;
}

/** Distinct class years present in the active roster, soonest first. */
export async function getClassYears(): Promise<number[]> {
  const years = (await getActiveBrothers()).map((b) => b.classYear).filter((y) => y > 0);
  return Array.from(new Set(years)).sort((a, b) => a - b);
}
