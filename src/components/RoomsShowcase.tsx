import Link from 'next/link';
import { rooms } from '@/data/rooms';
import RoomImage from './RoomImage';

export default function RoomsShowcase() {
  return (
    <section className="px-12 py-10 pb-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.key}
            className="group flex flex-col border border-brand-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(20,15,10,0.12)]"
          >
            <div className="relative h-[260px] overflow-hidden">
              <RoomImage
                room={room}
                className="h-[260px] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute top-4 left-4 bg-brand-ink/85 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
                {room.bedType}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-7">
              <div className="mb-4 font-display text-[22px] leading-tight font-bold text-brand-ink">{room.name}</div>

              <div className="mb-6 text-[12.5px] leading-[1.7] tracking-[0.02em] text-brand-muted-2">
                {room.tags.slice(0, 4).join('  ·  ')}
              </div>

              <div className="mt-auto flex items-end justify-between border-t border-brand-line pt-5">
                <div>
                  <div className="mb-0.5 text-[10.5px] tracking-[0.16em] text-brand-muted-3 uppercase">From</div>
                  <div className="font-display text-2xl font-extrabold text-brand-ink">
                    GHS {room.pricePerNight}
                    <span className="text-[13px] font-medium text-brand-muted-2"> / night</span>
                  </div>
                </div>
                <Link
                  href={`/booking?room=${room.key}`}
                  className="flex items-center gap-2 bg-brand-accent px-5 py-3 text-[13px] font-semibold tracking-[0.06em] text-white uppercase transition-colors hover:bg-brand-accent-hover"
                >
                  Reserve
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
