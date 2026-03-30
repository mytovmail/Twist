import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Archive } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep purple gradient background — matches magazine cover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1a6b] via-[#2d1b4e] to-[#1a3a5c]" />

      {/* Decorative color splashes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-[#e040fb]/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#00bcd4]/20 blur-3xl" />
        <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-[#ff6f00]/15 blur-3xl" />
      </div>

      {/* Confetti dots */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full opacity-60"
          style={{
            background: ['#e040fb','#00e5ff','#ff6d00','#69f0ae','#ff1744'][i % 5],
            top: `${10 + (i * 17) % 80}%`,
            right: `${5 + (i * 23) % 90}%`,
          }}
          animate={{ y: [0, -18, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Crown + issue badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">👑</span>
            <span className="text-white/60 text-sm font-light tracking-widest">מגזין שבועי</span>
          </div>

          {/* Big logo title */}
          <h1
            className="font-rubik font-black text-white leading-none mb-3 drop-shadow-2xl"
            style={{ fontSize: 'clamp(5rem, 18vw, 10rem)', letterSpacing: '-0.02em' }}
          >
            טוויסט
          </h1>

          {/* Teal underline bar */}
          <div className="w-24 h-1.5 bg-gradient-to-l from-[#00e5ff] to-[#e040fb] rounded-full mx-auto mb-6" />

          <p className="text-white/75 text-lg sm:text-xl font-light max-w-xl mx-auto mb-10">
            תוכן מעשיר לאישה החרדית — העצמה, צמיחה כלכלית, מתכונים, אופנה ועוד
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/sections"
            className="flex items-center gap-2 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold rounded-full px-8 py-3.5 text-base transition-all shadow-lg shadow-[#00bcd4]/40 hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            למדורים
          </Link>
          <Link
            to="/archive"
            className="flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-full px-8 py-3.5 text-base transition-all"
          >
            <Archive className="w-5 h-5" />
            ארכיון גליונות
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14"
        >
          <a
            href="https://twist1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors border border-white/20 rounded-full px-5 py-2"
          >
            📩 לקבלת המגזין מדי שבוע
          </a>
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,80 1440,30 L1440,80 L0,80 Z" fill="hsl(270 20% 97%)" />
        </svg>
      </div>
    </section>
  );
}