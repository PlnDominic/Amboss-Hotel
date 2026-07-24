export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Kofi Mensah',
    role: 'Corporate Guest',
    rating: 5,
    text: 'An exceptional experience! The rooms are modern, quiet, and perfectly set up for business travelers. The high-speed Wi-Fi and work desk made working remotely seamless.',
    date: 'July 2026',
  },
  {
    id: '2',
    name: 'Akosua Boateng',
    role: 'Leisure Traveler',
    rating: 5,
    text: 'A hidden gem in Kumasi. The pool deck is wonderful for unwinding in the evening, and the restaurant and bar were a lovely touch every day. The hospitality is unmatched.',
    date: 'June 2026',
  },
  {
    id: '3',
    name: 'David Smith',
    role: 'International Tourist',
    rating: 4.5,
    text: 'The staff went above and beyond to make our stay comfortable. Clean, air-conditioned rooms and a peaceful atmosphere made all the difference.',
    date: 'May 2026',
  },
  {
    id: '4',
    name: 'Ama Osei',
    role: 'Weekend Getaway',
    rating: 5,
    text: 'Excellent service and extremely neat rooms. The bed was incredibly comfortable and the location in Santasi Apire is peaceful yet accessible. I will definitely be back!',
    date: 'April 2026',
  },
];
