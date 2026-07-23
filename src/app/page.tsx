'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FlourishDivider from '@/components/FlourishDivider';
import QuickSearchBar from '@/components/QuickSearchBar';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import RoomImage from '@/components/RoomImage';
import { getRoom } from '@/data/rooms';

const WHY_CHOOSE_ITEMS = [
  {
    id: 1,
    title: 'Gourmet Steak & Fine Dining',
    category: 'CATERING',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Executive Wine & Dinner',
    category: 'COFFEE',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Infinity Pool & Night Lounge',
    category: 'SERVICES',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Chef Special Cuisine',
    category: 'CATERING',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Master Chef Preparation',
    category: 'DESERT',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Overwater Luxury Suite',
    category: 'SERVICES',
    img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
  },
];

const EVENTS_ITEMS = [
  {
    id: 1,
    date: '25',
    month: 'APRIL',
    title: 'Annual Wine & Gourmet Tasting Gala',
    desc: 'An exquisite evening featuring international wine pairings and curated dishes.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    date: '22',
    month: 'JUNE',
    title: 'Summer Poolside Acoustic Night',
    desc: 'Relax by our lit infinity pool deck with live jazz acoustic performances.',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    date: '15',
    month: 'MAY',
    title: 'Executive VIP Hospitality Summit',
    desc: 'Exclusive networking event for corporate guests and luxury travelers.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredGallery =
    activeTab === 'ALL'
      ? WHY_CHOOSE_ITEMS
      : WHY_CHOOSE_ITEMS.filter((item) => item.category === activeTab);

  return (
    <main className="w-full">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative h-[650px] w-full overflow-hidden">
        <Image
          src="/hero-exterior.webp"
          alt="Anboss Resort & Hotel Exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-script text-[64px] md:text-[84px] font-normal leading-none text-white drop-shadow-md">
            Welcome to Hotely
          </h1>
          <div className="mt-3 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-white/60" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">
              THE PLACE WHERE YOU LOOKING TO
            </span>
            <span className="h-[1px] w-12 bg-white/60" />
          </div>

          <Link
            href="/rooms"
            className="mt-8 flex items-center gap-2 rounded-full border border-white/80 bg-white/10 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white hover:text-brand-ink"
          >
            EXPLORE NOW <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Left / Right Slider Arrows */}
        <button
          aria-label="Previous slide"
          className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-brand-ink"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-brand-ink"
        >
          ›
        </button>
      </section>

      {/* FLOATING QUICK SEARCH BAR */}
      <QuickSearchBar />

      {/* SECTION 2: WELCOME TO HOTEL */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-[1140px] text-center">
          <h2 className="font-serif text-3xl font-extrabold uppercase tracking-wider text-brand-ink">
            WELCOME TO HOTEL
          </h2>
          <FlourishDivider />
          <p className="mx-auto mt-4 max-w-[720px] text-sm leading-relaxed text-brand-muted">
            On arrival you&apos;re welcomed into a spacious, modern air-conditioned paradise in Santasi Apre, Kumasi, with well-appointed suites built for corporate travel, romantic getaways, and luxury relaxation alike.
          </p>

          {/* 3 Column Room Showcase */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {['single', 'double', 'executive'].map((key) => {
              const room = getRoom(key);
              return (
                <div
                  key={key}
                  className="group overflow-hidden rounded-xl border border-brand-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <RoomImage room={room} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="font-serif text-lg font-bold text-brand-ink">{room.name}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-muted line-clamp-2">
                      {room.roomsDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-brand-line pt-3">
                      <span className="text-xs font-semibold text-brand-accent">GHS {room.pricePerNight} / night</span>
                      <Link href="/book" className="text-xs font-bold uppercase tracking-wider text-brand-ink hover:text-brand-accent">
                        Book →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/rooms"
              className="inline-block rounded-full bg-brand-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-brand-accent-hover"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY TO CHOOSE US? (DARK FEATURE GRID) */}
      <section className="bg-brand-dark-surface py-20 px-6 text-white">
        <div className="mx-auto max-w-[1140px] text-center">
          <h2 className="font-serif text-3xl font-extrabold uppercase tracking-wider text-white">
            WHY TO CHOOSE US?
          </h2>
          <FlourishDivider dark />

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-bold tracking-widest text-white/60 uppercase">
            {['ALL', 'DESERT', 'COFFEE', 'CATERING', 'SERVICES'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors cursor-pointer ${
                  activeTab === tab ? 'text-brand-accent font-extrabold underline underline-offset-8' : 'hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 6 Grid Showcase */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative h-[240px] overflow-hidden rounded-xl bg-black/40 shadow-md"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/rooms"
              className="inline-block rounded-full bg-brand-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-brand-accent-hover"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: UPCOMING EVENTS */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-[1140px] text-center">
          <span className="font-script text-3xl text-brand-accent">Upcoming</span>
          <h2 className="font-serif text-3xl font-extrabold uppercase tracking-wider text-brand-ink mt-1">
            Events
          </h2>
          <FlourishDivider />

          {/* 3-Card Events Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {EVENTS_ITEMS.map((ev) => (
              <div
                key={ev.id}
                className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image src={ev.img} alt={ev.title} fill className="object-cover" />
                </div>
                <div className="flex p-5 text-left gap-4">
                  {/* Red Date Badge */}
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-accent text-white font-extrabold leading-none">
                    <span className="text-lg">{ev.date}</span>
                    <span className="text-[9px] uppercase tracking-wider mt-0.5">{ev.month}</span>
                  </div>
                  {/* Event Details */}
                  <div>
                    <h3 className="font-serif text-sm font-bold text-brand-ink line-clamp-1">{ev.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-brand-muted line-clamp-2">{ev.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CLASSY TESTIMONIALS SLIDER */}
      <TestimonialsSlider />
    </main>
  );
}
