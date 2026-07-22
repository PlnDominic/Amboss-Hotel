import { NextResponse } from 'next/server';
import { rooms } from '@/data/rooms';
import { checkAvailability, createBooking } from '@/lib/bookings';
import { sendBookingNotificationEmail } from '@/lib/mailer';
import type { RoomKey } from '@/types';

export const dynamic = 'force-dynamic';

const ROOM_KEYS = rooms.map((r) => r.key);

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { roomKey, name, email, phone, checkIn, checkOut, guests, message } = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  if (typeof roomKey !== 'string' || !ROOM_KEYS.includes(roomKey as RoomKey)) {
    errors.roomKey = 'Select a valid room type.';
  }
  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (typeof phone !== 'string' || phone.trim().length < 7) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (typeof checkIn !== 'string' || !isValidDate(checkIn)) {
    errors.checkIn = 'Select a valid check-in date.';
  }
  if (typeof checkOut !== 'string' || !isValidDate(checkOut)) {
    errors.checkOut = 'Select a valid check-out date.';
  }

  const guestsNum = Number(guests);
  if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 8) {
    errors.guests = 'Guests must be between 1 and 8.';
  }

  if (!errors.checkIn && !errors.checkOut) {
    const todayStr = new Date().toISOString().slice(0, 10);
    if ((checkIn as string) < todayStr) {
      errors.checkIn = 'Check-in cannot be in the past.';
    }
    if ((checkOut as string) <= (checkIn as string)) {
      errors.checkOut = 'Check-out must be after check-in.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { available } = checkAvailability(roomKey as RoomKey, checkIn as string, checkOut as string);
  if (!available) {
    return NextResponse.json(
      {
        error: `No ${roomKey} rooms are available for those dates. Please try different dates or another room type.`,
      },
      { status: 409 },
    );
  }

  const booking = createBooking({
    roomKey: roomKey as RoomKey,
    name: (name as string).trim(),
    email: (email as string).trim(),
    phone: (phone as string).trim(),
    checkIn: checkIn as string,
    checkOut: checkOut as string,
    guests: guestsNum,
    message: typeof message === 'string' && message.trim() ? message.trim() : undefined,
  });

  await sendBookingNotificationEmail(booking);

  return NextResponse.json({ booking }, { status: 201 });
}
