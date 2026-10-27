import 'server-only';

import {createHmac, scryptSync, timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';

const cookieName = 'treetech_admin_session';
const maxAgeSeconds = 60 * 60 * 12;

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET);
}

export function verifyAdminCredentials(email: string, password: string) {
  if (!isAdminAuthConfigured() || email.trim().toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) return false;
  const parts = process.env.ADMIN_PASSWORD_HASH?.split('$') || [];
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  try {
    const actual = scryptSync(password, Buffer.from(parts[1], 'hex'), 64);
    const expected = Buffer.from(parts[2], 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch { return false; }
}

export async function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = Buffer.from(JSON.stringify({sub: process.env.ADMIN_EMAIL, exp: expiresAt})).toString('base64url');
  const signature = sign(payload);
  const jar = await cookies();
  jar.set(cookieName, `${payload}.${signature}`, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin', maxAge: maxAgeSeconds});
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.set(cookieName, '', {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin', maxAge: 0});
}

export async function isAdminAuthenticated() {
  if (!isAdminAuthConfigured()) return false;
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {sub?: string; exp?: number};
    return data.sub === process.env.ADMIN_EMAIL && typeof data.exp === 'number' && data.exp > Date.now() / 1000;
  } catch { return false; }
}

function sign(payload: string) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || '').update(payload).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a); const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

