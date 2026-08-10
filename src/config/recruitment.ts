/**
 * Recruitment content — the single place officers edit the recruitment page.
 *
 * `forms` are the IFC / chapter forms new members must complete. Paste the real
 * links into `url`. Leave a `url` empty ("") to show a "Link coming soon" chip
 * instead of a button.
 */

export type RecruitmentForm = {
  title: string;
  description?: string;
  /** Link to the form (Google Form, IFC portal, PDF, etc.). Empty = coming soon. */
  url: string;
  /** Show a "Required" badge. */
  required?: boolean;
};

export const recruitmentConfig = {
  headline: "Join Theta Tau",
  intro:
    "Recruitment is your first step toward the brotherhood of Alpha Sigma Phi. Come meet the brothers, learn what we're about, and see if Theta Tau is the right fit for you — no commitment required to check us out.",

  /** Optional primary call-to-action (e.g. an interest form). Empty to hide. */
  interestFormUrl: "",
  interestFormLabel: "Express Interest",

  /** Steps shown as a simple "how recruitment works" list. */
  steps: [
    "Come to a recruitment event and meet the brothers.",
    "Connect with our Recruitment Chairman and ask questions.",
    "Receive and accept a bid to join as a new member.",
    "Complete the required IFC and chapter forms below.",
  ],

  /**
   * Forms new members must complete. Replace the placeholder URLs with your
   * chapter's / Quinnipiac IFC's real links.
   */
  forms: [
    {
      title: "IFC New Member Registration",
      description: "Register your intake with the Quinnipiac Interfraternity Council.",
      url: "",
      required: true,
    },
    {
      title: "Anti-Hazing Agreement",
      description: "Acknowledge and agree to the university and IFC anti-hazing policies.",
      url: "",
      required: true,
    },
    {
      title: "Academic Eligibility / Grade Release",
      description: "Confirm you meet the minimum GPA and authorize grade verification.",
      url: "",
      required: true,
    },
    {
      title: "New Member Information Form",
      description: "Share your contact info and emergency contact with the chapter.",
      url: "",
      required: true,
    },
  ] as RecruitmentForm[],
} as const;
