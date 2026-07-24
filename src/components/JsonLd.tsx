export default function JsonLd() {
  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': 'https://anbosshotel.com/#hotel',
    name: 'Anboss Hotel',
    alternateName: 'Anboss Hotel Kumasi',
    description:
      'Modern, air-conditioned rooms and suites in Santasi Apre, Kumasi, Ghana. Offers single, double, deluxe, and executive accommodations with bed & breakfast, free WiFi, and 24/7 security.',
    url: 'https://anbosshotel.com',
    telephone: '+233541886633',
    email: 'info@anbosshotel.com',
    priceRange: 'GHS 300 - GHS 600',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4.5',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Santasi Apre',
      addressLocality: 'Kumasi',
      addressRegion: 'Ashanti Region',
      postalCode: 'AG-0666-2011',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.6662,
      longitude: -1.6508,
    },
    hasMap: 'https://maps.google.com/?q=Santasi+Apre+Kumasi+Ghana',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Complimentary Breakfast', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Airport Pickup Shuttle', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Security & CCTV', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'On-Site Parking', value: true },
    ],
    containsPlace: [
      {
        '@type': 'HotelRoom',
        name: 'Single Room',
        description: 'Cozy, modern room with air conditioning, queen bed, and ensuite bathroom.',
        offers: {
          '@type': 'Offer',
          price: '300.00',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'HotelRoom',
        name: 'Double Room',
        description: 'Spacious room with king bed, work desk, smart TV, and air conditioning.',
        offers: {
          '@type': 'Offer',
          price: '400.00',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'HotelRoom',
        name: 'Deluxe Room',
        description: 'Luxury deluxe suite with premium bedding, lounge seating, and executive desk.',
        offers: {
          '@type': 'Offer',
          price: '500.00',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'HotelRoom',
        name: 'Executive Suite',
        description: 'Premier executive suite with living room space, king bed, and private balcony.',
        offers: {
          '@type': 'Offer',
          price: '600.00',
          priceCurrency: 'GHS',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
    />
  );
}
