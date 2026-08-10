import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Homepage call-out for the Welcome Week Potluck. Rendered inside a
 * <FeatureGate feature="potluck"> so it only appears when the feature is on.
 */
export function PotluckBanner() {
  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cardinal-700 to-cardinal-900 px-6 py-12 text-white shadow-card-hover sm:px-12 sm:py-14">
          <div className="absolute inset-0 bg-crest-pattern opacity-60" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-cardinal-200">
                Parents & Families
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
                Welcome Week Parent Potluck
              </h2>
              <p className="mt-3 text-cardinal-50/90">
                Help us welcome the brothers of Theta Tau back to campus by signing up to bring a
                dish to our Welcome Week Potluck.
              </p>
            </div>
            <Button href="/potluck" size="lg" variant="onDark" className="shrink-0 border-white/40">
              Sign Up to Contribute
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
