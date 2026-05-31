'use client';

import { motion } from 'framer-motion';
import { GithubIcon } from '@/components/icons';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function ProjectsPage() {
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
    <div className="px-4 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Наши <span className="gradient-text">проекты</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Открытые проекты для стримеров и не только. Всё на GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 animate-pulse"
              >
                <div className="h-5 bg-white/5 rounded w-1/3 mb-3" />
                <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
              </motion.div>
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg mb-4">Пока пусто... но это временно!</p>
            <a
              href="https://github.com/degrasoft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-violet-500/30 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              Заглянуть на GitHub
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
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
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-600 text-sm italic">
            Больше проектов — на GitHub. Форкайте, ставьте звёзды, присылайте PR.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
