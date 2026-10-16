// Select options for the referral form (website and app).
export const relationships = [
  "Family Member",
  "Hospital",
  "Physician",
  "Social Worker",
  "Occupational Therapist",
  "School",
  "Community Organization",
  "Indigenous Community",
  "Case Manager",
  "Other",
] as const;

// Must match the urgency enum in validation.ts.
export const urgencyLevels = ["Standard", "Priority", "Urgent"] as const;
