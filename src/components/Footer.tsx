import type { Page } from '../types';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const LINKS: { key: Page; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'amenities', label: 'Amenities' },
  { key: 'contact', label: 'Contact' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ background: '#14110f', padding: '56px 48px 0', borderRadius: '36px 36px 0 0' }}>
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr 1fr',
          gap: 48,
          paddingBottom: 40,
          borderBottom: '1px solid #2a2521',
        }}
        className="contact-grid"
      >
        <div>
          <div style={{ marginBottom: 14 }}>
            <Logo dark />
          </div>
          <div style={{ fontSize: 14, color: '#a89f97', lineHeight: 1.7, maxWidth: 320 }}>
            An unforgettable stay in Santasi Apre, Kumasi — modern, air-conditioned rooms and warm
            hospitality for business and leisure travellers alike.
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#e0616f',
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Explore
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e6ded5',
                  fontSize: 14,
                  textAlign: 'left',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#e0616f',
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Contact
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#e6ded5', lineHeight: 1.6 }}>
            <div>+233 (0)541‑886633</div>
            <div>+233 (0)244‑162843</div>
            <div>+233 (0)201‑868887</div>
            <div>
              <a href="mailto:info@anbosshotel.com" style={{ color: '#e6ded5' }}>
                info@anbosshotel.com
              </a>
            </div>
            <div>Santasi Apre, Kumasi</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 0', fontSize: 13, color: '#8a8279', textAlign: 'center' }}>
        © {new Date().getFullYear()} Anboss Hotel. All rights reserved.
      </div>
    </footer>
  );
}
