'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

const searchItems: SearchItem[] = [
  { title: 'Главная', description: 'Начальная страница DegraSoft', href: '/', category: 'Страницы' },
  { title: 'Проекты', description: 'Все наши проекты', href: '/projects', category: 'Страницы' },
  { title: 'О нас', description: 'Что такое DegraSoft', href: '/about', category: 'Страницы' },
  { title: 'Команда', description: 'Наша команда', href: '/team', category: 'Страницы' },
  { title: 'Контакты', description: 'Связаться с нами', href: '/contact', category: 'Страницы' },
  { title: 'DegraZhaba', description: 'Система модерации стрим-контента и голосования', href: 'https://github.com/degrasoft/degrazhaba', category: 'Проекты' },
  { title: 'TgBanCheckBot', description: 'Telegram бот для проверки банов', href: 'https://github.com/degrasoft/tgbancheckbot', category: 'Проекты' },
  { title: 'GitHub', description: 'Все репозитории DegraSoft', href: 'https://github.com/degrasoft', category: 'Ссылки' },
  { title: 'Telegram', description: 'Канал DegraSoft', href: 'https://t.me/degrasoft', category: 'Ссылки' },
];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = query
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery('');
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].href);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-violet-500/30 transition-all text-sm"
        aria-label="Поиск"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Поиск</span>
        <kbd className="hidden sm:flex items-center gap-0.5 text-xs text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg mx-4 bg-[#0f0f1a]/95 backdrop-blur-xl border border-violet-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Искать..."
            className="flex-1 bg-transparent text-zinc-200 placeholder-zinc-500 outline-none text-sm"
            autoFocus
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-zinc-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500 text-sm">
              Ничего не найдено. Как и смысл жизни.
            </div>
          ) : (
            <>
              {Array.from(new Set(filtered.map((i) => i.category))).map((category) => (
                <div key={category}>
                  <div className="px-3 py-1.5 text-xs text-zinc-500 font-medium uppercase tracking-wider">
                    {category}
                  </div>
                  {filtered
                    .filter((i) => i.category === category)
                    .map((item) => {
                      const globalIdx = filtered.indexOf(item);
                      return (
                        <button
                          key={item.href}
                          onClick={() => navigate(item.href)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                            globalIdx === selectedIndex
                              ? 'bg-violet-500/20 text-white'
                              : 'text-zinc-300 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{item.title}</div>
                            <div className="text-xs text-zinc-500 truncate">{item.description}</div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center gap-4 px-4 py-2 border-t border-white/10 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <kbd className="border border-zinc-700 rounded px-1">↑↓</kbd> навигация
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-zinc-700 rounded px-1">Enter</kbd> перейти
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-zinc-700 rounded px-1">Esc</kbd> закрыть
          </span>
        </div>
      </div>
    </div>
  );
}
