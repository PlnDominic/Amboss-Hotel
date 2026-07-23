import type { RoomInfo } from '../types';

export const rooms: RoomInfo[] = [
  {
    key: 'single',
    name: 'Single Room',
    location: 'Santasi Apre, Kumasi',
    homeHeadline: 'A quiet, comfortable room built for the solo traveller',
    roomsDescription:
      'A comfortable, quiet room built for the solo traveller, ideal for corporate stays in Kumasi.',
    bedType: '1 Single',
    bathroom: 'Private',
    wifi: 'Free',
    breakfast: 'Included',
    tags: ['Air-conditioned', 'Free Wi‑Fi', 'Work desk', 'Breakfast included'],
    pricePerNight: 300,
    totalUnits: 6,
    image: '/room-single.webp',
  },
  {
    key: 'double',
    name: 'Double Room',
    location: 'Santasi Apre, Kumasi',
    homeHeadline: 'A spacious room with a large bed, perfect for two',
    roomsDescription:
      'A spacious room with a large bed, perfect for couples or travellers who want extra room to relax.',
    bedType: '1 Double',
    bathroom: 'Private',
    wifi: 'Free',
    breakfast: 'Included',
    tags: ['Air-conditioned', 'Free Wi‑Fi', 'Flat-screen TV', 'Breakfast included'],
    pricePerNight: 400,
    totalUnits: 5,
    image: '/room-double.webp',
  },
  {
    key: 'deluxe',
    name: 'Deluxe Room',
    location: 'Santasi Apre, Kumasi',
    homeHeadline: 'An elegant double room with classic furnishings',
    roomsDescription:
      'An elegant, generously sized double room with a solid wood bed frame and classic furnishings, perfect for a relaxed stay.',
    bedType: '1 Double',
    bathroom: 'Private',
    wifi: 'Free',
    breakfast: 'Included',
    tags: ['Air-conditioned', 'Free Wi‑Fi', 'Flat-screen TV', 'Breakfast included'],
    pricePerNight: 500,
    totalUnits: 4,
    image: '/room-deluxe.webp',
  },
  {
    key: 'executive',
    name: 'Executive Room',
    location: 'Santasi Apre, Kumasi',
    homeHeadline: 'Our most spacious room, with a mini-fridge and lounge area',
    roomsDescription:
      'Our most spacious and well-appointed room, featuring a queen bed, a private mini-fridge, a flat-screen TV and a relaxing lounge area, ideal for longer or executive stays.',
    bedType: '1 Queen',
    bathroom: 'Private',
    wifi: 'Free',
    breakfast: 'Included',
    tags: ['Air-conditioned', 'Free Wi‑Fi', 'Mini-fridge', 'Flat-screen TV', 'Breakfast included'],
    pricePerNight: 600,
    totalUnits: 2,
    image: '/room-executive.webp',
  },
];

export const getRoom = (key: string) => rooms.find((r) => r.key === key) ?? rooms[0];
