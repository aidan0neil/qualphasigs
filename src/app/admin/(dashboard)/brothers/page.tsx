import { AdminPageTitle, AdminCard, DataSourceNote } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { getAllBrothers, rosterSourcedFromSheet } from "@/lib/roster";

export const dynamic = "force-dynamic";

export default async function AdminBrothersPage() {
  const brothers = await getAllBrothers();
  const active = brothers.filter((b) => b.isActive);
  const inactive = brothers.filter((b) => !b.isActive);
  const fromSheet = rosterSourcedFromSheet();

  return (
    <>
      <AdminPageTitle
        title="Brothers"
        description={`${active.length} active · ${inactive.length} inactive`}
      />

      <div className="mb-6">
        {fromSheet ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-medium">Synced from Google Sheet</p>
            <p className="mt-1 text-emerald-800">
              The roster is pulled live from the chapter&apos;s published Google Sheet (refreshed
              about hourly). To update a brother, edit the sheet — or have brothers submit the linked
              Google Form. Mark someone <code>Active = no</code> to hide them, and set{" "}
              <code>Executive Board = yes</code> to add them to the exec board.
            </p>
          </div>
        ) : (
          <DataSourceNote file="src/data/brothers.ts">
            The roster is managed in code so it&apos;s version-controlled and easy to review. Add,
            edit, deactivate, or reorder brothers by editing the array (set{" "}
            <code>isActive: false</code> to hide someone, <code>isExecutiveBoard: true</code> to add
            them to the exec board). Connect a published Google Sheet via{" "}
            <code>GOOGLE_SHEET_CSV_URL</code> to sync automatically instead.
          </DataSourceNote>
        )}
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                <th scope="col" className="py-2.5 pr-4 font-semibold">Name</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Class</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Major</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Position</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {brothers.map((b) => (
                <tr key={b.id}>
                  <td className="py-2.5 pr-4 font-medium text-navy-900">
                    {b.firstName} {b.lastName}
                  </td>
                  <td className="py-2.5 pr-4 text-stone-600">{b.classYear}</td>
                  <td className="py-2.5 pr-4 text-stone-600">{b.major ?? "—"}</td>
                  <td className="py-2.5 pr-4">
                    {b.position ? (
                      <Badge className="bg-cardinal-50 text-cardinal-700 ring-cardinal-200">
                        {b.position}
                      </Badge>
                    ) : (
                      <span className="text-stone-400">Member</span>
                    )}
                  </td>
                  <td className="py-2.5 pr-4">
                    {b.isActive ? (
                      <Badge className="bg-emerald-50 text-emerald-700 ring-emerald-200">Active</Badge>
                    ) : (
                      <Badge className="bg-stone-100 text-stone-600 ring-stone-200">Inactive</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </>
  );
}
