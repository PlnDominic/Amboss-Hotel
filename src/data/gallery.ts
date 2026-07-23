export interface GalleryImage {
  id: string;
  label: string;
  src?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'exterior', label: 'Main entrance', src: '/hotel-entrance.webp' },
  { id: 'lobby', label: 'Lobby & reception' },
  { id: 'pool', label: 'Pool deck', src: '/pool-deck.webp' },
  { id: 'room-interior', label: 'Guest room interior', src: '/gallery-room.webp' },
  { id: 'bar', label: 'Bar & lounge' },
  { id: 'courtyard', label: 'Courtyard & porch', src: '/hotel-courtyard.webp' },
];
