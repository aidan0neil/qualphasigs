import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Layered background: gradient wash + subtle texture. A real chapter
          photo can be dropped in as a background image here later. */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black" />
      <div className="absolute inset-0 bg-crest-pattern opacity-70" />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cardinal-700/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-navy-500/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cardinal-300 backdrop-blur">
            {siteConfig.university}
          </p>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Alpha Sigma Phi
            <span className="mt-2 block text-2xl font-normal text-navy-200 sm:text-3xl lg:text-4xl">
              Theta Tau Chapter
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">
            {siteConfig.tagline} We are a brotherhood at {siteConfig.university} committed to
            character, scholarship, and service.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/brothers" size="lg" variant="primary">
              Meet the Brothers
            </Button>
            <Button href="/events" size="lg" variant="onDark">
              Upcoming Events
            </Button>
          </div>

          {/* Values */}
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {siteConfig.values.map((value) => (
              <li key={value} className="flex items-center gap-2 text-sm text-navy-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cardinal-500" aria-hidden="true" />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
