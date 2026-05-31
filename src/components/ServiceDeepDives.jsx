import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import {
  modernisationFeatures,
  services,
  servicesOfferIntro,
} from '../data/siteContent.js';

export default function ServiceDeepDives() {
  const featuredServices = services.slice(0, 2);
  const maintenance = services.find(
    (service) => service.id === 'maintenance-modernisation',
  );

  return (
    <section className="px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={servicesOfferIntro.eyebrow}
          title={servicesOfferIntro.title}
          copy={servicesOfferIntro.copy}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featuredServices.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5, boxShadow: '0 0 25px rgba(82,211,216,0.2)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 shadow-glow"
            >
              <div className="h-1 w-12 rounded-full bg-ember" />
              <h3 className="mt-8 text-3xl font-black leading-tight text-white">
                {service.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-white/66">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[6px] border border-plasma/18 bg-plasma/10 px-2.5 py-1.5 text-[0.68rem] font-black uppercase text-plasma"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-ember"
              >
                {service.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>

        {maintenance && (
          <div className="mt-6 rounded-[8px] border border-white/10 bg-white/[0.045] p-6 shadow-glow">
            <div className="h-1 w-12 rounded-full bg-ember" />
            <h3 className="mt-7 text-2xl font-black text-white">
              Maintenance, Support & Modernisation
            </h3>
            <p className="mt-3 max-w-5xl text-base leading-7 text-white/66">
              {maintenance.description}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modernisationFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={feature.title}
                    initial={{ y: 14, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: index * 0.04, duration: 0.38 }}
                    className="rounded-[8px] border border-white/10 bg-void/56 p-5 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-plasma" aria-hidden="true" />
                    <h4 className="mt-5 text-sm font-black text-white">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      {feature.copy}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
