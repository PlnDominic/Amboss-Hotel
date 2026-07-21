'use client';

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

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-6 mt-4 flex flex-wrap items-center justify-between gap-5 rounded-full border border-brand-line bg-white px-6.5 py-3 shadow-[0_4px_24px_rgba(20,15,10,0.08)]">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
        </Link>
        <nav className="order-3 flex w-full items-center justify-center gap-6.5 md:order-none md:w-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 py-1.5 text-[15px] font-semibold ${
                  active ? 'border-brand-accent text-brand-accent' : 'border-transparent text-brand-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2.5">
          <a
            href="tel:+233541886633"
            className="whitespace-nowrap rounded-full bg-brand-bg px-5 py-2.5 text-sm font-semibold text-brand-ink"
          >
            Call Us
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-brand-accent px-5.5 py-2.5 text-sm font-semibold text-white"
          >
            Book Now
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-brand-accent">
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
