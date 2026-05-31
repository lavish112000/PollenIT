import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { company, navigation } from '../data/siteContent.js';
import MotionToggle from './MotionToggle.jsx';
import { cn } from '../utils/cn.js';
import LogoMark from './LogoMark.jsx';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-void/62 px-3 py-2 shadow-glow backdrop-blur-xl"
      >
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3 rounded-full pr-3"
          aria-label="PollenIT Technologies home"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-white/10 bg-white/[0.04] shadow-ember">
            <LogoMark />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black uppercase text-white">
              {company.name}
            </span>
            <span className="block truncate text-xs text-white/56">
              {company.tagline}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/68 transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <MotionToggle compact />
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: '#52D3D8', color: '#030712' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-void transition-colors"
          >
            {company.messageCta}
          </motion.a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white lg:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        className={cn(
          'mx-auto mt-2 grid max-w-7xl overflow-hidden rounded-[8px] border border-white/12 bg-void/86 shadow-glow backdrop-blur-xl transition-all lg:hidden',
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 border-transparent opacity-0',
        )}
      >
        <div className="grid gap-1 p-3">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-[8px] px-3 py-3 text-sm font-semibold text-white/78 hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <MotionToggle />
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-void"
            >
              {company.messageCta}
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
