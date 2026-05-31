'use client';

import { motion } from 'framer-motion';

export default function GradientBlobs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Violet blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, transparent 70%)',
          left: '10%',
          top: '10%',
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Cyan blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%)',
          right: '5%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small violet accent */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.9) 0%, transparent 70%)',
          right: '30%',
          top: '50%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
