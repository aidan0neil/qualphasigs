import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExecutiveBoard } from "@/components/brothers/executive-board";
import { BrothersDirectory } from "@/components/brothers/brothers-directory";
import { getActiveBrothers, getExecutiveBoard } from "@/lib/roster";
import { isFeatureEnabled } from "@/lib/features";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Brothers",
  description:
    "Meet the brothers and executive board of the Theta Tau Chapter of Alpha Sigma Phi at Quinnipiac University.",
};

export default async function BrothersPage() {
  if (!(await isFeatureEnabled("brothers"))) notFound();

  const [exec, allBrothers] = await Promise.all([getExecutiveBoard(), getActiveBrothers()]);

  return (
    <>
      <PageHeader
        eyebrow="Our Members"
        title="Meet the Brothers"
        description="The men of Theta Tau — leaders, scholars, and friends from across Quinnipiac University."
      />

      <Container className="py-16 sm:py-20">
        <ExecutiveBoard members={exec} />

        <div className="mt-16">
          <SectionHeading
            eyebrow="The Full Roster"
            title="Active Brothers"
            description="Browse the full chapter and filter by class year or leadership."
          />
          <div className="mt-8">
            <BrothersDirectory brothers={allBrothers} />
          </div>
        </div>
      </Container>
    </>
  );
}
