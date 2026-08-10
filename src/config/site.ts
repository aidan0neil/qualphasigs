/**
 * Centralized, chapter-editable content configuration.
 *
 * This is the single place officers should edit to update chapter-wide
 * information (name, contact, social links, headline stats, etc.). Nothing
 * here should be duplicated elsewhere in the codebase.
 */

export const siteConfig = {
  organization: "Alpha Sigma Phi",
  chapter: "Theta Tau Chapter",
  university: "Quinnipiac University",
  shortName: "Alpha Sig",

  /** Used in metadata, headers and the footer. */
  title: "Alpha Sigma Phi – Theta Tau | Quinnipiac University",
  tagline: "Building Better Men Through Brotherhood, Leadership, and Service.",
  description:
    "The Theta Tau Chapter of Alpha Sigma Phi at Quinnipiac University — a brotherhood committed to character, leadership, scholarship, and service.",

  /** Absolute base URL for SEO/OpenGraph. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alphasig-thetatau.example.com",

  contactEmail: "fsl@quinnipiac.edu",

  /** Motto pairing shown throughout the site. */
  values: ["Silence, Charity, Purity, Honor, Patriotism"],

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/alphasigs_qu/?hl=en", handle: "@alphasig_qu" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61589540944048", handle: "Alpha Sigma Phi - Theta Tau" },
    { label: "LinkedIn", href: "https://linkedin.com/", handle: "Contact us Regarding Professional Opportunities" },
    { label: "Email", href: "mailto:fsl@quinnipiac.edu", handle: "Contact FSL" },
  ],

  /**
   * Headline statistics shown on the homepage. Configurable so officers can
   * update them each semester without touching component code.
   */
  stats: [
    { label: "Active Brothers", value: "42" },
    { label: "Chapter Founded", value: "2016" },
    { label: "Years at Quinnipiac", value: "9" },
    { label: "Events This Semester", value: "TBD" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
