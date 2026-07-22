'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { ContactFormValues } from '@/types';

const EMPTY_FORM: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  checkin: '',
  checkout: '',
  guests: '',
  message: '',
};

const inputClass =
  'w-full box-border rounded-xl border border-brand-input-border bg-white px-4 py-3 font-[inherit] text-[15px]';
const labelClass = 'mb-1.5 block text-[13px] font-semibold text-brand-muted';

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormValues>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const setField =
    (field: keyof ContactFormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <div className="mb-3 font-display text-[22px] font-extrabold text-brand-ink">Thank you!</div>
        <div className="text-[15px] leading-[1.6] text-brand-muted">
          Your enquiry has been received. We&apos;ll get back to you within 24 hours, or you can call us
          directly for a faster response.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-0.5 font-display text-xl font-bold text-brand-ink">Send an Enquiry</div>
      <div>
        <label className={labelClass}>Full Name</label>
        <input required type="text" value={form.name} onChange={setField('name')} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email</label>
          <input required type="email" value={form.email} onChange={setField('email')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input type="tel" value={form.phone} onChange={setField('phone')} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Check‑in</label>
          <input type="date" value={form.checkin} onChange={setField('checkin')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Check‑out</label>
          <input type="date" value={form.checkout} onChange={setField('checkout')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Guests</label>
          <input type="number" min={1} value={form.guests} onChange={setField('guests')} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={setField('message')}
          className={`${inputClass} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="mt-1.5 rounded-full bg-brand-accent py-3.5 text-[15px] font-bold text-white"
      >
        Send Enquiry
      </button>
    </form>
  );
}
