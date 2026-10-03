'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function GameCard({ game, compact = false, index = 0 }) {
  return (
    <Link href={`/game/${game.slug}`} className={`group block ${compact ? 'w-full' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="overflow-hidden rounded-[28px] border border-white/5 bg-[#171E2C] shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00FF66]/60 hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]"
      >
        <div className="relative h-52 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${game.banner})` }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

          <motion.div
            className="absolute right-3 top-3 rounded-full border border-[#00FF66]/80 bg-[#00FF66]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#7FFFB7] backdrop-blur-sm"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {game.version}
          </motion.div>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9aa9b9]">{game.category}</p>
              <h3 className="mt-1.5 text-lg font-bold leading-tight text-white group-hover:text-[#00FF66] transition-colors">
                {game.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-1 text-[#fbbf24]"
              whileHover={{ scale: 1.05 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Star size={14} fill="currentColor" strokeWidth={1.5} />
                </motion.div>
              ))}
              <span className="ml-2 text-sm font-semibold text-white">{game.rating.toFixed(1)}</span>
            </motion.div>
            <span className="text-xs uppercase tracking-[0.18em] text-[#7FFFB7]">{game.genre}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
