import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Page, RoomKey } from '../types';
import { getRoom, rooms } from '../data/rooms';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [roomTab, setRoomTab] = useState<RoomKey>('single');
  const activeRoom = getRoom(roomTab);

  const tabStyle = (key: RoomKey): CSSProperties => ({
    border: 'none',
    borderRadius: 100,
    padding: '10px 0',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    background: roomTab === key ? '#b3202f' : 'transparent',
    color: roomTab === key ? '#fff' : '#6b6560',
  });

  return (
    <main data-screen-label="Home">
      <section
        style={{
          padding: '56px 48px 0',
          display: 'grid',
          gridTemplateColumns: '0.95fr 1.05fr',
          gap: 44,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#ffffff',
              border: '1px solid #f0e9dd',
              boxShadow: '0 6px 18px rgba(20,15,10,0.06)',
              borderRadius: 100,
              padding: '10px 18px',
              marginBottom: 28,
            }}
          >
            <span style={{ color: '#14110f', fontSize: 15 }}>★</span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#14110f' }}>4.5 Rating</div>
              <div style={{ fontSize: 11, color: '#8a8279' }}>by our recent guests</div>
            </div>
          </div>
          <div
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 54,
              lineHeight: 1.15,
              color: '#14110f',
              marginBottom: 22,
            }}
          >
            Find your
            <br />
            best stay.
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: '#6b6560', maxWidth: 440, marginBottom: 30 }}>
            On arrival you're welcomed into a spacious, modern air-conditioned home in Santasi Apre,
            Kumasi — 14 well-appointed rooms built for corporate travel and easy getaways alike.
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 34 }}>
            <a
              href="tel:+233541886633"
              style={{
                background: '#f1ece3',
                color: '#14110f',
                padding: '14px 26px',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: 'none',
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
                padding: '14px 26px',
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              Book Now
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#fff',
                  color: '#b3202f',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                }}
              >
                →
              </span>
            </button>
          </div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#a89f97',
              marginBottom: 14,
            }}
          >
            Why guests choose us
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', fontSize: 14, fontWeight: 600, color: '#14110f' }}>
            <span>Pool Deck</span>
            <span style={{ color: '#d8cfc2' }}>·</span>
            <span>Free Breakfast</span>
            <span style={{ color: '#d8cfc2' }}>·</span>
            <span>Free Wi‑Fi</span>
            <span style={{ color: '#d8cfc2' }}>·</span>
            <span>Air Conditioning</span>
          </div>
        </div>
        <ImagePlaceholder label="Hero photo of hotel interior/exterior" style={{ height: 480 }} />
      </section>

      <section style={{ padding: '56px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1.15fr 1fr', gap: 20 }} className="photo-grid">
        <div style={{ minWidth: 0 }}>
          <div style={{ position: 'relative' }}>
            <ImagePlaceholder label="Single room photo" style={{ height: 220 }} />
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
              }}
            >
              ★
            </div>
          </div>
          <div style={{ marginTop: 14, fontWeight: 700, fontSize: 15 }}>Single Room</div>
          <div style={{ fontSize: 13, color: '#8a8279', marginTop: 2 }}>Santasi Apre, Kumasi</div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ position: 'relative' }}>
            <ImagePlaceholder label="Double room photo" style={{ height: 220 }} />
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
              }}
            >
              ★
            </div>
          </div>
          <div style={{ marginTop: 14, fontWeight: 700, fontSize: 15 }}>Double Room</div>
          <div style={{ fontSize: 13, color: '#8a8279', marginTop: 2 }}>Santasi Apre, Kumasi</div>
        </div>
        <div
          style={{
            background: '#f6f2ec',
            borderRadius: 20,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a89f97', marginBottom: 14 }}>
              Anboss Hotel
            </div>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: '#14110f' }}>
              Best option to stay for your Kumasi business trip or getaway
            </div>
          </div>
          <button
            onClick={() => onNavigate('rooms')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontWeight: 600,
              fontSize: 14,
              color: '#14110f',
              cursor: 'pointer',
              marginTop: 24,
            }}
          >
            Explore More
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#b3202f',
                color: '#fff',
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
        <ImagePlaceholder label="Twin room photo" style={{ height: '100%', minWidth: 0 }} />
      </section>

      <section style={{ padding: '20px 48px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a89f97', marginBottom: 14 }}>
          Accommodation Layout
        </div>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 56, color: '#14110f', lineHeight: 1 }}>
          rooms
        </div>
      </section>

      <section style={{ padding: '40px 48px 0' }}>
        <div
          style={{
            background: '#f6f2ec',
            borderRadius: 100,
            padding: 8,
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 6,
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          {rooms.map((room) => (
            <button key={room.key} onClick={() => setRoomTab(room.key)} style={tabStyle(room.key)}>
              {room.name.replace(' Room', '')}
            </button>
          ))}
        </div>
      </section>

      <section
        style={{ padding: '36px 48px 64px', display: 'grid', gridTemplateColumns: '0.9fr 1fr 0.9fr', gap: 24 }}
        className="room-detail-grid"
      >
        <ImagePlaceholder label={`${activeRoom.name} photo`} style={{ height: 340 }} />
        <div style={{ background: '#f6f2ec', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a89f97', marginBottom: 12 }}>
              Anboss Hotel
            </div>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: '#14110f', marginBottom: 24 }}>
              {activeRoom.homeHeadline}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#a89f97', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              Room Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a8279' }}>Bed Type</span>
                <span style={{ fontWeight: 600 }}>{activeRoom.bedType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a8279' }}>Bathroom</span>
                <span style={{ fontWeight: 600 }}>{activeRoom.bathroom}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a8279' }}>Wi‑Fi</span>
                <span style={{ fontWeight: 600 }}>{activeRoom.wifi}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a8279' }}>Breakfast</span>
                <span style={{ fontWeight: 600 }}>{activeRoom.breakfast}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: '#14110f', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
          <div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 22 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#2a2521', flex: 'none' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Cleanliness</div>
                <div style={{ fontSize: 13, color: '#b5ada4', lineHeight: 1.5 }}>
                  Freshly serviced daily by our housekeeping team.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#2a2521', flex: 'none' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Amenities</div>
                <div style={{ fontSize: 13, color: '#b5ada4', lineHeight: 1.5 }}>
                  Air conditioning, flat-screen TV and a work desk.
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            style={{ background: '#b3202f', color: '#fff', border: 'none', padding: 14, borderRadius: 100, fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 26 }}
          >
            Book Now!
          </button>
        </div>
      </section>
    </main>
  );
}
