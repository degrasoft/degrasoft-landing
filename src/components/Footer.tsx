import Image from 'next/image';
import { Send } from 'lucide-react';
import { GithubIcon } from './icons';
import { basePath } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-[#0a0a0f]/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-zinc-500 text-sm">
            <Image
              src={`${basePath}/logo.png`}
              alt="DegraSoft"
              width={20}
              height={20}
              className="w-5 h-5 rounded"
            />
            <span>DegraSoft</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-600 italic">Навайбкожено при помощи нейронок</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/degrasoft"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/degrasoft"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
