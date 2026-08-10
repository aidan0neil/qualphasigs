import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    title: "Brotherhood",
    body: "Lifelong friendships built on trust, accountability, and a shared commitment to becoming better men.",
  },
  {
    title: "Leadership",
    body: "Officer roles, national programming, and campus involvement that develop real leadership experience.",
  },
  {
    title: "Scholarship",
    body: "Study hours, academic mentorship, and a culture that puts our members' degrees first.",
  },
  {
    title: "Service",
    body: "Chapter and national philanthropy supporting homeless veterans and our local community.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="One of America's oldest fraternities, right here at Quinnipiac"
              description="Founded in 1845, Alpha Sigma Phi is built on the enduring values of the Better Man. The Theta Tau Chapter brings that mission to Quinnipiac University — a group of driven students who challenge and support one another to lead lives of purpose."
            />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
              We are engineers and artists, athletes and scholars, from every corner of campus.
              What unites us is a commitment to brotherhood, leadership, scholarship, and service.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Learn More About Us
              </Button>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-colors hover:border-cardinal-200 hover:bg-white"
              >
                <h3 className="font-serif text-lg font-semibold text-navy-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
