import { cn } from "@/lib/utils";

/** Small pill label. Pass category color classes via `className`. */
export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        className,
      )}
    >
      {children}
    </span>
  );
}
