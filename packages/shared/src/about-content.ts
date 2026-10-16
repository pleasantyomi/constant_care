// About page copy, shared by the website (components/about-us/*) and the
// mobile app's About screen. `icon` fields are Lucide icon names; each
// platform maps them to its own icon component.

export const aboutHero = {
  heading:
    "Redefining Community Care Through Compassion, Innovation, and Excellence.",
  intro:
    "At Constant Care Family Services, we deliver person-centred support that empowers individuals, strengthens families, and builds more inclusive communities. Through compassionate care, trusted partnerships, and innovative solutions, we help people live with greater independence, dignity, and confidence.",
} as const;

export const whoWeAre = {
  eyebrow: "Who We Are",
  heading: "More Than Care. A Commitment to Better Lives.",
  paragraphs: [
    "Constant Care Family Services is a Canadian community care organization dedicated to delivering exceptional support that empowers individuals to thrive. We believe every person deserves the opportunity to live safely, independently, and with dignity, regardless of age, ability, or circumstance.",
    "Our team provides personalized services built around each individual’s goals, strengths, and aspirations. Rather than offering one-size-fits-all solutions, we create meaningful support plans that promote independence, inclusion, confidence, and long-term well-being.",
    "Every interaction is guided by compassion, professionalism, and an unwavering commitment to excellence.",
  ],
  image: {
    src: "/images/about_hero.jpeg",
    alt: "A support worker and client sharing a warm conversation",
  },
} as const;

export const missionVision = [
  {
    slug: "mission",
    title: "Our Mission",
    heading: "Transforming Lives Through Purposeful Care",
    paragraphs: [
      "Our mission is to deliver compassionate, innovative, and person-centred support that empowers individuals to achieve greater independence while strengthening families and creating healthier, more inclusive communities.",
      "We are committed to providing exceptional services through professional excellence, integrity, collaboration, and continuous innovation, ensuring every individual receives the support they need to reach their fullest potential.",
    ],
  },
  {
    slug: "vision",
    title: "Our Vision",
    heading: "Shaping the Future of Community Care",
    paragraphs: [
      "Our vision is to become Canada's most trusted community care organization, recognized for transforming lives through innovation, leadership, and exceptional service.",
      "We envision communities where every individual, regardless of age, ability, or circumstance, has equitable access to opportunities, compassionate support, and the resources needed to live with dignity, purpose, and confidence.",
    ],
  },
] as const;

export const values = [
  {
    icon: "Heart",
    title: "Compassion",
    description:
      "We treat every individual with kindness, empathy, and genuine respect.",
  },
  {
    icon: "Award",
    title: "Excellence",
    description:
      "We pursue the highest standards of quality, professionalism, accountability, and continuous improvement.",
  },
  {
    icon: "BadgeCheck",
    title: "Integrity",
    description:
      "We build trust through honesty, transparency, ethical leadership, and responsible decision-making.",
  },
  {
    icon: "TrendingUp",
    title: "Empowerment",
    description:
      "We encourage independence by helping individuals develop confidence, skills, and opportunities for growth.",
  },
  {
    icon: "Users",
    title: "Inclusion",
    description:
      "We celebrate diversity and create welcoming environments where everyone belongs.",
  },
  {
    icon: "Handshake",
    title: "Collaboration",
    description:
      "We believe lasting change happens through strong partnerships with families, communities, healthcare providers, Indigenous organizations, and government.",
  },
] as const;

export type ValueIcon = (typeof values)[number]["icon"];

export const audiences = [
  { icon: "Accessibility", title: "Individuals living with disabilities" },
  { icon: "Backpack", title: "Children and youth" },
  { icon: "HandHeart", title: "Families and caregivers" },
  { icon: "UserRound", title: "Seniors" },
  { icon: "Compass", title: "Individuals seeking greater independence" },
  { icon: "Handshake", title: "Community organizations" },
  { icon: "Landmark", title: "Indigenous communities" },
  { icon: "Building2", title: "Government and healthcare partners" },
] as const;

export type AudienceIcon = (typeof audiences)[number]["icon"];
