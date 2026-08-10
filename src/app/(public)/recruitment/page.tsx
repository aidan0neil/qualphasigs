import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/events/event-card";
import { isFeatureEnabled } from "@/lib/features";
import { getUpcomingEvents } from "@/lib/events";
import { recruitmentConfig } from "@/config/recruitment";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "Interested in joining Alpha Sigma Phi? See upcoming recruitment events and the forms new members complete to join the Theta Tau Chapter.",
};

export default async function RecruitmentPage() {
  if (!(await isFeatureEnabled("recruitment"))) notFound();

  // Pull recruitment-category events straight from the events source (which is
  // the Google Calendar feed when configured, otherwise the static file).
  const recruitmentEvents = (await getUpcomingEvents()).filter(
    (e) => e.category === "Recruitment",
  );

  const { headline, intro, steps, forms, interestFormUrl, interestFormLabel } = recruitmentConfig;

  return (
    <>
      <PageHeader eyebrow="Rush Alpha Sig" title={headline} description={intro} />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Left: how it works + events */}
          <div>
            <SectionHeading eyebrow="The Process" title="How recruitment works" />
            <ol className="mt-6 space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cardinal-700 text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-stone-700">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <SectionHeading
                eyebrow="Mark Your Calendar"
                title="Upcoming Recruitment Events"
                description="These events sync from the chapter calendar — check back for new dates."
              />
              {recruitmentEvents.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {recruitmentEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-stone-300 p-8 text-center">
                  <p className="text-stone-600">
                    No recruitment events are scheduled right now.
                  </p>
                  <Button href="/events" variant="outline" className="mt-4">
                    View Full Calendar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right: required forms + contact */}
          <aside className="lg:pt-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-7">
              <h2 className="font-serif text-xl font-semibold text-navy-900">
                Forms for New Members
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Once you accept a bid, complete these IFC and chapter forms to finish joining.
              </p>

              <ul className="mt-6 space-y-4">
                {forms.map((form) => (
                  <li
                    key={form.title}
                    className="rounded-xl border border-stone-200 p-4 transition-colors hover:border-cardinal-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium text-navy-900">{form.title}</h3>
                      {form.required && (
                        <Badge className="shrink-0 bg-cardinal-50 text-cardinal-700 ring-cardinal-200">
                          Required
                        </Badge>
                      )}
                    </div>
                    {form.description && (
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">
                        {form.description}
                      </p>
                    )}
                    <div className="mt-3">
                      {form.url ? (
                        <Button href={form.url} variant="outline" size="sm">
                          Open Form
                        </Button>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-500">
                          Link coming soon
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-6 rounded-2xl bg-navy-950 p-6 text-center text-white sm:p-7">
              <h2 className="font-serif text-lg font-semibold">Have questions?</h2>
              <p className="mt-2 text-sm text-navy-200">
                Reach out and our Recruitment Chairman will get back to you.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {interestFormUrl && (
                  <Button href={interestFormUrl} variant="primary">
                    {interestFormLabel}
                  </Button>
                )}
                <Button href={`mailto:${siteConfig.contactEmail}`} variant="onDark">
                  Contact the Chapter
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
