export interface Amenity {
  id: string;
  title: string;
  description: string;
  src?: string;
}

export const amenities: Amenity[] = [
  {
    id: 'ac-rooms',
    title: 'Air-Conditioned Rooms',
    description: 'Modern, air-conditioned interiors throughout the hotel for a comfortable stay.',
  },
  {
    id: 'conference-hall',
    title: 'Conference Hall',
    description: 'A well-equipped conference hall suited to meetings, seminars and corporate events.',
  },
  {
    id: 'restaurant-bar',
    title: 'Restaurant & Bar',
    description: 'A restaurant and bar on site, serving meals and drinks throughout your stay.',
  },
  {
    id: 'pool',
    title: 'Swimming Pool',
    description: 'A stylish pool deck to relax in the afternoon sun with an ice-cold drink.',
    src: '/pool-deck.webp',
  },
  {
    id: 'executive-rooms',
    title: 'Executive Rooms',
    description: 'Spacious executive rooms with a king bed and a relaxing lounge area.',
    src: '/room-executive.webp',
  },
  {
    id: 'dstv',
    title: 'DSTV',
    description: 'DSTV available in every room for news, sport and entertainment.',
  },
  {
    id: 'security',
    title: '100% Security',
    description: 'Round-the-clock security for the peace of mind of every guest.',
  },
  {
    id: 'internet',
    title: 'Free Internet',
    description: 'Free internet access throughout the hotel.',
  },
];
