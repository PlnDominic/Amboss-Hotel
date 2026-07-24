import type { Metadata } from 'next';
import { Archivo, Work_Sans, Playfair_Display, Great_Vibes } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-archivo',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-worksans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-greatvibes',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anbosshotel.com'),
  title: {
    default: 'Anboss Hotel | Modern Rooms & Suites in Santasi Apre, Kumasi',
    template: '%s | Anboss Hotel Kumasi',
  },
  description:
    'Book luxury, air-conditioned rooms at Anboss Hotel in Santasi Apre, Kumasi, Ghana (GPS: AG-0666-2011). Offers single, double, deluxe & executive rooms with bed & breakfast, free WiFi, and 24/7 security.',
  keywords: [
    'Anboss Hotel',
    'Anboss Hotel Kumasi',
    'Santasi Apre Hotel',
    'Hotel in Kumasi',
    'Ghana Post GPS AG-0666-2011',
    'Hotel in Santasi Apre',
    'Kumasi luxury rooms',
    'Kumasi accommodation',
    'Book hotel Kumasi',
    'Deluxe room Kumasi',
  ],
  authors: [{ name: 'Anboss Hotel' }],
  creator: 'Anboss Hotel',
  publisher: 'Anboss Hotel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Anboss Hotel | Modern Rooms & Suites in Santasi Apre, Kumasi',
    description:
      'Book luxury, air-conditioned rooms at Anboss Hotel in Santasi Apre, Kumasi, Ghana (GPS: AG-0666-2011). Bed & breakfast included.',
    url: 'https://anbosshotel.com',
    siteName: 'Anboss Hotel',
    images: [
      {
        url: '/hero-exterior.webp',
        width: 1200,
        height: 630,
        alt: 'Anboss Hotel Exterior in Santasi Apre, Kumasi',
      },
    ],
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anboss Hotel | Modern Rooms & Suites in Santasi Apre, Kumasi',
    description:
      'Book luxury, air-conditioned rooms at Anboss Hotel in Santasi Apre, Kumasi, Ghana. Bed & breakfast included.',
    images: ['/hero-exterior.webp'],
  },
  other: {
    'geo.region': 'GH-AH',
    'geo.placename': 'Kumasi',
    'geo.position': '6.6662;-1.6508',
    ICBM: '6.6662, -1.6508',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${workSans.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="overflow-x-clip bg-white font-sans text-brand-ink antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6JVRZP6SEW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6JVRZP6SEW');
          `}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
