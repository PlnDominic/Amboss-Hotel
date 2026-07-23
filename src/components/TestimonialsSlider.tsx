'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '@/data/testimonials';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(1, rating / 5)) * 100;
  return (
    <div className="relative inline-flex" aria-label={`${rating} out of 5 stars`}>
      <div className="flex gap-1.5 text-[15px] tracking-[0.1em] text-brand-line">★★★★★</div>
      <div
        className="absolute inset-0 flex gap-1.5 overflow-hidden text-[15px] tracking-[0.1em] text-[#c19a3e]"
        style={{ width: `${pct}%` }}
      >
        ★★★★★
      </div>
    </div>
  );
}

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (next: (prev: number) => number) => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (next(prev) + testimonials.length) % testimonials.length);
        setIsAnimating(false);
      }, 280);
    },
    [],
  );

  const handleNext = useCallback(() => goTo((i) => i + 1), [goTo]);
  const handlePrev = useCallback(() => goTo((i) => i - 1), [goTo]);

  useEffect(() => {
    const timer = setInterval(handleNext, 6500);
    return () => clearInterval(timer);
  }, [handleNext]);

  const current = testimonials[currentIndex];

  return (
    <section className="ml-[calc(50%-50vw)] w-screen border-y border-brand-line bg-brand-surface/60 px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-14 text-center">
          <div className="mb-4 text-xs tracking-[0.24em] text-brand-muted-3 uppercase">Testimonials</div>
          <h2 className="font-display text-[40px] leading-none font-extrabold text-brand-ink">What our guests say</h2>
          <div className="mx-auto mt-6 h-px w-14 bg-brand-accent" />
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 font-display text-[180px] leading-none text-brand-accent/10 select-none md:-top-20 md:text-[220px]"
          >
            &ldquo;
          </span>

          <div
            className={`relative flex flex-col items-center text-center transition-all duration-300 ease-out ${
              isAnimating ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <div className="mb-8">
              <Stars rating={current.rating} />
            </div>

            <blockquote className="mx-auto max-w-[760px] font-display text-[24px] leading-[1.5] font-medium text-brand-ink md:text-[30px]">
              {current.text}
            </blockquote>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-ink font-display text-sm font-bold tracking-[0.04em] text-white">
                {initials(current.name)}
              </div>
              <div className="text-left">
                <div className="text-[15px] font-bold text-brand-ink">{current.name}</div>
                <div className="mt-0.5 text-[12.5px] tracking-[0.02em] text-brand-muted-2">
                  {current.role} · {current.date}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center gap-7">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center border border-brand-line bg-white text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="min-w-[60px] text-center text-[13px] tracking-[0.16em] text-brand-muted-2 tabular-nums">
            <span className="font-bold text-brand-ink">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1.5 text-brand-line">/</span>
            {String(testimonials.length).padStart(2, '0')}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center border border-brand-line bg-white text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
