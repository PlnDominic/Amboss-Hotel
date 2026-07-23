'use client';

import Image from 'next/image';
import Link from 'next/link';
import FlourishDivider from '@/components/FlourishDivider';
import QuickSearchBar from '@/components/QuickSearchBar';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import RoomImage from '@/components/RoomImage';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { rooms } from '@/data/rooms';
import { galleryImages } from '@/data/gallery';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO BANNER SECTION */}
      <section className="relative h-[620px] w-full overflow-hidden">
        <Image
          src="/hero-exterior.webp"
          alt="Anboss Hotel Exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-script text-[64px] md:text-[84px] font-normal leading-none text-white drop-shadow-md">
            Welcome to Anboss Hotel
          </h1>
          <div className="mt-3 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-white/60" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">
              SANTASI APRE, KUMASI
            </span>
            <span className="h-[1px] w-12 bg-white/60" />
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="tel:+233244066999"
              className="rounded-none bg-white/20 backdrop-blur-md border border-white/60 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-brand-ink"
            >
              Call Us
            </a>
            <Link
              href="/book"
              className="rounded-none bg-brand-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-brand-accent-hover"
            >
              Book Your Stay →
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK SEARCH BAR */}
      <QuickSearchBar />

      {/* WELCOME TO ANBOSS HOTEL & ROOM CARDS SECTION */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-[1240px] text-center">
          <h2 className="font-serif text-3xl font-extrabold uppercase tracking-wider text-brand-ink">
            WELCOME TO ANBOSS HOTEL
          </h2>
          <FlourishDivider />
          <p className="mx-auto mt-4 max-w-[720px] text-sm leading-relaxed text-brand-muted">
            On arrival you&apos;re welcomed into a spacious, modern air-conditioned home in Santasi Apre, Kumasi, with well-appointed single, double, deluxe, and executive rooms built for corporate travel and easy getaways alike.
          </p>

          {/* 4 Column Room Cards Grid (Sharp Square Edges) */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room) => (
              <div
                key={room.key}
                className="group flex flex-col justify-between overflow-hidden rounded-none border border-brand-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <RoomImage room={room} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {room.key === 'deluxe' && (
                      <span className="absolute top-3 right-3 rounded-none bg-brand-accent px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-5 text-left">
                    <h3 className="font-serif text-base font-bold text-brand-ink">{room.name}</h3>
                    <div className="mt-1 font-display text-base font-extrabold text-brand-accent">
                      GHS {room.pricePerNight} <span className="text-xs font-normal text-brand-muted">/ night</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-brand-muted line-clamp-2">
                      {room.roomsDescription}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {room.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-none bg-brand-surface px-2 py-0.5 text-[10px] font-medium text-brand-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 text-left">
                  <Link
                    href="/book"
                    className="block w-full rounded-none bg-brand-ink py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-accent"
                  >
                    Book Room
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/rooms"
              className="inline-block rounded-none bg-brand-accent px-9 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-brand-accent-hover"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* RESTORED GALLERY SECTION WITH STAGGERED MOSAIC LAYOUT (Sharp Square Edges) */}
      <section className="bg-brand-surface py-20 px-6">
        <div className="mx-auto max-w-[1240px] text-center">
          <span className="font-script text-3xl text-brand-accent">A Closer Look</span>
          <h2 className="font-serif text-3xl font-extrabold uppercase tracking-wider text-brand-ink mt-1">
            HOTEL GALLERY
          </h2>
          <FlourishDivider />

          {/* Staggered Mosaic Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              {[galleryImages[0], galleryImages[4]].map((img, idx) => (
                <div
                  key={img.id}
                  className={`group relative overflow-hidden rounded-none bg-black/30 shadow-md ${
                    idx === 0 ? 'h-[360px]' : 'h-[240px]'
                  }`}
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <ImagePlaceholder label={img.label} className="h-full w-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  <div className="absolute bottom-5 left-5 right-5 text-left transform transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                      Anboss Gallery
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{img.label}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              {[galleryImages[2], galleryImages[5]].map((img, idx) => (
                <div
                  key={img.id}
                  className={`group relative overflow-hidden rounded-none bg-black/30 shadow-md ${
                    idx === 0 ? 'h-[240px]' : 'h-[360px]'
                  }`}
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <ImagePlaceholder label={img.label} className="h-full w-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  <div className="absolute bottom-5 left-5 right-5 text-left transform transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                      Anboss Gallery
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{img.label}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              {[galleryImages[3], galleryImages[1]].map((img, idx) => (
                <div
                  key={img.id}
                  className={`group relative overflow-hidden rounded-none bg-black/30 shadow-md ${
                    idx === 0 ? 'h-[360px]' : 'h-[240px]'
                  }`}
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <ImagePlaceholder label={img.label} className="h-full w-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  <div className="absolute bottom-5 left-5 right-5 text-left transform transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                      Anboss Gallery
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{img.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLASSY TESTIMONIALS SLIDER */}
      <TestimonialsSlider />
    </main>
  );
}
