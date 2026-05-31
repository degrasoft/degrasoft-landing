'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Star, GitFork, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import { basePath } from '@/lib/config';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  Python: '#3572A5',
  JavaScript: '#F7DF1E',
  Rust: '#DEA584',
  Go: '#00ADD8',
};

function AnimatedCounter({ target, label, icon: Icon }: { target: number; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 40);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="glass-card-sm p-6 text-center group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{count}</div>
      <div className="text-zinc-500 text-sm flex items-center justify-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      className="glass-card p-6 block group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <GithubIcon className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
            {repo.name}
          </h3>
        </div>
        <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
        {repo.description || 'Описание скоро появится...'}
      </p>

      <div className="flex items-center gap-4 text-xs text-zinc-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: LANG_COLORS[repo.language] || '#8b8b8b' }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks_count}
        </span>
      </div>
    </motion.a>
  );
}

export default function HomePage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/orgs/degrasoft/repos?sort=updated&per_page=10')
      .then((r) => r.json())
      .then((data) => {
        const filtered = (Array.isArray(data) ? data : []).filter(
          (r: GitHubRepo) => r.name !== 'degrasoft-landing'
        );
        setRepos(filtered);
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-8">
              <Code className="w-4 h-4" />
              <span>Open Source</span>
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
            className="mb-8"
          >
            <Image
              src={`${basePath}/logo.png`}
              alt="DegraSoft"
              width={96}
              height={96}
              className="w-24 h-24 rounded-2xl mx-auto shadow-lg shadow-violet-500/20"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
          >
            Пишем код,{' '}
            <span className="animated-gradient-text">пока все стримят</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            DegraSoft — команда, которая делает инструменты для стримеров и не только
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03]"
            >
              Смотреть проекты
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/degrasoft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-violet-500/30 hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.03]"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <AnimatedCounter target={repos.length || 2} label="проекта" icon={Code} />
            <AnimatedCounter target={100} label="% open source" icon={Star} />
          </motion.div>
        </div>
      </section>

      {/* GitHub Repos */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-center mb-10"
          >
            Наши <span className="gradient-text">проекты</span>
          </motion.h2>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="h-5 bg-white/5 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {repos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Хотите посмотреть код?
          </h2>
          <p className="text-zinc-400 mb-8">
            Всё открыто. Форкайте, предлагайте, делайте лучше.
          </p>
          <a
            href="https://github.com/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03]"
          >
            <GithubIcon className="w-4 h-4" />
            Заглянуть на GitHub
          </a>
        </motion.div>
      </section>
    </div>
  );
}
