"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Field, Input } from "@/components/ui/form";
import { buttonClasses } from "@/components/ui/button";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

export function LoginForm() {
  const [state, action] = useFormState<LoginState, FormData>(loginAction, {});

  return (
    <form action={action} className="space-y-5">
      {state.error && (
        <p className="rounded-lg border border-cardinal-200 bg-cardinal-50 px-4 py-3 text-sm font-medium text-cardinal-800" role="alert">
          {state.error}
        </p>
      )}
      <Field label="Admin Password" htmlFor="password" required>
        <Input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
      </Field>
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full")}>
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}
