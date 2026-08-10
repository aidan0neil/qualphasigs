/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Newsletter } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

/**
 * Newsletter presentation. `variant="preview"` is the compact homepage card;
 * `variant="full"` is the prominent treatment on the /newsletter page.
 */
export function NewsletterCard({
  newsletter,
  variant = "preview",
}: {
  newsletter: Newsletter;
  variant?: "preview" | "full";
}) {
  const full = variant === "full";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-card",
        full && "shadow-card-hover",
      )}
    >
      <div className={cn("grid gap-0", full && "md:grid-cols-2")}>
        {/* Cover */}
        <div
          className={cn(
            "relative flex items-center justify-center bg-crest-pattern bg-gradient-to-br from-navy-900 to-navy-950 p-8",
            full ? "min-h-[260px] md:min-h-[360px]" : "min-h-[160px]",
          )}
        >
          {newsletter.thumbnailUrl ? (
            <img
              src={newsletter.thumbnailUrl}
              alt={`${newsletter.title} cover`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="text-center text-stone-200">
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-cardinal-300">
                Chapter Newsletter
              </p>
              <p className="mt-3 font-serif text-2xl font-semibold text-white">The Talisman</p>
              <p className="mt-1 text-sm text-navy-300">Theta Tau Chapter</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className={cn("flex flex-col p-6", full && "p-8")}>
          <Badge className="w-fit bg-cardinal-50 text-cardinal-700 ring-cardinal-200">
            Latest Edition
          </Badge>
          <h3
            className={cn(
              "mt-3 font-serif font-semibold text-navy-900",
              full ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {newsletter.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">
            Published {formatDate(newsletter.publishedDate)}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">
            {newsletter.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={newsletter.url} variant="primary">
              Read Newsletter
            </Button>
            <Button href={newsletter.url} variant="outline">
              Open in New Tab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
