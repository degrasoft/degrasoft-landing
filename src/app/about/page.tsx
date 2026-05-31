'use client';

import { motion } from 'framer-motion';
import { Bug, Coffee, Heart, Shield, Zap, Users } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

const principles = [
  {
    icon: Shield,
    title: 'Работает — не трогай',
    description: 'Если код работает, лучше его не трогать. Ну, пока не сломается. А сломается — починим.',
  },
  {
    icon: Heart,
    title: 'Open source или смерть',
    description: 'Всё открыто. Даже наши ошибки. Особенно наши ошибки. Форкайте и делайте лучше.',
  },
  {
    icon: Bug,
    title: 'Баги — это фичи',
    description: 'Не баг, а неожиданное поведение. Это разные вещи, честно. А если серьёзно — багрепорты приветствуются.',
  },
  {
    icon: Coffee,
    title: 'Кофе-дривен девелопмент',
    description: 'Пишем код на кофеине. Тестируем на авоське. Деплоим на удачу. Но работает же!',
  },
  {
    icon: Zap,
    title: 'Быстро и сердито',
    description: 'Делаем быстро. Работает — отлично. Не работает — тоже быстро. Главное — не стоять на месте.',
  },
  {
    icon: Users,
    title: 'Команда прежде всего',
    description: 'Мы растём, учимся и делаем крутые штуки вместе. Каждый вклад важен, даже самый маленький.',
  },
];

export default function AboutPage() {
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
            Что это <span className="gradient-text">вообще такое?</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto">
            DegraSoft — команда, которая любит писать код, ненавидит корпоративную чушь и делает открытые проекты для стримеров.
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Честный ответ</h2>
          <div className="text-zinc-400 leading-relaxed space-y-4">
            <p>
              DegraSoft — это не корпорация, не стартап с оценкой в миллиарды и не скучный офис.
              Это команда людей, которые делают софт для стримеров и их зрителей. Потому что можем. И потому что Existing решения
              либо тормозят, либо стоят денег, либо и то, и другое.
            </p>
            <p>
              Иногда наши штуки получаются полезными. Иногда — забавными. Иногда и то, и другое одновременно.
              Но всё это открыто, бесплатно и с любовью. Ну, с любовью и кофеином.
            </p>
            <p>
              Мы верим, что софт не должен стоить дорого, интерфейсы не должны быть уродливыми,
              а баги — это просто неожиданные фичи, которые вы ещё не оценили.
            </p>
          </div>
        </motion.div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">Принципы</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="glass-card-sm p-5 flex items-start gap-4 group hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 shrink-0 group-hover:bg-violet-500/20 transition-colors">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                  <p className="text-zinc-400 text-sm">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How we work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-8 mt-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Как мы это делаем</h2>
          <div className="text-zinc-400 leading-relaxed space-y-4">
            <p>
              Процесс разработки выглядит примерно так: придумали идею → начали писать код →
              отвлеклись на стрим → вернулись → вспомнили, что делали → продолжили → повторить.
              Классика.
            </p>
            <p>
              Но иногда, чисто по случайности, что-то доделывается. И тогда это попадает сюда.
              Все проекты — open source, так что можете сами посмотреть, что там внутри. Спойлер: там код.
            </p>
            <p>
              Инструменты: VS Code, много кофе, ещё больше вкладок в браузере и упрямство.
              Git коммиты с сообщениями типа &quot;fix stuff&quot; и &quot;idk what changed&quot; — это наш стиль.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/degrasoft"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.03]"
          >
            <GithubIcon className="w-4 h-4" />
            Посмотреть на GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
