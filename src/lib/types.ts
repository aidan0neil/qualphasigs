/**
 * Shared domain types for the chapter website.
 *
 * These types are the contract between the data layer (currently mock data /
 * a JSON store) and the presentation layer. Swapping the mock data for a real
 * database later only requires that the database returns these same shapes.
 */

/** A member of the chapter. */
export type Brother = {
  id: string;
  firstName: string;
  lastName: string;
  /** Graduation year, e.g. 2027. */
  classYear: number;
  major?: string;
  /** Executive-board or leadership title, if any. Free-form / data-driven. */
  position?: string;
  bio?: string;
  imageUrl?: string;
  /** True if the brother currently sits on the executive board. */
  isExecutiveBoard: boolean;
  /** Inactive brothers are hidden from the public directory. */
  isActive: boolean;
  /** Lower numbers sort first (used to order the exec board deliberately). */
  displayOrder?: number;
};

export const EVENT_CATEGORIES = [
  "Brotherhood",
  "Recruitment",
  "Philanthropy",
  "Social",
  "Academic",
  "Chapter",
  "Alumni",
  "University",
  "Other",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

/** A calendar/chapter event. Dates are ISO 8601 strings. */
export type ChapterEvent = {
  id: string;
  title: string;
  description?: string;
  /** ISO start date-time, e.g. "2026-08-25T18:00:00". */
  startDate: string;
  /** Optional ISO end date-time. */
  endDate?: string;
  location?: string;
  category: EventCategory;
  /** Private events are excluded from the public calendar. */
  isPublic: boolean;
  /** True for all-day events (no meaningful start/end time). */
  allDay?: boolean;
};

/** The chapter's current newsletter (single source of truth). */
export type Newsletter = {
  title: string;
  /** ISO date, e.g. "2026-08-01". */
  publishedDate: string;
  description: string;
  /** External URL or hosted PDF. */
  url: string;
  /** Optional preview image. */
  thumbnailUrl?: string;
};

export const POTLUCK_CATEGORIES = [
  "Appetizer",
  "Main Dish",
  "Side",
  "Dessert",
  "Drinks",
  "Other",
] as const;

export type PotluckCategory = (typeof POTLUCK_CATEGORIES)[number];

/** A parent/family sign-up for the Welcome Week potluck. */
export type PotluckSignup = {
  id: string;
  familyName: string;
  brotherName: string;
  /** Private — never rendered publicly. */
  email: string;
  item: string;
  category: PotluckCategory;
  servings: number;
  notes?: string;
  createdAt: string;
};

/** Payload accepted from the public sign-up form. */
export type PotluckSignupInput = Omit<PotluckSignup, "id" | "createdAt">;
