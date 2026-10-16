// The care finder: four questions that recommend services. Pure data and
// rules, so the app and (later) the website ask the same questions and give
// the same answers. Service slugs match services-content.ts.

export type ServiceSlug =
  | "home-care-services"
  | "disability-complex-support"
  | "clinical-care-coordination"
  | "mental-health-behavioural-support"
  | "children-youth-family-services"
  | "senior-support-services"
  | "supported-living-services"
  | "community-participation-independent-living"
  | "respite-services"
  | "transportation-services";

export type FinderOption = { id: string; label: string; detail?: string };
export type FinderQuestion = {
  id: "who" | "needs" | "frequency" | "setting";
  title: string;
  multiple: boolean;
  options: FinderOption[];
};

export const careFinderQuestions: FinderQuestion[] = [
  {
    id: "who",
    title: "Who needs support?",
    multiple: false,
    options: [
      { id: "me", label: "Me", detail: "I’m looking for support for myself" },
      { id: "relative", label: "A parent or relative", detail: "An older loved one, a partner, family" },
      { id: "child", label: "A child or youth", detail: "Under 21" },
      { id: "professional", label: "Someone I support at work", detail: "Social worker, clinician, case manager" },
    ],
  },
  {
    id: "needs",
    title: "What kind of help would make a difference?",
    multiple: true,
    options: [
      { id: "daily", label: "Daily living & personal care", detail: "Meals, bathing, dressing, housekeeping" },
      { id: "health", label: "Coordinating health care", detail: "Care plans, appointments, providers" },
      { id: "mental", label: "Mental health or behaviour", detail: "Wellness, coping, behaviour support" },
      { id: "disability", label: "Disability support", detail: "Individualized or complex needs" },
      { id: "break", label: "A break for family caregivers", detail: "A few hours to overnight" },
      { id: "independence", label: "Living more independently", detail: "Skills, routines, community life" },
      { id: "transport", label: "Getting to appointments", detail: "Rides and accompaniment" },
    ],
  },
  {
    id: "frequency",
    title: "How often might support be needed?",
    multiple: false,
    options: [
      { id: "occasional", label: "Now and then" },
      { id: "weekly", label: "A few times a week" },
      { id: "daily", label: "Every day" },
      { id: "overnight", label: "Overnight or around the clock" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "setting",
    title: "Where would support happen?",
    multiple: false,
    options: [
      { id: "home", label: "At home" },
      { id: "community", label: "Out in the community" },
      { id: "supported-living", label: "In a supported living arrangement" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
];

export type FinderAnswers = {
  who?: string;
  needs?: string[];
  frequency?: string;
  setting?: string;
};

// Points each answer gives to each service. Highest totals are recommended.
const weights: Record<string, Partial<Record<ServiceSlug, number>>> = {
  "who:child": { "children-youth-family-services": 4 },
  "who:relative": { "senior-support-services": 2 },
  "needs:daily": { "home-care-services": 3, "senior-support-services": 1 },
  "needs:health": { "clinical-care-coordination": 3 },
  "needs:mental": { "mental-health-behavioural-support": 3 },
  "needs:disability": { "disability-complex-support": 3 },
  "needs:break": { "respite-services": 3 },
  "needs:independence": { "community-participation-independent-living": 3, "supported-living-services": 1 },
  "needs:transport": { "transportation-services": 3 },
  "frequency:overnight": { "home-care-services": 1, "supported-living-services": 1, "respite-services": 1 },
  "setting:home": { "home-care-services": 1 },
  "setting:community": { "community-participation-independent-living": 2 },
  "setting:supported-living": { "supported-living-services": 3 },
};

/** Up to three recommended service slugs, best first. */
export function matchServices(answers: FinderAnswers): ServiceSlug[] {
  const keys = [
    answers.who && `who:${answers.who}`,
    ...(answers.needs ?? []).map((need) => `needs:${need}`),
    answers.frequency && `frequency:${answers.frequency}`,
    answers.setting && `setting:${answers.setting}`,
  ].filter(Boolean) as string[];

  const scores = new Map<ServiceSlug, number>();
  for (const key of keys) {
    for (const [slug, points] of Object.entries(weights[key] ?? {})) {
      scores.set(slug as ServiceSlug, (scores.get(slug as ServiceSlug) ?? 0) + (points ?? 0));
    }
  }
  const ranked = [...scores.entries()]
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => slug);
  // Nothing specific chosen: home care is the most common starting point.
  return (ranked.length ? ranked : ["home-care-services" as ServiceSlug]).slice(0, 3);
}

/** One-line summary of the answers, e.g. for a callback request. */
export function summarizeAnswers(answers: FinderAnswers) {
  const label = (questionId: FinderQuestion["id"], optionId?: string) =>
    careFinderQuestions
      .find((question) => question.id === questionId)
      ?.options.find((option) => option.id === optionId)?.label;
  const parts = [
    answers.who && `For: ${label("who", answers.who)}`,
    answers.needs?.length &&
      `Needs: ${answers.needs.map((need) => label("needs", need)).join(", ")}`,
    answers.frequency && `How often: ${label("frequency", answers.frequency)}`,
    answers.setting && `Where: ${label("setting", answers.setting)}`,
  ].filter(Boolean);
  return parts.join(" · ");
}
