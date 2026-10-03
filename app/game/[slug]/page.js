'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Android, Apple, ArrowLeft, Check, MessageSquareText, Star } from 'lucide-react';
import { games } from '@/data/games';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default function GameDetailPage({ params }) {
  const game = games.find((entry) => entry.slug === params.slug);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!game) {
    notFound();
  }

  const infoItems = [
    ['Updated Date', game.updated],
    ['App Name', game.appName],
    ['Latest Version', game.version],
    ['Genre', game.genre],
    ['Developer', game.developer],
    ['OS Version', game.os],
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setReview('');
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto min-h-screen max-w-[1200px] px-4 pb-16 pt-5 sm:px-6 lg:px-8"
    >
      {/* Hero Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[30px] border border-white/10"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13,17,23,0.4), rgba(13,17,23,0.95)), url(${game.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,102,0.2),transparent_40%)]" />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="mb-16 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-all hover:border-[#00FF66]/60 hover:bg-[#00FF66]/10 backdrop-blur-sm"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-full border border-[#00FF66]/50 bg-[#00FF66]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#7FFFB7] shadow-glow-subtle"
            >
              {game.category}
            </motion.div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="overflow-hidden rounded-[24px] border-2 border-[#00FF66]/40 bg-[#121A23]/70 p-2 shadow-glow-subtle"
              >
                <img
                  src={game.icon}
                  alt={game.title}
                  className="h-24 w-24 rounded-[20px] object-cover sm:h-32 sm:w-32"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs uppercase tracking-[0.26em] text-[#7FFFB7]">Game title</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-5xl leading-tight">
                  {game.title}
                </h1>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 rounded-full border border-[#FBBF24]/60 bg-[#FBBF24]/10 px-4 py-3 text-[#FCD34D] w-fit"
            >
              <Star size={18} fill="currentColor" />
              <span className="text-xl font-black">{game.rating.toFixed(1)}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-[#FDE68A]">Rating</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Download Buttons */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#00FF66] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#0D1117] shadow-glow transition-all hover:shadow-[0_0_40px_rgba(0,255,102,0.6)]"
        >
          <Android size={20} />
          Get For Android
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#00FF66]/60 bg-[#00FF66]/10 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#7FFFB7] transition-all hover:bg-[#00FF66]/20"
        >
          <Apple size={20} />
          Get For IOS
        </motion.button>
      </motion.section>

      {/* App Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-[28px] border border-white/10 bg-[#121A23]/80 p-5 sm:p-6 backdrop-blur-sm"
      >
        <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#7FFFB7]">App Information</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {infoItems.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="rounded-2xl border border-white/5 bg-[#171E2C] p-4 hover:border-[#00FF66]/20 transition-colors"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#9aa9b9]">{label}</p>
              <p className="mt-3 text-sm font-semibold text-white md:text-base">{value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-[28px] border border-white/10 bg-[#121A23]/80 p-5 sm:p-6 backdrop-blur-sm"
      >
        <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#7FFFB7]">Highlights & Features</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {game.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.07 }}
              className="flex items-center gap-3 rounded-2xl border border-[#00FF66]/15 bg-[#171E2C] p-4 hover:border-[#00FF66]/40 transition-colors group"
            >
              <motion.div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#00FF66]/10 text-[#00FF66] group-hover:bg-[#00FF66]/20"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Check size={18} />
              </motion.div>
              <span className="font-medium text-white">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-[28px] border border-white/10 bg-[#121A23]/80 p-5 sm:p-6 backdrop-blur-sm"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7FFFB7]">Community Reviews</p>
          </div>
          <motion.div
            className="flex items-center gap-2 rounded-full border border-[#FBBF24]/40 bg-[#FBBF24]/10 px-3 py-2 text-[#FCD34D]"
            whileHover={{ scale: 1.05 }}
          >
            <Star size={16} fill="currentColor" />
            <span className="text-lg font-black">{game.rating.toFixed(1)}/5.0</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-6 rounded-2xl border border-[#00FF66]/15 bg-[#171E2C] p-4"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#9aa9b9]">Player sentiment</p>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base">{game.longDescription}</p>
        </motion.div>

        {/* Review Form */}
        <motion.form
          onSubmit={handleSubmitReview}
          className="space-y-4 rounded-[24px] border border-white/10 bg-[#171E2C] p-4 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2 text-[#7FFFB7]">
            <MessageSquareText size={18} />
            <p className="text-xs font-bold uppercase tracking-[0.22em]">Leave a Verified Review</p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`text-2xl transition-all ${
                  star <= rating
                    ? 'text-[#fbbf24]'
                    : 'text-slate-600 hover:text-[#fbbf24]'
                }`}
                aria-label={`Rate ${star} stars`}
              >
                <Star size={24} fill="currentColor" />
              </motion.button>
            ))}
          </div>

          {/* Review Textarea */}
          <textarea
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full resize-none rounded-[18px] border border-white/10 bg-[#0D1117] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00FF66]/60 focus:outline-none transition-colors"
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={rating === 0 || !review.trim()}
            whileHover={rating > 0 && review.trim() ? { scale: 1.01 } : {}}
            whileTap={rating > 0 && review.trim() ? { scale: 0.99 } : {}}
            className={`w-full rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all ${
              submitted
                ? 'bg-green-500 text-white'
                : rating > 0 && review.trim()
                ? 'bg-[#00FF66] text-[#0D1117] shadow-glow hover:shadow-[0_0_40px_rgba(0,255,102,0.6)]'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {submitted ? '✓ Review Submitted!' : 'Submit Player Review'}
          </motion.button>
        </motion.form>
      </motion.section>
    </motion.main>
  );
}
