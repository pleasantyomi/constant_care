// Constant Care Family Services Inc. — "How We Support You" page content
// (public route stays /our-services; only the on-page heading and nav
// label changed).
//
// One entry per service, matching the "How We Support You" dropdown nav.
// Positioned as an integrated community healthcare and support
// organization rather than a single-discipline home care agency, so each
// service is presented as a hero image + a short clinical, person-centred
// intro, followed by categorized groups of specific supports (rather than
// one photo per line item — there are too many line items per service for
// that to scale, and a clean categorized list reads more clinical and
// professional besides).
//
// Image prompts follow the Flow format used across this project: subject +
// setting + lighting + photorealistic quality anchor, 16:9 for hero shots.
// `heroImage` fields are placeholder paths where noted — generate the image
// from `heroImagePrompt` in Google Flow and drop it in to match.

export interface ServiceGroup {
  title: string;
  items: string[];
}

export interface ServiceCategory {
  slug: string;
  title: string;
  header: string;
  description: string;
  heroImage: string;
  heroImagePrompt: string;
  heroImageAspectRatio: "16:9";
  note?: string;
  groups: ServiceGroup[];
}

export const servicesContent: ServiceCategory[] = [
  {
    slug: "home-care-services",
    title: "Home Care Services",
    header: "Home Care Services",
    description:
      "Helping individuals live safely, comfortably, and independently in the place they call home. Our home care services are tailored to each person's needs, promoting dignity, independence, and overall well-being through compassionate, reliable support.",
    heroImage:
      "/images/services/Caregiver_and_adult_preparing_meal_202607191117.jpeg",
    heroImagePrompt:
      "A caregiver and an older adult preparing a meal together in a home kitchen, relaxed conversation, hands visibly engaged with food prep. Warm kitchen lighting mixed with daylight from a window. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Personal Care",
        items: [
          "Bathing and personal hygiene",
          "Dressing and grooming",
          "Toileting and continence support",
          "Mobility and transfer assistance",
        ],
      },
      {
        title: "Daily Living Support",
        items: [
          "Meal planning and preparation",
          "Light housekeeping",
          "Laundry and linen care",
          "Grocery shopping and essential errands",
        ],
      },
      {
        title: "Health & Wellness",
        items: [
          "Medication reminders",
          "Nutrition support",
          "Exercise and mobility encouragement",
          "Health observation and reporting",
        ],
      },
      {
        title: "Companionship",
        items: [
          "Meaningful social engagement",
          "Recreational activities",
          "Overnight support",
          "Family respite assistance",
        ],
      },
    ],
  },
  {
    slug: "disability-complex-support",
    title: "Disability & Complex Support",
    header: "Disability & Complex Support",
    description:
      "Providing individualized support that empowers people living with disabilities and complex needs to achieve greater independence, confidence, and participation in everyday life.",
    heroImage:
      "/images/services/Support_worker_and_client_collab_202607191117.jpeg",
    heroImagePrompt:
      "A support worker and an adult client engaged in a community or skill-building activity, such as organizing items at a shared table, collaborative and attentive body language, no exaggerated expressions. Bright indoor natural light. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Individualized Support",
        items: [
          "Developmental disability support",
          "Autism support",
          "Intellectual disability support",
          "Acquired brain injury support",
        ],
      },
      {
        title: "Daily Living",
        items: [
          "Personal care",
          "Independent living skills",
          "Household management",
          "Routine development",
        ],
      },
      {
        title: "Community Inclusion",
        items: [
          "Community participation",
          "Employment readiness",
          "Recreational support",
          "Social inclusion",
        ],
      },
      {
        title: "Complex Care",
        items: [
          "Individualized support planning",
          "Clinical collaboration",
          "Sensory support strategies",
          "Goal-focused interventions",
        ],
      },
    ],
  },
  {
    slug: "clinical-care-coordination",
    title: "Clinical Care Coordination",
    header: "Clinical Care Coordination",
    description:
      "Coordinating healthcare, community services, and support systems to deliver seamless, person-centred care. We work collaboratively with clients, families, healthcare providers, and community partners to ensure every individual receives the right care at the right time.",
    // Placeholder — no existing photo matches this service well. Generate a
    // proper hero from the prompt below (a care coordinator reviewing a
    // plan with a client or clinician) and replace this path.
    heroImage:
      "/images/services/Home_care_support_worker_in_202607191117_6.jpeg",
    heroImagePrompt:
      "A care coordinator and a client (or a nurse) reviewing a care plan document together at a table, focused and collaborative body language, a tablet or clipboard visible but not the focus. Bright, calm office or home light. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Comprehensive Assessment",
        items: [
          "Health and care needs assessments",
          "Risk and safety assessments",
          "Goal identification",
          "Ongoing reassessments",
        ],
      },
      {
        title: "Care Planning",
        items: [
          "Individualized care plans",
          "Clinical case management",
          "Progress monitoring",
          "Outcome evaluations",
        ],
      },
      {
        title: "Care Coordination",
        items: [
          "Hospital-to-home transitions",
          "Appointment coordination",
          "Healthcare system navigation",
          "Community resource referrals",
        ],
      },
      {
        title: "Clinical Collaboration",
        items: [
          "Nursing coordination",
          "Physician collaboration",
          "Allied health coordination",
          "Family care conferences",
        ],
      },
      {
        title: "Advocacy",
        items: [
          "Client and family advocacy",
          "Service navigation",
          "Resource coordination",
          "Education and support",
        ],
      },
    ],
  },
  {
    slug: "mental-health-behavioural-support",
    title: "Mental Health & Behavioural Support",
    header: "Mental Health & Behavioural Support",
    description:
      "Using evidence-informed behavioural science and person-centred mental wellness approaches to help individuals build meaningful skills, improve emotional well-being, and achieve positive, lasting outcomes.",
    heroImage: "/images/services/behaviour.jpeg",
    heroImagePrompt:
      "A support worker calmly sitting across from a client in a quiet, comfortable consultation room, attentive and warm body language, notepad visible but not the focus. Soft natural light. Medium shot. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Assessment & Analysis",
        items: [
          "Functional Behaviour Assessments (FBA)",
          "Behavioural observations",
          "Skills and needs assessments",
          "Environmental assessments",
          "Behaviour data collection and analysis",
        ],
      },
      {
        title: "Behaviour Support Planning",
        items: [
          "Positive Behaviour Support Plans",
          "Behaviour intervention planning",
          "Goal development",
          "Progress monitoring and plan reviews",
        ],
      },
      {
        title: "Skill Development",
        items: [
          "Emotional regulation",
          "Social skills development",
          "Communication skills",
          "Executive functioning",
          "Adaptive living skills",
        ],
      },
      {
        title: "Mental Wellness",
        items: [
          "Recovery-oriented support",
          "Emotional wellness coaching",
          "Stress management strategies",
          "Wellness planning",
        ],
      },
      {
        title: "Consultation & Training",
        items: [
          "Parent and caregiver coaching",
          "Staff education",
          "School and community consultation",
          "Behaviour strategy implementation",
        ],
      },
    ],
  },
  {
    slug: "children-youth-family-services",
    title: "Children, Youth & Family Services",
    header: "Children, Youth & Family Services",
    description:
      "Supporting children, youth, and families through individualized services that promote healthy development, strengthen family relationships, and encourage lifelong success.",
    heroImage:
      "/images/services/Support_worker_playing_with_child_202607191117.jpeg",
    heroImagePrompt:
      "A youth support worker engaging warmly with a child or teenager in a home or community setting, genuine interaction, relaxed body language. Soft natural light, warm tones. Medium shot, candid framing. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Child Development",
        items: [
          "Developmental support",
          "School readiness",
          "Social skills development",
          "Recreational programming",
        ],
      },
      {
        title: "Family Support",
        items: [
          "Parenting support",
          "Family-centred care planning",
          "Family resource navigation",
          "In-home family support",
        ],
      },
      {
        title: "Youth Development",
        items: [
          "Life skills coaching",
          "Employment preparation",
          "Community integration",
          "Transition to adulthood",
        ],
      },
      {
        title: "Wellness & Behaviour",
        items: [
          "Behaviour coaching",
          "Emotional regulation",
          "Confidence building",
          "Goal development",
        ],
      },
    ],
  },
  {
    slug: "senior-support-services",
    title: "Senior Support Services",
    header: "Senior Support Services",
    description:
      "Helping older adults maintain independence, dignity, and quality of life while remaining connected to the people, places, and communities they value most.",
    heroImage:
      "/images/services/Woman_laughing_with_caregiver_tea_202607191117_4.jpeg",
    heroImagePrompt:
      "A senior and a companion enjoying a shared hobby such as gardening, genuine laughter and eye contact between them. Warm natural light, cozy garden setting. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Personal Assistance",
        items: [
          "Personal care",
          "Medication reminders",
          "Meal preparation",
          "Mobility support",
        ],
      },
      {
        title: "Healthy Aging",
        items: [
          "Wellness visits",
          "Falls prevention",
          "Cognitive engagement",
          "Health monitoring",
        ],
      },
      {
        title: "Community Living",
        items: [
          "Transportation assistance",
          "Appointment accompaniment",
          "Community participation",
          "Companionship",
        ],
      },
      {
        title: "Family Partnership",
        items: [
          "Caregiver support",
          "Care planning",
          "Family communication",
          "Respite coordination",
        ],
      },
    ],
  },
  {
    slug: "supported-living-services",
    title: "Supported Living Services",
    header: "Supported Living Services",
    description:
      "Providing individualized supports that promote independence, stability, personal growth, and meaningful participation in community life.",
    note: "Only publish specific program details (e.g. named residence locations or intake capacity) once those programs are actively operating or accepting inquiries. Until confirmed, keep this page focused on inquiry/capacity language rather than describing homes as currently operating.",
    heroImage: "/images/services/residentialHero.jpeg",
    heroImagePrompt:
      "A bright, welcoming shared living room or kitchen interior in a supported living home, tidy and homey, soft natural daylight through windows, no people in frame. Wide interior shot emphasizing warmth and comfort. Photorealistic, architectural interior photography style, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Independent Living",
        items: [
          "Daily living skills",
          "Household management",
          "Budgeting and financial literacy",
          "Meal planning",
        ],
      },
      {
        title: "Personal Support",
        items: [
          "Personal care",
          "Medication support",
          "Routine development",
          "Goal achievement",
        ],
      },
      {
        title: "Community Living",
        items: [
          "Employment support",
          "Volunteer opportunities",
          "Recreation and leisure",
          "Social inclusion",
        ],
      },
      {
        title: "Ongoing Support",
        items: [
          "24-hour support (where applicable)",
          "Transition planning",
          "Crisis support",
          "Progress reviews",
        ],
      },
    ],
  },
  {
    slug: "community-participation-independent-living",
    title: "Community Participation & Independent Living",
    header: "Community Participation & Independent Living",
    description:
      "Empowering individuals to build practical life skills, develop meaningful relationships, and participate confidently in all aspects of community life.",
    heroImage:
      "/images/services/Support_worker_client_sorting_gr_202607191117.jpeg",
    heroImagePrompt:
      "An individual and a support worker out shopping in a grocery store aisle, casual and everyday feeling, mid-conversation, natural body language. Ambient store lighting, candid angle. Medium-wide shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Independent Living Skills",
        items: [
          "Cooking and nutrition",
          "Budgeting",
          "Time management",
          "Household organization",
        ],
      },
      {
        title: "Community Navigation",
        items: [
          "Public transportation training",
          "Housing navigation",
          "Community resource access",
          "Appointment accompaniment",
        ],
      },
      {
        title: "Employment & Education",
        items: [
          "Job readiness",
          "Employment coaching",
          "Educational support",
          "Volunteer placement",
        ],
      },
      {
        title: "Community Engagement",
        items: [
          "Recreation and leisure",
          "Community events",
          "Peer engagement",
          "Confidence and leadership development",
        ],
      },
    ],
  },
  {
    slug: "respite-services",
    title: "Respite Services",
    header: "Respite Services",
    description:
      "Providing trusted, flexible respite services that allow caregivers to rest, recharge, and maintain their own well-being while ensuring their loved ones continue to receive high-quality care.",
    heroImage:
      "/images/services/Support_worker_and_adult_conversing_202607191117.jpeg",
    heroImagePrompt:
      "A family caregiver visibly relaxing with a cup of coffee on a porch or living room chair, while in the soft-focus background a support worker engages warmly with their loved one. Warm afternoon light. Medium shot, shallow depth of field emphasizing the resting caregiver in the foreground. Photorealistic, documentary photography style, 85mm lens, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Planned Respite",
        items: [
          "In-home respite",
          "Community respite",
          "Overnight respite",
          "Weekend respite",
        ],
      },
      {
        title: "Emergency Respite",
        items: [
          "Short-notice respite",
          "Crisis response",
          "Temporary care arrangements",
          "Transitional respite",
        ],
      },
      {
        title: "Caregiver Support",
        items: [
          "Flexible scheduling",
          "Care planning",
          "Family support",
          "Continuity of care",
        ],
      },
    ],
  },
  {
    slug: "transportation-services",
    title: "Transportation Services",
    header: "Transportation Services",
    description:
      "Providing safe, dependable transportation and personalized accompaniment that enables individuals to access healthcare, employment, education, and community life with confidence.",
    heroImage: "/images/services/transportationHero.jpeg",
    heroImagePrompt:
      "A support worker helping a client into the passenger seat of a car in a driveway, relaxed and courteous body language, or the two of them mid-conversation while riding together with seatbelts visible. Natural daylight, candid angle. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    groups: [
      {
        title: "Medical Transportation",
        items: [
          "Medical appointments",
          "Hospital visits",
          "Specialist appointments",
          "Therapy appointments",
        ],
      },
      {
        title: "Essential Services",
        items: [
          "Pharmacy visits",
          "Grocery shopping",
          "Banking",
          "Personal errands",
        ],
      },
      {
        title: "Community Access",
        items: [
          "Employment transportation",
          "Educational programs",
          "Recreational outings",
          "Community events",
        ],
      },
      {
        title: "Accompaniment",
        items: [
          "Appointment support",
          "Community navigation",
          "Advocacy during appointments",
          "Follow-up assistance",
        ],
      },
    ],
  },
];
