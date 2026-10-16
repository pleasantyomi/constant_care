import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

// --- Admin auth -------------------------------------------------------

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Form submissions ---------------------------------------------------

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 255 }),
  message: text("message").notNull(),
  // new | read | archived
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const referrals = pgTable("referrals", {
  id: uuid("id").defaultRandom().primaryKey(),
  referrerName: varchar("referrer_name", { length: 255 }).notNull(),
  referrerRelationship: varchar("referrer_relationship", {
    length: 255,
  }).notNull(),
  organization: varchar("organization", { length: 255 }),
  referrerPhone: varchar("referrer_phone", { length: 50 }).notNull(),
  referrerEmail: varchar("referrer_email", { length: 255 }).notNull(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientContact: varchar("client_contact", { length: 255 }).notNull(),
  service: varchar("service", { length: 255 }),
  // Standard | Priority | Urgent
  urgency: varchar("urgency", { length: 20 }).notNull(),
  reason: text("reason").notNull(),
  notes: text("notes"),
  consent: boolean("consent").notNull(),
  // new | contacted | in-progress | closed
  status: varchar("status", { length: 20 }).default("new").notNull(),
  // Short progress note shown to the referrer in the app's referral tracker
  // (e.g. "Assessment booked for Oct 17"). Never shown to anyone else.
  referrerUpdate: text("referrer_update"),
  referrerUpdateAt: timestamp("referrer_update_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  position: varchar("position", { length: 255 }),
  resumeUrl: text("resume_url"),
  resumeFilename: text("resume_filename"),
  message: text("message"),
  // new | reviewing | interviewing | hired | rejected
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

// --- Admin-manageable public content -------------------------------------

export const jobOpenings = pgTable("job_openings", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 })
    .default("New Brunswick")
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const impactStats = pgTable("impact_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: varchar("label", { length: 255 }).notNull(),
  value: varchar("value", { length: 100 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  // Blob pathname, not a public URL — the store is private, so photos are
  // served through /api/team/photo/[id]/[version].
  photoPathname: text("photo_pathname"),
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Abuse protection -------------------------------------------------

// One row per (form, client IP) counting submissions in the current window.
// See lib/rate-limit.ts.
export const rateLimits = pgTable("rate_limits", {
  key: varchar("key", { length: 255 }).primaryKey(),
  count: integer("count").default(0).notNull(),
  windowStart: timestamp("window_start").defaultNow().notNull(),
});

export const callbackRequests = pgTable("callback_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  // Preferred slot in Atlantic time, stored as entered (no timezone maths).
  preferredDate: date("preferred_date").notNull(),
  preferredTime: varchar("preferred_time", { length: 5 }).notNull(),
  note: text("note"),
  // Answers from the app's care finder, if the caller came from it.
  careFinder: text("care_finder"),
  // new | scheduled | done | cancelled
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- App sign-in (one-time email codes, bearer sessions) ----------------
// See lib/auth/app-session.ts.

export const authCodes = pgTable("auth_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  codeHash: text("code_hash").notNull(),
  attempts: integer("attempts").default(0).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appSessions = pgTable("app_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  // SHA-256 of the bearer token; the token itself is never stored.
  tokenHash: text("token_hash").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  // referrer (later: family, caregiver)
  role: varchar("role", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastUsedAt: timestamp("last_used_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
});
