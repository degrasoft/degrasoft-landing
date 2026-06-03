'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { GithubIcon as GhIcon } from '@/components/icons';

export default function ContactPage() {
  return (
    <div className="px-4 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Наши <span className="gradient-text">контакты</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Напишите нам. Мы не кусаемся. Обычно.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.a
            href="https://t.me/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card p-8 text-center group hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto mb-4 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
              <Send className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Telegram</h3>
            <p className="text-zinc-400 text-sm">
              Самый быстрый способ связаться с нами. Пишите в любое время.
            </p>
            <p className="text-cyan-400 text-sm mt-3 font-medium">t.me/degrasoft</p>
          </motion.a>

          <motion.a
            href="https://github.com/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card p-8 text-center group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-400 mx-auto mb-4 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
              <GhIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
            <p className="text-zinc-400 text-sm">
              Откройте issue, предложите фичу или просто посмотрите код.
            </p>
            <p className="text-violet-400 text-sm mt-3 font-medium">github.com/degrasoft</p>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-8 mt-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-3">Хотите помочь?</h3>
          <p className="text-zinc-400 leading-relaxed max-w-md mx-auto">
            Мы всегда рады новым людям. Если умеете писать код, рисовать интерфейсы,
            придумывать идеи или просто хотите быть частью команды — пишите нам в Telegram.
            Мы не требуем опыта, только желание делать крутые штуки.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
