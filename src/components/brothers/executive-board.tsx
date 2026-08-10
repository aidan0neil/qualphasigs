import { BrotherCard } from "@/components/brothers/brother-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Brother } from "@/lib/types";

export function ExecutiveBoard({ members }: { members: Brother[] }) {
  if (members.length === 0) return null;

  return (
    <section aria-labelledby="exec-board-heading">
      <SectionHeading
        eyebrow="Chapter Leadership"
        title="Executive Board"
        description="The elected officers who lead Theta Tau and keep our chapter moving forward."
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <BrotherCard key={member.id} brother={member} featured />
        ))}
      </div>
    </section>
  );
}
