'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '@/data/testimonials';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000); // 8 seconds display time
    return () => clearInterval(timer);
  }, [handleNext]);

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-brand-dark-surface py-20 px-8 md:px-16 rounded-[40px] mx-6 md:mx-12 my-14 shadow-xl border border-[#3e3732]/40">
      {/* Absolute Decorative elements */}
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-[850px] text-center relative z-10">
        <div className="mb-4 text-xs font-bold tracking-[0.2em] text-[#d1c7bd] uppercase">Guest Experiences</div>
        <h2 className="font-display text-[32px] md:text-[38px] font-extrabold text-white mb-12 tracking-tight">
          What our guests say
        </h2>

        <div className="relative min-h-[300px] flex flex-col items-center justify-center">
          {/* Custom Classy Quote SVG */}
          <svg className="mb-7 h-11 w-11 text-brand-accent/30 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isAnimating ? 'opacity-0 -translate-y-2 scale-98' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-7">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFull = i < Math.floor(current.rating);
                const isHalf = !isFull && i < current.rating;
                return (
                  <svg key={i} className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    {isFull ? (
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    ) : isHalf ? (
                      // Custom half star SVG if needed, fallback to same star
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    ) : (
                      <path fillRule="evenodd" d="M10 12.395c-.097 0-.193-.013-.287-.038L7.06 14.364c-.458.332-1.073-.115-.9-.652l.9-2.766a1.002 1.002 0 00-.363-1.118L4.254 7.795c-.458-.332-.222-1.055.342-1.055h3.355a1 1 0 00.951-.69l1.07-3.292c.175-.537.939-.537 1.114 0l1.07 3.292a1 1 0 00.951.69h3.355c.564 0 .8.723.342 1.055l-2.443 1.773a1 1 0 00-.363 1.118l.9 2.766c.173.537-.442.984-.9.652l-2.653-1.927c-.094.025-.19.038-.287.038z" clipRule="evenodd" />
                    )}
                  </svg>
                );
              })}
            </div>

            {/* Testimonial text */}
            <p className="text-xl md:text-2xl font-medium leading-[1.7] text-white/95 max-w-[720px] mx-auto italic font-sans">
              &quot;{current.text}&quot;
            </p>

            {/* Reviewer Details with initials avatar */}
            <div className="mt-9 flex items-center justify-center gap-4 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-brand-accent to-[#d64150] text-sm font-bold text-white shadow-md ring-2 ring-white/10">
                {getInitials(current.name)}
              </div>
              <div>
                <div className="text-[16px] font-bold text-white leading-snug">{current.name}</div>
                <div className="text-[13px] text-brand-dark-muted font-medium mt-0.5">
                  {current.role} &bull; {current.date}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Classy Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white hover:text-brand-ink hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          
          {/* Dots Indicator */}
          <div className="flex gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating || index === currentIndex) return;
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsAnimating(false);
                  }, 300);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-brand-accent' : 'w-2.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white hover:text-brand-ink hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
