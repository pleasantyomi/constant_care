import { useQuery } from '@tanstack/react-query';
import { optimizedImageUrl, servicesContent } from '@constant-care/shared';
import { getJson } from './api';
import { SITE_URL } from './config';

// Response shapes of the website's /api/v1 endpoints (app/api/v1/*).

export type Service = {
  slug: string;
  title: string;
  header: string;
  description: string;
  heroImageUrl: string;
  note: string | null;
  groups: { title: string; items: string[] }[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
};

export type Opening = {
  id: string;
  title: string;
  category: string;
  location: string;
};

// Services ship inside the app (from packages/shared) so they show instantly
// and offline; the API copy replaces them when it loads, so wording changes
// on the website reach installed apps without a store release.
const bundledServices: Service[] = servicesContent.map((service) => ({
  slug: service.slug,
  title: service.title,
  header: service.header,
  description: service.description,
  heroImageUrl: optimizedImageUrl(SITE_URL, service.heroImage),
  note: service.note ?? null,
  groups: service.groups,
}));

export function useServices() {
  return useQuery({
    queryKey: ['content'],
    queryFn: () => getJson<{ services: Service[] }>('/api/v1/content'),
    select: (data) => data.services,
    initialData: { services: bundledServices },
    initialDataUpdatedAt: 0, // treat bundled copy as stale, refresh in background
  });
}

export function useService(slug: string) {
  const query = useServices();
  return { ...query, data: query.data.find((service) => service.slug === slug) };
}

export function useTeam() {
  return useQuery({
    queryKey: ['team'],
    queryFn: () => getJson<{ members: TeamMember[] }>('/api/v1/team'),
    select: (data) => data.members,
  });
}

export function useOpenings() {
  return useQuery({
    queryKey: ['openings'],
    queryFn: () => getJson<{ openings: Opening[] }>('/api/v1/openings'),
    select: (data) => data.openings,
  });
}

// --- Signed-in referrer -------------------------------------------------

export type MyReferral = {
  id: string;
  clientInitials: string;
  service: string | null;
  urgency: 'Standard' | 'Priority' | 'Urgent' | string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed' | string;
  createdAt: string;
  update: string | null;
  updatedAt: string | null;
};

// Never persisted to the device cache (see _layout.tsx): it's private data.
export function useMyReferrals(token: string | undefined) {
  return useQuery({
    queryKey: ['my-referrals', token],
    queryFn: () =>
      getJson<{ email: string; organization: string | null; referrals: MyReferral[] }>(
        '/api/v1/referrer/referrals',
        { token },
      ),
    enabled: !!token,
    meta: { persist: false },
  });
}
