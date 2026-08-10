/**
 * Feature-flag configuration.
 *
 * These are the DEFAULT values that ship with the codebase. Two things can
 * override a default at runtime, in order of precedence:
 *
 *   1. An environment variable (e.g. `FEATURE_POTLUCK=false`) — good for
 *      per-deployment control.
 *   2. An admin toggle stored in the data store — lets officers flip a feature
 *      like the potluck ON/OFF from the admin dashboard without a redeploy.
 *
 * Read the *resolved* flags with `getFeatures()` from `@/lib/features` — do
 * not import these raw defaults into UI code.
 */

export type FeatureKey =
  | "brothers"
  | "events"
  | "newsletter"
  | "about"
  | "potluck"
  // Reserved for future expansion — wire up when the pages are built.
  | "alumni"
  | "recruitment"
  | "donations";

export type FeatureFlags = Record<FeatureKey, boolean>;

/** Baseline flags. Core pages default on; future features default off. */
export const defaultFeatures: FeatureFlags = {
  brothers: true,
  events: true,
  newsletter: true,
  about: true,
  potluck: true,
  recruitment: true,
  alumni: false,
  donations: false,
};

/** Which feature flags an admin is allowed to toggle at runtime. */
export const runtimeToggleableFeatures: FeatureKey[] = ["potluck", "recruitment"];

/**
 * Parse a boolean-ish environment variable. Returns `undefined` when the var
 * is unset so it does not clobber lower-precedence values.
 */
function envBool(value: string | undefined): boolean | undefined {
  if (value === undefined) return undefined;
  const v = value.trim().toLowerCase();
  if (["1", "true", "on", "yes"].includes(v)) return true;
  if (["0", "false", "off", "no"].includes(v)) return false;
  return undefined;
}

/** Environment-variable overrides, evaluated once at module load (server). */
export const envFeatureOverrides: Partial<FeatureFlags> = {
  brothers: envBool(process.env.FEATURE_BROTHERS),
  events: envBool(process.env.FEATURE_EVENTS),
  newsletter: envBool(process.env.FEATURE_NEWSLETTER),
  about: envBool(process.env.FEATURE_ABOUT),
  potluck: envBool(process.env.FEATURE_POTLUCK),
  alumni: envBool(process.env.FEATURE_ALUMNI),
  recruitment: envBool(process.env.FEATURE_RECRUITMENT),
  donations: envBool(process.env.FEATURE_DONATIONS),
} as Partial<FeatureFlags>;
