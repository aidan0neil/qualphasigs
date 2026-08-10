import type { Brother } from "@/lib/types";

/**
 * Placeholder brother directory.
 *
 * All names are FICTIONAL. Replace this array (or back it with a database)
 * to publish the real chapter roster — no component code needs to change.
 *
 * Notes:
 *  - `isExecutiveBoard: true` surfaces the brother in the Executive Board
 *    section and orders them by `displayOrder`.
 *  - Leave `imageUrl` undefined to fall back to a monogram avatar.
 */
export const brothers: Brother[] = [
  // ------------------------------ Executive Board -------------------------
  {
    id: "b-anders-cole",
    firstName: "Anders",
    lastName: "Cole",
    classYear: 2026,
    major: "Finance",
    position: "President",
    bio: "Leads chapter operations and represents Theta Tau to the university and national organization.",
    isExecutiveBoard: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "b-marcus-reed",
    firstName: "Marcus",
    lastName: "Reed",
    classYear: 2026,
    major: "Political Science",
    position: "Vice President",
    bio: "Oversees internal affairs and supports every officer in delivering on the chapter's goals.",
    isExecutiveBoard: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "b-julian-ortiz",
    firstName: "Julian",
    lastName: "Ortiz",
    classYear: 2027,
    major: "Accounting",
    position: "Treasurer",
    bio: "Manages the chapter budget, dues, and financial planning for the semester.",
    isExecutiveBoard: true,
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "b-devin-walsh",
    firstName: "Devin",
    lastName: "Walsh",
    classYear: 2027,
    major: "Communications",
    position: "Secretary",
    bio: "Keeps chapter records, meeting minutes, and coordinates official correspondence.",
    isExecutiveBoard: true,
    isActive: true,
    displayOrder: 4,
  },
  {
    id: "b-theo-nakamura",
    firstName: "Theo",
    lastName: "Nakamura",
    classYear: 2026,
    major: "Health Sciences",
    position: "Risk Manager",
    bio: "Champions member safety and ensures events uphold chapter and national standards.",
    isExecutiveBoard: true,
    isActive: true,
    displayOrder: 5,
  },
  {
    id: "b-elliot-frost",
    firstName: "Elliot",
    lastName: "Frost",
    classYear: 2027,
    major: "Marketing",
    position: "Recruitment Chairman",
    bio: "Builds each recruitment class and welcomes prospective members to Theta Tau.",
    isExecutiveBoard: true,
    isActive: true,
    displayOrder: 6,
  },

  // ------------------------------ Active Brothers -------------------------
  {
    id: "b-owen-blake",
    firstName: "Owen",
    lastName: "Blake",
    classYear: 2027,
    major: "Computer Science",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-samuel-hart",
    firstName: "Samuel",
    lastName: "Hart",
    classYear: 2028,
    major: "Biology",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-nathan-cruz",
    firstName: "Nathan",
    lastName: "Cruz",
    classYear: 2028,
    major: "Mechanical Engineering",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-caleb-monroe",
    firstName: "Caleb",
    lastName: "Monroe",
    classYear: 2026,
    major: "Economics",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-isaac-lindqvist",
    firstName: "Isaac",
    lastName: "Lindqvist",
    classYear: 2027,
    major: "Film, Television & Media Arts",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-gabriel-shaw",
    firstName: "Gabriel",
    lastName: "Shaw",
    classYear: 2028,
    major: "Nursing",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-lucas-bennett",
    firstName: "Lucas",
    lastName: "Bennett",
    classYear: 2029,
    major: "Undeclared",
    isExecutiveBoard: false,
    isActive: true,
  },
  {
    id: "b-adrian-vega",
    firstName: "Adrian",
    lastName: "Vega",
    classYear: 2029,
    major: "Criminal Justice",
    isExecutiveBoard: false,
    isActive: true,
  },
];
