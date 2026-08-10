import { Container } from "@/components/ui/container";

/** Dark banner used at the top of interior pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-950" />
      <div className="absolute inset-0 bg-crest-pattern opacity-60" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-cardinal-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-200">{description}</p>
        )}
      </Container>
    </section>
  );
}
