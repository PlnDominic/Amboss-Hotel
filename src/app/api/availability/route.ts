import { NextResponse } from 'next/server';
import { rooms } from '@/data/rooms';
import { checkAvailability } from '@/lib/bookings';
import type { RoomKey } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomKey = searchParams.get('roomKey');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  if (!roomKey || !rooms.some((r) => r.key === roomKey) || !checkIn || !checkOut) {
    return NextResponse.json({ error: 'Missing or invalid parameters.' }, { status: 400 });
  }
  if (checkOut <= checkIn) {
    return NextResponse.json({ error: 'checkOut must be after checkIn.' }, { status: 400 });
  }

  const result = checkAvailability(roomKey as RoomKey, checkIn, checkOut);
  return NextResponse.json(result);
}
