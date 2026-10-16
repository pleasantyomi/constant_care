# Constant Care: Mobile App

Expo (React Native) app for Constant Care Family Services Inc. It lives in
the same pnpm workspace as the website and shares its design tokens, content,
and form validation. See `../MOBILE_APP_PLAN.md` for the full plan.

## Run it on your phone

1. Install the **Expo Go** app on your phone (App Store / Google Play).
2. From the repo root:

   ```bash
   pnpm install
   pnpm app:start        # same as: pnpm --filter mobile start
   ```

3. Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android).
   Your phone and computer must be on the same network.

### Pointing the app at your local website

By default the app talks to the live website (`https://constant-care.vercel.app`).
The app's `/api/v1/*` endpoints only exist once this branch is deployed, so
until then, run the website locally and point the app at it:

1. In one terminal, from the repo root: `pnpm dev`. Note the **Network** URL
   it prints, e.g. `http://192.168.1.20:3000` ("localhost" won't work, because
   on the phone that means the phone itself).
2. Create `mobile/.env.local`:

   ```
   EXPO_PUBLIC_SITE_URL=http://192.168.1.20:3000
   ```

3. Restart `pnpm app:start`.

Forms submitted this way go to whatever database your local `.env.local`
uses, and send real notification emails.

## Where things live

```
src/app/             screens (Expo Router: every file is a route)
  (tabs)/            Home, Services, Refer, Careers, Contact
  services/[slug]    service detail
  team.tsx           Our Team
src/components/
  ui/                Button, Input, Select, Card… (mirror the website's components/ui)
  brand/             Banner, SectionHeader, AccentDash, FadeIn, EmptyState…
src/lib/             API client, data hooks, form hook
src/global.css       Tailwind + Uniwind entry; imports the brand theme
```

Shared with the website (repo root):

- `packages/tokens`: colours, radii, fonts, motion. **Edit there**, then run
  `pnpm tokens:build` to regenerate the website's and the app's CSS.
- `packages/shared`: services content, form schemas and copy, contact details.
- `public/fonts`, `public/logo`: the app loads these directly.

## Styling

Tailwind class names via [Uniwind](https://docs.uniwind.dev) (Tailwind v4,
the same version the website uses), so `bg-primary`, `text-muted-foreground`,
and `rounded-lg` mean the same thing on both. Rules:

- No hex codes or font names in components. Use classes, or `color` from
  `src/lib/theme.ts` where a prop needs a colour value (icons, tab bar).
- Font weights are families, not `font-bold`: use `font-sans`,
  `font-sans-medium`, `font-sans-bold`, `font-sans-heavy`. React Native picks
  fonts by family name, so `font-bold` won't use Helvetica Neue Bold.

## Checks

```bash
pnpm --filter mobile exec tsc --noEmit   # typecheck
pnpm --filter mobile lint                # expo lint
pnpm --filter mobile exec expo-doctor    # dependency/config health
```

Expo changes a lot between SDKs: read `AGENTS.md` and the versioned docs
before touching Expo APIs.
