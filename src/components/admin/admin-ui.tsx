import { cn } from "@/lib/utils";

export function AdminPageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-navy-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-stone-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-stone-200 bg-white p-6 shadow-sm", className)}>
      {title && <h2 className="mb-4 font-serif text-lg font-semibold text-navy-900">{title}</h2>}
      {children}
    </section>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-3xl font-semibold text-navy-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-stone-500">{label}</p>
    </div>
  );
}

/** A note explaining how code-managed data is edited (brothers/events/etc.). */
export function DataSourceNote({ file, children }: { file: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
      <p className="font-medium">Editing this content</p>
      <p className="mt-1 text-sky-800">{children}</p>
      <p className="mt-2">
        Source file:{" "}
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-sky-900 ring-1 ring-sky-200">
          {file}
        </code>
      </p>
    </div>
  );
}
