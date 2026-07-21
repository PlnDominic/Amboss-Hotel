import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { ContactForm } from '../types';

const EMPTY_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  checkin: '',
  checkout: '',
  guests: '',
  message: '',
};

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box' as const,
  padding: '12px 16px',
  border: '1px solid #e5ddcf',
  borderRadius: 12,
  fontSize: 15,
  fontFamily: 'inherit',
  background: '#fff',
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: '#6b6560',
  display: 'block',
  marginBottom: 6,
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof ContactForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main data-screen-label="Contact">
      <section
        style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 48px 80px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'start' }}
        className="contact-grid"
      >
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a89f97', marginBottom: 12 }}>
            Get In Touch
          </div>
          <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 32, color: '#14110f', marginBottom: 24 }}>
            Contact Us
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 15, color: '#6b6560', lineHeight: 1.7, marginBottom: 28 }}>
            <div>
              <span style={{ fontWeight: 700, color: '#14110f' }}>Tel:</span>{' '}
              <a href="tel:+233541886633">+233 (0)541‑886633</a> ·{' '}
              <a href="tel:+233244162843">+233 (0)244‑162843</a> ·{' '}
              <a href="tel:+233201868887">+233 (0)201‑868887</a>
            </div>
            <div>
              <span style={{ fontWeight: 700, color: '#14110f' }}>Email:</span>{' '}
              <a href="mailto:info@anbosshotel.com">info@anbosshotel.com</a>
            </div>
            <div>
              <span style={{ fontWeight: 700, color: '#14110f' }}>Website:</span>{' '}
              <a href="https://www.anbosshotel.com">www.anbosshotel.com</a>
            </div>
            <div>
              <span style={{ fontWeight: 700, color: '#14110f' }}>Postal Address:</span> P. O. Box H
            </div>
            <div>
              <span style={{ fontWeight: 700, color: '#14110f' }}>Location:</span> Santasi Apre, Kumasi
            </div>
          </div>
          <iframe
            title="Anboss Hotel location map"
            src="https://www.google.com/maps?q=Santasi+Apre,+Kumasi,+Ghana&output=embed"
            style={{ width: '100%', height: 260, border: 0, borderRadius: 20 }}
            loading="lazy"
          />
        </div>

        <div style={{ background: '#f6f2ec', borderRadius: 24, padding: 36 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 22, color: '#14110f', marginBottom: 12 }}>
                Thank you!
              </div>
              <div style={{ fontSize: 15, color: '#6b6560', lineHeight: 1.6 }}>
                Your enquiry has been received. We'll get back to you within 24 hours — or call us
                directly for a faster response.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 20, color: '#14110f', marginBottom: 2 }}>
                Send an Enquiry
              </div>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input required type="text" value={form.name} onChange={setField('name')} style={inputStyle} />
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input required type="email" value={form.email} onChange={setField('email')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" value={form.phone} onChange={setField('phone')} style={inputStyle} />
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Check‑in</label>
                  <input type="date" value={form.checkin} onChange={setField('checkin')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Check‑out</label>
                  <input type="date" value={form.checkout} onChange={setField('checkout')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Guests</label>
                  <input type="number" min={1} value={form.guests} onChange={setField('guests')} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={setField('message')}
                  style={{ ...inputStyle, resize: 'vertical' as const }}
                />
              </div>
              <button
                type="submit"
                style={{ background: '#b3202f', color: '#fff', border: 'none', padding: 14, fontSize: 15, fontWeight: 700, borderRadius: 100, cursor: 'pointer', marginTop: 6 }}
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
