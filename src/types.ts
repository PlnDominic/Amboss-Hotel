export type RoomKey = 'single' | 'double' | 'twin' | 'deluxe' | 'executive';

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
  pricePerNight: number;
  totalUnits: number;
  image?: string;
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

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  reference: string;
  roomKey: RoomKey;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
  nights: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}
