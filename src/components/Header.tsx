'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-brand-line">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3.5 md:px-12">
        {/* Official Anboss Hotel Logo */}
        <Link href="/" aria-label="Anboss Hotel home" className="flex items-center">
          <Logo />
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-[13px] font-extrabold tracking-wider transition-colors ${
                  active ? 'text-brand-accent' : 'text-brand-ink hover:text-brand-accent'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-accent rounded-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Book Now Button (Bold CTA with Sharp Square Edges) */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+233244066999"
            className="rounded-none bg-brand-surface px-5 py-2.5 text-xs font-bold text-brand-ink transition-colors hover:bg-brand-line"
          >
            Call Us
          </a>
          <Link
            href="/book"
            className="rounded-none bg-brand-accent px-7 py-2.5 text-xs font-extrabold text-white tracking-widest uppercase transition-colors hover:bg-brand-accent-hover shadow-md"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-none border border-brand-line text-brand-ink"
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
              className="mt-2 block rounded-none bg-brand-accent py-3 text-center text-sm font-extrabold text-white uppercase"
            >
              BOOK NOW
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
