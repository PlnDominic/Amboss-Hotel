import { NextResponse } from 'next/server';
import { getSessionCookieName } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 });
  response.cookies.delete(getSessionCookieName());
  return response;
}
