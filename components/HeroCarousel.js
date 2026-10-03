'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const slides = [
  {
    title: 'Neon Rush',
    slug: 'neon-rush',
    category: 'ACTION',
    rating: 4.9,
    description: 'A relentless futuristic racing experience with dynamic combat and endless high-speed chases.',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Shadow Striker',
    slug: 'shadow-striker',
    category: 'ACTION',
    rating: 4.8,
    description: 'Master stealth, weapon combos, and tactical upgrades in a cinematic combat adventure.',
    banner: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Goal Velocity',
    slug: 'goal-velocity',
    category: 'SPORTS',
    rating: 4.9,
    description: 'Take on global rivals in a responsive football sim with skill shots and live tournaments.',
    banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const slide = slides[current];

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#121A23]"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="game-banner relative h-[280px] sm:h-[420px]"
          style={{ backgroundImage: `url(${slide.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0d1117]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,102,0.15),transparent_40%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#00FF66]/60 bg-[#00FF66]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7FFFB7] shadow-glow-subtle"
              >
                ✦ Featured
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
              >
                <Star size={14} className="text-[#fbbf24]" fill="currentColor" />
                {slide.rating.toFixed(1)}
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#7FFFB7]">{slide.category}</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-5xl">{slide.title}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-200 sm:text-base">
                {slide.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/game/${slide.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#00FF66] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#0D1117] shadow-glow transition-all hover:shadow-[0_0_40px_rgba(0,255,102,0.6)] hover:scale-[1.03]"
                >
                  Play Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/game/${slide.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white/80 transition-all hover:border-[#00FF66]/40 hover:bg-white/10"
                >
                  Details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 text-white transition-all hover:border-[#00FF66]/60 hover:bg-[#00FF66]/20 sm:left-5"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 text-white transition-all hover:border-[#00FF66]/60 hover:bg-[#00FF66]/20 sm:right-5"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === current
                ? 'w-8 bg-[#00FF66]'
                : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
