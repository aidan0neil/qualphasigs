"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crest } from "@/components/brand/logo";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Brothers", href: "/admin/brothers" },
  { label: "Events", href: "/admin/events" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Potluck", href: "/admin/potluck" },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

/** Responsive admin chrome: fixed dark sidebar on desktop, top bar on mobile. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const isActive = useActive();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col bg-navy-950 p-5 lg:flex">
        <Brand />
        <nav aria-label="Admin" className="mt-6 flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <SidebarLink key={link.href} href={link.href} active={isActive(link.href)}>
              {link.label}
            </SidebarLink>
          ))}
        </nav>
        <Footer />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-navy-950 px-4 py-3">
          <Brand />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="admin-mobile-nav"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
          >
            <span className="sr-only">Toggle admin menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {open && (
          <nav id="admin-mobile-nav" aria-label="Admin" className="flex flex-col gap-1 bg-navy-900 px-4 pb-4 pt-2">
            {links.map((link) => (
              <SidebarLink key={link.href} href={link.href} active={isActive(link.href)} onClick={() => setOpen(false)}>
                {link.label}
              </SidebarLink>
            ))}
            <div className="mt-2 border-t border-white/10 pt-2">
              <Footer />
            </div>
          </nav>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-8 sm:px-8 lg:px-10">{children}</div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <Crest className="h-8 w-auto text-white" />
      <div className="leading-tight">
        <p className="font-serif text-sm font-semibold text-white">Chapter Admin</p>
        <p className="text-[11px] uppercase tracking-widest text-cardinal-300">Theta Tau</p>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-white/10 text-white" : "text-navy-300 hover:bg-white/5 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <div className="space-y-1">
      <Link href="/" className="block rounded-lg px-3 py-2 text-sm font-medium text-navy-300 hover:bg-white/5 hover:text-white">
        ← View site
      </Link>
      <form action={logoutAction}>
        <button type="submit" className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-navy-300 hover:bg-white/5 hover:text-white">
          Sign out
        </button>
      </form>
    </div>
  );
}
