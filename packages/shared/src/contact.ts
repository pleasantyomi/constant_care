// Public contact details, shared by the website, emails, and the mobile app.
export const contact = {
  phoneDisplay: "+1 (506) 300-0432",
  phoneE164: "+15063000432",
  phoneSchema: "+1-506-300-0432", // schema.org telephone format
  email: "info@constantcarefamilyservices.com",
  region: "New Brunswick",
  officeHours: "Monday - Friday: 8:00 AM - 5:30 PM",
} as const;

export const telHref = `tel:${contact.phoneE164}`;
export const mailtoHref = `mailto:${contact.email}`;
