'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rooms } from '@/data/rooms';

export default function QuickSearchBar() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [roomType, setRoomType] = useState('single');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/book`);
  };

  return (
    <div className="relative z-30 mx-auto -mt-16 max-w-[1140px] px-4">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-[0_15px_45px_rgba(0,0,0,0.12)] border border-brand-line md:grid-cols-6 md:items-end"
      >
        {/* Email Field */}
        <div className="md:col-span-1">
          <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            E-mail <span className="text-[10px] text-brand-muted-3">ⓘ</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your E-mail"
            className="w-full rounded-lg border border-brand-input-border bg-brand-surface/40 px-3 py-2.5 text-[13px] outline-none focus:border-brand-accent"
          />
        </div>

        {/* Room Type */}
        <div className="md:col-span-1">
          <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Room Type <span className="text-[10px] text-brand-muted-3">ⓘ</span>
          </label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full rounded-lg border border-brand-input-border bg-brand-surface/40 px-3 py-2.5 text-[13px] outline-none focus:border-brand-accent"
          >
            {rooms.map((r) => (
              <option key={r.key} value={r.key}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div className="md:col-span-1">
          <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Check-in <span className="text-[10px] text-brand-muted-3">ⓘ</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border border-brand-input-border bg-brand-surface/40 px-3 py-2.5 text-[13px] outline-none focus:border-brand-accent"
          />
        </div>

        {/* Check-out */}
        <div className="md:col-span-1">
          <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Check-out <span className="text-[10px] text-brand-muted-3">ⓘ</span>
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border border-brand-input-border bg-brand-surface/40 px-3 py-2.5 text-[13px] outline-none focus:border-brand-accent"
          />
        </div>

        {/* Guests */}
        <div className="md:col-span-1">
          <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Guests
          </label>
          <div className="relative">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-lg border border-brand-input-border bg-brand-surface/40 px-3 py-2.5 text-[13px] outline-none focus:border-brand-accent"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-1">
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-accent py-3 text-[13px] font-extrabold text-white tracking-wider uppercase transition-colors hover:bg-brand-accent-hover shadow-md cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>
      </form>
    </div>
  );
}
