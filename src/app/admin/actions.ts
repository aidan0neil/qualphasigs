"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { destroySession, isAdmin } from "@/lib/auth";
import { deletePotluckSignup, setFeatureOverride } from "@/lib/store";
import { runtimeToggleableFeatures, type FeatureKey } from "@/config/features";

/** Sign the current admin out. */
export async function logoutAction(): Promise<void> {
  destroySession();
  redirect("/admin/login");
}

/** Toggle a runtime-toggleable feature flag (e.g. potluck) on/off. */
export async function setFeatureAction(key: FeatureKey, value: boolean): Promise<void> {
  if (!isAdmin()) redirect("/admin/login");
  if (!runtimeToggleableFeatures.includes(key)) {
    throw new Error(`Feature "${key}" is not runtime-toggleable.`);
  }
  await setFeatureOverride(key, value);
  revalidatePath("/", "layout"); // nav + homepage reflect the change everywhere
  revalidatePath("/admin");
}

/** Delete a potluck sign-up. */
export async function deleteSignupAction(id: string): Promise<void> {
  if (!isAdmin()) redirect("/admin/login");
  await deletePotluckSignup(id);
  revalidatePath("/admin/potluck");
  revalidatePath("/potluck");
}
