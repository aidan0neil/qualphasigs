import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cardinal-600";

const variants: Record<Variant, string> = {
  primary: "bg-cardinal-700 text-white hover:bg-cardinal-800",
  secondary: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-navy-200 bg-white text-navy-900 hover:bg-stone-50",
  ghost: "text-navy-800 hover:bg-stone-100",
  // For use on dark hero/footer backgrounds.
  onDark: "border border-white/25 bg-white/10 text-white hover:bg-white/20 backdrop-blur",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * Polymorphic button: renders a real `<button>` unless `href` is provided, in
 * which case it renders a Next `<Link>` (internal) or `<a>` (external) styled
 * identically.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = buttonClasses(variant, size, className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
