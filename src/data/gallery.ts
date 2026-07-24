export interface GalleryImage {
  id: string;
  label: string;
  src?: string;
  variantBase?: string;
  sizes?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'exterior', label: 'Main entrance & Driveway', src: '/hotel-entrance.webp' },
  {
    id: 'bathroom',
    label: 'Modern Ensuite Bathroom',
    src: '/gallery/optimized/bath-1200.webp',
    variantBase: '/gallery/optimized/bath',
    sizes: '(max-width: 640px) 50vw, 25vw',
  },
  {
    id: 'pool',
    label: 'Pool deck & Lounge',
    src: '/gallery/optimized/pool-1200.webp',
    variantBase: '/gallery/optimized/pool',
    sizes: '(max-width: 640px) 50vw, 25vw',
  },
  { id: 'room-interior', label: 'Guest Room Interior', src: '/gallery-room.webp' },
  { id: 'courtyard', label: 'Event Courtyard & Grounds', src: '/hotel-courtyard.webp' },
  { id: 'facade', label: 'Hotel Façade & Exterior', src: '/hotel-facade.webp' },
];
