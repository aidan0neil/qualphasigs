import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { AboutPreview } from "@/components/home/about-preview";
import { EventsPreview } from "@/components/home/events-preview";
import { NewsletterPreview } from "@/components/home/newsletter-preview";
import { PotluckBanner } from "@/components/home/potluck-banner";
import { FeatureGate } from "@/components/feature-gate";

// Feature flags / potluck override are read at request time from the store.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutPreview />

      <FeatureGate feature="events">
        <EventsPreview />
      </FeatureGate>

      <FeatureGate feature="potluck">
        <PotluckBanner />
      </FeatureGate>

      <FeatureGate feature="newsletter">
        <NewsletterPreview />
      </FeatureGate>
    </>
  );
}
