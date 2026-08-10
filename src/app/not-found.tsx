import Link from "next/link";
import { Crest } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6 text-center text-white">
      <Crest className="h-14 w-auto text-white" />
      <p className="mt-8 font-serif text-6xl font-semibold">404</p>
      <h1 className="mt-3 font-serif text-2xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-navy-300">
        The page you&apos;re looking for doesn&apos;t exist or may no longer be available.
      </p>
      <Link href="/" className={buttonClasses("primary", "lg", "mt-8")}>
        Return Home
      </Link>
    </div>
  );
}
