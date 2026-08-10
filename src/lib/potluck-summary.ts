import { POTLUCK_CATEGORIES, type PotluckCategory, type PotluckSignup } from "@/lib/types";

export type CategorySummary = {
  category: PotluckCategory;
  count: number;
  servings: number;
};

/** Totals per category across all sign-ups. */
export function summarizeByCategory(signups: PotluckSignup[]): CategorySummary[] {
  return POTLUCK_CATEGORIES.map((category) => {
    const items = signups.filter((s) => s.category === category);
    return {
      category,
      count: items.length,
      servings: items.reduce((sum, s) => sum + s.servings, 0),
    };
  });
}

/**
 * Simple "what's still needed" heuristic: any category with no sign-ups yet.
 * Deliberately not over-engineered — just enough to guide parents.
 */
export function neededCategories(signups: PotluckSignup[]): PotluckCategory[] {
  return summarizeByCategory(signups)
    .filter((s) => s.count === 0)
    .map((s) => s.category);
}

export function totalServings(signups: PotluckSignup[]): number {
  return signups.reduce((sum, s) => sum + s.servings, 0);
}
