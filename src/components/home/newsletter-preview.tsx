import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { getCurrentNewsletter } from "@/lib/data";

export function NewsletterPreview() {
  const newsletter = getCurrentNewsletter();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Stay Informed"
          title="Latest Chapter Newsletter"
          description="Catch up on chapter news, brother spotlights, and what's ahead."
          align="center"
          className="mb-10"
        />
        <div className="mx-auto max-w-2xl">
          <NewsletterCard newsletter={newsletter} variant="preview" />
        </div>
      </Container>
    </section>
  );
}
