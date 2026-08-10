"use client";

import { useMemo, useState } from "react";
import { BrotherCard } from "@/components/brothers/brother-card";
import type { Brother } from "@/lib/types";
import { cn } from "@/lib/utils";

type Group = "all" | "exec";

export function BrothersDirectory({ brothers }: { brothers: Brother[] }) {
  const [group, setGroup] = useState<Group>("all");
  const [year, setYear] = useState<number | "all">("all");

  const years = useMemo(
    () => Array.from(new Set(brothers.map((b) => b.classYear))).sort((a, b) => a - b),
    [brothers],
  );

  const filtered = useMemo(() => {
    return brothers.filter((b) => {
      if (group === "exec" && !b.isExecutiveBoard) return false;
      if (year !== "all" && b.classYear !== year) return false;
      return true;
    });
  }, [brothers, group, year]);

  return (
    <div>
      {/* Filter controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter by membership"
          className="inline-flex rounded-lg border border-stone-200 bg-white p-1"
        >
          <FilterButton active={group === "all"} onClick={() => setGroup("all")}>
            All Brothers
          </FilterButton>
          <FilterButton active={group === "exec"} onClick={() => setGroup("exec")}>
            Executive Board
          </FilterButton>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-navy-800">Class of</span>
          <YearChip active={year === "all"} onClick={() => setYear("all")}>
            All
          </YearChip>
          {years.map((y) => (
            <YearChip key={y} active={year === y} onClick={() => setYear(y)}>
              {y}
            </YearChip>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-stone-500" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "brother" : "brothers"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((brother) => (
            <BrotherCard key={brother.id} brother={brother} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-stone-300 py-12 text-center text-stone-500">
          No brothers match these filters.
        </p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-navy-900 text-white" : "text-navy-700 hover:bg-stone-100",
      )}
    >
      {children}
    </button>
  );
}

function YearChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition-colors",
        active
          ? "bg-cardinal-700 text-white ring-cardinal-700"
          : "bg-white text-navy-700 ring-stone-200 hover:bg-stone-100",
      )}
    >
      {children}
    </button>
  );
}
