import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Crest } from "@/components/brand/logo";
import { LoginForm } from "@/app/admin/login/login-form";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  // Already signed in? Skip the form.
  if (isAdmin()) redirect("/admin");

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center text-center">
          <Crest className="h-12 w-auto text-navy-900" />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-navy-900">Chapter Admin</h1>
          <p className="mt-1 text-sm text-stone-500">Sign in to manage the chapter website.</p>
        </div>
        <LoginForm />
      </div>
    </Container>
  );
}
