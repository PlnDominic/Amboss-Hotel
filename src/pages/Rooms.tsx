import type { Page } from '../types';
import { rooms } from '../data/rooms';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface RoomsProps {
  onNavigate: (page: Page) => void;
}

export default function Rooms({ onNavigate }: RoomsProps) {
  return (
    <main data-screen-label="Rooms">
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 48px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a89f97', marginBottom: 12 }}>
          Accommodation
        </div>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 44, color: '#14110f', marginBottom: 16 }}>
          rooms
        </div>
        <div style={{ fontSize: 16, color: '#6b6560', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          14 well-appointed single, double and twin bedrooms — each air-conditioned, modern and
          comfortable, with bed &amp; breakfast included.
        </div>
      </section>

      {rooms.map((room, index) => {
        const imageFirst = index % 2 === 0;
        const image = <ImagePlaceholder label={`${room.name} photo`} style={{ height: 340 }} />;
        const details = (
          <div>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 24, marginBottom: 14, color: '#14110f' }}>
              {room.name}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#6b6560', margin: '0 0 20px' }}>{room.roomsDescription}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
              {room.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => onNavigate('contact')}
              style={{ background: '#b3202f', color: '#fff', border: 'none', padding: '12px 26px', fontSize: 14, fontWeight: 600, borderRadius: 100, cursor: 'pointer' }}
            >
              Enquire
            </button>
          </div>
        );

        return (
          <section
            key={room.key}
            style={{
              padding: index === 0 ? '48px 48px' : index === rooms.length - 1 ? '20px 48px 80px' : '20px 48px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 56,
              alignItems: 'center',
            }}
            className="room-detail-grid"
          >
            {imageFirst ? (
              <>
                {image}
                {details}
              </>
            ) : (
              <>
                {details}
                {image}
              </>
            )}
          </section>
        );
      })}
    </main>
  );
}
