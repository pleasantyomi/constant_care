# Constant Care Family Services — Website + Admin

> **Use pnpm, not npm.** This repo is a pnpm workspace: the website (repo
> root), the Expo mobile app (`mobile/`, see its README), and code both share
> (`packages/tokens` for colours/fonts, `packages/shared` for content and form
> validation). Vercel builds with pnpm too.

Next.js site for Constant Care Family Services Inc. (New Brunswick), with a
Postgres-backed contact/referral/application pipeline, branded email
notifications, and an admin panel at `/admin`.

## Local setup

```bash
pnpm install
cp .env.example .env.local   # then fill in real values, see below
pnpm db:migrate              # applies the schema to your database
pnpm admin:create "you@example.com" "a-strong-password" "Your Name"
pnpm dev
```

## Environment variables

All variables are documented inline in `.env.example`. Summary of where each
one comes from:

| Variable                                 | Where to get it                                                                                                                                                                                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                           | A Postgres connection string. This project uses [Neon](https://neon.tech) (free tier is fine).                                                                                                                                                                             |
| `GMAIL_USER`                             | The Google Workspace mailbox that sends notifications — `info@constantcarefamilyservices.com`.                                                                                                                                                                             |
| `GMAIL_APP_PASSWORD`                     | A 16-character App Password for that mailbox, **not** the account password (2‑Step Verification blocks plain SMTP login). Generate at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) — requires 2‑Step Verification to be turned on first. |
| `NOTIFICATIONS_EMAIL`                    | Who receives new Contact/Referral/Application emails. Defaults to `GMAIL_USER`.                                                                                                                                                                                            |
| `EMAIL_FROM`                             | The outgoing "from" header. Must be `GMAIL_USER` (or a Workspace alias) — Gmail SMTP rejects anything else.                                                                                                                                                                |
| `BLOB_READ_WRITE_TOKEN`, `BLOB_STORE_ID` | Vercel Blob storage, used for resume uploads on the Careers application form. Add Blob storage from the Vercel dashboard's Storage tab and copy both values in.                                                                                                            |
| `SESSION_SECRET`                         | Random key used to sign admin session cookies. Generate with `openssl rand -base64 32`. Changing this logs every admin out.                                                                                                                                                |
| `NEXT_PUBLIC_SITE_URL`                   | Public site URL, used for absolute links/images in emails.                                                                                                                                                                                                                 |

Why Gmail SMTP instead of a provider like Resend: the domain
(`constantcarefamilyservices.com`) is hosted on Wix, and Resend requires DNS
records on the sending domain that aren't practical to manage there. Gmail
SMTP works with the Google Workspace mailbox the company already owns.

The site is designed to degrade gracefully without these set — forms and the
admin panel show a clear "not configured" message instead of crashing, which
is useful for local UI work without a full backend setup.

## Database

Schema lives in `lib/db/schema.ts` (Drizzle ORM). After changing it:

```bash
pnpm db:generate      # writes a new migration file under drizzle/
pnpm db:migrate       # applies pending migrations to DATABASE_URL
pnpm db:studio        # opens Drizzle Studio to browse data
```

Tables: `admin_users`, `contact_messages`, `referrals`, `applications`,
`newsletter_subscribers`, `job_openings`, `impact_stats`, `team_members`.

## Admin panel

`/admin` requires login — there's no public signup form by design. Accounts
are created from the command line by whoever holds the database credentials:

```bash
pnpm admin:create "you@example.com" "a-strong-password" "Your Name"
```

From the dashboard, admins can:

- View and update the status of Contact messages, Referrals, and Job
  Applications (including downloading the applicant's resume).
- Add/edit/remove **Job Openings** — shown live on the public `/careers` page.
- Add/edit/remove **Impact Stats** — shown live on the public `/about-us` page.
- View newsletter Subscribers.

Both Job Openings and Impact Stats changes appear on the public site
immediately (no redeploy needed) — those pages render dynamically rather than
being statically generated at build time.

Session auth is a signed cookie (HMAC-SHA256 over `SESSION_SECRET`), checked
both in `proxy.ts` (route-level redirect to `/admin/login`) and again inside
every admin Server Action, so a mutation can't be triggered even if the route
guard were ever bypassed.

## First admin account

An initial admin account was created during setup:

- Email: `admin@constantcarefamilyservices.com`
- Password: set directly by the client after handoff.

To change a password later:

```bash
pnpm admin:set-password "admin@constantcarefamilyservices.com" "new-password"
```

Note: the panel exposes contact/referral/application submissions (names,
phone numbers, resumes), so it's worth using a password that isn't easily
guessable rather than something short and common.

## Deployment

Deployed on Vercel. Set all the environment variables above in the Vercel
project's Settings → Environment Variables before the first deploy — the
build succeeds without them, but forms/admin won't work until they're set.
