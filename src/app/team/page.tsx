'use client';

import { motion } from 'framer-motion';
import { Plus, Coffee, Brain, Music, Gamepad2, Send, Users, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { useEffect, useState } from 'react';

interface GitHubMember {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const skills = [
  { icon: Coffee, label: 'Пьём кофе' },
  { icon: Brain, label: 'Думаем' },
  { icon: Music, label: 'Слушаем музыку' },
  { icon: Gamepad2, label: 'Иногда играем' },
];

function MemberCard({ member, index }: { member: GitHubMember; index: number }) {
  return (
    <motion.a
      href={member.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
      className="glass-card p-6 flex flex-col items-center text-center group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-500/5"
    >
      {/* Avatar */}
      <div className="relative mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.avatar_url}
          alt={member.login}
          className="w-20 h-20 rounded-full border-2 border-white/10 group-hover:border-violet-500/40 transition-colors duration-300"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0a0a0f] flex items-center justify-center">
          <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-violet-400 transition-colors" />
        </div>
      </div>

      <h3 className="text-white font-semibold text-lg group-hover:text-violet-300 transition-colors">
        {member.login}
      </h3>
      <p className="text-zinc-500 text-sm mt-1">
        Участник организации
      </p>
    </motion.a>
  );
}

function MemberSkeleton() {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center animate-pulse">
      <div className="w-20 h-20 rounded-full bg-white/5 mb-4" />
      <div className="h-5 bg-white/5 rounded w-24 mb-2" />
      <div className="h-4 bg-white/5 rounded w-20" />
    </div>
  );
}

export default function TeamPage() {
  const [members, setMembers] = useState<GitHubMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/orgs/degrasoft/members')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers(data);
        }
      })
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

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
            Наша <span className="gradient-text">команда</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Небольшая, но уверенная. И мы всегда рады новым людям.
          </p>
        </motion.div>

        {/* Org card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 mb-8 text-center"
        >
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center overflow-hidden shadow-lg shadow-violet-500/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="DegraSoft"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">DegraSoft</h2>
          <p className="text-zinc-500 text-sm mb-4">Разработчики, дизайнеры, мечтатели</p>

          <p className="text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
            Мы — команда, которая делает инструменты для стримеров. Пишем код, рисуем кнопки,
            чиним баги, создаём новые фичи, пьём кофе и иногда что-то деплоим. И нам всегда мало людей.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span
                key={skill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white/5 text-zinc-400 border border-white/10"
              >
                <skill.icon className="w-3 h-3" />
                {skill.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Members section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            <span className="gradient-text">Участники</span>
            {' '}({members.length || '...'})
          </h2>

          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <MemberSkeleton key={i} />
              ))}
            </div>
          ) : members.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {members.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-card-sm p-8 text-center">
              <Users className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500">
                Не удалось загрузить участников. Попробуйте позже.
              </p>
            </div>
          )}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass-card-sm p-8 text-center mb-8 border-dashed border-violet-500/30 group hover:border-violet-500/50 transition-all duration-300"
        >
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-700 group-hover:border-violet-500/50 mx-auto mb-4 flex items-center justify-center transition-colors">
            <Plus className="w-8 h-8 text-zinc-600 group-hover:text-violet-400 transition-colors" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Присоединяйтесь к команде!</h3>
          <p className="text-zinc-500 text-sm mb-4 max-w-sm mx-auto">
            Мы растём и ищем людей. Если вы умеете писать код, рисовать,
            придумывать идеи или просто хотите помочь — вам сюда.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <a
              href="https://t.me/degrasoft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
              Telegram
            </a>
            <a
              href="https://github.com/degrasoft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-zinc-600 text-sm">
            В хорошей команде легко договориться. Главное — не спорить с тем, кто прав. (Это шутка. Или нет.)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
