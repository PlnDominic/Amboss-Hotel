import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FlourishDivider from '@/components/FlourishDivider';
import RoomImage from '@/components/RoomImage';
import { rooms } from '@/data/rooms';

export const metadata: Metadata = {
  title: 'Rooms & Suites | Anboss Hotel Kumasi',
  description:
    'Explore 17 luxury air-conditioned rooms across four distinct types in Santasi Apre, Kumasi: Single, Double, Deluxe, and Executive.',
};

export default function RoomsPage() {
  return (
    <main className="w-full bg-white">
      {/* ROOMS PAGE HERO BANNER */}
      <section className="relative h-[420px] w-full overflow-hidden bg-brand-dark-surface">
        <Image
          src="/hero-exterior.webp"
          alt="Anboss Hotel Rooms & Suites"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <span className="font-script text-3xl md:text-4xl text-brand-accent">
            Luxury Accommodations
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-white mt-1">
            ROOMS &amp; SUITES
          </h1>
          <FlourishDivider dark />
          <p className="mx-auto mt-3 max-w-[680px] text-xs md:text-sm leading-relaxed text-white/80">
            Discover our 17 well-appointed suites in Santasi Apre, Kumasi. Designed for business travelers, couples, and families seeking refined comfort, air conditioning, and warm Ghanaian hospitality.
          </p>
        </div>
      </section>

      {/* AMENITIES HIGHLIGHT RIBBON */}
      <section className="border-b border-brand-line bg-brand-surface py-6 px-6">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-brand-accent text-white font-bold text-sm">
              ✓
            </span>
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-ink">
                Bed &amp; Breakfast Included
              </h4>
              <p className="text-[11px] text-brand-muted">Fresh gourmet breakfast served every morning</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-brand-accent text-white font-bold text-sm">
              ❄
            </span>
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-ink">
                Air Conditioned Suites
              </h4>
              <p className="text-[11px] text-brand-muted">Individual climate control in every room</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-brand-accent text-white font-bold text-sm">
              📶
            </span>
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-ink">
                High-Speed WiFi
              </h4>
              <p className="text-[11px] text-brand-muted">Unlimited fast wireless internet</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-brand-accent text-white font-bold text-sm">
              🛡
            </span>
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-ink">
                24/7 Gated Security
              </h4>
              <p className="text-[11px] text-brand-muted">Safe, private environment with CCTV</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROOM SHOWCASE LIST */}
      <section className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="flex flex-col gap-20">
          {rooms.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={room.key}
                className="grid grid-cols-1 gap-12 border border-brand-line bg-white p-6 md:p-10 shadow-md lg:grid-cols-2 lg:items-center"
              >
                {/* Image Section */}
                <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative h-[360px] md:h-[420px] w-full overflow-hidden border border-brand-line">
                    <RoomImage room={room} className="h-full w-full object-cover" />
                    <div className="absolute top-4 left-4 bg-brand-accent px-4 py-2 text-xs font-extrabold text-white uppercase tracking-widest shadow">
                      GHS {room.pricePerNight} / NIGHT
                    </div>
                    {room.key === 'deluxe' && (
                      <div className="absolute bottom-4 right-4 bg-brand-ink px-4 py-1.5 text-[11px] font-bold text-white uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className={`flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                      Category {index + 1}
                    </span>
                    <h2 className="mt-1 font-serif text-3xl font-extrabold text-brand-ink">
                      {room.name}
                    </h2>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-extrabold text-brand-accent">
                        GHS {room.pricePerNight}
                      </span>
                      <span className="text-xs text-brand-muted">per night (Taxes &amp; Breakfast included)</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                      {room.roomsDescription}
                    </p>

                    {/* Room Key Features */}
                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-brand-ink border-t border-b border-brand-line py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">✓</span> Free High-Speed WiFi
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">✓</span> Air Conditioning
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">✓</span> Ensuite Bathroom
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">✓</span> Complimentary Breakfast
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">✓</span> Flat-Screen Smart TV
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-accent font-bold">✓</span> Daily Housekeeping
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {room.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-brand-surface border border-brand-line px-3 py-1.5 text-[11px] font-semibold text-brand-ink uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      href="/book"
                      className="block w-full bg-brand-accent px-8 py-3.5 text-center text-xs font-extrabold uppercase tracking-widest text-white transition-colors hover:bg-brand-accent-hover shadow-md sm:w-auto"
                    >
                      BOOK THIS ROOM →
                    </Link>
                    <a
                      href="tel:+233541886633"
                      className="hidden sm:inline-block border border-brand-line bg-brand-surface px-6 py-3.5 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-line"
                    >
                      Inquire via Phone
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="bg-brand-dark-surface py-16 px-6 text-white text-center">
        <div className="mx-auto max-w-[800px]">
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-white">
            Need Help Choosing a Suite?
          </h3>
          <FlourishDivider dark />
          <p className="mt-3 text-xs md:text-sm text-white/80 leading-relaxed">
            Our front desk is available 24/7 to assist with room selection, special arrangements, or corporate group bookings.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="tel:+233541886633"
              className="bg-white/20 backdrop-blur border border-white/60 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-brand-ink"
            >
              Call Front Desk
            </a>
            <Link
              href="/book"
              className="bg-brand-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-brand-accent-hover"
            >
              Reserve Online →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
