"use server";

import { redirect } from "next/navigation";
import { createSession, verifyPassword } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { error: "Incorrect password. Please try again." };
  }
  createSession();
  redirect("/admin");
}
