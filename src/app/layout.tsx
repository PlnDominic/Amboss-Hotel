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
  title: 'Anboss Hotel — Santasi Apre, Kumasi',
  description:
    'Anboss Hotel — modern, air-conditioned rooms in Santasi Apre, Kumasi. Book your stay for business or leisure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${workSans.variable}`}>
      <body className="bg-brand-bg font-sans text-brand-ink antialiased">
        <div className="min-h-screen px-5 pt-5">
          <div className="mx-auto max-w-[1300px] overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(20,15,10,0.08)]">
            <Header />
            {children}
            <Footer />
          </div>
          <div className="h-5" />
        </div>
      </body>
    </html>
  );
}
