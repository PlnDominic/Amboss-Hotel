import type { Metadata } from 'next';
import { Archivo, Work_Sans, Playfair_Display, Great_Vibes } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  title: 'Anboss Hotel in Santasi Apre, Kumasi',
  description:
    'Anboss Hotel offers modern, air-conditioned rooms in Santasi Apre, Kumasi. Book your stay for business or leisure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${workSans.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <body className="overflow-x-clip bg-white font-sans text-brand-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
