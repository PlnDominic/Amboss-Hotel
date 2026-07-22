import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Anboss Hotel',
  description: 'Get in touch with Anboss Hotel in Santasi Apre, Kumasi, or send an enquiry.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 px-12 pt-16 pb-20 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <div className="mb-3 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Get In Touch</div>
          <div className="mb-6 font-display text-[32px] font-extrabold text-brand-ink">Contact Us</div>
          <div className="mb-7 rounded-2xl bg-brand-surface p-5 text-[15px] leading-[1.6] text-brand-muted">
            Looking to reserve a room?{' '}
            <Link href="/booking" className="font-semibold text-brand-accent">
              Book directly here
            </Link>{' '}
            for live availability and pricing.
          </div>
          <div className="mb-7 flex flex-col gap-4.5 text-[15px] leading-[1.7] text-brand-muted">
            <div>
              <span className="font-bold text-brand-ink">Tel:</span>{' '}
              <a href="tel:+233541886633">+233 (0)541‑886633</a> ·{' '}
              <a href="tel:+233244162843">+233 (0)244‑162843</a> ·{' '}
              <a href="tel:+233201868887">+233 (0)201‑868887</a>
            </div>
            <div>
              <span className="font-bold text-brand-ink">Email:</span>{' '}
              <a href="mailto:info@anbosshotel.com">info@anbosshotel.com</a>
            </div>
            <div>
              <span className="font-bold text-brand-ink">Website:</span>{' '}
              <a href="https://www.anbosshotel.com">www.anbosshotel.com</a>
            </div>
            <div>
              <span className="font-bold text-brand-ink">Postal Address:</span> P. O. Box H
            </div>
            <div>
              <span className="font-bold text-brand-ink">Location:</span> Santasi Apre, Kumasi
            </div>
          </div>
          <iframe
            title="Anboss Hotel location map"
            src="https://www.google.com/maps?q=Santasi+Apre,+Kumasi,+Ghana&output=embed"
            className="h-[260px] w-full border-0"
            loading="lazy"
          />
        </div>

        <div className="rounded-3xl bg-brand-surface p-9">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
