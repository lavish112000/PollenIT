import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { resources } from '../data/siteContent.js';

export default function Resources() {
  return (
    <section id="resources" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={resources.eyebrow}
          title={resources.title}
          copy={resources.copy}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resources.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.05, duration: 0.42 }}
              className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm font-black uppercase text-ember">
                {item.type}
              </p>
              <h3 className="mt-5 text-2xl font-black leading-tight text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-white/64">
                {item.copy}
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-ember"
              >
                {item.action}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
