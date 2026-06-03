'use client';

import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';

const HIDDEN_WORDS = ['чиназес', 'зубы корега', '179см', 'чумсок', 'флатти ❤️'];

interface RainColumn {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
}

interface WordAssembly {
  word: string;
  col: number;
  startRow: number;
  age: number;
  maxAge: number;
  fadeInAge: number;
  fadeOutStart: number;
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const fontSize = 14;
    let columns: RainColumn[] = [];

    function initColumns() {
      const numCols = Math.floor(width / fontSize);
      columns = [];
      for (let i = 0; i < numCols; i++) {
        const len = 8 + Math.floor(Math.random() * 15);
        const chars: string[] = [];
        for (let j = 0; j < len; j++) {
          chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
        columns.push({
          x: i * fontSize,
          y: Math.random() * height * 2 - height,
          speed: 0.4 + Math.random() * 0.8,
          length: len,
          chars,
        });
      }
    }

    const wordAssemblies: WordAssembly[] = [];
    let nextWordTime = Date.now() + 3000 + Math.random() * 7000;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      initColumns();
    }

    resize();
    window.addEventListener('resize', resize);

    function randomCharChange() {
      if (columns.length === 0) return;
      const col = columns[Math.floor(Math.random() * columns.length)];
      const idx = Math.floor(Math.random() * col.chars.length);
      col.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function triggerWordAssembly() {
      const word = HIDDEN_WORDS[Math.floor(Math.random() * HIDDEN_WORDS.length)];
      const numCols = Math.floor(width / fontSize);
      const maxRows = Math.floor(height / fontSize);
      const col = Math.floor(Math.random() * numCols);
      const startRow = Math.floor(Math.random() * Math.max(1, maxRows - word.length - 2));

      wordAssemblies.push({
        word,
        col,
        startRow: Math.max(0, startRow),
        age: 0,
        maxAge: 180,
        fadeInAge: 30,
        fadeOutStart: 130,
      });

      nextWordTime = Date.now() + 8000 + Math.random() * 7000;
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      if (now >= nextWordTime) {
        triggerWordAssembly();
      }

      for (let i = 0; i < 3; i++) {
        randomCharChange();
      }

      ctx.font = `${fontSize}px monospace`;

      for (const col of columns) {
        const headRow = Math.floor(col.y / fontSize);

        for (let t = 0; t < col.length; t++) {
          const row = headRow - t;
          const py = row * fontSize;

          if (py < -fontSize || py > height + fontSize) continue;

          const fade = 1 - t / col.length;
          const charIdx = ((row % col.chars.length) + col.chars.length) % col.chars.length;

          if (t === 0) {
            ctx.fillStyle = `rgba(6, 182, 212, ${0.07 * fade})`;
          } else {
            const opacity = 0.05 * fade;
            if (opacity < 0.005) continue;
            ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
          }

          ctx.fillText(col.chars[charIdx], col.x, py);
        }

        col.y += col.speed;

        if ((headRow - col.length) * fontSize > height) {
          col.y = -col.length * fontSize - Math.random() * 300;
          col.speed = 0.4 + Math.random() * 0.8;
        }
      }

      for (let w = wordAssemblies.length - 1; w >= 0; w--) {
        const wa = wordAssemblies[w];
        wa.age++;

        if (wa.age > wa.maxAge) {
          wordAssemblies.splice(w, 1);
          continue;
        }

        let opacity = 0;
        if (wa.age < wa.fadeInAge) {
          opacity = (wa.age / wa.fadeInAge) * 0.2;
        } else if (wa.age < wa.fadeOutStart) {
          opacity = 0.2;
        } else {
          opacity = 0.2 * (1 - (wa.age - wa.fadeOutStart) / (wa.maxAge - wa.fadeOutStart));
        }

        if (opacity <= 0.005) continue;

        for (let c = 0; c < wa.word.length; c++) {
          const x = wa.col * fontSize;
          const y = (wa.startRow + c) * fontSize;

          ctx.shadowColor = `rgba(139, 92, 246, ${opacity * 0.6})`;
          ctx.shadowBlur = 10;

          ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.fillText(wa.word[c], x, y);
        }

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
