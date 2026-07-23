'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="relative w-full bg-[#121212] text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-8 pt-16 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* COLUMN 1: ANBOSS HOTEL ADDRESS */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              ANBOSS HOTEL
            </h3>
            <div className="flex flex-col gap-3.5 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-brand-accent mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Santasi Apre, Kumasi, Ghana</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>0244 066999 · 0201 185123 · 0241 878537</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@anbosshotel.com</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: EXPLORE */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              EXPLORE
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Rooms</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: ROOMS */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              ROOM TYPES
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li><Link href="/book" className="hover:text-white transition-colors">Single Room (GHS 300)</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Double Room (GHS 400)</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Deluxe Room (GHS 500)</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Executive Room (GHS 600)</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              NEWSLETTER
            </h3>
            <p className="mb-4 text-xs leading-relaxed text-white/70">
              Subscribe to our newsletter for exclusive offers and updates from Anboss Hotel.
            </p>

            {subscribed ? (
              <div className="rounded-none bg-emerald-950/80 border border-emerald-500/30 p-3 text-xs text-emerald-300">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-none bg-white px-3 py-2 text-xs text-brand-ink outline-none"
                />
                <button
                  type="submit"
                  className="rounded-none bg-brand-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-accent-hover"
                >
                  SEND
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Anboss Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
