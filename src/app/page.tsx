import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import RoomTabsSection from '@/components/RoomTabsSection';
import { galleryImages } from '@/data/gallery';

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[480px] w-full flex-col justify-end overflow-hidden px-8 pb-12 md:min-h-[560px] md:px-14 md:pb-16">
        <Image
          src="/hero-exterior.webp"
          alt="Anboss Hotel exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/0" />
        <div className="relative z-10 max-w-[560px]">
          <div className="mb-5.5 font-display text-[54px] leading-[1.15] font-extrabold text-white">
            Find your
            <br />
            best stay.
          </div>
          <div className="mb-7.5 max-w-[440px] text-base leading-[1.7] text-white/85">
            On arrival you&apos;re welcomed into a spacious, modern air-conditioned home in Santasi Apre,
            Kumasi, with 14 well-appointed rooms built for corporate travel and easy getaways alike.
          </div>
          <div className="mb-8.5 flex gap-3">
            <a
              href="tel:+233541886633"
              className="rounded-full bg-white px-6.5 py-3.5 text-[15px] font-semibold text-brand-ink"
            >
              Call Us
            </a>
            <Link
              href="/contact"
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
      </section>

      <section className="grid grid-cols-1 gap-5 px-12 py-14 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr_1fr]">
        <div className="min-w-0">
          <div className="relative">
            <ImagePlaceholder label="Single room photo" />
            <div className="absolute top-3 right-3 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white text-[13px]">
              ★
            </div>
          </div>
          <div className="mt-3.5 text-[15px] font-bold">Single Room</div>
          <div className="mt-0.5 text-[13px] text-brand-muted-2">Santasi Apre, Kumasi</div>
        </div>
        <div className="min-w-0">
          <div className="relative">
            <ImagePlaceholder label="Double room photo" />
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
        <ImagePlaceholder label="Twin room photo" className="h-full min-w-0" />
      </section>

      <section className="px-12 pt-5 text-center">
        <div className="mb-3.5 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Accommodation Layout</div>
        <div className="font-display text-[56px] leading-none font-extrabold text-brand-ink">rooms</div>
      </section>

      <RoomTabsSection />

      <section className="px-12 pt-4 pb-20">
        <div className="mb-10 text-center">
          <div className="mb-3.5 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Gallery</div>
          <div className="font-display text-[40px] font-extrabold text-brand-ink">A closer look</div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:auto-rows-[180px]">
          {galleryImages.map((image, index) => {
            const size = index === 0 ? 'col-span-2 h-[220px] sm:row-span-2 sm:h-full' : 'h-[180px] sm:h-full';
            if (image.src) {
              return (
                <div key={image.id} className={`relative w-full overflow-hidden ${size}`}>
                  <Image src={image.src} alt={image.label} fill className="object-cover" />
                </div>
              );
            }
            return <ImagePlaceholder key={image.id} label={image.label} className={size} />;
          })}
        </div>
      </section>
    </main>
  );
}
