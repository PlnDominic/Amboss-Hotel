import type { RoomInfo } from '../types';

export const rooms: RoomInfo[] = [
  {
    key: 'single',
    name: 'Single Room',
    location: 'Santasi Apre, Kumasi',
    homeHeadline: 'A quiet, comfortable room built for the solo traveller',
    roomsDescription:
      'A comfortable, quiet room built for the solo traveller — ideal for corporate stays in Kumasi.',
    bedType: '1 Single',
    bathroom: 'Private',
    wifi: 'Free',
    breakfast: 'Included',
    tags: ['Air-conditioned', 'Free Wi‑Fi', 'Work desk', 'Breakfast included'],
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
  },
  {
    key: 'twin',
    name: 'Twin Room',
    location: 'Santasi Apre, Kumasi',
    homeHeadline: 'Two single beds, a favourite for colleagues travelling together',
    roomsDescription:
      'Two comfortable single beds in one room — a favourite for colleagues travelling together.',
    bedType: '2 Single',
    bathroom: 'Private',
    wifi: 'Free',
    breakfast: 'Included',
    tags: ['Air-conditioned', 'Free Wi‑Fi', 'Two single beds', 'Breakfast included'],
  },
];

export const getRoom = (key: string) => rooms.find((r) => r.key === key) ?? rooms[0];
