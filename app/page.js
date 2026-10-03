'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, LayoutGrid, List, Search, SlidersHorizontal } from 'lucide-react';
import { categories, games } from '@/data/games';
import GameCard from '@/components/GameCard';
import HeroCarousel from '@/components/HeroCarousel';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL GAMES');
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory =
        selectedCategory === 'ALL GAMES' || game.category === selectedCategory;
      const matchesSearch = game.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <main className="mx-auto min-h-screen max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel sticky top-3 z-30 mb-8 rounded-[26px] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] shadow-glow-subtle"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Gamepad2 size={22} />
            </motion.div>
            <div>
              <div className="text-2xl font-black tracking-tight text-white">GameZone</div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7FFFB7]">Premium Games</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="hidden rounded-full border border-[#00FF66]/50 bg-[#00FF66]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FFFB7] transition-colors hover:bg-[#00FF66]/20 md:inline-flex"
          >
            Unlock Premium Games
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#7FFFB7]">Welcome back</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-white">
            UNLOCK PREMIUM GAMES
          </h1>
        </motion.div>

        <div className="mt-6">
          <HeroCarousel />
        </div>
      </section>

      {/* Controls Section */}
      <section className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scroll">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`smooth-transition whitespace-nowrap rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] ${
                  selectedCategory === category
                    ? 'border-[#00FF66]/60 bg-[#00FF66] text-[#0D1117] shadow-glow'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel flex items-center gap-2 rounded-full px-3 py-2.5 text-slate-300"
            >
              <Search size={16} className="text-[#7FFFB7]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search games..."
                className="w-28 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none sm:w-40"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1"
            >
              <motion.button
                onClick={() => setViewMode('grid')}
                whileTap={{ scale: 0.9 }}
                className={`smooth-transition rounded-full p-2.5 ${
                  viewMode === 'grid'
                    ? 'bg-[#00FF66] text-[#0D1117] shadow-glow'
                    : 'text-slate-300 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                whileTap={{ scale: 0.9 }}
                className={`smooth-transition rounded-full p-2.5 ${
                  viewMode === 'list'
                    ? 'bg-[#00FF66] text-[#0D1117] shadow-glow'
                    : 'text-slate-300 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Section Header */}
      <section className="mb-5 flex items-center justify-between px-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[#9aa9b9]">
            {selectedCategory !== 'ALL GAMES' ? selectedCategory : 'All'} Games
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {filteredGames.length} available
          </p>
        </motion.div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FFFB7]">
          <SlidersHorizontal size={14} />
          Filters
        </div>
      </section>

      {/* Games Grid */}
      <section
        className={viewMode === 'grid'
          ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
          : 'space-y-4'
        }
      >
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <GameCard key={game.slug} game={game} compact={viewMode === 'list'} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full rounded-[24px] border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300"
          >
            <p className="text-lg font-semibold">No games found</p>
            <p className="mt-2 text-sm">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
