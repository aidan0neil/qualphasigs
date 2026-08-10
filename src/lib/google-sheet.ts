import "server-only";
import Papa from "papaparse";
import type { Brother } from "@/lib/types";

/**
 * Google Sheet roster integration.
 *
 * Reads the chapter roster from a **published Google Sheet** (File → Share →
 * Publish to web → CSV). No authentication is required — the same low-friction
 * approach as the calendar's iCal feed. Pair it with a Google Form whose
 * responses populate the sheet to keep the roster current.
 *
 * Configure with `GOOGLE_SHEET_CSV_URL`. When unset, callers fall back to the
 * static roster in `src/data/brothers.ts`.
 *
 * Expected columns (header row, case-insensitive, spaces ignored). Extra
 * columns are ignored; only First Name + Last Name are required:
 *
 *   First Name | Last Name | Class Year | Major | Position | Bio |
 *   Image URL  | Executive Board (yes/no) | Active (yes/no) | Display Order
 */

const REVALIDATE = Number(process.env.GOOGLE_SHEET_REVALIDATE ?? 3600);

export function isRosterSheetConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEET_CSV_URL);
}

/** Normalize a header cell: lowercase, strip non-alphanumerics. */
function normKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Accepted header aliases → canonical field. */
const HEADER_ALIASES: Record<string, keyof RawRow> = {
  firstname: "firstName",
  first: "firstName",
  lastname: "lastName",
  last: "lastName",
  classyear: "classYear",
  gradyear: "classYear",
  graduationyear: "classYear",
  class: "classYear",
  year: "classYear",
  major: "major",
  position: "position",
  role: "position",
  title: "position",
  office: "position",
  bio: "bio",
  biography: "bio",
  about: "bio",
  imageurl: "imageUrl",
  image: "imageUrl",
  headshot: "imageUrl",
  photo: "imageUrl",
  photourl: "imageUrl",
  executiveboard: "isExecutiveBoard",
  execboard: "isExecutiveBoard",
  exec: "isExecutiveBoard",
  eboard: "isExecutiveBoard",
  leadership: "isExecutiveBoard",
  active: "isActive",
  isactive: "isActive",
  status: "isActive",
  displayorder: "displayOrder",
  order: "displayOrder",
  sort: "displayOrder",
  id: "id",
};

type RawRow = {
  id?: string;
  firstName?: string;
  lastName?: string;
  classYear?: string;
  major?: string;
  position?: string;
  bio?: string;
  imageUrl?: string;
  isExecutiveBoard?: string;
  isActive?: string;
  displayOrder?: string;
};

function truthy(value: string | undefined): boolean {
  if (!value) return false;
  return ["yes", "y", "true", "1", "x", "✓", "active", "exec"].includes(value.trim().toLowerCase());
}

/** `isActive` defaults to true unless explicitly marked inactive. */
function activeFlag(value: string | undefined): boolean {
  if (value === undefined || value.trim() === "") return true;
  const v = value.trim().toLowerCase();
  if (["no", "n", "false", "0", "inactive", "alumni", "alumnus"].includes(v)) return false;
  return true;
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toBrother(row: RawRow): Brother | null {
  const firstName = row.firstName?.trim();
  const lastName = row.lastName?.trim();
  if (!firstName || !lastName) return null; // skip incomplete rows

  const classYearNum = Number((row.classYear ?? "").replace(/[^0-9]/g, ""));
  const displayOrderNum = row.displayOrder ? Number(row.displayOrder) : undefined;
  const position = row.position?.trim() || undefined;

  // If there's no explicit exec column value, treat any listed position as exec.
  const isExecutiveBoard = row.isExecutiveBoard
    ? truthy(row.isExecutiveBoard)
    : Boolean(position);

  return {
    id: row.id?.trim() || `sheet-${slug(`${firstName}-${lastName}-${classYearNum || ""}`)}`,
    firstName,
    lastName,
    classYear: Number.isFinite(classYearNum) && classYearNum > 0 ? classYearNum : 0,
    major: row.major?.trim() || undefined,
    position,
    bio: row.bio?.trim() || undefined,
    imageUrl: row.imageUrl?.trim() || undefined,
    isExecutiveBoard,
    isActive: activeFlag(row.isActive),
    displayOrder:
      displayOrderNum !== undefined && Number.isFinite(displayOrderNum) ? displayOrderNum : undefined,
  };
}

/** Parse published-sheet CSV text into brothers. Exported for testing. */
export function parseRosterCsv(csv: string): Brother[] {
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => {
      const canonical = HEADER_ALIASES[normKey(h)];
      return canonical ?? normKey(h);
    },
  });

  return (parsed.data as RawRow[])
    .map(toBrother)
    .filter((b): b is Brother => b !== null);
}

/**
 * Fetch + parse the configured roster sheet. Returns `null` when not
 * configured or on fetch/parse failure, so callers fall back to static data.
 */
export async function fetchRosterFromSheet(): Promise<Brother[] | null> {
  const url = process.env.GOOGLE_SHEET_CSV_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) {
      console.warn(`[roster] sheet responded ${res.status}; using static roster.`);
      return null;
    }
    const csv = await res.text();
    const brothers = parseRosterCsv(csv);
    if (brothers.length === 0) {
      console.warn("[roster] sheet parsed to 0 brothers; using static roster.");
      return null;
    }
    return brothers;
  } catch (err) {
    console.warn("[roster] failed to load sheet; using static roster.", err);
    return null;
  }
}
