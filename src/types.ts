export type RoomKey = 'single' | 'double' | 'twin';

export interface RoomInfo {
  key: RoomKey;
  name: string;
  location: string;
  homeHeadline: string;
  roomsDescription: string;
  bedType: string;
  bathroom: string;
  wifi: string;
  breakfast: string;
  tags: string[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  message: string;
}
