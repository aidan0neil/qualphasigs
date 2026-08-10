import { Badge } from "@/components/ui/badge";
import type { PotluckSignup } from "@/lib/types";
import { neededCategories, summarizeByCategory, totalServings } from "@/lib/potluck-summary";

/**
 * Public, privacy-safe view of the current sign-ups.
 * IMPORTANT: never renders email addresses.
 */
export function PotluckSignupList({ signups }: { signups: PotluckSignup[] }) {
  const needed = neededCategories(signups);
  const byCategory = summarizeByCategory(signups).filter((s) => s.count > 0);

  return (
    <div className="space-y-6">
      {/* What's still needed */}
      {needed.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-amber-900">
            <span aria-hidden="true">🍽️</span> Currently needed
          </h3>
          <p className="mt-1 text-sm text-amber-800">
            We could still use help with:{" "}
            <span className="font-semibold">{needed.join(", ")}</span>. Consider signing up for one
            of these!
          </p>
        </div>
      )}

      {/* Category totals */}
      {byCategory.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {byCategory.map((s) => (
            <Badge key={s.category} className="bg-navy-100 text-navy-800 ring-navy-200">
              {s.category}: {s.count} {s.count === 1 ? "item" : "items"} · {s.servings} servings
            </Badge>
          ))}
        </div>
      )}

      {/* Sign-up table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-3">
          <h3 className="font-serif text-lg font-semibold text-navy-900">Current Sign-Ups</h3>
          <span className="text-sm text-stone-500">
            {signups.length} {signups.length === 1 ? "family" : "families"} ·{" "}
            {totalServings(signups)} servings
          </span>
        </div>

        {signups.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-stone-500">
            No sign-ups yet — be the first to contribute!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                  <th scope="col" className="px-5 py-3 font-semibold">Family</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Bringing</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Category</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">Serves</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {signups.map((s) => (
                  <tr key={s.id} className="hover:bg-stone-50">
                    <td className="px-5 py-3 font-medium text-navy-900">{s.familyName}</td>
                    <td className="px-5 py-3 text-stone-700">{s.item}</td>
                    <td className="px-5 py-3">
                      <Badge className="bg-stone-100 text-stone-700 ring-stone-200">{s.category}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums text-stone-700">{s.servings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="text-xs text-stone-400">
        For everyone&apos;s privacy, contact details are never shown here — only the chapter&apos;s
        officers can see them.
      </p>
    </div>
  );
}
