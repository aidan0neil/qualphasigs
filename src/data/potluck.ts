import type { PotluckSignup } from "@/lib/types";

/**
 * Sample potluck sign-ups used to seed the data store on first run so the
 * page looks complete during development. Real sign-ups are appended to the
 * store via the public form; these fictional entries can be deleted from the
 * admin dashboard.
 */
export const seedPotluckSignups: PotluckSignup[] = [
  {
    id: "p-seed-smith",
    familyName: "Smith Family",
    brotherName: "Owen Blake",
    email: "parent-smith@example.com",
    item: "Pasta Salad",
    category: "Side",
    servings: 15,
    createdAt: "2026-08-05T14:02:00",
  },
  {
    id: "p-seed-johnson",
    familyName: "Johnson Family",
    brotherName: "Samuel Hart",
    email: "parent-johnson@example.com",
    item: "Brownies",
    category: "Dessert",
    servings: 20,
    createdAt: "2026-08-06T09:20:00",
  },
  {
    id: "p-seed-nguyen",
    familyName: "Nguyen Family",
    brotherName: "Nathan Cruz",
    email: "parent-nguyen@example.com",
    item: "Grilled Chicken Skewers",
    category: "Main Dish",
    servings: 25,
    notes: "Will bring a warming tray.",
    createdAt: "2026-08-07T18:45:00",
  },
];
