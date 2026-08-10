/* eslint-disable @next/next/no-img-element */
import { cn, initials } from "@/lib/utils";

/**
 * Brother headshot with a graceful monogram fallback when no image is set.
 * Using a plain <img> (not next/image) keeps the placeholder data portable and
 * avoids remote-image configuration for arbitrary future headshot hosts.
 */
export function Avatar({
  firstName,
  lastName,
  imageUrl,
  className,
}: {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  className?: string;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950 font-serif text-2xl font-semibold text-stone-100",
        className,
      )}
      aria-hidden="true"
    >
      {initials(firstName, lastName)}
    </div>
  );
}
