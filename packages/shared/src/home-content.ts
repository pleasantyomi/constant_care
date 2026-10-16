// Home page copy, shared by the website (components/landing_page/*) and the
// mobile app's Home screen.

export const homeHero = {
  headingLines: ["Redefining Community Care.", "Empowering Every Journey."],
  intro:
    "Constant Care Family Services Inc. provides compassionate, person-centred care and support services that empower individuals and families to live safely, independently, and with dignity.",
} as const;

// `icon` is a Lucide icon name; lucide-react (web) and lucide-react-native
// (app) export the same names, and each platform maps it to its component.
export const whyChooseUs = [
  {
    icon: "HeartHandshake",
    title: "Compassionate Professionals",
    description:
      "Our support workers bring genuine empathy and human connection to every visit. We hire people who treat each individual with the warmth and respect they deserve, not just a checklist of tasks to complete.",
  },
  {
    icon: "ClipboardList",
    title: "Personalized Care Plans",
    description:
      "No two people are the same, so no two care plans are either. We build every plan around each individual's goals, routines, and preferences to make sure support actually fits their life.",
  },
  {
    icon: "Clock",
    title: "Reliable & Responsive Support",
    description:
      "Families and partners can count on us to show up and follow through, every time. When needs change, we respond quickly so support never falls through the cracks.",
  },
  {
    icon: "Users",
    title: "Community-Based Services",
    description:
      "We meet people where they are, whether that's at home, in the community, or somewhere in between. Our services are built to fit into real life, not the other way around.",
  },
  {
    icon: "UserRound",
    title: "Person-Centered Care",
    description:
      "Every plan starts with the individual: their goals, preferences, and pace, not a one-size-fits-all program. We keep families and loved ones informed and involved every step of the way, because real care puts the person at the centre and treats everyone around them as a partner.",
  },
  {
    icon: "ShieldCheck",
    title: "Trusted & Professional Team",
    description:
      "Every member of our team is trained, certified, and held to a high standard of accountability. You can trust that the person supporting your loved one is qualified, prepared, and professional.",
  },
] as const;

export type WhyChooseIcon = (typeof whyChooseUs)[number]["icon"];
