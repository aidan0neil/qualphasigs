import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getPotluckSignups } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Escape a value for CSV (wrap in quotes, double internal quotes). */
function csv(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** GET /admin/potluck/export → downloads all sign-ups as CSV (admin only). */
export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signups = await getPotluckSignups();
  const header = [
    "Family",
    "Brother",
    "Email",
    "Item",
    "Category",
    "Servings",
    "Notes",
    "Submitted",
  ];
  const rows = signups.map((s) =>
    [s.familyName, s.brotherName, s.email, s.item, s.category, s.servings, s.notes ?? "", s.createdAt]
      .map(csv)
      .join(","),
  );
  const body = [header.join(","), ...rows].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="potluck-signups-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
