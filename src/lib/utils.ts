import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { EventCategory } from "@/lib/types";

/** Merge Tailwind class names, resolving conflicts predictably. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -------------------------------- Dates ---------------------------------- */

/** "Aug 25, 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** "Monday, August 25" */
export function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** "6:00 PM" */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** "6:00 PM – 8:00 PM" or just the start time when no end is provided. */
export function formatTimeRange(startIso: string, endIso?: string): string {
  const start = formatTime(startIso);
  if (!endIso) return start;
  return `${start} – ${formatTime(endIso)}`;
}

/* ------------------------------ Categories ------------------------------- */

/**
 * Tailwind class sets per event category. Every category pairs a color with a
 * label so information is never conveyed by color alone (accessibility).
 */
export const eventCategoryStyles: Record<
  EventCategory,
  { badge: string; dot: string; accent: string }
> = {
  Brotherhood: { badge: "bg-cardinal-50 text-cardinal-700 ring-cardinal-200", dot: "bg-cardinal-600", accent: "border-l-cardinal-600" },
  Recruitment: { badge: "bg-amber-50 text-amber-800 ring-amber-200", dot: "bg-amber-500", accent: "border-l-amber-500" },
  Philanthropy: { badge: "bg-emerald-50 text-emerald-800 ring-emerald-200", dot: "bg-emerald-600", accent: "border-l-emerald-600" },
  Social: { badge: "bg-violet-50 text-violet-800 ring-violet-200", dot: "bg-violet-600", accent: "border-l-violet-600" },
  Academic: { badge: "bg-sky-50 text-sky-800 ring-sky-200", dot: "bg-sky-600", accent: "border-l-sky-600" },
  Chapter: { badge: "bg-navy-100 text-navy-800 ring-navy-200", dot: "bg-navy-700", accent: "border-l-navy-700" },
  Alumni: { badge: "bg-stone-100 text-stone-800 ring-stone-300", dot: "bg-stone-600", accent: "border-l-stone-600" },
  University: { badge: "bg-teal-50 text-teal-800 ring-teal-200", dot: "bg-teal-600", accent: "border-l-teal-600" },
  Other: { badge: "bg-gray-100 text-gray-700 ring-gray-300", dot: "bg-gray-500", accent: "border-l-gray-500" },
};

/* -------------------------------- Misc ----------------------------------- */

/** Initials for avatar fallbacks, e.g. "John", "Smith" → "JS". */
export function initials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

/** Crypto-free unique id suitable for mock/store records. */
export function makeId(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
