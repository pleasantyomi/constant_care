// Constant Care Family Services Inc. — Our Services page content
//
// One entry per service category (matches the "Our Services" dropdown nav).
// Each category has a hero (header + description + image) and a list of
// points, each with its own short description and image prompt.
//
// Image prompts follow the Flow format used across this project: subject +
// setting + lighting + photorealistic quality anchor. Aspect ratios match
// Flow's supported list. Category heroes are 16:9; individual point images
// are 4:3 to sit cleanly in a grid.
//
// `image` fields are placeholder paths — generate the images from
// `imagePrompt` in Google Flow and drop them in to match.

export interface ServicePoint {
  title: string;
  description: string;
  image: string;
  imagePrompt: string;
  imageAspectRatio: "4:3";
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
  points: ServicePoint[];
}

export const servicesContent: ServiceCategory[] = [
  {
    slug: "home-care-services",
    title: "Home Care Services",
    header: "Home Care Services",
    description:
      "Everyday support that helps individuals remain safe, comfortable, and independent in their own home.",
    heroImage:
      "/images/services/Caregiver_and_adult_preparing_meal_202607191117.jpeg",
    heroImagePrompt:
      "A caregiver and an older adult preparing a meal together in a home kitchen, relaxed conversation, hands visibly engaged with food prep. Warm kitchen lighting mixed with daylight from a window. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Personal Care",
        description:
          "Respectful, hands-on support with daily personal care routines, delivered with dignity and privacy in mind.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_9.jpeg",
        imagePrompt:
          "A caregiver helping an older adult get ready in the morning in a bright bedroom, respectful and calm interaction, both partially turned from camera for privacy. Soft natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Bathing & Hygiene Assistance",
        description:
          "Safe, dignified assistance with bathing and hygiene for individuals who need a helping hand.",
        image: "/images/services/hygiene.jpeg",
        imagePrompt:
          "A caregiver setting out fresh towels and toiletries in a clean, well-lit bathroom, preparing for a hygiene assistance visit, no identifiable person shown for privacy. Warm natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Meal Preparation",
        description:
          "Nutritious, home-cooked meals prepared to each individual's preferences and dietary needs.",
        image:
          "/images/services/Caregiver_and_adult_preparing_meal_202607191117_2.jpeg",
        imagePrompt:
          "A caregiver and client together in a home kitchen, chopping vegetables and chatting, warm and collaborative mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Medication Reminders",
        description:
          "Consistent reminders that help individuals stay on track with their medication schedule.",
        image:
          "/images/services/Caregiver_assisting_client_home_202607191117.jpeg",
        imagePrompt:
          "A caregiver handing a small weekly pill organizer to an older adult at a kitchen table, attentive and gentle interaction, soft daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Mobility Assistance",
        description:
          "Steady, supportive help with walking, transfers, and mobility around the home.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_3.jpeg",
        imagePrompt:
          "A caregiver supporting an older adult's arm while walking together down a hallway, natural indoor light, candid framing. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Light Housekeeping",
        description:
          "Tidying, laundry, and light household tasks that keep a home safe and comfortable.",
        image: "/images/services/housekeeping.jpeg",
        imagePrompt:
          "A caregiver folding laundry in a warm, homey living room while a client relaxes nearby, natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Companionship",
        description:
          "Friendly, consistent company that brings connection and conversation into everyday life.",
        image:
          "/images/services/Woman_laughing_with_caregiver_tea_202607191117_2.jpeg",
        imagePrompt:
          "A caregiver and an older adult playing cards at a kitchen table, genuine laughter, warm natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Overnight Support",
        description:
          "Reliable overnight care for individuals who need support outside of regular daytime hours.",
        image: "/images/services/overnight.jpeg",
        imagePrompt:
          "A caregiver quietly checking in on a client in a softly lit living room in the evening, calm and attentive mood, warm lamp light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Transportation",
        description:
          "Dependable rides to appointments, errands, and the places that matter.",
        image: "/images/services/transportation.jpeg",
        imagePrompt:
          "A caregiver helping an older adult into the passenger seat of a car in a driveway, courteous and relaxed, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "disability-support-services",
    title: "Disability Support Services",
    header: "Disability Support Services",
    description:
      "Person-centred support that helps individuals build skills, independence, and meaningful community connection.",
    heroImage:
      "/images/services/Support_worker_and_client_collab_202607191117.jpeg",
    heroImagePrompt:
      "A support worker and an adult client engaged in a community or skill-building activity, such as organizing items at a shared table, collaborative and attentive body language, no exaggerated expressions. Bright indoor natural light. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Personal Support",
        description:
          "One-on-one support tailored to each individual's daily needs and personal goals.",
        image:
          "/images/services/Support_worker_and_client_activity_202607191117.jpeg",
        imagePrompt:
          "A support worker and an adult client sitting together reviewing a simple daily planner, engaged and attentive, bright indoor light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Access",
        description:
          "Support getting out into the community safely and confidently.",
        image:
          "/images/services/Support_worker_client_community_202607191117.jpeg",
        imagePrompt:
          "A support worker and client walking together into a community center entrance, relaxed pace, natural daylight. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Life Skills Development",
        description:
          "Practical coaching in cooking, budgeting, and everyday skills that build independence.",
        image:
          "/images/services/Caregiver_and_adult_preparing_meal_202607191117_3.jpeg",
        imagePrompt:
          "A support worker and client cooking together in a kitchen, hands-on teaching moment, natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Behavioural Support",
        description:
          "Structured, compassionate support that helps individuals navigate behavioural challenges.",
        image:
          "/images/services/Support_worker_and_adult_conversing_202607191117_2.jpeg",
        imagePrompt:
          "A support worker sitting calmly with a client in a quiet, comfortable room, attentive body language, soft natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Goal Planning",
        description:
          "Collaborative planning that keeps each individual's personal goals front and centre.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_8.jpeg",
        imagePrompt:
          "A support worker and client reviewing a simple goals worksheet together at a table, engaged conversation, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Social Inclusion",
        description:
          "Opportunities to build friendships and take part in community and social life.",
        image:
          "/images/services/Group_at_community_center_activity_202607191117.jpeg",
        imagePrompt:
          "A small group of adults with a support worker at a community social event, relaxed and smiling, natural indoor light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Employment Readiness Support",
        description:
          "Coaching and preparation that helps individuals move toward meaningful employment.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_5.jpeg",
        imagePrompt:
          "A support worker helping a client practice a mock interview at a table, focused and encouraging mood, bright office light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Recreation",
        description:
          "Fun, structured recreational activities that support physical and social well-being.",
        image:
          "/images/services/Support_worker_and_client_collab_202607191117_2.jpeg",
        imagePrompt:
          "A support worker and client doing a craft activity together at a table, genuine engagement, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Transportation",
        description:
          "Dependable transportation to community activities, appointments, and programs.",
        image: "/images/services/transportation.jpeg",
        imagePrompt:
          "A support worker helping a client into a vehicle for a community outing, relaxed mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "community-support",
    title: "Community Support",
    header: "Community Support",
    description:
      "Support that helps individuals participate fully and confidently in community life.",
    heroImage:
      "/images/services/Support_worker_client_sorting_gr_202607191117.jpeg",
    heroImagePrompt:
      "An individual and a support worker out shopping in a grocery store aisle, casual and everyday feeling, mid-conversation, natural body language. Ambient store lighting, candid angle. Medium-wide shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Community Participation",
        description:
          "Support to take part in community programs, groups, and events.",
        image:
          "/images/services/Support_worker_and_client_organi_202607191117.jpeg",
        imagePrompt:
          "A support worker and client participating in a community group activity, engaged and smiling, natural indoor light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Shopping Assistance",
        description:
          "Help navigating errands and shopping trips with confidence and ease.",
        image:
          "/images/services/Support_worker_client_collaborat_202607191117.jpeg",
        imagePrompt:
          "A support worker and client shopping together in a grocery aisle, casual conversation, ambient store light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Medical Appointments",
        description:
          "Support attending medical appointments, from transportation to staying informed.",
        image: "/images/services/medical.jpeg",
        imagePrompt:
          "A support worker sitting beside a client in a bright clinic waiting room, calm and attentive, natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Daily Living Skills",
        description:
          "Coaching in everyday tasks that build confidence and independence.",
        image:
          "/images/services/Caregiver_and_adult_preparing_meal_202607191117_4.jpeg",
        imagePrompt:
          "A support worker guiding a client through a simple household task, hands-on and patient, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Social Activities",
        description:
          "Opportunities to connect with others through group activities and outings.",
        image:
          "/images/services/Group_walking_on_path_conversing_202607191117.jpeg",
        imagePrompt:
          "A small group at a community outing or picnic, relaxed and candid, outdoor natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Transportation",
        description:
          "Dependable rides that keep individuals connected to their community.",
        image: "/images/services/transportation.jpeg",
        imagePrompt:
          "A support worker helping a client into a car for a community outing, relaxed mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Independent Living Support",
        description:
          "Practical support that helps individuals live independently with confidence.",
        image:
          "/images/services/Support_worker_and_client_organi_202607191117_2.jpeg",
        imagePrompt:
          "A support worker and client organizing a home space together, collaborative and calm, natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "respite-services",
    title: "Respite Services",
    header: "Respite Services",
    description:
      "Reliable relief for family caregivers, so they can rest, recharge, and return to caregiving with renewed strength.",
    heroImage:
      "/images/services/Support_worker_and_adult_conversing_202607191117.jpeg",
    heroImagePrompt:
      "A family caregiver visibly relaxing with a cup of coffee on a porch or living room chair, while in the soft-focus background a support worker engages warmly with their loved one. Warm afternoon light. Medium shot, shallow depth of field emphasizing the resting caregiver in the foreground. Photorealistic, documentary photography style, 85mm lens, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "In-Home Respite",
        description:
          "Trusted, in-home relief that lets family caregivers step away with peace of mind.",
        image:
          "/images/services/Support_worker_and_adult_conversing_202607191117_3.jpeg",
        imagePrompt:
          "A support worker engaging warmly with a client at home while, in the background, a family caregiver relaxes with a book. Soft daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Respite",
        description:
          "Respite support delivered through community-based programs and outings.",
        image:
          "/images/services/Support_worker_client_park_outing_202607191117.jpeg",
        imagePrompt:
          "A support worker and client enjoying a community outing together, relaxed and candid, outdoor natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Family Caregiver Relief",
        description:
          "Dedicated relief time that helps caregivers rest and recharge.",
        image:
          "/images/services/Woman_laughing_with_caregiver_tea_202607191117_3.jpeg",
        imagePrompt:
          "A family caregiver relaxing on a porch with a cup of tea, calm and at ease, warm afternoon light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Respite care scheduled around your family's real, changing needs.",
        image: "/images/services/Home_care_support_worker_in_202607191117.jpeg",
        imagePrompt:
          "A caregiver and family member reviewing a simple calendar together at a kitchen table, collaborative mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "youth-services",
    title: "Youth Services",
    header: "Youth Services",
    description:
      "Dedicated one-to-one support that helps children and young people build skills, confidence, and stability.",
    heroImage:
      "/images/services/Youth_worker_mentoring_teenager_202607191117.jpeg",
    heroImagePrompt:
      "A youth support worker and a teenager in conversation on a porch step or community space bench, relaxed posture, genuine engagement. Soft natural outdoor light, warm tones. Medium shot, candid framing. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "One-to-One Support",
        description:
          "Individualized support built around each young person's unique needs.",
        image:
          "/images/services/Youth_worker_mentoring_teenager_202607191117_2.jpeg",
        imagePrompt:
          "A youth support worker sitting with a teenager at a kitchen table, engaged one-on-one conversation, warm light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Mentoring",
        description:
          "Consistent mentorship that helps young people build confidence and direction.",
        image: "/images/youth.jpeg",
        imagePrompt:
          "A youth mentor and teenager walking together outdoors, relaxed conversation, natural daylight. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Behaviour Support",
        description:
          "Structured, compassionate support for navigating behavioural challenges.",
        image: "/images/services/behaviour.jpeg",
        imagePrompt:
          "A youth worker calmly sitting with a young person in a quiet space, attentive body language, soft natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Integration",
        description:
          "Support connecting young people to community programs and activities.",
        image:
          "/images/services/Group_at_community_center_activity_202607191117.jpeg",
        imagePrompt:
          "A youth worker and teenager at a community center activity, relaxed and engaged, natural indoor light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Life Skills",
        description:
          "Practical coaching in the everyday skills young people need to thrive.",
        image:
          "/images/services/Caregiver_and_adult_preparing_meal_202607191117_5.jpeg",
        imagePrompt:
          "A youth worker teaching a teenager a simple cooking skill in a home kitchen, hands-on moment, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Family Support",
        description:
          "Support that extends to the whole family, not just the young person.",
        image:
          "/images/services/Family_laughing_at_dining_table_202607191117.jpeg",
        imagePrompt:
          "A youth worker sitting with a parent and teenager together at a table, warm and collaborative, natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Crisis Support",
        description:
          "Responsive support available when a young person needs it most.",
        image: "/images/services/crisis.jpeg",
        imagePrompt:
          "A youth worker calmly speaking with a teenager in a private, comfortable space, reassuring body language, soft natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Respite",
        description:
          "Short-term relief that gives families and young people room to breathe.",
        image:
          "/images/services/Support_worker_playing_with_child_202607191117.jpeg",
        imagePrompt:
          "A youth worker engaging a teenager in an activity while a parent relaxes nearby, calm mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "senior-support-services",
    title: "Senior Support Services",
    header: "Senior Support Services",
    description:
      "Compassionate support that helps seniors stay active, connected, and comfortable at home.",
    heroImage:
      "/images/services/Woman_laughing_with_caregiver_tea_202607191117_4.jpeg",
    heroImagePrompt:
      "A senior and a companion enjoying a shared hobby such as gardening, genuine laughter and eye contact between them. Warm natural light, cozy garden setting. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Companion Care",
        description:
          "Warm, consistent companionship that brightens everyday life.",
        image:
          "/images/services/Woman_laughing_with_caregiver_tea_202607191117.jpeg",
        imagePrompt:
          "A companion and senior sharing tea and conversation at a kitchen table, genuine laughter, warm natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Wellness Visits",
        description:
          "Regular visits that keep an eye on comfort, safety, and well-being.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_4.jpeg",
        imagePrompt:
          "A caregiver checking in with a senior in a cozy living room, attentive and warm, soft daylight. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Meal Preparation",
        description:
          "Nutritious meals prepared with each senior's preferences in mind.",
        image:
          "/images/services/Caregiver_and_adult_preparing_meal_202607191117_6.jpeg",
        imagePrompt:
          "A caregiver preparing a meal in a home kitchen while a senior looks on and chats, warm natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Personal Support",
        description: "Respectful help with daily personal care routines.",
        image:
          "/images/services/Caregiver_assisting_client_home_202607191117_2.jpeg",
        imagePrompt:
          "A caregiver assisting a senior getting ready in a bright bedroom, respectful and calm, soft natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Outings",
        description:
          "Support getting out and staying connected to community life.",
        image:
          "/images/services/Support_worker_client_park_outing_202607191117.jpeg",
        imagePrompt:
          "A companion and senior on a walk in a park or community garden, relaxed pace, natural outdoor light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Transportation",
        description: "Dependable rides to appointments, errands, and visits.",
        image: "/images/services/transportation.jpeg",
        imagePrompt:
          "A caregiver helping a senior into a car in a driveway, courteous and relaxed, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Home Support",
        description:
          "Light help around the home that keeps daily life running smoothly.",
        image: "/images/services/housekeeping.jpeg",
        imagePrompt:
          "A caregiver tidying a living room while a senior relaxes nearby, warm homey interior, natural light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "residential-services",
    title: "Residential Services",
    header: "Residential Services",
    description:
      "Structured, individualized residential support for youth and adults who need a higher level of care.",
    note: "Only publish specific program details (e.g., “Youth Group Homes,” “Adult Residential Homes”) once those homes are actively operating or accepting inquiries. Until confirmed, keep this page focused on inquiry/capacity language rather than describing homes as currently operating.",
    heroImage: "/images/services/residentialHero.jpeg",
    heroImagePrompt:
      "A bright, welcoming shared living room or kitchen interior in a residential home, tidy and homey, soft natural daylight through windows, no people in frame. Wide interior shot emphasizing warmth and comfort. Photorealistic, architectural interior photography style, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Youth Group Homes",
        description:
          "Structured residential care for youth, built around safety and stability.",
        image: "/images/services/youthGroup.jpeg",
        imagePrompt:
          "A bright, welcoming shared living room in a youth residential home, tidy and homey, no people in frame, soft daylight. Photorealistic, architectural interior photography style, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Adult Residential Homes",
        description:
          "Residential support for adults, delivered with dignity and consistency.",
        image: "/images/services/adultResidential.jpeg",
        imagePrompt:
          "A bright, welcoming shared kitchen in an adult residential home, tidy and homey, no people in frame, soft daylight. Photorealistic, architectural interior photography style, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Supported Independent Living",
        description:
          "Structured support for individuals living independently with guided assistance.",
        image: "/images/services/support.jpeg",
        imagePrompt:
          "A cozy, well-organized studio apartment interior, single-occupant living space, no people, natural light. Photorealistic, architectural interior photography style, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Transitional Support",
        description:
          "Support that helps individuals move confidently between levels of care.",
        image:
          "/images/services/Support_worker_and_client_activity_202607191117.jpeg",
        imagePrompt:
          "A support worker and client reviewing a simple transition checklist together at a table, collaborative mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "24-Hour Support",
        description:
          "Around-the-clock support for individuals who need continuous care.",
        image: "/images/services/overnight.jpeg",
        imagePrompt:
          "A support worker quietly present in a softly lit living room in the evening, calm and attentive, warm lamp light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Individualized Care Planning",
        description:
          "Care plans built specifically around each individual's needs and goals.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_6.jpeg",
        imagePrompt:
          "A support worker and coordinator reviewing a care plan document together at a table, focused and collaborative, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Life Skills Development",
        description:
          "Ongoing coaching in the skills that support independent living.",
        image:
          "/images/services/Caregiver_and_adult_preparing_meal_202607191117_7.jpeg",
        imagePrompt:
          "A support worker teaching a resident a simple household skill in a shared kitchen, hands-on moment, natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Integration",
        description:
          "Support connecting residents to community life beyond the home.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_7.jpeg",
        imagePrompt:
          "A support worker and resident heading out the door together for a community outing, relaxed mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "family-services",
    title: "Family Services",
    header: "Family Services",
    description:
      "Support that strengthens and empowers the whole family, not just the individual receiving care.",
    heroImage: "/images/services/Family_laughing_on_couch_202607191117.jpeg",
    heroImagePrompt:
      "A family in conversation with a care coordinator around a living room coffee table, a tablet or notebook visible but not the focus, warm and attentive body language on all sides. Soft daylight through a nearby window. Medium-wide shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Parent Support",
        description:
          "Guidance and support for parents navigating care for a loved one.",
        image:
          "/images/services/Support_worker_and_adult_conversing_202607191117_4.jpeg",
        imagePrompt:
          "A care coordinator sitting with a parent in a living room, warm and attentive conversation, soft daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Family Navigation",
        description:
          "Help finding the way through a complex care and support system.",
        image: "/images/services/Home_care_support_worker_in_202607191117.jpeg",
        imagePrompt:
          "A care coordinator pointing to a resource guide while a family member looks on at a table, collaborative mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Advocacy",
        description:
          "Standing beside families to make sure their voice is heard.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_8.jpeg",
        imagePrompt:
          "A care coordinator and family member in focused conversation at a table, attentive and supportive body language, natural light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Care Coordination",
        description:
          "Coordinated support that keeps every part of a care plan connected.",
        image:
          "/images/services/Home_care_support_worker_in_202607191117_6.jpeg",
        imagePrompt:
          "A care coordinator on a phone call while reviewing notes at a desk, focused and organized, bright office light. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Resources",
        description:
          "Connections to the community resources families need most.",
        image:
          "/images/services/Support_worker_client_collaborat_202607191117_2.jpeg",
        imagePrompt:
          "A care coordinator handing a family member a folder of resources at a table, warm exchange, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Family Respite",
        description:
          "Relief and support that gives the whole family room to breathe.",
        image: "/images/family.jpeg",
        imagePrompt:
          "A family relaxing together on a couch while a support worker engages nearby, calm and warm mood, soft light. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
  {
    slug: "transportation-services",
    title: "Transportation Services",
    header: "Transportation Services",
    description:
      "Dependable transportation that keeps individuals connected to appointments, community, and daily life.",
    heroImage: "/images/services/transportationHero.jpeg",
    heroImagePrompt:
      "A support worker helping a client into the passenger seat of a car in a driveway, relaxed and courteous body language, or the two of them mid-conversation while riding together with seatbelts visible. Natural daylight, candid angle. Medium shot. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
    heroImageAspectRatio: "16:9",
    points: [
      {
        title: "Medical Appointments",
        description:
          "Reliable rides to medical appointments, on time and stress-free.",
        image: "/images/services/medical.jpeg",
        imagePrompt:
          "A support worker helping a client out of a car in front of a clinic entrance, courteous and calm, natural daylight. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Shopping",
        description:
          "Dependable transportation for errands and shopping trips.",
        image: "/images/services/groceries.jpeg",
        imagePrompt:
          "A support worker loading grocery bags into a car trunk while a client waits nearby, relaxed mood, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Community Activities",
        description:
          "Rides that keep individuals connected to community programs and events.",
        image: "/images/services/adultWalk.jpeg",
        imagePrompt:
          "A support worker and client arriving together at a community center entrance, relaxed and cheerful, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "School Programs",
        description:
          "Dependable transportation to and from school and youth programs.",
        image: "/images/services/childWalk.jpeg",
        imagePrompt:
          "A support worker walking a young person to a school entrance, courteous and attentive, morning daylight. Photorealistic, documentary photography style, 50mm lens, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
      {
        title: "Recreational Activities",
        description:
          "Rides to the recreational activities that bring joy and connection.",
        image: "/images/services/adultCar.jpeg",
        imagePrompt:
          "A support worker helping a client into a car with sports or hobby gear visible, relaxed and cheerful, natural daylight. Photorealistic, documentary photography style, 85mm lens, shallow depth of field, natural light, high detail, no text or logos in frame.",
        imageAspectRatio: "4:3",
      },
    ],
  },
];
