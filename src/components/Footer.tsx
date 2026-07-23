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
          {/* COLUMN 1: ADDRESS */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              ADDRESS
            </h3>
            <div className="flex flex-col gap-3.5 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-brand-accent mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Santasi Apre, Kumasi, Ghana</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+233 (0)541-886633</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@anbosshotel.com</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: INFORMATION */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              INFORMATION
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Delivery Information</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Site Map</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: MY ACCOUNT */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              MY ACCOUNT
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Wish List</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Newsletter</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h3 className="mb-6 font-display text-sm font-extrabold tracking-widest uppercase text-white">
              NEWS LETTER
            </h3>
            <p className="mb-4 text-xs leading-relaxed text-white/70">
              Subscribe to our newsletter to latest news, tips, and advice.
            </p>

            {subscribed ? (
              <div className="rounded-lg bg-emerald-950/80 border border-emerald-500/30 p-3 text-xs text-emerald-300">
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
                  className="w-full rounded-l-lg bg-white px-3 py-2 text-xs text-brand-ink outline-none"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-brand-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-accent-hover"
                >
                  SEND
                </button>
              </form>
            )}

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3b5998] text-white hover:opacity-90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.808V8z"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00acee] text-white hover:opacity-90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#db4a39] text-white hover:opacity-90">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Hotel. All rights.
        </div>
      </div>
    </footer>
  );
}
