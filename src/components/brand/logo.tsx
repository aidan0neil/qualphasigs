import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Original crest mark — an abstract shield with the chapter's Greek letters.
 * Intentionally NOT a copy of Alpha Sigma Phi's official coat of arms.
 */
export function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 44"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Alpha Sigma Phi crest"
    >
      <path
        d="M20 1.5 37.5 7v13.5c0 10.7-7.2 18.5-17.5 22C9.7 39 2.5 31.2 2.5 20.5V7L20 1.5Z"
        className="fill-navy-900"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 5 34 9.4v10.9c0 8.7-5.8 15.1-14 18.1-8.2-3-14-9.4-14-18.1V9.4L20 5Z"
        className="fill-none stroke-cardinal-500"
        strokeWidth="1"
        opacity="0.6"
      />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        className="fill-stone-100 font-serif"
        style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.5px" }}
      >
        ΑΣΦ
      </text>
    </svg>
  );
}

/** Crest + wordmark lockup used in the header and footer. */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.organization} ${siteConfig.chapter} — home`}
    >
      <Crest className={cn("h-9 w-auto", onDark ? "text-white" : "text-navy-900")} />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-serif text-[15px] font-semibold tracking-tight",
            onDark ? "text-white" : "text-navy-900",
          )}
        >
          Alpha Sigma Phi
        </span>
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.18em]",
            onDark ? "text-cardinal-300" : "text-cardinal-700",
          )}
        >
          Theta Tau Chapter
        </span>
      </span>
    </Link>
  );
}
