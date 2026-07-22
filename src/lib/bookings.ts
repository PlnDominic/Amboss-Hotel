import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { rooms } from '@/data/rooms';
import type { Booking, BookingStatus, RoomKey } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'bookings.json');

function ensureStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}

export function readBookings(): Booking[] {
  ensureStore();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]): void {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf8');
}

function nightsBetween(checkIn: string, checkOut: string): number {
  const inDate = new Date(`${checkIn}T00:00:00`);
  const outDate = new Date(`${checkOut}T00:00:00`);
  return Math.round((outDate.getTime() - inDate.getTime()) / 86_400_000);
}

function datesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart < bEnd && bStart < aEnd;
}

function getBookedUnits(roomKey: RoomKey, checkIn: string, checkOut: string): number {
  return readBookings().filter(
    (b) => b.roomKey === roomKey && b.status !== 'cancelled' && datesOverlap(b.checkIn, b.checkOut, checkIn, checkOut),
  ).length;
}

export interface AvailabilityResult {
  available: boolean;
  remaining: number;
  totalUnits: number;
}

export function checkAvailability(roomKey: RoomKey, checkIn: string, checkOut: string): AvailabilityResult {
  const room = rooms.find((r) => r.key === roomKey);
  const totalUnits = room?.totalUnits ?? 0;
  const booked = getBookedUnits(roomKey, checkIn, checkOut);
  const remaining = Math.max(totalUnits - booked, 0);
  return { available: remaining > 0, remaining, totalUnits };
}

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ANB-${code}`;
}

export interface CreateBookingInput {
  roomKey: RoomKey;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
}

/**
 * Not safe against concurrent writes from separate processes (e.g. multiple
 * serverless instances) — fine for a single long-running Node.js server, but
 * a real multi-instance deployment should swap this file store for a database.
 */
export function createBooking(input: CreateBookingInput): Booking {
  const room = rooms.find((r) => r.key === input.roomKey);
  if (!room) {
    throw new Error('Unknown room type');
  }

  const nights = nightsBetween(input.checkIn, input.checkOut);
  const booking: Booking = {
    id: randomUUID(),
    reference: generateReference(),
    roomKey: input.roomKey,
    name: input.name,
    email: input.email,
    phone: input.phone,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    message: input.message,
    nights,
    totalPrice: nights * room.pricePerNight,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const bookings = readBookings();
  bookings.push(booking);
  writeBookings(bookings);
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const bookings = readBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], status };
  writeBookings(bookings);
  return bookings[index];
}

export function deleteBooking(id: string): boolean {
  const bookings = readBookings();
  const next = bookings.filter((b) => b.id !== id);
  if (next.length === bookings.length) return false;
  writeBookings(next);
  return true;
}
