import Link from 'next/link';
import Logo from './Logo';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="rounded-t-[36px] bg-brand-ink px-12 pt-14">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 border-b border-brand-dark-surface pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-3.5">
            <Logo dark />
          </div>
          <div className="max-w-[320px] text-sm leading-[1.7] text-brand-muted-3">
            An unforgettable stay in Santasi Apre, Kumasi, with modern, air-conditioned rooms and warm
            hospitality for business and leisure travellers alike.
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[0.08em] text-brand-footer-heading uppercase">Explore</div>
          <div className="flex flex-col gap-2.5">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-left text-sm text-brand-footer-text">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[0.08em] text-brand-footer-heading uppercase">Contact</div>
          <div className="flex flex-col gap-2 text-sm leading-[1.6] text-brand-footer-text">
            <div>+233 (0)541‑886633</div>
            <div>+233 (0)244‑162843</div>
            <div>+233 (0)201‑868887</div>
            <div>
              <a href="mailto:info@anbosshotel.com" className="text-brand-footer-text">
                info@anbosshotel.com
              </a>
            </div>
            <div>Santasi Apre, Kumasi</div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1180px] py-5 text-center text-[13px] text-brand-muted-2">
        © {new Date().getFullYear()} Anboss Hotel. All rights reserved.
      </div>
    </footer>
  );
}
