import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { primaryNav } from "@/config/nav";
import { getFeatures } from "@/lib/features";

export async function SiteFooter() {
  const features = await getFeatures();
  const links = primaryNav.filter((item) => !item.feature || features[item.feature]);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="bg-crest-pattern">
        <Container className="py-14">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div className="max-w-sm">
              <Logo onDark />
              <p className="mt-4 text-sm leading-relaxed text-navy-300">
                {siteConfig.chapter} of {siteConfig.organization} at {siteConfig.university}.
                {" "}
                {siteConfig.tagline}
              </p>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white">
                Explore
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-navy-300 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social + contact */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white">
                Connect
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-navy-300 transition-colors hover:text-white"
                    >
                      <span className="font-medium text-navy-200 group-hover:text-white">
                        {social.label}
                      </span>
                      <span className="text-navy-400">·</span>
                      <span>{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-navy-400 sm:flex-row sm:items-center">
            <p>
              © {year} {siteConfig.organization}, {siteConfig.chapter}. All rights reserved.
            </p>
            <p className="text-navy-500">
              An unofficial chapter website · {siteConfig.university}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
