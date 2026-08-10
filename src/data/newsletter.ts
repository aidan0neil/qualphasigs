import type { Newsletter } from "@/lib/types";

/**
 * The chapter's current newsletter — the SINGLE source of truth.
 *
 * Both the homepage "Latest Newsletter" preview and the /newsletter page read
 * from here. To publish a new edition, update these fields (and optionally set
 * `NEXT_PUBLIC_NEWSLETTER_URL` to override the link per-deployment).
 */
export const currentNewsletter: Newsletter = {
  title: "The Talisman — Fall 2026 Edition",
  publishedDate: "2026-08-01",
  description:
    "Our welcome-back issue: meet the new executive board, recap a record-breaking service year, preview fall recruitment, and hear from our alumni network.",
  url: process.env.NEXT_PUBLIC_NEWSLETTER_URL ?? "https://example.com/newsletters/fall-2026.pdf",
};
