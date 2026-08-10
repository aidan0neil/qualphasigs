"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { buttonClasses } from "@/components/ui/button";
import { POTLUCK_CATEGORIES } from "@/lib/types";
import { submitPotluckSignup, type PotluckFormState } from "@/app/(public)/potluck/actions";

const initialState: PotluckFormState = { status: "idle" };

export function PotluckForm() {
  const [state, formAction] = useFormState(submitPotluckSignup, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful submission.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const err = state.errors ?? {};

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:p-8">
      {state.status === "success" ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center" role="status">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">You&apos;re signed up!</h3>
          <p className="mt-2 text-sm text-stone-600">{state.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={buttonClasses("outline", "md", "mt-6")}
          >
            Add Another Dish
          </button>
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="space-y-5" noValidate>
          <h2 className="font-serif text-xl font-semibold text-navy-900">Sign Up to Contribute</h2>

          {state.status === "error" && state.message && (
            <p className="rounded-lg border border-cardinal-200 bg-cardinal-50 px-4 py-3 text-sm font-medium text-cardinal-800" role="alert">
              {state.message}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Parent / Family Name" htmlFor="familyName" required error={err.familyName?.[0]}>
              <Input id="familyName" name="familyName" placeholder="Smith Family" autoComplete="name" required />
            </Field>
            <Field label="Brother's Name" htmlFor="brotherName" required error={err.brotherName?.[0]}>
              <Input id="brotherName" name="brotherName" placeholder="Owen Blake" required />
            </Field>
          </div>

          <Field
            label="Email"
            htmlFor="email"
            required
            hint="Only chapter admins see your email — it is never shown publicly."
            error={err.email?.[0]}
          >
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </Field>

          <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
            <Field label="What are you bringing?" htmlFor="item" required error={err.item?.[0]}>
              <Input id="item" name="item" placeholder="Pasta Salad" required />
            </Field>
            <Field label="Servings" htmlFor="servings" required error={err.servings?.[0]}>
              <Input id="servings" name="servings" type="number" min={1} max={500} placeholder="15" required />
            </Field>
          </div>

          <Field label="Category" htmlFor="category" required error={err.category?.[0]}>
            <Select id="category" name="category" defaultValue="" required>
              <option value="" disabled>
                Choose a category…
              </option>
              {POTLUCK_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Notes (optional)" htmlFor="notes" error={err.notes?.[0]}>
            <Textarea id="notes" name="notes" placeholder="Contains nuts, will bring a serving spoon, etc." />
          </Field>

          <SubmitButton />
        </form>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full")}>
      {pending ? "Submitting…" : "Submit Sign-Up"}
    </button>
  );
}
