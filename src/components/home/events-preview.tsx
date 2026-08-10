import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCard } from "@/components/events/event-card";
import { getUpcomingEvents } from "@/lib/events";

export async function EventsPreview() {
  const events = await getUpcomingEvents(3);
  if (events.length === 0) return null;

  return (
    <section className="bg-stone-50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What's Happening"
            title="Upcoming Events"
            description="From brotherhood nights to service mornings — here's what's next on the Theta Tau calendar."
          />
          <Button href="/events" variant="outline" className="shrink-0">
            View Full Calendar
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}
