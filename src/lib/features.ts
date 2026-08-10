import "server-only";
import {
  defaultFeatures,
  envFeatureOverrides,
  type FeatureFlags,
  type FeatureKey,
} from "@/config/features";
import { getFeatureOverrides } from "@/lib/store";

/**
 * Resolve the effective feature flags.
 *
 * Precedence (highest wins):
 *   env override  →  admin runtime override (store)  →  code default
 *
 * This is async because runtime overrides live in the data store. Server
 * components can `await getFeatures()`; UI never reads raw defaults.
 */
export async function getFeatures(): Promise<FeatureFlags> {
  const runtime = await getFeatureOverrides();

  const resolved = { ...defaultFeatures };
  (Object.keys(resolved) as FeatureKey[]).forEach((key) => {
    if (runtime[key] !== undefined) resolved[key] = runtime[key] as boolean;
    if (envFeatureOverrides[key] !== undefined) resolved[key] = envFeatureOverrides[key] as boolean;
  });

  return resolved;
}

/** Convenience: is a single feature enabled? */
export async function isFeatureEnabled(key: FeatureKey): Promise<boolean> {
  const features = await getFeatures();
  return features[key];
}
