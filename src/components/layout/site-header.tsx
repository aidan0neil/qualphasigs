import { primaryNav } from "@/config/nav";
import { getFeatures } from "@/lib/features";
import { HeaderClient } from "@/components/layout/header-client";

/**
 * Server component: resolves feature flags, then renders only the nav items
 * whose feature is enabled (items without a `feature` always show).
 */
export async function SiteHeader() {
  const features = await getFeatures();
  const visible = primaryNav.filter((item) => !item.feature || features[item.feature]);
  return <HeaderClient items={visible} />;
}
