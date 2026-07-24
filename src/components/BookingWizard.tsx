'use client';

import { useState, useMemo } from 'react';
import type { Booking, RoomKey } from '@/types';
import { rooms } from '@/data/rooms';
import RoomImage from '@/components/RoomImage';

interface BookingState {
  checkin: string;
  checkout: string;
  guests: number;
  selectedRoom: RoomKey | null;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

const INITIAL_STATE: BookingState = {
  checkin: '',
  checkout: '',
  guests: 1,
  selectedRoom: null,
  name: '',
  email: '',
  phone: '',
  specialRequests: '',
};

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<BookingState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Get current date formatted for date inputs min attribute
  const todayStr = useMemo(() => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }, []);

  const minCheckoutStr = useMemo(() => {
    if (!state.checkin) return todayStr;
    const d = new Date(state.checkin);
    d.setDate(d.getDate() + 1);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }, [state.checkin, todayStr]);

  const nights = useMemo(() => {
    if (!state.checkin || !state.checkout) return 0;
    const start = new Date(state.checkin);
    const end = new Date(state.checkout);
    const diff = end.getTime() - start.getTime();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [state.checkin, state.checkout]);

  const pricingSummary = useMemo(() => {
    if (!state.selectedRoom) return { total: 0 };
    const selectedRoomObj = rooms.find((r) => r.key === state.selectedRoom);
    const roomRate = selectedRoomObj ? selectedRoomObj.pricePerNight : 0;
    return { total: roomRate * (nights || 1) };
  }, [state.selectedRoom, nights]);

  const handleNext = () => {
    const currentErrors: Record<string, string> = {};

    if (step === 1) {
      if (!state.checkin) currentErrors.checkin = 'Check-in date is required';
      if (!state.checkout) currentErrors.checkout = 'Check-out date is required';
      if (state.checkin && state.checkout && nights <= 0) {
        currentErrors.checkout = 'Check-out date must be after check-in date';
      }
      if (!state.selectedRoom) currentErrors.selectedRoom = 'Please select a room type';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    const message = state.specialRequests.trim() || undefined;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomKey: state.selectedRoom,
          name: state.name,
          email: state.email,
          phone: state.phone,
          checkIn: state.checkin,
          checkOut: state.checkout,
          guests: state.guests,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setSubmitError('Please check the highlighted details and try again.');
        setStep(2);
      } else if (res.status === 409) {
        setSubmitError(data.error || 'Those dates are no longer available for this room. Please try different dates or another room.');
      } else if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      } else {
        setConfirmedBooking(data.booking as Booking);
        setStep(3);
      }
    } catch {
      setSubmitError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetWizard = () => {
    setState(INITIAL_STATE);
    setStep(1);
    setConfirmedBooking(null);
    setSubmitError('');
    setErrors({});
  };

  const selectedRoomDetails = rooms.find((r) => r.key === state.selectedRoom);

  return (
    <div className="mx-auto max-w-[1180px] px-6 py-10 md:px-12">
      {/* Step Progress Bar */}
      {step < 3 && (
        <div className="mb-10">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-brand-muted-3">
            <span className={step >= 1 ? 'text-brand-accent' : ''}>1. Dates & Rooms</span>
            <span className={step >= 2 ? 'text-brand-accent' : ''}>2. Personal Details</span>
          </div>
          <div className="mt-3.5 h-1.5 w-full rounded-none bg-brand-surface">
            <div
              className="h-full rounded-none bg-brand-accent transition-all duration-300"
              style={{ width: `${(step - 1) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === 3 && confirmedBooking ? (
        // Step 3: Success / Confirmation Screen
        <div className="mx-auto max-w-[650px] rounded-none border border-brand-line bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-green-50 text-3xl text-green-600">
            ✓
          </div>
          <h2 className="font-display text-3xl font-extrabold text-brand-ink">Booking Confirmed!</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-muted-2">
            Thank you for choosing Anboss Hotel, {confirmedBooking.name}. Your reservation request has been processed successfully.
          </p>

          <div className="my-8 rounded-none bg-brand-surface p-6 text-left">
            <div className="mb-4 flex items-center justify-between border-b border-brand-line pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted-3">Reservation Ref</span>
              <span className="font-mono text-base font-bold text-brand-ink">{confirmedBooking.reference}</span>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-[14px]">
              <div>
                <span className="block text-brand-muted text-xs">Room Type</span>
                <span className="font-semibold text-brand-ink">{selectedRoomDetails?.name}</span>
              </div>
              <div>
                <span className="block text-brand-muted text-xs">Guests</span>
                <span className="font-semibold text-brand-ink">{confirmedBooking.guests} Guests</span>
              </div>
              <div>
                <span className="block text-brand-muted text-xs">Check-in</span>
                <span className="font-semibold text-brand-ink">{confirmedBooking.checkIn}</span>
              </div>
              <div>
                <span className="block text-brand-muted text-xs">Check-out</span>
                <span className="font-semibold text-brand-ink">{confirmedBooking.checkOut}</span>
              </div>
            </div>
            <div className="mt-6 border-t border-brand-line pt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-brand-ink">Total Amount Paid/Due</span>
              <span className="text-lg font-bold text-brand-accent">GHS {pricingSummary.total}</span>
            </div>
          </div>

          <div className="mb-8 text-left text-xs leading-relaxed text-brand-muted-2">
            <h4 className="font-bold text-brand-ink mb-1.5 text-[13px]">Important Information:</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Standard check-out time is 12:00 PM (unless late check-out is requested).</li>
              <li>We&apos;ll be in touch at <strong className="text-brand-ink">{confirmedBooking.email}</strong> to confirm the details of your reservation.</li>
              <li>For modifications or cancellations, please contact us at 0244 066999.</li>
            </ul>
          </div>

          <button
            onClick={resetWizard}
            className="w-full rounded-none bg-brand-accent py-4 text-[15px] font-bold text-white transition-colors hover:bg-brand-accent-hover"
          >
            Make Another Booking
          </button>
        </div>
      ) : (
        // Active Wizard steps
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Main Wizard Form Container */}
          <div className="rounded-none border border-brand-line bg-white p-7 md:p-9 shadow-sm">
            {step === 1 && (
              <div>
                <h2 className="mb-1 font-display text-2xl font-extrabold text-brand-ink">Choose Dates & Room</h2>
                <p className="mb-6.5 text-[14px] text-brand-muted-2">
                  Select your arrival/departure dates and check out our room options in Santasi Apire, Kumasi.
                </p>

                <div className="mb-6.5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Check-in
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={state.checkin}
                      onChange={(e) => setState((prev) => ({ ...prev, checkin: e.target.value }))}
                      className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent"
                    />
                    {errors.checkin && <span className="mt-1 block text-xs text-brand-accent">{errors.checkin}</span>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Check-out
                    </label>
                    <input
                      type="date"
                      min={minCheckoutStr}
                      value={state.checkout}
                      onChange={(e) => setState((prev) => ({ ...prev, checkout: e.target.value }))}
                      className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent"
                    />
                    {errors.checkout && <span className="mt-1 block text-xs text-brand-accent">{errors.checkout}</span>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={state.guests}
                      onChange={(e) =>
                        setState((prev) => ({ ...prev, guests: Math.max(1, parseInt(e.target.value) || 1) }))
                      }
                      className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-muted-3">Select Room Type</h3>
                  {errors.selectedRoom && (
                    <span className="text-xs font-semibold text-brand-accent">{errors.selectedRoom}</span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {rooms.map((room) => {
                    const price = room.pricePerNight;
                    const isSelected = state.selectedRoom === room.key;
                    return (
                      <div
                        key={room.key}
                        onClick={() => setState((prev) => ({ ...prev, selectedRoom: room.key }))}
                        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-none border transition-all md:flex-row ${
                          isSelected
                            ? 'border-brand-accent bg-[#fffdfd] ring-1 ring-brand-accent'
                            : 'border-brand-line hover:border-brand-muted-2'
                        }`}
                      >
                        <div className="w-full md:w-[180px]">
                          <RoomImage room={room} className="h-full min-h-[120px] w-full" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-5.5">
                          <div>
                            <div className="flex items-start justify-between">
                              <h4 className="font-display text-lg font-bold text-brand-ink group-hover:text-brand-accent">
                                {room.name}
                              </h4>
                              <span className="text-lg font-extrabold text-brand-accent">GHS {price} / night</span>
                            </div>
                            <p className="mt-1 text-[13px] leading-relaxed text-brand-muted-2">
                              {room.roomsDescription}
                            </p>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {room.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-none bg-brand-surface px-2.5 py-1 text-[11px] font-medium text-brand-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3.5 right-3.5 flex h-5 w-5 items-center justify-center rounded-none bg-brand-accent text-white text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <h2 className="mb-1 font-display text-2xl font-extrabold text-brand-ink">Contact & Billing Info</h2>
                <p className="mb-6.5 text-[14px] text-brand-muted-2">
                  Please provide your contact details to secure your reservation at Anboss Hotel.
                </p>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={state.name}
                      onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent"
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && <span className="mt-1 block text-xs text-brand-accent">{errors.name}</span>}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={state.email}
                        onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent"
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="mt-1 block text-xs text-brand-accent">{errors.email}</span>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={state.phone}
                        onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent"
                        placeholder="+233 54 188 6633"
                      />
                      {errors.phone && <span className="mt-1 block text-xs text-brand-accent">{errors.phone}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-muted">
                      Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={state.specialRequests}
                      onChange={(e) => setState((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      className="w-full rounded-none border border-brand-input-border bg-white px-4 py-3 text-[14px] outline-none focus:border-brand-accent resize-y"
                      placeholder="e.g. Dietary requirements, quiet room, late check-in notice..."
                    />
                  </div>

                  <div className="mt-2.5 rounded-none border border-brand-line bg-brand-surface p-4">
                    <span className="block text-[14px] font-bold text-brand-ink">Pay at Check-in</span>
                    <span className="text-[12px] text-brand-muted-2">No advance deposit needed.</span>
                  </div>
                </div>
              </form>
            )}

            {submitError && (
              <div className="mt-6 border border-brand-accent/30 bg-[#fff5f5] px-4 py-3 text-sm font-medium text-brand-accent">
                {submitError}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between border-t border-brand-line pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={submitting}
                  className="rounded-none border border-brand-line bg-white px-7 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-none bg-brand-accent px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-accent-hover"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-none bg-brand-accent px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Booking…' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </div>

          {/* Pricing & Dates Summary Column */}
          <div className="rounded-none border border-brand-line bg-white p-7 shadow-sm lg:sticky lg:top-28">
            <h3 className="font-display text-lg font-bold text-brand-ink border-b border-brand-line pb-4">
              Your Booking Summary
            </h3>

            <div className="mt-5 space-y-4 border-b border-brand-line pb-5 text-[14px]">
              <div className="flex justify-between">
                <span className="text-brand-muted">Check-in</span>
                <span className="font-semibold text-brand-ink">{state.checkin || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Check-out</span>
                <span className="font-semibold text-brand-ink">{state.checkout || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Nights</span>
                <span className="font-semibold text-brand-ink">{nights ? `${nights} nights` : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Guests</span>
                <span className="font-semibold text-brand-ink">{state.guests} Guest(s)</span>
              </div>
            </div>

            {selectedRoomDetails ? (
              <div className="mt-5 border-b border-brand-line pb-5">
                <div className="flex justify-between text-[14px]">
                  <div>
                    <span className="font-bold text-brand-ink">{selectedRoomDetails.name}</span>
                    <span className="block text-xs text-brand-muted-2">
                      GHS {selectedRoomDetails.pricePerNight} x {nights || 1} night(s)
                    </span>
                  </div>
                  <span className="font-bold text-brand-ink">GHS {pricingSummary.total}</span>
                </div>
              </div>
            ) : (
              <div className="mt-5 text-center text-xs text-brand-muted-2 border-b border-brand-line pb-5 py-3">
                Select a room type to view details.
              </div>
            )}

            <div className="mt-5 flex items-center justify-between text-brand-ink">
              <span className="text-sm font-bold">Total Estimated Cost</span>
              <span className="text-xl font-extrabold text-brand-accent">GHS {pricingSummary.total}</span>
            </div>
            <span className="mt-2 block text-center text-[11px] text-brand-muted-2">
              All taxes are included.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
