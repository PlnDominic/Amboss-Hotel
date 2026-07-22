import type { Metadata } from 'next';
import { Archivo, Work_Sans } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Anboss Hotel in Santasi Apre, Kumasi',
  description:
    'Anboss Hotel offers modern, air-conditioned rooms in Santasi Apre, Kumasi. Book your stay for business or leisure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${workSans.variable}`}>
      <body className="bg-white font-sans text-brand-ink antialiased">
        <div className="mx-auto min-h-screen max-w-[1300px]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
