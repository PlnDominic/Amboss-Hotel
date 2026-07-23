export interface GalleryImage {
  id: string;
  label: string;
  src?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'exterior', label: 'Main entrance', src: '/hotel-entrance.webp' },
  { id: 'bathroom', label: 'Bathroom', src: '/gallery/bath.png' },
  { id: 'pool', label: 'Pool deck' },
  { id: 'room-interior', label: 'Guest room interior', src: '/gallery-room.webp' },
  { id: 'wardrobe', label: 'Wardrobe', src: '/gallery/wardrobe.png' },
  { id: 'courtyard', label: 'Courtyard & porch', src: '/hotel-courtyard.webp' },
];
