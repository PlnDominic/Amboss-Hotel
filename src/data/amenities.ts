export interface Amenity {
  id: string;
  title: string;
  description: string;
  src?: string;
}

export const amenities: Amenity[] = [
  {
    id: 'pool',
    title: 'Pool Deck',
    description: 'A stylish pool deck to relax in the afternoon sun with an ice-cold drink.',
    src: '/pool-deck.webp',
  },
  {
    id: 'gym',
    title: "Residents' Gym",
    description: 'A private gym facility reserved exclusively for our guests.',
  },
  {
    id: 'bar',
    title: 'Bar & Lounge',
    description: 'Enjoy house wine, an ice-cold beer or a signature cocktail at our refreshing bar.',
  },
  {
    id: 'breakfast',
    title: 'Bed & Breakfast',
    description: 'Every stay includes a full breakfast to start your day right.',
  },
  {
    id: 'ac',
    title: 'Air-Conditioned Comfort',
    description: 'Modern, air-conditioned interiors throughout the hotel.',
  },
  {
    id: 'business',
    title: 'Business & Corporate Travel',
    description: "A quiet, professional home base that's well suited to corporate and business travellers.",
  },
];
