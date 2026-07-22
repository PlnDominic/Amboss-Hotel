import Link from 'next/link';
import Logo from './Logo';
import { rooms } from '@/data/rooms';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Book Now' },
];

const headingClass = 'mb-5 text-xs font-bold tracking-[0.14em] text-brand-footer-heading uppercase';
const linkClass = 'text-left text-sm text-brand-footer-text transition-colors hover:text-white';

export default function Footer() {
  return (
    <footer className="ml-[calc(50%-50vw)] w-screen bg-brand-ink">
      <div className="mx-auto max-w-[1300px] px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 border-b border-brand-dark-surface pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <div className="mb-4">
              <Logo dark />
            </div>
            <p className="max-w-[320px] text-sm leading-[1.7] text-brand-muted-3">
              An unforgettable stay in Santasi Apre, Kumasi, with modern, air-conditioned rooms and warm
              hospitality for business and leisure travellers alike.
            </p>
          </div>

          <div>
            <div className={headingClass}>Explore</div>
            <div className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={headingClass}>Rooms</div>
            <div className="flex flex-col gap-3">
              {rooms.map((room) => (
                <Link key={room.key} href={`/booking?room=${room.key}`} className={linkClass}>
                  {room.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={headingClass}>Contact</div>
            <div className="flex flex-col gap-2.5 text-sm leading-[1.6] text-brand-footer-text">
              <a href="tel:+233541886633" className="transition-colors hover:text-white">+233 (0)541‑886633</a>
              <a href="tel:+233244162843" className="transition-colors hover:text-white">+233 (0)244‑162843</a>
              <a href="tel:+233201868887" className="transition-colors hover:text-white">+233 (0)201‑868887</a>
              <a href="mailto:info@anbosshotel.com" className="transition-colors hover:text-white">
                info@anbosshotel.com
              </a>
              <div className="text-brand-muted-3">Santasi Apre, Kumasi</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[13px] text-brand-muted-2 sm:flex-row">
          <div>© {new Date().getFullYear()} Anboss Hotel. All rights reserved.</div>
          <div>Santasi Apre, Kumasi · Ghana</div>
        </div>
      </div>
    </footer>
  );
}
