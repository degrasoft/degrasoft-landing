'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  { href: '/', label: 'Главная', description: 'Начальная страница' },
  { href: '/projects', label: 'Проекты', description: 'Наши open source проекты' },
  { href: '/about', label: 'О нас', description: 'Кто мы и чем занимаемся' },
  { href: '/team', label: 'Команда', description: 'Участники организации' },
  { href: '/contact', label: 'Контакты', description: 'Как с нами связаться' },
];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = pages.filter(
    (p) =>
      p.label.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-violet-500/30 transition-all text-sm"
        aria-label="Поиск"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Поиск</span>
        <kbd className="hidden sm:flex items-center gap-0.5 text-xs text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full max-w-lg glass-card p-4"
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Искать по сайту..."
                  className="w-full bg-transparent text-white placeholder-zinc-500 outline-none text-lg pb-3 border-b border-white/10 mb-3"
                />
                <div className="space-y-1">
                  {filtered.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="text-white font-medium">{page.label}</div>
                      <div className="text-zinc-500 text-sm">{page.description}</div>
                    </Link>
                  ))}
                  {filtered.length === 0 && (
                    <div className="text-zinc-500 text-sm py-2 text-center">
                      Ничего не найдено
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
