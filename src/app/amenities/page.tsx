import type { Metadata } from 'next';
import Image from 'next/image';
import { amenities } from '@/data/amenities';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Amenities at Anboss Hotel',
  description: 'Everything you need for a relaxing stay or a productive business trip at Anboss Hotel.',
};

export default function AmenitiesPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-12 pt-16 pb-5 text-center">
        <div className="mb-3 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Facilities</div>
        <div className="mb-4 font-display text-[44px] font-extrabold text-brand-ink">amenities</div>
        <div className="mx-auto max-w-[600px] text-base leading-[1.7] text-brand-muted">
          Everything you need for a relaxing stay or a productive business trip.
        </div>
      </section>
      <section className="grid grid-cols-1 gap-7 px-12 pt-9 pb-20 sm:grid-cols-2 md:grid-cols-3">
        {amenities.map((amenity) => (
          <div key={amenity.id}>
            {amenity.src ? (
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image src={amenity.src} alt={`${amenity.title} photo`} fill className="object-cover" />
              </div>
            ) : (
              <ImagePlaceholder label={`${amenity.title} photo`} />
            )}
            <div className="mt-4 text-[17px] font-bold text-brand-ink">{amenity.title}</div>
            <div className="mt-1.5 text-sm leading-[1.6] text-brand-muted-2">{amenity.description}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
