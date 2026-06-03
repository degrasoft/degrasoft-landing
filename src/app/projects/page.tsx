'use client';

import { motion } from 'framer-motion';
import { GithubIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';

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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Наши <span className="gradient-text">проекты</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Всё открыто. Всё бесплатно. Всё на GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-5 bg-white/5 rounded w-1/3 mb-3" />
                <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : repos.length > 0 ? (
          <div className="space-y-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="glass-card p-6 block group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-violet-500/5"
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
        ) : (
          <div className="glass-card-sm p-8 text-center">
            <GithubIcon className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">
              Не удалось загрузить проекты. Попробуйте позже.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03]"
          >
            <GithubIcon className="w-4 h-4" />
            Все репозитории на GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
