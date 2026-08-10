import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Every page in this group requires a valid admin session. */
export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
