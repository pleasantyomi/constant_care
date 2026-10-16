// Form copy and options shared by the website forms and the mobile app, so
// both say the same thing.

export const careerPositions = [
  "Youth Support Worker",
  "Behavioural Analyst",
  "Personal Support Worker (PSW)",
  "Disability Support Worker (DSW)",
  "Respite Worker",
  "Care Coordinator",
  "Administrative / Office Role",
  "Other",
] as const;

export const formCopy = {
  referral: {
    title: "Online Referral Form",
    intro:
      "Please share as much detail as you can: it helps us respond quickly and match the right support.",
    consent:
      "I confirm that the client (or their guardian) has consented to this information being shared with Constant Care Family Services Inc. for the purpose of arranging care.",
    submit: "Submit a Referral",
    sending: "Submitting...",
    success: "Thank you! We\u2019ve received the referral and will follow up promptly.",
  },
  contact: {
    submit: "Send Message",
    sending: "Sending...",
    success: "Thanks! We\u2019ve received your message and will be in touch soon.",
  },
  application: {
    title: "Apply Now",
    intro:
      "Tell us a bit about yourself. If a role matching your interests isn\u2019t open right now, we\u2019ll keep your application on file and reach out when one is.",
    submit: "Apply Now",
    sending: "Sending...",
    success:
      "Thank you for applying! We’ve received your application and will be in touch.",
  },
  genericError: "Something went wrong. Please try again.",
} as const;
