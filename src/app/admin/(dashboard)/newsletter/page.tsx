import { AdminPageTitle, AdminCard, DataSourceNote } from "@/components/admin/admin-ui";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { getCurrentNewsletter } from "@/lib/data";

export default function AdminNewsletterPage() {
  const newsletter = getCurrentNewsletter();

  return (
    <>
      <AdminPageTitle
        title="Newsletter"
        description="The current edition shown on the homepage and Newsletter page."
      />

      <div className="mb-6">
        <DataSourceNote file="src/data/newsletter.ts">
          The newsletter lives in one place. Update the title, date, description, and link there and
          both the homepage preview and the Newsletter page update together. You can also override
          just the link per-deployment with the <code>NEXT_PUBLIC_NEWSLETTER_URL</code> environment
          variable.
        </DataSourceNote>
      </div>

      <AdminCard title="Current Newsletter">
        <dl className="mb-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Title</dt>
            <dd className="mt-0.5 font-medium text-navy-900">{newsletter.title}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Published</dt>
            <dd className="mt-0.5 font-medium text-navy-900">{newsletter.publishedDate}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Link</dt>
            <dd className="mt-0.5 break-all font-mono text-xs text-navy-800">{newsletter.url}</dd>
          </div>
        </dl>
        <div className="max-w-xl">
          <NewsletterCard newsletter={newsletter} variant="preview" />
        </div>
      </AdminCard>
    </>
  );
}
