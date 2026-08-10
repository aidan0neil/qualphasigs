import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { isFeatureEnabled } from "@/lib/features";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Theta Tau Chapter of Alpha Sigma Phi at Quinnipiac University — our history, values, and mission.",
};

const values = [
  {
    title: "Brotherhood",
    body: "We build genuine, lifelong relationships. Brotherhood means showing up for one another — in the hard moments and the celebrations alike.",
  },
  {
    title: "Leadership",
    body: "Every brother has the chance to lead, whether through an officer role, a committee, or a campus organization. We grow leaders who serve.",
  },
  {
    title: "Scholarship",
    body: "Academics come first. Through study hours, mentorship, and accountability, we help each brother thrive in the classroom.",
  },
  {
    title: "Service",
    body: "We give back through chapter service and Alpha Sigma Phi's national philanthropies, including support for homeless veterans.",
  },
];

export default async function AboutPage() {
  if (!(await isFeatureEnabled("about"))) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Theta Tau"
        description={`The ${siteConfig.chapter} of ${siteConfig.organization} at ${siteConfig.university}.`}
      />

      <Container className="py-16 sm:py-20">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Founded in 1845" title="The Better Man since the beginning" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
              <p>
                Alpha Sigma Phi was founded at Yale University in 1845, making it one of the oldest
                fraternities in the nation. For over 175 years, Alpha Sigma Phi has been dedicated
                to a single, enduring mission: to Better the Man.
              </p>
              <p>
                The Theta Tau Chapter carries that mission to Quinnipiac University. We are a group
                of students from every school and background on campus, united by a commitment to
                brotherhood, leadership, scholarship, and service. We push each other to be better
                students, better friends, and better citizens.
              </p>
              <p>
                Whether it&apos;s a service morning cleaning up our community, a study night in the
                library, or a brotherhood event that turns classmates into lifelong friends, we
                believe the college experience is richer when it&apos;s shared.
              </p>
            </div>
          </div>

          {/* Facts card */}
          <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <h2 className="font-serif text-lg font-semibold text-navy-900">Chapter Facts</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <Fact label="Organization" value={siteConfig.organization} />
              <Fact label="Chapter" value={siteConfig.chapter} />
              <Fact label="University" value={siteConfig.university} />
              <Fact label="National Founding" value="1845 · Yale University" />
              <Fact label="National Philanthropy" value="Homeless Veterans" />
            </dl>
          </aside>
        </div>

        {/* Values */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            align="center"
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-stone-200 bg-white p-7 shadow-card">
                <h3 className="font-serif text-xl font-semibold text-navy-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{value.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-20 overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-center text-white sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">Interested in joining?</h2>
            <p className="mt-4 text-navy-200">
              We recruit driven men who want more from their college experience. Come to a
              recruitment event, meet the brothers, and see if Theta Tau is right for you.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/events" variant="primary" size="lg">
                See Recruitment Events
              </Button>
              <Button href={`mailto:${siteConfig.contactEmail}`} variant="onDark" size="lg">
                Contact the Chapter
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-stone-200 pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</dt>
      <dd className="mt-0.5 font-medium text-navy-900">{value}</dd>
    </div>
  );
}
