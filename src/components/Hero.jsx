import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { company, heroHighlights } from '../data/siteContent.js';
import HeroServiceVisualizer from './simulation/HeroServiceVisualizer.jsx';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden px-4 pb-14 pt-32 sm:px-6 lg:pt-36"
    >
      <div className="absolute inset-0 z-[-3] bg-[linear-gradient(90deg,rgba(3,7,18,0.96),rgba(3,7,18,0.75)_50%,rgba(3,7,18,0.2))]" />
      <HeroServiceVisualizer />
      <div className="absolute inset-x-0 bottom-0 z-[-1] h-36 bg-gradient-to-t from-void to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl min-w-0 gap-10 lg:grid-cols-[0.92fr_0.58fr] lg:items-end">
        <div className="min-w-0 max-w-4xl">
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-ember/35 bg-ember/10 px-4 py-2 text-sm font-bold uppercase text-ember"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {company.heroKicker}
          </motion.p>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="fluid-display text-balance max-w-5xl font-black text-white"
          >
            {company.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fluid-body mt-5 max-w-3xl break-words text-white/72"
          >
            {company.heroBody}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#services"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ember px-5 text-sm font-black text-void shadow-ember transition-colors hover:bg-[#ff7a32]"
            >
              OUR SERVICES
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-5 text-sm font-bold text-white/86 backdrop-blur-md transition-colors hover:border-plasma/45 hover:text-white hover:shadow-[0_0_15px_rgba(82,211,216,0.3)]"
            >
              {company.secondaryCta}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="grid min-w-0 gap-3 sm:grid-cols-3 lg:grid-cols-1"
          aria-label="Hero service highlights"
        >
          {heroHighlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-[8px] border border-white/12 bg-void/58 p-4 shadow-glow backdrop-blur-xl"
            >
              <p className="text-[0.68rem] font-black uppercase text-white/40">
                {highlight.eyebrow}
              </p>
              <h2 className="mt-2 text-lg font-black text-white">
                {highlight.title}
              </h2>
              <p className="mt-1 text-sm text-white/54">{highlight.copy}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
