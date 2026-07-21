import { amenities } from '../data/amenities';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function Amenities() {
  return (
    <main data-screen-label="Amenities">
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 48px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a89f97', marginBottom: 12 }}>
          Facilities
        </div>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 44, color: '#14110f', marginBottom: 16 }}>
          amenities
        </div>
        <div style={{ fontSize: 16, color: '#6b6560', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          Everything you need for a relaxing stay or a productive business trip.
        </div>
      </section>
      <section style={{ padding: '36px 48px 80px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="photo-grid">
        {amenities.map((amenity) => (
          <div key={amenity.id}>
            <ImagePlaceholder label={`${amenity.title} photo`} style={{ height: 220 }} />
            <div style={{ fontWeight: 700, fontSize: 17, marginTop: 16, color: '#14110f' }}>{amenity.title}</div>
            <div style={{ fontSize: 14, color: '#8a8279', marginTop: 6, lineHeight: 1.6 }}>{amenity.description}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
