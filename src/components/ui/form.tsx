import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-navy-900 shadow-sm placeholder:text-stone-400 focus:border-cardinal-500 focus:outline-none focus:ring-2 focus:ring-cardinal-500/30 disabled:opacity-60";

export function Label({
  htmlFor,
  children,
  required,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-navy-800", className)}>
      {children}
      {required && (
        <span className="ml-0.5 text-cardinal-700" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-[96px] resize-y", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "appearance-none bg-white pr-9", className)} {...props}>
      {children}
    </select>
  );
}

/** Label + control + optional hint/error, wired for accessibility. */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-xs text-stone-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs font-medium text-cardinal-700">
          {error}
        </p>
      )}
    </div>
  );
}
