import Link from "next/link";
import { AdminPageTitle, AdminCard, StatCard } from "@/components/admin/admin-ui";
import { FeatureToggle } from "@/components/admin/feature-toggle";
import { getBrotherCount } from "@/lib/roster";
import { getPublicEvents, getUpcomingEvents } from "@/lib/events";
import { getFeatures } from "@/lib/features";
import { getPotluckSignups } from "@/lib/store";
import { runtimeToggleableFeatures } from "@/config/features";

const featureLabels: Record<string, { label: string; description: string }> = {
  potluck: {
    label: "Welcome Week Potluck",
    description: "Shows the Potluck page, nav link, and homepage banner, and opens sign-ups.",
  },
  recruitment: {
    label: "Recruitment Page",
    description: "Shows the Recruitment page and nav link (rush events + new-member forms).",
  },
};

export default async function AdminDashboardPage() {
  const [features, signups, publicEvents, upcomingEvents, brotherCount] = await Promise.all([
    getFeatures(),
    getPotluckSignups(),
    getPublicEvents(),
    getUpcomingEvents(),
    getBrotherCount(),
  ]);

  return (
    <>
      <AdminPageTitle
        title="Dashboard"
        description="Manage the Theta Tau chapter website."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active Brothers" value={brotherCount} />
        <StatCard label="Public Events" value={publicEvents.length} />
        <StatCard label="Upcoming Events" value={upcomingEvents.length} />
        <StatCard label="Potluck Sign-Ups" value={signups.length} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Feature Flags">
          <p className="mb-4 text-sm text-stone-600">
            Toggle optional features on or off. Changes take effect immediately across the site —
            no redeploy needed.
          </p>
          <div className="space-y-3">
            {runtimeToggleableFeatures.map((key) => (
              <FeatureToggle
                key={key}
                featureKey={key}
                enabled={features[key]}
                label={featureLabels[key]?.label ?? key}
                description={featureLabels[key]?.description}
              />
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Quick Links">
          <ul className="space-y-2 text-sm">
            {[
              { href: "/admin/brothers", label: "Manage brothers" },
              { href: "/admin/events", label: "Manage events" },
              { href: "/admin/newsletter", label: "Update newsletter" },
              { href: "/admin/potluck", label: "View potluck sign-ups" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-lg border border-stone-200 px-4 py-3 font-medium text-navy-800 transition-colors hover:border-cardinal-200 hover:bg-stone-50"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
