import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Room at Anboss Hotel',
  description: 'Reserve a single, double, deluxe or executive room at Anboss Hotel in Santasi Apire, Kumasi.',
};

export default function BookingPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1180px] px-12 pt-16 pb-5 text-center">
        <div className="mb-3 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Reservations</div>
        <div className="mb-4 font-display text-[44px] font-extrabold text-brand-ink">Book Your Stay</div>
        <div className="mx-auto max-w-[600px] text-base leading-[1.7] text-brand-muted">
          Choose a room, pick your dates, and we&apos;ll confirm your reservation directly.
        </div>
      </section>
      <section className="mx-auto max-w-[1180px] px-12 pb-20">
        <Suspense fallback={<div className="text-center text-brand-muted">Loading…</div>}>
          <BookingForm />
        </Suspense>
      </section>
    </main>
  );
}
