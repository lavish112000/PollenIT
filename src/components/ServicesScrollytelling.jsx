import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, ChevronRight, Cpu, Layers3 } from 'lucide-react';
import GlassPanel from './GlassPanel.jsx';
import SectionHeader from './SectionHeader.jsx';
import ScrollSyncCanvas from './simulation/ScrollSyncCanvas.jsx';
import {
  clientBanner,
  coreServicesIntro,
  serviceStages,
  services,
} from '../data/siteContent.js';
import { cn } from '../utils/cn.js';
import { useMotionPreference } from '../hooks/useMotionPreference.jsx';

function getScrollState(progress) {
  const safeProgress = Math.min(0.999, Math.max(0, progress));
  const raw = safeProgress * services.length;
  const activeIndex = Math.min(services.length - 1, Math.floor(raw));
  const serviceProgress = raw - activeIndex;
  const phaseRaw = serviceProgress * serviceStages.length;
  const phase = Math.min(serviceStages.length - 1, Math.floor(phaseRaw));
  const phaseProgress = Math.min(1, phaseRaw - phase);

  return { activeIndex, phase, phaseProgress };
}

function ServiceRail({ activeIndex, onSelect, compact = false }) {
  const activeService = services[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <GlassPanel
      className={cn(
        'flex flex-col gap-6 p-5 md:p-6',
        compact ? '' : 'h-full',
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-start justify-between gap-4',
          compact ? '' : 'border-b border-white/10 pb-5',
        )}
      >
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-ember">
            {coreServicesIntro.title}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-ember">
              {activeService.number}
            </span>
            <h3 className="text-3xl font-black text-white">
              {activeService.title}
            </h3>
          </div>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-plasma">
          <ActiveIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <p className="text-[0.98rem] leading-7 text-white/72 line-clamp-3">
        {activeService.summary}
      </p>
      <p className="text-sm leading-6 text-white/58 line-clamp-2">
        {activeService.description}
      </p>

      <div className="mt-4 grid gap-2 overflow-y-auto pr-2 custom-scrollbar min-h-0 pb-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isActive = index === activeIndex;

          return (
            <button
              type="button"
              key={service.id}
              onClick={() => onSelect(index)}
              className={cn(
                'group relative flex min-h-[64px] items-stretch gap-3 rounded-[10px] border p-2.5 pl-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plasma/60 shrink-0',
                isActive
                  ? 'border-plasma/55 bg-plasma/10 opacity-100 shadow-glow'
                  : 'border-white/8 bg-white/[0.035] opacity-50 hover:opacity-88',
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-0 top-3 bottom-3 w-1 rounded-full transition',
                  isActive
                    ? 'bg-plasma'
                    : 'bg-white/12 group-hover:bg-white/24',
                )}
              />
              <span
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-full border',
                  isActive
                    ? 'border-plasma/50 bg-plasma/12 text-plasma'
                    : 'border-white/10 bg-white/[0.04] text-white/44',
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-white">
                  <span className="mr-2 text-ember">{service.number}</span>
                  {service.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-white/54">
                  {service.summary}
                </span>
              </span>
              <ChevronRight
                className={cn(
                  'h-4 w-4 shrink-0 transition',
                  isActive
                    ? 'translate-x-0 text-plasma'
                    : '-translate-x-1 text-white/22 group-hover:translate-x-0',
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </GlassPanel>
  );
}

function ServiceSignals({ className }) {
  const signals = [
    { label: 'Architecture', value: 'Node graph', icon: Layers3 },
    { label: 'Development', value: 'IDE stream', icon: Cpu },
    { label: 'Experience', value: 'Sandbox UI', icon: Boxes },
  ];

  return (
    <div className={cn('grid gap-3 md:grid-cols-3', className)}>
      {signals.map((signal) => {
        const Icon = signal.icon;
        return (
          <div
            key={signal.label}
            className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4"
          >
            <Icon className="h-5 w-5 text-plasma" aria-hidden="true" />
            <p className="mt-5 text-lg font-black text-white">{signal.value}</p>
            <p className="mt-1 text-xs font-black uppercase text-white/42">
              {signal.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function MobileServices({ state, setState }) {
  const service = services[state.activeIndex];

  return (
    <div className="grid gap-5 lg:hidden">
      <ServiceRail
        activeIndex={state.activeIndex}
        compact
        onSelect={(index) => setState({ activeIndex: index, phase: 0, phaseProgress: 1 })}
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {serviceStages.map((stage, index) => (
          <button
            key={stage.id}
            type="button"
            onClick={() =>
              setState({
                activeIndex: state.activeIndex,
                phase: index,
                phaseProgress: 1,
              })
            }
            className={cn(
              'rounded-[8px] border px-3 py-3 text-xs font-black uppercase',
              index === state.phase
                ? 'border-plasma/60 bg-plasma text-void'
                : 'border-white/10 bg-white/[0.04] text-white/58',
            )}
          >
            {stage.shortLabel}
          </button>
        ))}
      </div>
      <ScrollSyncCanvas
        service={service}
        phase={state.phase}
        phaseProgress={1}
        isReducedMotion
        onPhaseSelect={(index) => setState({ activeIndex: state.activeIndex, phase: index, phaseProgress: 1 })}
      />
    </div>
  );
}

export default function ServicesScrollytelling() {
  const desktopSectionRef = useRef(null);
  const stickyRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const latestStateRef = useRef({ activeIndex: 0, phase: 0, progressKey: 0 });
  const { isReducedMotion } = useMotionPreference();
  const [state, setState] = useState({
    activeIndex: 0,
    phase: 0,
    phaseProgress: 0.2,
  });

  useEffect(() => {
    const section = desktopSectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky || isReducedMotion) {
      return undefined;
    }

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) {
      return undefined;
    }

    let context;
    let cancelled = false;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollModule]) => {
        if (cancelled) return;

        const { gsap } = gsapModule;
        const { ScrollTrigger } = scrollModule;
        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          const trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top+=96',
            end: 'bottom bottom',
            scrub: 0.65,
            pin: sticky,
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const nextState = getScrollState(self.progress);
              const progressKey = Math.round(nextState.phaseProgress * 100);
              const latest = latestStateRef.current;

              if (
                latest.activeIndex !== nextState.activeIndex ||
                latest.phase !== nextState.phase ||
                latest.progressKey !== progressKey
              ) {
                latestStateRef.current = {
                  activeIndex: nextState.activeIndex,
                  phase: nextState.phase,
                  progressKey,
                };
                setState(nextState);
              }
            },
          });
          scrollTriggerRef.current = trigger;
        }, section);
      },
    );

    return () => {
      cancelled = true;
      scrollTriggerRef.current = null;
      context?.revert();
    };
  }, [isReducedMotion]);

  const scrollToPhase = (activeIndex, phaseIndex) => {
    const trigger = scrollTriggerRef.current;
    if (trigger) {
      // Calculate target progress (adding 0.1 to phaseProgress so it lands slightly inside the phase)
      const raw = activeIndex + (phaseIndex / serviceStages.length) + (0.1 / serviceStages.length);
      const progress = Math.min(0.999, Math.max(0, raw / services.length));
      
      const target = trigger.start + (trigger.end - trigger.start) * progress;
      window.scrollTo({
        top: target,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      });
      return;
    }

    const section = desktopSectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const maxScroll = Math.max(0, section.offsetHeight - window.innerHeight);

    if (maxScroll === 0) {
      section.scrollIntoView({
        behavior: isReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      return;
    }

    const raw = activeIndex + (phaseIndex / serviceStages.length) + (0.1 / serviceStages.length);
    const progress = Math.min(0.999, Math.max(0, raw / services.length));
    const target = sectionTop + maxScroll * progress;

    window.scrollTo({
      top: target,
      behavior: isReducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleSelect = (index) => {
    setState({ activeIndex: index, phase: 0, phaseProgress: 0.2 });

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    scrollToPhase(index, 0);
  };

  const handlePhaseSelect = (phaseIndex) => {
    setState((prev) => ({ ...prev, phase: phaseIndex, phaseProgress: 0.2 }));

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    scrollToPhase(state.activeIndex, phaseIndex);
  };

  const service = services[state.activeIndex];

  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeader
            eyebrow={coreServicesIntro.eyebrow}
            title={coreServicesIntro.title}
            copy={coreServicesIntro.copy}
          />
          <ServiceSignals className="lg:pt-6" />
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl rounded-[8px] border border-ember/35 bg-ember p-5 text-void shadow-ember md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <h3 className="text-xl font-black text-white">{clientBanner.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/90">
            {clientBanner.copy}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
          {clientBanner.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/32 bg-white/10 px-3 py-2 text-xs font-black uppercase text-white"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        <MobileServices state={state} setState={setState} />
      </div>

      <div className="mx-auto mt-14 hidden max-w-7xl lg:block">
        <div
          ref={desktopSectionRef}
          className="relative min-h-[640svh]"
          aria-label="Scroll-bound service simulation"
        >
          <div
            aria-hidden="true"
            className="section-shell pointer-events-none absolute inset-0"
          />
          <div
            ref={stickyRef}
            className="z-10 grid h-[calc(100svh-6rem)] max-h-[900px] grid-cols-[45fr_55fr] gap-5 p-4 md:p-5"
          >
            <div className="min-w-0">
              <ServiceRail activeIndex={state.activeIndex} onSelect={handleSelect} />
            </div>
            <motion.div
              key={service.id}
              initial={{ opacity: 0.72 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="min-h-0 min-w-0"
            >
              <ScrollSyncCanvas
                service={service}
                phase={state.phase}
                phaseProgress={state.phaseProgress}
                isReducedMotion={isReducedMotion}
                onPhaseSelect={handlePhaseSelect}
              />
            </motion.div>
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {services.map((item, index) => (
              <span
                key={item.id}
                id={`service-step-${index}`}
                className="absolute block h-[110svh] w-px"
                style={{ top: `${(index / services.length) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
