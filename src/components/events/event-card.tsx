import { Badge } from "@/components/ui/badge";
import type { ChapterEvent } from "@/lib/types";
import { cn, eventCategoryStyles, formatDate, formatTimeRange } from "@/lib/utils";

export function EventCard({ event }: { event: ChapterEvent }) {
  const style = eventCategoryStyles[event.category];
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-stone-200 border-l-4 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover",
        style.accent,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-cardinal-700">{formatDate(event.startDate)}</p>
          <h3 className="mt-0.5 font-serif text-lg font-semibold text-navy-900">{event.title}</h3>
        </div>
        <Badge className={cn("shrink-0", style.badge)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} aria-hidden="true" />
          {event.category}
        </Badge>
      </div>

      {event.description && (
        <p className="text-sm leading-relaxed text-stone-600">{event.description}</p>
      )}

      <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-600">
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <dt className="sr-only">Time</dt>
          <dd>{event.allDay ? "All day" : formatTimeRange(event.startDate, event.endDate)}</dd>
        </div>
        {event.location && (
          <div className="flex items-center gap-1.5">
            <PinIcon />
            <dt className="sr-only">Location</dt>
            <dd>{event.location}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-stone-400">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-stone-400">
      <path
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}
