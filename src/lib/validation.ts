import { z } from "zod";
import { POTLUCK_CATEGORIES } from "@/lib/types";

/** Server-side validation schema for a potluck sign-up submission. */
export const potluckSignupSchema = z.object({
  familyName: z
    .string()
    .trim()
    .min(2, "Please enter a family or parent name.")
    .max(80, "That name is too long."),
  brotherName: z
    .string()
    .trim()
    .min(2, "Please enter the brother's name.")
    .max(80, "That name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  item: z
    .string()
    .trim()
    .min(2, "Let us know what you're bringing.")
    .max(100, "That description is too long."),
  category: z.enum(POTLUCK_CATEGORIES, { message: "Please choose a category." }),
  servings: z.coerce
    .number()
    .int("Enter a whole number of servings.")
    .min(1, "Servings must be at least 1.")
    .max(500, "That's a lot of servings — please double-check."),
  notes: z.string().trim().max(300, "Notes are too long.").optional(),
});

export type PotluckFieldErrors = Partial<
  Record<keyof z.infer<typeof potluckSignupSchema>, string[]>
>;
