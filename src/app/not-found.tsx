import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Страница не найдена</h1>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Кажется, вы забрели не туда. Такая страница не существует. Или существовала, но мы её удалили. Или её никогда не было. Кто знает.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          На главную
        </Link>
      </div>
    </div>
  );
}
