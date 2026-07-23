import Image from 'next/image';
import Link from 'next/link';
import GalleryImageTile from '@/components/GalleryImageTile';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import RoomImage from '@/components/RoomImage';
import RoomsShowcase from '@/components/RoomsShowcase';
import { galleryImages } from '@/data/gallery';
import { getRoom } from '@/data/rooms';

export default function HomePage() {
  return (
    <main>
      <section className="relative ml-[calc(50%-50vw)] flex min-h-[620px] w-screen flex-col justify-end overflow-hidden md:min-h-[720px]">
        <Image
          src="/hero-exterior.webp"
          alt="Anboss Hotel exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-8 pt-32 pb-14 md:px-14 md:pb-20">
          <div className="max-w-[560px]">
          <div className="mb-5.5 font-display text-[54px] leading-[1.15] font-extrabold text-white">
            Find your
            <br />
            best stay.
          </div>
          <div className="mb-7.5 max-w-[440px] text-base leading-[1.7] text-white/85">
            On arrival you&apos;re welcomed into a spacious, modern air-conditioned home in Santasi Apre,
            Kumasi, with 17 well-appointed rooms built for corporate travel and easy getaways alike.
          </div>
          <div className="mb-8.5 flex gap-3">
            <a
              href="tel:+233541886633"
              className="rounded-full bg-white px-6.5 py-3.5 text-[15px] font-semibold text-brand-ink"
            >
              Call Us
            </a>
            <Link
              href="/booking"
              className="flex items-center gap-2.5 rounded-full bg-brand-accent px-6.5 py-3.5 text-[15px] font-semibold text-white"
            >
              Book Now
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] text-brand-accent">
                →
              </span>
            </Link>
          </div>
          <div className="mb-3.5 text-xs tracking-[0.08em] text-white/70 uppercase">Why guests choose us</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white">
            <span>Pool Deck</span>
            <span className="text-white/40">·</span>
            <span>Free Breakfast</span>
            <span className="text-white/40">·</span>
            <span>Free Wi‑Fi</span>
            <span className="text-white/40">·</span>
            <span>Air Conditioning</span>
          </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 px-12 py-14 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr]">
        <div className="min-w-0">
          <div className="relative">
            <RoomImage room={getRoom('single')} />
            <div className="absolute top-3 right-3 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white text-[13px]">
              ★
            </div>
          </div>
          <div className="mt-3.5 text-[15px] font-bold">Single Room</div>
          <div className="mt-0.5 text-[13px] text-brand-muted-2">Santasi Apre, Kumasi</div>
        </div>
        <div className="min-w-0">
          <div className="relative">
            <RoomImage room={getRoom('double')} />
            <div className="absolute top-3 right-3 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white text-[13px]">
              ★
            </div>
          </div>
          <div className="mt-3.5 text-[15px] font-bold">Double Room</div>
          <div className="mt-0.5 text-[13px] text-brand-muted-2">Santasi Apre, Kumasi</div>
        </div>
        <div className="flex min-w-0 flex-col justify-between rounded-[20px] bg-brand-surface p-7">
          <div>
            <div className="mb-3.5 text-[11px] tracking-[0.1em] text-brand-muted-3 uppercase">Anboss Hotel</div>
            <div className="font-display text-[22px] leading-[1.35] font-bold text-brand-ink">
              Best option to stay for your Kumasi business trip or getaway
            </div>
          </div>
          <Link href="/rooms" className="mt-6 flex items-center gap-2.5 text-sm font-semibold text-brand-ink">
            Explore More
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-xs text-white">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="px-12 pt-8 text-center">
        <div className="mb-4 text-xs tracking-[0.24em] text-brand-muted-3 uppercase">Accommodation</div>
        <div className="font-display text-[56px] leading-none font-extrabold text-brand-ink">rooms</div>
        <div className="mx-auto mt-6 h-px w-14 bg-brand-accent" />
        <p className="mx-auto mt-6 max-w-[540px] text-[15px] leading-[1.7] text-brand-muted">
          Four distinct room types, each air-conditioned and finished with care, with bed and
          breakfast included on every stay.
        </p>
      </section>

      <RoomsShowcase />

      <section className="px-12 pt-4 pb-20">
        <div className="mb-10 text-center">
          <div className="mb-3.5 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Gallery</div>
          <div className="font-display text-[40px] font-extrabold text-brand-ink">A closer look</div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:auto-rows-[180px]">
          {galleryImages.map((image, index) => {
            const isFeatured = index === 0;
            const isBanner = index === galleryImages.length - 1;
            const size = isFeatured
              ? 'col-span-2 h-[220px] sm:row-span-2 sm:h-full'
              : isBanner
                ? 'col-span-2 h-[200px] sm:col-span-4 sm:h-full'
                : 'h-[180px] sm:h-full';
            if (image.src) {
              return (
                <GalleryImageTile
                  key={image.id}
                  src={image.src}
                  variantBase={image.variantBase}
                  sizes={image.sizes}
                  alt={image.label}
                  className={size}
                />
              );
            }
            return <ImagePlaceholder key={image.id} label={image.label} className={size} />;
          })}
        </div>
      </section>
    </main>
  );
}
