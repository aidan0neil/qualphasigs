import { AdminPageTitle, AdminCard, DataSourceNote } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { getAllEvents, eventsSourcedFromCalendar } from "@/lib/events";
import { eventCategoryStyles, formatDate, formatTimeRange } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await getAllEvents();
  const fromCalendar = eventsSourcedFromCalendar();

  return (
    <>
      <AdminPageTitle title="Events" description={`${events.length} events shown`} />

      <div className="mb-6">
        {fromCalendar ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-medium">Synced from Google Calendar</p>
            <p className="mt-1 text-emerald-800">
              These events are pulled live from the chapter&apos;s Google Calendar iCal feed
              (recurring events expanded automatically). To change an event, edit it in Google
              Calendar — updates appear here within about an hour. Categories are inferred from each
              event&apos;s title; add a tag like <code>#philanthropy</code> or <code>[Social]</code>{" "}
              to set one explicitly.
            </p>
          </div>
        ) : (
          <DataSourceNote file="src/data/events.ts">
            Add, edit, or remove events by editing the array. Set <code>isPublic: false</code> to
            keep an event off the public calendar while still tracking it here. Categories drive the
            color coding on the calendar. (Connect a Google Calendar via{" "}
            <code>GOOGLE_CALENDAR_ICS_URL</code> to sync automatically instead.)
          </DataSourceNote>
        )}
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                <th scope="col" className="py-2.5 pr-4 font-semibold">Event</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Date</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Time</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Category</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="py-2.5 pr-4">
                    <p className="font-medium text-navy-900">{e.title}</p>
                    {e.location && <p className="text-xs text-stone-500">{e.location}</p>}
                  </td>
                  <td className="py-2.5 pr-4 text-stone-600">{formatDate(e.startDate)}</td>
                  <td className="py-2.5 pr-4 text-stone-600">
                    {formatTimeRange(e.startDate, e.endDate)}
                  </td>
                  <td className="py-2.5 pr-4">
                    <Badge className={eventCategoryStyles[e.category].badge}>{e.category}</Badge>
                  </td>
                  <td className="py-2.5 pr-4">
                    {e.isPublic ? (
                      <Badge className="bg-emerald-50 text-emerald-700 ring-emerald-200">Public</Badge>
                    ) : (
                      <Badge className="bg-stone-100 text-stone-600 ring-stone-200">Private</Badge>
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
