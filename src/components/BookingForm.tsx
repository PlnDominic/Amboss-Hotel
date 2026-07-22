'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FormEvent } from 'react';
import { getRoom, rooms } from '@/data/rooms';
import type { Booking, RoomKey } from '@/types';
import RoomImage from './RoomImage';

interface FormState {
  roomKey: RoomKey;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

const inputClass =
  'w-full box-border rounded-xl border border-brand-input-border bg-white px-4 py-3 font-[inherit] text-[15px]';
const labelClass = 'mb-1.5 block text-[13px] font-semibold text-brand-muted';
const errorClass = 'mt-1 text-xs font-medium text-brand-accent';
const stepCard = 'rounded-3xl border border-brand-line bg-white p-7 shadow-[0_4px_20px_rgba(20,15,10,0.05)] sm:p-8';
const stepEyebrow = 'mb-1 text-xs font-bold tracking-[0.1em] text-brand-muted-3 uppercase';
const stepTitle = 'mb-5 font-display text-xl font-bold text-brand-ink';

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isKnownRoomKey(value: string | null): value is RoomKey {
  return !!value && rooms.some((r) => r.key === value);
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get('room');
  const initialRoom: RoomKey = isKnownRoomKey(roomParam) ? roomParam : 'single';

  const [form, setForm] = useState<FormState>({
    roomKey: initialRoom,
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [availability, setAvailability] = useState<{ checked: boolean; available: boolean; remaining: number }>({
    checked: false,
    available: true,
    remaining: 0,
  });
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const room = getRoom(form.roomKey);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const inDate = new Date(`${form.checkIn}T00:00:00`);
    const outDate = new Date(`${form.checkOut}T00:00:00`);
    const diff = Math.round((outDate.getTime() - inDate.getTime()) / 86_400_000);
    return diff > 0 ? diff : 0;
  }, [form.checkIn, form.checkOut]);

  const totalPrice = nights * room.pricePerNight;

  useEffect(() => {
    if (!form.checkIn || !form.checkOut || nights <= 0) {
      setAvailability({ checked: false, available: true, remaining: 0 });
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      const params = new URLSearchParams({
        roomKey: form.roomKey,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      });
      fetch(`/api/availability?${params.toString()}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.available === 'boolean') {
            setAvailability({ checked: true, available: data.available, remaining: data.remaining ?? 0 });
          }
        })
        .catch(() => {});
    }, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [form.roomKey, form.checkIn, form.checkOut, nights]);

  const setField =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const selectRoom = (key: RoomKey) => setForm((prev) => ({ ...prev, roomKey: key }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
      } else if (res.status === 409) {
        setServerError(data.error || 'Those dates are no longer available.');
      } else if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.');
      } else {
        setConfirmedBooking(data.booking as Booking);
      }
    } catch {
      setServerError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmedBooking) {
    const confirmedRoom = getRoom(confirmedBooking.roomKey);
    return (
      <div className="mx-auto max-w-[520px] overflow-hidden rounded-3xl border border-brand-line bg-white shadow-[0_20px_40px_rgba(20,15,10,0.08)]">
        <div className="p-6 pb-0">
          <RoomImage room={confirmedRoom} className="h-[220px]" />
        </div>
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
            ✓
          </div>
          <div className="mb-2 font-display text-2xl font-extrabold text-brand-ink">Booking received!</div>
          <p className="mb-6 text-[15px] leading-[1.6] text-brand-muted">
            Reference <span className="font-bold text-brand-ink">{confirmedBooking.reference}</span>. We&apos;ll
            confirm your {confirmedRoom.name.toLowerCase()} by phone or email shortly.
          </p>
          <div className="flex flex-col gap-2 rounded-2xl bg-brand-surface p-5 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-brand-muted-2">Room</span>
              <span className="font-semibold">{confirmedRoom.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted-2">Check-in</span>
              <span className="font-semibold">{confirmedBooking.checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted-2">Check-out</span>
              <span className="font-semibold">{confirmedBooking.checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted-2">Nights</span>
              <span className="font-semibold">{confirmedBooking.nights}</span>
            </div>
            <div className="flex justify-between border-t border-brand-line pt-2">
              <span className="text-brand-muted-2">Total</span>
              <span className="font-bold text-brand-accent">GHS {confirmedBooking.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const unavailable = availability.checked && !availability.available;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
      <div className="flex flex-col gap-6">
        <div className={stepCard}>
          <div className={stepEyebrow}>Step 1</div>
          <div className={stepTitle}>Choose Your Room</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {rooms.map((r) => {
              const selected = form.roomKey === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => selectRoom(r.key)}
                  aria-pressed={selected}
                  className={`rounded-2xl border-2 p-3 text-left transition-colors ${
                    selected
                      ? 'border-brand-accent bg-white shadow-[0_10px_24px_rgba(179,32,47,0.15)]'
                      : 'border-transparent bg-brand-surface hover:border-brand-line'
                  }`}
                >
                  <div className="relative mb-3">
                    <RoomImage room={r} className="h-[120px]" />
                    {selected && (
                      <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-brand-ink">{r.name}</div>
                  <div className="text-xs font-semibold text-brand-accent">GHS {r.pricePerNight}/night</div>
                </button>
              );
            })}
          </div>
          {errors.roomKey && <p className={errorClass}>{errors.roomKey}</p>}
        </div>

        <div className={stepCard}>
          <div className={stepEyebrow}>Step 2</div>
          <div className={stepTitle}>Your Stay</div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Check‑in</label>
              <input
                required
                type="date"
                min={todayISO()}
                value={form.checkIn}
                onChange={setField('checkIn')}
                className={inputClass}
              />
              {errors.checkIn && <p className={errorClass}>{errors.checkIn}</p>}
            </div>
            <div>
              <label className={labelClass}>Check‑out</label>
              <input
                required
                type="date"
                min={form.checkIn || todayISO()}
                value={form.checkOut}
                onChange={setField('checkOut')}
                className={inputClass}
              />
              {errors.checkOut && <p className={errorClass}>{errors.checkOut}</p>}
            </div>
            <div>
              <label className={labelClass}>Guests</label>
              <input
                required
                type="number"
                min={1}
                max={8}
                value={form.guests}
                onChange={setField('guests')}
                className={inputClass}
              />
              {errors.guests && <p className={errorClass}>{errors.guests}</p>}
            </div>
          </div>

          {nights > 0 && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
                unavailable ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
              }`}
            >
              <span className={`h-2 w-2 flex-none rounded-full ${unavailable ? 'bg-red-500' : 'bg-green-500'}`} />
              {unavailable ? (
                <>No {room.name.toLowerCase()}s available for these dates. Try different dates or another room.</>
              ) : availability.checked ? (
                <>
                  {availability.remaining} {room.name.toLowerCase()}
                  {availability.remaining === 1 ? '' : 's'} available for these dates
                </>
              ) : (
                <>Checking availability…</>
              )}
            </div>
          )}
        </div>

        <div className={stepCard}>
          <div className={stepEyebrow}>Step 3</div>
          <div className={stepTitle}>Your Details</div>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input required type="text" value={form.name} onChange={setField('name')} className={inputClass} />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email</label>
                <input required type="email" value={form.email} onChange={setField('email')} className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input required type="tel" value={form.phone} onChange={setField('phone')} className={inputClass} />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>Message (optional)</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={setField('message')}
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-3xl bg-brand-ink text-white shadow-[0_20px_40px_rgba(20,15,10,0.18)]">
          <div className="p-5 pb-0">
            <RoomImage room={room} className="h-[180px]" />
          </div>
          <div className="p-7">
            <div className="mb-1 text-xs font-bold tracking-[0.1em] text-brand-dark-muted uppercase">
              Anboss Hotel
            </div>
            <div className="mb-5 font-display text-lg font-bold">{room.name}</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-dark-muted">Check‑in</span>
                <span className="font-semibold">{form.checkIn || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-dark-muted">Check‑out</span>
                <span className="font-semibold">{form.checkOut || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-dark-muted">Nights</span>
                <span className="font-semibold">{nights || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-dark-muted">Rate</span>
                <span className="font-semibold">GHS {room.pricePerNight}/night</span>
              </div>
            </div>
            <div className="my-5 border-t border-brand-dark-surface" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-brand-dark-muted">Total</span>
              <span className="font-display text-2xl font-extrabold">GHS {totalPrice.toLocaleString()}</span>
            </div>

            {serverError && <p className="mt-4 text-sm font-medium text-red-300">{serverError}</p>}

            <button
              type="submit"
              disabled={submitting || unavailable}
              className="mt-6 w-full rounded-full bg-brand-accent py-3.5 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Booking…' : 'Confirm Booking'}
            </button>
            <p className="mt-3 text-center text-xs text-brand-dark-muted">
              You won&apos;t be charged yet — we&apos;ll confirm by phone or email.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
