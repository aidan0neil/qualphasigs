import { cn } from "@/lib/utils";

/** Centered, max-width page container with responsive gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}
