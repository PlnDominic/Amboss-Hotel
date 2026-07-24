'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSessionCookieName, getSessionToken } from '@/lib/admin-auth';
import { deleteBooking, updateBookingStatus } from '@/lib/bookings';
import type { BookingStatus } from '@/types';

async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const session = cookieStore.get(getSessionCookieName())?.value;
  if (session !== getSessionToken()) {
    redirect('/admin/login');
  }
}

export async function setBookingStatus(id: string, status: BookingStatus): Promise<void> {
  await assertAdmin();
  updateBookingStatus(id, status);
  revalidatePath('/admin/bookings');
}

export async function removeBooking(id: string): Promise<void> {
  await assertAdmin();
  deleteBooking(id);
  revalidatePath('/admin/bookings');
}
