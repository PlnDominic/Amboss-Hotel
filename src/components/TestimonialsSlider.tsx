'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '@/data/testimonials';

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

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-brand-surface py-16 px-8 md:px-12 rounded-3xl mx-6 md:mx-12 my-10">
      <div className="mx-auto max-w-[800px] text-center">
        <div className="mb-3.5 text-xs tracking-[0.12em] text-brand-muted-3 uppercase">Testimonials</div>
        <h2 className="font-display text-[32px] font-extrabold text-brand-ink mb-10">What our guests say</h2>

        <div className="relative min-h-[220px] flex flex-col items-center justify-center">
          {/* Quote mark decoration */}
          <span className="absolute -top-6 text-[100px] leading-none text-brand-accent/10 font-serif select-none pointer-events-none">
            “
          </span>

          <div
            className={`transition-opacity duration-300 ease-in-out ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFull = i < Math.floor(current.rating);
                const isHalf = !isFull && i < current.rating;
                return (
                  <span key={i} className="text-xl text-amber-500">
                    {isFull ? '★' : isHalf ? '⯪' : '☆'}
                  </span>
                );
              })}
            </div>

            {/* Testimonial text */}
            <p className="text-lg md:text-xl font-medium leading-[1.65] text-brand-ink max-w-[680px] mx-auto italic">
              &quot;{current.text}&quot;
            </p>

            {/* Reviewer details */}
            <div className="mt-7">
              <div className="text-[15px] font-bold text-brand-ink">{current.name}</div>
              <div className="text-xs text-brand-muted mt-0.5">
                {current.role} • {current.date}
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-all hover:bg-brand-ink hover:text-white"
          >
            ←
          </button>
          
          {/* Dots Indicator */}
          <div className="flex gap-2">
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
                  index === currentIndex ? 'w-6 bg-brand-accent' : 'w-2.5 bg-brand-line'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-all hover:bg-brand-ink hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
