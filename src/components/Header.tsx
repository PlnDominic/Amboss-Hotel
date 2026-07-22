'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Transparent, light-on-dark treatment only while sitting over the home hero.
  const overlay = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`${isHome ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overlay ? 'bg-transparent' : 'bg-white shadow-[0_1px_0_rgba(20,15,10,0.08)]'
      }`}
    >
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" aria-label="Anboss Hotel home" className="flex items-center">
          <Logo dark={overlay} />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-semibold transition-colors ${
                  overlay
                    ? active
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                    : active
                      ? 'text-brand-accent'
                      : 'text-brand-ink hover:text-brand-accent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href="tel:+233541886633"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              overlay
                ? 'bg-white/15 text-white backdrop-blur hover:bg-white/25'
                : 'bg-brand-muted-bg text-brand-ink hover:bg-brand-line'
            }`}
          >
            Call Us
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-brand-accent px-5.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
          >
            Book Now
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-brand-accent">
              →
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
            overlay ? 'bg-white/15 text-white backdrop-blur' : 'bg-brand-muted-bg text-brand-ink'
          }`}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-brand-line bg-white px-6 pt-4 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                    active ? 'bg-brand-muted-bg text-brand-accent' : 'text-brand-ink hover:bg-brand-muted-bg'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href="tel:+233541886633"
              className="rounded-full bg-brand-muted-bg px-5 py-3 text-center text-sm font-semibold text-brand-ink"
            >
              Call Us
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white"
            >
              Book Now
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-brand-accent">
                →
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
