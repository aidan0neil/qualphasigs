import type { FeatureKey } from "@/config/features";

export type NavItem = {
  label: string;
  href: string;
  /** If set, the item only appears when this feature flag is enabled. */
  feature?: FeatureKey;
};

/** Primary navigation. Order matters — this is the on-screen order. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Brothers", href: "/brothers", feature: "brothers" },
  { label: "Events", href: "/events", feature: "events" },
  { label: "Recruitment", href: "/recruitment", feature: "recruitment" },
  { label: "Newsletter", href: "/newsletter", feature: "newsletter" },
  { label: "About", href: "/about", feature: "about" },
  { label: "Potluck", href: "/potluck", feature: "potluck" },
];
