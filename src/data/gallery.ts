export interface GalleryImage {
  id: string;
  label: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'exterior', label: 'Hotel exterior at dusk' },
  { id: 'lobby', label: 'Lobby & reception' },
  { id: 'pool', label: 'Pool deck' },
  { id: 'room-interior', label: 'Guest room interior' },
  { id: 'bar', label: 'Bar & lounge' },
];
