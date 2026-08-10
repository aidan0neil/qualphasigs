import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

/** Configurable headline statistics (see siteConfig.stats). */
export function StatsSection() {
  return (
    <section className="border-y border-navy-800 bg-navy-950 text-white">
      <Container className="py-12 sm:py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="order-2 mt-1 text-sm font-medium uppercase tracking-wide text-navy-300">
                {stat.label}
              </dt>
              <dd className="order-1 font-serif text-4xl font-semibold text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
