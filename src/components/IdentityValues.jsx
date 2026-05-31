import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { about, whyPollenit } from '../data/siteContent.js';

export default function IdentityValues() {
  return (
    <>
      <section id="values" className="px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={whyPollenit.eyebrow}
            title={whyPollenit.title}
            copy={whyPollenit.copy}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyPollenit.pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  key={pillar.title}
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.07, duration: 0.45 }}
                  className="border-t-2 border-ember/80 pt-10"
                >
                  <Icon className="h-8 w-8 text-plasma" aria-hidden="true" />
                  <h3 className="mt-8 text-xl font-black text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white/64">
                    {pillar.copy}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[8px] border border-white/10 bg-[#0b3f4d] p-6 shadow-glow md:p-10 lg:p-14">
            <p className="text-sm font-black uppercase text-ember">
              {about.eyebrow}
            </p>
            <h2 className="mt-5 max-w-5xl text-[clamp(2rem,1.15rem+3.2vw,4.7rem)] font-black leading-none text-white">
              {about.title}
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/78">
              {about.copy}
            </p>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-2">
            {about.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ y: 18, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="border-t-2 border-ember/80 pt-7"
              >
                <h3 className="text-2xl font-black text-white">
                  {section.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/66">
                  {section.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
