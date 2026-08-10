import { getFeatures } from "@/lib/features";
import type { FeatureKey } from "@/config/features";

/**
 * Server component that renders its children only when a feature is enabled.
 * Use to keep homepage sections / links in sync with the flag system.
 *
 *   <FeatureGate feature="potluck"><PotluckBanner /></FeatureGate>
 */
export async function FeatureGate({
  feature,
  children,
  fallback = null,
}: {
  feature: FeatureKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const features = await getFeatures();
  return <>{features[feature] ? children : fallback}</>;
}
