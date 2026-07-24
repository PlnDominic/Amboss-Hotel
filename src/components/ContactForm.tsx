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
  'w-full box-border rounded-none border border-brand-input-border bg-white px-4 py-3 font-[inherit] text-[14px] outline-none focus:border-brand-accent';
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-muted';

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
        <div className="text-[14px] leading-relaxed text-brand-muted">
          Your enquiry has been received. We&apos;ll get back to you within 24 hours, or you can call us
          directly for a faster response.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Full Name</label>
        <input required type="text" value={form.name} onChange={setField('name')} className={inputClass} placeholder="e.g. John Doe" />
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email</label>
          <input required type="email" value={form.email} onChange={setField('email')} className={inputClass} placeholder="john@example.com" />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input type="tel" value={form.phone} onChange={setField('phone')} className={inputClass} placeholder="+233 54 188 6633" />
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
          <input type="number" min={1} value={form.guests} onChange={setField('guests')} className={inputClass} placeholder="1" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={setField('message')}
          className={`${inputClass} resize-y`}
          placeholder="How can we assist you?"
        />
      </div>
      <button
        type="submit"
        className="mt-1.5 rounded-none bg-brand-accent py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-colors hover:bg-brand-accent-hover cursor-pointer"
      >
        Send Enquiry
      </button>
    </form>
  );
}
