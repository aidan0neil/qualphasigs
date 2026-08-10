import type { ChapterEvent } from "@/lib/types";

/**
 * Placeholder chapter events.
 *
 * Replace or extend this array (or back it with a database) to manage the
 * calendar. `isPublic: false` hides an event from the public site while
 * keeping it visible to admins.
 *
 * Dates are local ISO strings (no trailing "Z") so they render in the
 * chapter's own timezone consistently.
 */
export const events: ChapterEvent[] = [
  {
    id: "e-welcome-back-bbq",
    title: "Welcome Back Brotherhood BBQ",
    description: "Kick off the semester with food, games, and brothers old and new on the Quad.",
    startDate: "2026-08-25T17:00:00",
    endDate: "2026-08-25T20:00:00",
    location: "Quinnipiac University Quad",
    category: "Brotherhood",
    isPublic: true,
  },
  {
    id: "e-fall-recruitment-info",
    title: "Fall Recruitment Information Night",
    description: "Learn what Alpha Sigma Phi is about and meet the brothers of Theta Tau. Open to all men interested in joining.",
    startDate: "2026-09-02T19:00:00",
    endDate: "2026-09-02T20:30:00",
    location: "Student Center, Room 225",
    category: "Recruitment",
    isPublic: true,
  },
  {
    id: "e-highway-cleanup",
    title: "Adopt-A-Highway Service Morning",
    description: "Join us as we give back to the Hamden community with our semesterly roadway cleanup.",
    startDate: "2026-09-13T09:00:00",
    endDate: "2026-09-13T12:00:00",
    location: "Whitney Avenue, Hamden",
    category: "Philanthropy",
    isPublic: true,
  },
  {
    id: "e-alumni-networking",
    title: "Alumni Networking Dinner",
    description: "Connect with Theta Tau alumni for mentorship, career advice, and dinner.",
    startDate: "2026-09-20T18:30:00",
    endDate: "2026-09-20T21:00:00",
    location: "Rocky Top Student Center",
    category: "Alumni",
    isPublic: true,
  },
  {
    id: "e-study-hours",
    title: "Chapter Study Hours",
    description: "Dedicated quiet study hours with academic mentors on hand. Bring your coursework.",
    startDate: "2026-09-24T19:00:00",
    endDate: "2026-09-24T22:00:00",
    location: "Arnold Bernhard Library, 3rd Floor",
    category: "Academic",
    isPublic: true,
  },
  {
    id: "e-fall-formal",
    title: "Fall Semi-Formal",
    description: "An evening celebrating our brotherhood. Brothers and dates welcome.",
    startDate: "2026-10-03T19:30:00",
    endDate: "2026-10-03T23:00:00",
    location: "The Graduate New Haven",
    category: "Social",
    isPublic: true,
  },
  {
    id: "e-chapter-meeting",
    title: "Weekly Chapter Meeting",
    description: "Members-only business meeting. Attendance is expected of all active brothers.",
    startDate: "2026-08-31T20:00:00",
    endDate: "2026-08-31T21:00:00",
    location: "Tator Hall, Room 110",
    category: "Chapter",
    isPublic: true,
  },
  {
    id: "e-philanthropy-week",
    title: "Homeless Veterans Awareness Week",
    description: "Our signature national philanthropy — a week of fundraising and awareness for RWJBarnabas Health and homeless veterans.",
    startDate: "2026-10-12T10:00:00",
    endDate: "2026-10-16T16:00:00",
    location: "Quinnipiac University Campus",
    category: "Philanthropy",
    isPublic: true,
  },
];
