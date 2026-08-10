"use server";

import { revalidatePath } from "next/cache";
import { potluckSignupSchema, type PotluckFieldErrors } from "@/lib/validation";
import { addPotluckSignup } from "@/lib/store";
import { isFeatureEnabled } from "@/lib/features";
import { makeId } from "@/lib/utils";
import type { PotluckSignup } from "@/lib/types";

export type PotluckFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: PotluckFieldErrors;
};

/**
 * Server action backing the public potluck sign-up form.
 * Validates on the server (never trust the client) and appends to the store.
 */
export async function submitPotluckSignup(
  _prevState: PotluckFormState,
  formData: FormData,
): Promise<PotluckFormState> {
  // Respect the feature flag on the server, not just in the UI.
  if (!(await isFeatureEnabled("potluck"))) {
    return { status: "error", message: "Potluck sign-ups are currently closed." };
  }

  const parsed = potluckSignupSchema.safeParse({
    familyName: formData.get("familyName"),
    brotherName: formData.get("brotherName"),
    email: formData.get("email"),
    item: formData.get("item"),
    category: formData.get("category"),
    servings: formData.get("servings"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const signup: PotluckSignup = {
    id: makeId("p"),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };

  await addPotluckSignup(signup);
  revalidatePath("/potluck");
  revalidatePath("/admin/potluck");

  return {
    status: "success",
    message: `Thank you, ${parsed.data.familyName}! Your ${parsed.data.item} is on the list.`,
  };
}
