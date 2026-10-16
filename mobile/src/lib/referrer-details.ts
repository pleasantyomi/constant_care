import AsyncStorage from '@react-native-async-storage/async-storage';

// Frequent referrers (social workers, clinics) can have their own contact
// details remembered on the device. Only the referrer's details are stored,
// never the client's: client information can include health details, and
// the app keeps nothing sensitive on the phone (MOBILE_APP_PLAN.md §6).

const KEY = 'referrer-details:v1';

export type ReferrerDetails = {
  referrerName: string;
  relationship: string;
  organization: string;
  referrerPhone: string;
  referrerEmail: string;
};

export async function loadReferrerDetails(): Promise<ReferrerDetails | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReferrerDetails) : null;
  } catch {
    return null;
  }
}

export async function saveReferrerDetails(details: ReferrerDetails) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(details));
  } catch {
    // Not worth interrupting a successful referral over.
  }
}

export async function forgetReferrerDetails() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}
