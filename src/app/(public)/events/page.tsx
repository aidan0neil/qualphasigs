import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCalendar } from "@/components/events/event-calendar";
import { EventCard } from "@/components/events/event-card";
import { getPublicEvents, getUpcomingEvents } from "@/lib/events";
import { isFeatureEnabled } from "@/lib/features";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events for the Theta Tau Chapter of Alpha Sigma Phi — brotherhood, recruitment, philanthropy, and more.",
};

export default async function EventsPage() {
  if (!(await isFeatureEnabled("events"))) notFound();

  const [allEvents, upcoming] = await Promise.all([getPublicEvents(), getUpcomingEvents()]);

  return (
    <>
      <PageHeader
        eyebrow="Chapter Calendar"
        title="Events"
        description="See what's coming up at Theta Tau. Tap any date to view that day's events."
      />

      <Container className="py-16 sm:py-20">
        <EventCalendar events={allEvents} />

        <div className="mt-16">
          <SectionHeading
            eyebrow="Don't Miss Out"
            title="Upcoming Events"
            description="The next events on our calendar, in order."
          />
          {upcoming.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-stone-300 py-12 text-center text-stone-500">
              No upcoming events are scheduled right now. Check back soon.
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
