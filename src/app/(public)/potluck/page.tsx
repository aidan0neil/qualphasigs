import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { PotluckForm } from "@/components/potluck/potluck-form";
import { PotluckSignupList } from "@/components/potluck/potluck-signup-list";
import { isFeatureEnabled } from "@/lib/features";
import { getPotluckSignups } from "@/lib/store";
import { siteConfig } from "@/config/site";

// Sign-ups change at request time, and the feature flag is resolved live.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Welcome Week Potluck",
  description:
    "Sign up to bring a dish to the Alpha Sigma Phi Theta Tau Welcome Week Parent Potluck at Quinnipiac University.",
};

export default async function PotluckPage() {
  // Feature flag enforced on the server — when off, the route 404s even if
  // someone navigates to /potluck directly.
  if (!(await isFeatureEnabled("potluck"))) notFound();

  const signups = await getPotluckSignups();

  return (
    <>
      <PageHeader
        eyebrow="Welcome Week · Parents & Families"
        title="Welcome Week Parent Potluck"
        description={`Help us welcome the brothers of ${siteConfig.chapter} back to campus by contributing to our Welcome Week Potluck.`}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left: intro + form */}
          <div>
            <div className="mb-8 space-y-4 text-base leading-relaxed text-stone-600">
              <p>
                Each fall, the families of Theta Tau come together to welcome our brothers back to
                campus with a shared meal. It&apos;s a wonderful way to meet other parents, connect
                with the chapter, and start the year off right.
              </p>
              <p>
                Use the form below to let us know what you&apos;d like to bring. Check the running
                list on the right so we get a good mix of dishes — and see what&apos;s still needed.
              </p>
            </div>
            <PotluckForm />
          </div>

          {/* Right: live summary */}
          <div className="lg:pt-2">
            <PotluckSignupList signups={signups} />
          </div>
        </div>
      </Container>
    </>
  );
}
