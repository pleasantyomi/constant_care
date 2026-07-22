// Stateless, signed session cookie. Verified with the Web Crypto API (not
// Node's `crypto` module) so the exact same code runs in both API routes
// (Node runtime) and middleware (Edge runtime) without a database round
// trip on every request — a session table isn't needed for a small admin
// team; sessions just expire on their own after SESSION_TTL_SECONDS.

export const SESSION_COOKIE = "cc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

type SessionPayload = {
  userId: string;
  email: string;
  exp: number; // unix seconds
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not set — required to sign admin sessions.",
    );
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function base64UrlEncode(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  arr.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "===".slice((padded.length + 3) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function createSessionToken(user: {
  id: string;
  email: string;
}) {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(payloadJson));

  const key = await getSecretKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  );

  return `${payloadB64}.${base64UrlEncode(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return null;

  try {
    const key = await getSecretKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signatureB64),
      new TextEncoder().encode(payloadB64),
    );
    if (!valid) return null;

    const payload: SessionPayload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payloadB64)),
    );
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
