import type { CSSProperties } from 'react';
import type { Page } from '../types';
import Logo from './Logo';

interface HeaderProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { key: Page; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'amenities', label: 'Amenities' },
  { key: 'contact', label: 'Contact' },
];

export default function Header({ page, onNavigate }: HeaderProps) {
  const navStyle = (key: Page): CSSProperties => ({
    padding: '6px 2px',
    fontSize: 15,
    fontWeight: 600,
    color: page === key ? '#b3202f' : '#14110f',
    borderBottom: page === key ? '2px solid #b3202f' : '2px solid transparent',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  });

  return (
    <header style={{ position: 'sticky', top: 16, zIndex: 50 }}>
      <div
        style={{
          margin: '16px 24px 0',
          background: '#ffffff',
          borderRadius: 100,
          boxShadow: '0 4px 24px rgba(20,15,10,0.08)',
          border: '1px solid #f0e9dd',
          padding: '12px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <Logo onClick={() => onNavigate('home')} />
        <nav className="site-nav" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.key} style={navStyle(item.key)} onClick={() => onNavigate(item.key)}>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="tel:+233541886633"
            style={{
              background: '#f1ece3',
              color: '#14110f',
              padding: '10px 20px',
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Call Us
          </a>
          <button
            onClick={() => onNavigate('contact')}
            style={{
              background: '#b3202f',
              color: '#fff',
              border: 'none',
              padding: '10px 22px',
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Book Now
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                color: '#b3202f',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
              }}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
