import { cn } from "@/lib/utils";

/** Eyebrow + title + optional description block used above content sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-sm font-semibold uppercase tracking-widest",
            onDark ? "text-cardinal-300" : "text-cardinal-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-3xl font-semibold tracking-tight sm:text-4xl",
          onDark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", onDark ? "text-navy-200" : "text-stone-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
