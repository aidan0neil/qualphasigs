"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/events/event-card";
import type { ChapterEvent, EventCategory } from "@/lib/types";
import { cn, eventCategoryStyles, formatLongDate } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function startOfDay(iso: string) {
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Every calendar day (YYYY-MM-DD) an event covers, inclusive. */
function eventDayKeys(event: ChapterEvent): string[] {
  const start = startOfDay(event.startDate);
  const end = startOfDay(event.endDate ?? event.startDate);
  const keys: string[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    keys.push(ymd(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}

export function EventCalendar({ events }: { events: ChapterEvent[] }) {
  const earliest = events[0]?.startDate;
  const [cursorMonth, setCursorMonth] = useState(() => {
    const base = earliest ? new Date(earliest) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [selected, setSelected] = useState<string | null>(earliest ? ymd(new Date(earliest)) : null);

  // Map every day key → events on that day.
  const eventsByDay = useMemo(() => {
    const map = new Map<string, ChapterEvent[]>();
    for (const event of events) {
      for (const key of eventDayKeys(event)) {
        const list = map.get(key) ?? [];
        list.push(event);
        map.set(key, list);
      }
    }
    return map;
  }, [events]);

  // Build the 6x7 grid for the visible month.
  const cells = useMemo(() => {
    const year = cursorMonth.getFullYear();
    const month = cursorMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const gridStart = new Date(firstDay);
    gridStart.setDate(1 - firstDay.getDay()); // back up to Sunday

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);
      return {
        date,
        key: ymd(date),
        inMonth: date.getMonth() === month,
      };
    });
  }, [cursorMonth]);

  const categoriesPresent = useMemo(() => {
    const set = new Set<EventCategory>();
    events.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, [events]);

  const todayKey = ymd(new Date());
  const selectedEvents = selected ? eventsByDay.get(selected) ?? [] : [];
  const monthLabel = cursorMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  function shiftMonth(delta: number) {
    setCursorMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Calendar grid */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-card sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-navy-900" aria-live="polite">
            {monthLabel}
          </h3>
          <div className="flex items-center gap-1">
            <NavBtn label="Previous month" onClick={() => shiftMonth(-1)} dir="left" />
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                setCursorMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                setSelected(ymd(now));
              }}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-navy-700 hover:bg-stone-100"
            >
              Today
            </button>
            <NavBtn label="Next month" onClick={() => shiftMonth(1)} dir="right" />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1 text-xs font-semibold uppercase tracking-wide text-stone-400">
              <span className="hidden sm:inline">{d}</span>
              <span className="sm:hidden">{d.charAt(0)}</span>
            </div>
          ))}

          {cells.map(({ date, key, inMonth }) => {
            const dayEvents = eventsByDay.get(key) ?? [];
            const isSelected = key === selected;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                aria-pressed={isSelected}
                aria-label={`${formatLongDate(date.toISOString())}${
                  dayEvents.length ? `, ${dayEvents.length} event(s)` : ", no events"
                }`}
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-start rounded-lg p-1 text-sm transition-colors sm:p-1.5",
                  inMonth ? "text-navy-900" : "text-stone-300",
                  isSelected
                    ? "bg-navy-900 text-white"
                    : dayEvents.length
                      ? "hover:bg-stone-100"
                      : "hover:bg-stone-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium sm:text-sm",
                    isToday && !isSelected && "bg-cardinal-100 text-cardinal-700",
                  )}
                >
                  {date.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="mt-auto flex flex-wrap items-center justify-center gap-0.5 pb-0.5">
                    {dayEvents.slice(0, 3).map((e, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isSelected ? "bg-white" : eventCategoryStyles[e.category].dot,
                        )}
                      />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        {categoriesPresent.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-100 pt-4">
            {categoriesPresent.map((cat) => (
              <span key={cat} className="flex items-center gap-1.5 text-xs text-stone-600">
                <span className={cn("h-2 w-2 rounded-full", eventCategoryStyles[cat].dot)} />
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Selected-day detail */}
      <div>
        <h3 className="font-serif text-lg font-semibold text-navy-900">
          {selected ? formatLongDate(`${selected}T00:00:00`) : "Select a date"}
        </h3>
        <div className="mt-4 space-y-4">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 p-6 text-center">
              <Badge className="bg-stone-100 text-stone-600 ring-stone-200">No events</Badge>
              <p className="mt-2 text-sm text-stone-500">
                Nothing scheduled for this day. Pick another date on the calendar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavBtn({
  label,
  onClick,
  dir,
}: {
  label: string;
  onClick: () => void;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-navy-700 hover:bg-stone-100"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
