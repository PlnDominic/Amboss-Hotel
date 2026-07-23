'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'HOME' },
  { href: '/rooms', label: 'ROOMS' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-[#141414] text-white text-xs py-2 px-6 md:px-12">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between">
          {/* Logo on Left of Utility Bar */}
          <Link href="/" className="flex items-center gap-2 font-display text-base font-extrabold tracking-wide text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
              H
            </span>
            <span>Hotel Booking</span>
          </Link>

          {/* Social Icons & Login Button */}
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-3.5 text-white/70 sm:flex">
              <a href="#" className="hover:text-white transition-colors">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.808V8z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
            </div>

            {/* Login Button */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-[11px] font-semibold text-brand-ink transition-colors hover:bg-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Login in / Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-brand-line">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between pl-6 md:pl-12">
          {/* Main Navigation Links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-5 text-[13px] font-extrabold tracking-wider transition-colors ${
                    active ? 'text-brand-accent' : 'text-brand-ink hover:text-brand-accent'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-brand-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Book Now Button (Angled / Bold CTA) */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/book"
              className="relative flex items-center bg-brand-accent px-10 py-5 text-sm font-extrabold text-white tracking-widest uppercase transition-colors hover:bg-brand-accent-hover"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center py-3 pr-6 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-line text-brand-ink"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="border-t border-brand-line bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-extrabold text-brand-ink hover:text-brand-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/book"
                className="mt-2 block rounded-lg bg-brand-accent py-3 text-center text-sm font-extrabold text-white uppercase"
              >
                BOOK NOW
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
