'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FormEvent } from 'react';
import { getRoom, rooms } from '@/data/rooms';
import type { Booking, RoomKey } from '@/types';

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
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

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
      <div className="text-center">
        <div className="mb-3 font-display text-[22px] font-extrabold text-brand-ink">Booking received!</div>
        <p className="mb-6 text-[15px] leading-[1.6] text-brand-muted">
          Your reference number is{' '}
          <span className="font-bold text-brand-ink">{confirmedBooking.reference}</span>. We&apos;ll confirm your{' '}
          {confirmedRoom.name.toLowerCase()} by phone or email shortly.
        </p>
        <div className="mx-auto flex max-w-[360px] flex-col gap-2 rounded-2xl bg-white p-5 text-left text-sm">
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
    );
  }

  const unavailable = availability.checked && !availability.available;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-0.5 font-display text-xl font-bold text-brand-ink">Reserve Your Room</div>

      <div>
        <label className={labelClass}>Room Type</label>
        <select value={form.roomKey} onChange={setField('roomKey')} className={inputClass}>
          {rooms.map((r) => (
            <option key={r.key} value={r.key}>
              {r.name} — GHS {r.pricePerNight}/night
            </option>
          ))}
        </select>
        {errors.roomKey && <p className={errorClass}>{errors.roomKey}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
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
      </div>

      {nights > 0 && (
        <div className={`rounded-xl px-4 py-3 text-sm ${unavailable ? 'bg-red-50 text-red-700' : 'bg-white text-brand-ink'}`}>
          {unavailable ? (
            <>No {room.name.toLowerCase()}s available for these dates. Try different dates or another room type.</>
          ) : (
            <>
              {nights} night{nights > 1 ? 's' : ''} × GHS {room.pricePerNight} ={' '}
              <span className="font-bold">GHS {totalPrice.toLocaleString()}</span>
              {availability.checked && (
                <span className="ml-2 text-brand-muted-2">
                  ({availability.remaining} room{availability.remaining === 1 ? '' : 's'} left)
                </span>
              )}
            </>
          )}
        </div>
      )}

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

      {serverError && <p className={errorClass}>{serverError}</p>}

      <button
        type="submit"
        disabled={submitting || unavailable}
        className="mt-1.5 rounded-full bg-brand-accent py-3.5 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Booking…' : 'Confirm Booking'}
      </button>
    </form>
  );
}
