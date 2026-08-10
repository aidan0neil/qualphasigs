import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Brother } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Brother card. `featured` renders the larger executive-board treatment with
 * position + bio; the compact variant is used in the general roster grid.
 */
export function BrotherCard({
  brother,
  featured = false,
}: {
  brother: Brother;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
        <Avatar
          firstName={brother.firstName}
          lastName={brother.lastName}
          imageUrl={brother.imageUrl}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {brother.position && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-3">
            <Badge className="border-0 bg-cardinal-700 text-white ring-0">
              {brother.position}
            </Badge>
          </div>
        )}
      </div>

      <div className={cn("p-4", featured && "p-5")}>
        <h3 className="font-serif text-lg font-semibold text-navy-900">
          {brother.firstName} {brother.lastName}
        </h3>
        <p className="mt-0.5 text-sm text-stone-600">
          Class of {brother.classYear}
          {brother.major ? ` · ${brother.major}` : ""}
        </p>
        {featured && brother.bio && (
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{brother.bio}</p>
        )}
      </div>
    </article>
  );
}
