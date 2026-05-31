'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Send } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { useState } from 'react';

const faqItems = [
  {
    question: 'Вы настоящая компания?',
    answer: 'Мы — команда разработчиков, которая решила, что название &quot;DegraSoft&quot; звучит круто. И знаете что? Так и есть.',
  },
  {
    question: 'Когда выйдут проекты?',
    answer: 'Скоро. Когда готовы. Когда звёзды совпадут. Когда кофеин наконец подействует. Выбирайте любой ответ.',
  },
  {
    question: 'Можно как-то помочь?',
    answer: 'Конечно! Форкайте репозитории, создавайте issue, присылайте PR. Или просто звезду поставьте на GitHub. Нам будет приятно.',
  },
  {
    question: 'Почему всё на русском?',
    answer: 'Потому что можем. И потому что англоязычных проектов уже достаточно.',
  },
  {
    question: 'Вы зарабатываете на этом?',
    answer: 'Нет. Это чистый open source. Делаем для души. И для резюме, не скроем.',
  },
  {
    question: 'Как с вами связаться?',
    answer: 'Telegram, GitHub — ссылки внизу. Или на этой странице. Мы не кусаемся.',
  },
];

function FaqItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full glass-card-sm p-5 text-left hover:border-violet-500/30 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-violet-400 shrink-0" />
            <span className="text-white font-medium text-sm sm:text-base">{item.question}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className="mt-3 pl-8 text-zinc-400 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        )}
      </button>
    </motion.div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="px-4 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Контакты</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Хотите что-то сказать? Мы слушаем. Иногда.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 mb-12"
        >
          <a
            href="https://github.com/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex items-center gap-4 hover:border-violet-500/30 transition-all duration-300 group hover:scale-[1.02]"
          >
            <div className="p-3 rounded-xl bg-white/5 text-zinc-400 group-hover:text-violet-400 transition-colors">
              <GithubIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-semibold">GitHub</div>
              <div className="text-zinc-500 text-sm">degrasoft</div>
            </div>
          </a>

          <a
            href="https://t.me/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex items-center gap-4 hover:border-cyan-500/30 transition-all duration-300 group hover:scale-[1.02]"
          >
            <div className="p-3 rounded-xl bg-white/5 text-zinc-400 group-hover:text-cyan-400 transition-colors">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-semibold">Telegram</div>
              <div className="text-zinc-500 text-sm">@degrasoft</div>
            </div>
          </a>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-center mb-6">
            <span className="gradient-text">Частые вопросы</span>
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Fake form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-5 h-5 text-violet-400" />
            <h2 className="text-xl font-bold text-white">Напишите нам</h2>
          </div>
          <p className="text-zinc-500 text-sm mb-6">
            Для тех, кто любит заполнять формы. Мы обязательно прочитаем. Когда-нибудь.
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-white font-semibold mb-1">Отправлено!</p>
              <p className="text-zinc-500 text-sm">Ну, на экране. В реальности никуда не ушло.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-1.5">Имя</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1.5">Сообщение</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Что хотели сказать?"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03]"
              >
                Отправить в пустоту
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
