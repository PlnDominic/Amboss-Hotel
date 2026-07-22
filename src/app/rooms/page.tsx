import type { Metadata } from 'next';
import Link from 'next/link';
import { rooms } from '@/data/rooms';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Rooms at Anboss Hotel',
  description: '14 well-appointed single, double and twin bedrooms in Santasi Apre, Kumasi.',
};

export default function RoomsPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-12 pt-16 pb-5 text-center">
        <div className="mb-3 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Accommodation</div>
        <div className="mb-4 font-display text-[44px] font-extrabold text-brand-ink">rooms</div>
        <div className="mx-auto max-w-[600px] text-base leading-[1.7] text-brand-muted">
          14 well-appointed single, double and twin bedrooms, each air-conditioned, modern and
          comfortable, with bed &amp; breakfast included.
        </div>
      </section>

      {rooms.map((room, index) => {
        const imageFirst = index % 2 === 0;
        const isFirst = index === 0;
        const isLast = index === rooms.length - 1;

        const image = <ImagePlaceholder label={`${room.name} photo`} className="h-[340px]" />;
        const details = (
          <div>
            <div className="mb-3.5 font-display text-2xl font-bold text-brand-ink">{room.name}</div>
            <p className="mb-5 text-[15px] leading-[1.75] text-brand-muted">{room.roomsDescription}</p>
            <div className="mb-6.5 flex flex-wrap gap-2.5">
              {room.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-surface px-4 py-2 text-[13px] font-medium text-brand-ink">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-brand-accent px-6.5 py-3 text-sm font-semibold text-white"
            >
              Enquire
            </Link>
          </div>
        );

        return (
          <section
            key={room.key}
            className={`grid grid-cols-1 items-center gap-14 px-12 md:grid-cols-2 ${
              isFirst ? 'pt-12 pb-12' : isLast ? 'pt-5 pb-20' : 'pt-5 pb-5'
            }`}
          >
            {imageFirst ? (
              <>
                {image}
                {details}
              </>
            ) : (
              <>
                {details}
                {image}
              </>
            )}
          </section>
        );
      })}
    </main>
  );
}
