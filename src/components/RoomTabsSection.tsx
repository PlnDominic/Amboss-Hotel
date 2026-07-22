'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { RoomKey } from '@/types';
import { getRoom, rooms } from '@/data/rooms';
import RoomImage from './RoomImage';

export default function RoomTabsSection() {
  const [roomTab, setRoomTab] = useState<RoomKey>('single');
  const activeRoom = getRoom(roomTab);

  return (
    <>
      <section className="px-12 pt-10">
        <div className="mx-auto flex max-w-[760px] flex-wrap justify-center gap-1.5 rounded-[28px] bg-brand-surface p-2 sm:rounded-full">
          {rooms.map((room) => {
            const active = roomTab === room.key;
            return (
              <button
                key={room.key}
                onClick={() => setRoomTab(room.key)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap ${
                  active ? 'bg-brand-accent text-white' : 'bg-transparent text-brand-muted'
                }`}
              >
                {room.name.replace(' Room', '')}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 px-12 py-9 pb-16 md:grid-cols-[0.9fr_1fr_0.9fr]">
        <RoomImage room={activeRoom} className="h-[340px]" />
        <div className="flex flex-col justify-between rounded-3xl bg-brand-surface p-8">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.1em] text-brand-muted-3 uppercase">Anboss Hotel</div>
            <div className="mb-6 font-display text-[22px] leading-[1.35] font-bold text-brand-ink">
              {activeRoom.homeHeadline}
            </div>
          </div>
          <div>
            <div className="mb-3.5 text-[13px] font-bold tracking-[0.08em] text-brand-muted-3 uppercase">
              Room Details
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted-2">Bed Type</span>
                <span className="font-semibold">{activeRoom.bedType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted-2">Bathroom</span>
                <span className="font-semibold">{activeRoom.bathroom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted-2">Wi‑Fi</span>
                <span className="font-semibold">{activeRoom.wifi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted-2">Breakfast</span>
                <span className="font-semibold">{activeRoom.breakfast}</span>
              </div>
              <div className="flex justify-between border-t border-brand-line pt-2.5">
                <span className="text-brand-muted-2">Rate</span>
                <span className="font-semibold text-brand-accent">GHS {activeRoom.pricePerNight}/night</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-brand-ink p-8 text-white">
          <div>
            <div className="mb-5.5 flex items-start gap-3">
              <div className="h-8.5 w-8.5 flex-none rounded-lg bg-brand-dark-surface" />
              <div>
                <div className="mb-1 text-sm font-bold">Cleanliness</div>
                <div className="text-[13px] leading-[1.5] text-brand-dark-muted">
                  Freshly serviced daily by our housekeeping team.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8.5 w-8.5 flex-none rounded-lg bg-brand-dark-surface" />
              <div>
                <div className="mb-1 text-sm font-bold">Amenities</div>
                <div className="text-[13px] leading-[1.5] text-brand-dark-muted">
                  Air conditioning, flat-screen TV and a work desk.
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/booking?room=${activeRoom.key}`}
            className="mt-6.5 rounded-full bg-brand-accent py-3.5 text-center text-sm font-bold text-white"
          >
            Book Now!
          </Link>
        </div>
      </section>
    </>
  );
}
