import { createHash } from 'node:crypto';

const COOKIE_NAME = 'anboss_admin_session';

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'anboss-admin';
}

export function isValidPassword(password: string): boolean {
  return password.length > 0 && password === getAdminPassword();
}

export function getSessionCookieName(): string {
  return COOKIE_NAME;
}

export function getSessionToken(): string {
  return createHash('sha256').update(`anboss-admin-session:${getAdminPassword()}`).digest('hex');
}
