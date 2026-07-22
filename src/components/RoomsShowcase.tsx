import Link from 'next/link';
import { rooms } from '@/data/rooms';
import RoomImage from './RoomImage';

export default function RoomsShowcase() {
  return (
    <section className="grid grid-cols-1 gap-6 px-12 py-9 pb-16 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <div
          key={room.key}
          className="flex flex-col rounded-3xl border border-brand-line bg-white p-3 shadow-[0_4px_20px_rgba(20,15,10,0.05)]"
        >
          <RoomImage room={room} className="h-[220px]" />
          <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <div className="font-display text-lg font-bold text-brand-ink">{room.name}</div>
              <div className="whitespace-nowrap text-right text-sm font-bold text-brand-accent">
                GHS {room.pricePerNight}
                <span className="font-medium text-brand-muted-2"> / night</span>
              </div>
            </div>
            <div className="mb-4 text-[13px] font-semibold text-brand-muted-2">{room.bedType} · {room.bathroom} bathroom</div>
            <p className="mb-4 text-sm leading-[1.6] text-brand-muted">{room.roomsDescription}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {room.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-brand-surface px-3 py-1.5 text-xs font-medium text-brand-ink">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/booking?room=${room.key}`}
              className="mt-auto rounded-full bg-brand-accent py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-accent-hover"
            >
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
