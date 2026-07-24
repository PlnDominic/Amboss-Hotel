import type { Metadata } from 'next';
import BookingWizard from '@/components/BookingWizard';

export const metadata: Metadata = {
  title: 'Book Your Stay | Anboss Hotel',
  description: 'Well-appointed rooms in Santasi Apire, Kumasi. Book your stay online easily with our booking wizard.',
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-brand-surface/20">
      <section className="mx-auto max-w-[1180px] px-12 pt-16 pb-2 text-center">
        <div className="mb-3 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Reservations</div>
        <div className="mb-4 font-display text-[44px] font-extrabold text-brand-ink">book your stay</div>
      </section>
      <BookingWizard />
    </main>
  );
}
