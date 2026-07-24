export interface GalleryImage {
  id: string;
  label: string;
  src?: string;
  variantBase?: string;
  sizes?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'exterior', label: 'Main entrance', src: '/hotel-entrance.webp' },
  {
    id: 'bathroom',
    label: 'Bathroom',
    src: '/gallery/optimized/bath-1200.webp',
    variantBase: '/gallery/optimized/bath',
    sizes: '(max-width: 640px) 50vw, 25vw',
  },
  {
    id: 'pool',
    label: 'Pool deck',
    src: '/gallery/optimized/pool-1200.webp',
    variantBase: '/gallery/optimized/pool',
    sizes: '(max-width: 640px) 50vw, 25vw',
  },
  { id: 'room-interior', label: 'Guest room interior', src: '/gallery-room.webp' },
  { id: 'courtyard', label: 'Courtyard & porch', src: '/hotel-courtyard.webp' },
  { id: 'facade', label: 'Hotel façade', src: '/hotel-facade.webp' },
];
