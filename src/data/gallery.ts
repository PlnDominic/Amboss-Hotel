export interface GalleryImage {
  id: string;
  label: string;
  src?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'exterior', label: 'Main entrance', src: '/hotel-entrance.webp' },
  { id: 'lobby', label: 'Lobby & reception' },
  { id: 'pool', label: 'Pool deck' },
  { id: 'room-interior', label: 'Guest room interior' },
  { id: 'bar', label: 'Bar & lounge' },
];
