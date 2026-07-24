import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FlourishDivider from '@/components/FlourishDivider';

export const metadata: Metadata = {
  title: 'Contact Us | Anboss Hotel Kumasi',
  description:
    'Get in touch with Anboss Hotel in Santasi Apire, Kumasi (GPS: AG-0666-2011, Postal: SN 284, Santasi). Call or send an online enquiry.',
};

export default function ContactPage() {
  return (
    <main className="w-full bg-white">
      {/* HERO BANNER FOR CONTACT */}
      <section className="bg-brand-dark-surface py-16 px-6 text-white text-center">
        <div className="mx-auto max-w-[800px]">
          <span className="font-script text-3xl text-brand-accent">Get In Touch</span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-white mt-1">
            CONTACT ANBOSS HOTEL
          </h1>
          <FlourishDivider dark />
          <p className="mt-3 text-xs md:text-sm text-white/80 leading-relaxed max-w-[620px] mx-auto">
            Have questions about room availability or group reservations? Contact our front desk team in Santasi Apire, Kumasi.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        {/* Contact Info Column */}
        <div className="border border-brand-line bg-white p-7 md:p-9 shadow-md rounded-none">
          <h2 className="font-serif text-2xl font-extrabold text-brand-ink border-b border-brand-line pb-4">
            Hotel Information
          </h2>

          <div className="my-6 bg-brand-surface p-4 text-xs leading-relaxed text-brand-muted border-l-4 border-brand-accent rounded-none">
            Looking to reserve a room immediately?{' '}
            <Link href="/book" className="font-bold text-brand-accent hover:underline">
              Book directly here →
            </Link>{' '}
            for live availability and instant confirmation.
          </div>

          <div className="flex flex-col gap-4 text-xs leading-relaxed text-brand-muted">
            <div className="flex items-start gap-3 border-b border-brand-line/60 pb-3">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">Location:</span>
              <span className="text-brand-ink">Santasi Apire, Kumasi, Ghana</span>
            </div>

            <div className="flex items-start gap-3 border-b border-brand-line/60 pb-3">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">GPS Address:</span>
              <span className="font-bold text-brand-accent">AG-0666-2011</span>
            </div>

            <div className="flex items-start gap-3 border-b border-brand-line/60 pb-3">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">Postal Address:</span>
              <span className="font-bold text-brand-ink">SN 284, Santasi</span>
            </div>

            <div className="flex items-start gap-3 border-b border-brand-line/60 pb-3">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">Telephone:</span>
              <div className="flex flex-col gap-1 text-brand-ink font-medium">
                <a href="tel:+233244066999" className="hover:text-brand-accent transition-colors">+233 (0)244-066999</a>
                <a href="tel:+233201185123" className="hover:text-brand-accent transition-colors">+233 (0)201-185123</a>
              </div>
            </div>

            <div className="flex items-start gap-3 border-b border-brand-line/60 pb-3">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">Email:</span>
              <a href="mailto:info@anbosshotel.com" className="text-brand-accent font-semibold hover:underline">
                info@anbosshotel.com
              </a>
            </div>

            <div className="flex items-start gap-3 border-b border-brand-line/60 pb-3">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">Website:</span>
              <a href="https://www.anbosshotel.com" className="text-brand-ink hover:text-brand-accent transition-colors">
                www.anbosshotel.com
              </a>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <span className="font-bold text-brand-ink w-28 shrink-0 uppercase tracking-wider">Check-in / out:</span>
              <span>Check-in 12:00 PM &bull; Check-out 12:00 AM</span>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-8 overflow-hidden border border-brand-line rounded-none shadow-sm">
            <iframe
              title="Anboss Hotel location map"
              src="https://www.google.com/maps?q=Santasi+Apire,+Kumasi,+Ghana&output=embed"
              className="h-[240px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="border border-brand-line bg-brand-surface p-7 md:p-9 shadow-md rounded-none">
          <h2 className="font-serif text-2xl font-extrabold text-brand-ink mb-2">
            Send Us a Message
          </h2>
          <p className="text-xs text-brand-muted mb-6">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
