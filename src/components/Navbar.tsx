'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchDialog from './SearchDialog';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/projects', label: 'Проекты' },
  { href: '/about', label: 'О нас' },
  { href: '/team', label: 'Команда' },
  { href: '/contact', label: 'Контакты' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            <Code2 className="w-5 h-5 text-violet-400" />
            DegraSoft
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Mobile toggle */}
          <div className="flex items-center gap-2">
            <SearchDialog />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Меню"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
