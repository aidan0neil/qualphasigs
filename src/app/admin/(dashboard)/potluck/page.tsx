import { AdminPageTitle, AdminCard, StatCard } from "@/components/admin/admin-ui";
import { FeatureToggle } from "@/components/admin/feature-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { deleteSignupAction } from "@/app/admin/actions";
import { getPotluckSignups } from "@/lib/store";
import { getFeatures } from "@/lib/features";
import { totalServings } from "@/lib/potluck-summary";
import { formatDate } from "@/lib/utils";

export default async function AdminPotluckPage() {
  const [signups, features] = await Promise.all([getPotluckSignups(), getFeatures()]);

  return (
    <>
      <AdminPageTitle
        title="Potluck Sign-Ups"
        description="View, manage, and export Welcome Week Potluck contributions."
        action={
          <a href="/admin/potluck/export" className={buttonClasses("outline", "sm")}>
            Export CSV
          </a>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Sign-Ups" value={signups.length} />
        <StatCard label="Total Servings" value={totalServings(signups)} />
        <StatCard
          label="Families"
          value={new Set(signups.map((s) => s.familyName.toLowerCase())).size}
        />
      </div>

      <div className="mb-6">
        <FeatureToggle
          featureKey="potluck"
          enabled={features.potluck}
          label="Potluck Feature"
          description="When off, the Potluck page 404s and its nav link + homepage banner disappear."
        />
      </div>

      <AdminCard title="All Sign-Ups">
        {signups.length === 0 ? (
          <p className="py-8 text-center text-sm text-stone-500">No sign-ups yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Family</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Brother</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Email</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Bringing</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Category</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Serves</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Added</th>
                  <th scope="col" className="py-2.5 pr-2 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {signups.map((s) => (
                  <tr key={s.id} className="align-top">
                    <td className="py-3 pr-4 font-medium text-navy-900">{s.familyName}</td>
                    <td className="py-3 pr-4 text-stone-600">{s.brotherName}</td>
                    <td className="py-3 pr-4">
                      <a href={`mailto:${s.email}`} className="text-cardinal-700 hover:underline">
                        {s.email}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-stone-700">
                      {s.item}
                      {s.notes && <p className="mt-0.5 text-xs text-stone-400">{s.notes}</p>}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge className="bg-stone-100 text-stone-700 ring-stone-200">{s.category}</Badge>
                    </td>
                    <td className="py-3 pr-4 tabular-nums text-stone-700">{s.servings}</td>
                    <td className="py-3 pr-4 text-stone-500">{formatDate(s.createdAt)}</td>
                    <td className="py-3 pr-2 text-right">
                      <form action={deleteSignupAction.bind(null, s.id)}>
                        <button
                          type="submit"
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-cardinal-700 hover:bg-cardinal-50"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </>
  );
}
