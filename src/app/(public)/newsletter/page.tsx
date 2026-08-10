import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { getCurrentNewsletter } from "@/lib/data";
import { isFeatureEnabled } from "@/lib/features";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Read the latest newsletter from the Theta Tau Chapter of Alpha Sigma Phi at Quinnipiac University.",
};

export default async function NewsletterPage() {
  if (!(await isFeatureEnabled("newsletter"))) notFound();

  const newsletter = getCurrentNewsletter();

  return (
    <>
      <PageHeader
        eyebrow="The Phoenix"
        title="Chapter Newsletter"
        description="Our latest edition — chapter news, brother spotlights, and what's ahead for Theta Tau."
      />

      <Container className="py-16 sm:py-20">
        <NewsletterCard newsletter={newsletter} variant="full" />

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Looking for past editions?</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            An archive of previous newsletters is coming soon. In the meantime, reach out to the
            chapter to request a back issue.
          </p>
        </div>
      </Container>
    </>
  );
}
