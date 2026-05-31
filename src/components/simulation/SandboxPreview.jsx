import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  DatabaseZap,
  Gauge,
  MessageSquareText,
  MousePointer2,
  RotateCcw,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { motion } from 'framer-motion';

function DashboardSandbox({ service }) {
  const [mode, setMode] = useState('Observe');
  const [load, setLoad] = useState(64);

  return (
    <div className="grid h-full gap-4 md:grid-cols-[0.8fr_1fr]">
      <div
        data-sandbox-item
        className="relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-5 shadow-inner"
      >
        <div className="absolute inset-0 opacity-10 scanline pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-sm font-black text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-plasma animate-pulse" />
            {service.sandbox.label}
          </span>
          <Gauge className="h-5 w-5 text-plasma" aria-hidden="true" />
        </div>
        
        <div className="relative z-10 mt-6 flex items-end gap-2">
          <div className="text-6xl font-black text-white tracking-tight">{load}</div>
          <div className="text-xl font-bold text-plasma mb-1.5">%</div>
        </div>
        
        <div className="relative z-10 mt-3 flex items-center gap-3">
          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-plasma" 
              animate={{ width: `${load}%` }} 
              transition={{ type: 'spring', bounce: 0.2 }}
            />
          </div>
          <p className="text-[0.65rem] uppercase font-bold text-white/58 tracking-wider">Confidence</p>
        </div>

        <div className="relative z-10 mt-8 rounded-[6px] border border-white/5 bg-void/40 p-3">
          <div className="flex items-center justify-between text-xs text-white/40 mb-2 font-mono">
            <span>SYS_LOAD</span>
            <span>{Math.round(load * 0.8)}GB/s</span>
          </div>
          <div className="flex items-end h-8 gap-1 opacity-60">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-plasma to-electric rounded-t-sm"
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
        
        <label className="relative z-10 mt-6 block text-[0.65rem] font-black uppercase tracking-widest text-white/60">
          Simulation Load
          <input
            type="range"
            min="28"
            max="96"
            value={load}
            onChange={(event) => setLoad(event.target.value)}
            className="mt-3 w-full accent-plasma"
          />
        </label>
      </div>
      <div data-sandbox-item className="grid gap-3">
        {['Orders', 'Revenue', 'Risk'].map((item, index) => (
          <motion.button
            type="button"
            key={item}
            onClick={() => setMode(item)}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden flex items-center justify-between rounded-[8px] border p-4 text-left transition-colors ${
              mode === item ? 'border-plasma/45 bg-plasma/10' : 'border-white/10 bg-white/[0.045] hover:border-white/30'
            }`}
          >
            {mode === item && (
              <motion.div layoutId="active-mode" className="absolute left-0 top-0 bottom-0 w-1 bg-plasma" />
            )}
            <span className="relative z-10">
              <span className="block font-black text-white">{item}</span>
              <span className="block text-xs mt-1 text-white/52">
                {mode === item ? 'Active signal receiving' : 'Ready for inspection'}
              </span>
            </span>
            <div className="relative z-10 text-right">
              <span className="text-2xl font-black text-plasma">
                {Math.round(Number(load) - index * 9)}
              </span>
              <span className="block text-[0.6rem] font-bold uppercase text-white/30 mt-0.5">Metrics</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function MobileSandbox() {
  const [gesture, setGesture] = useState(48);

  return (
    <div className="grid h-full gap-5 md:grid-cols-[0.74fr_1fr] md:items-center">
      <div
        data-sandbox-item
        className="mx-auto h-[360px] w-[190px] rounded-[2rem] border border-white/18 bg-[#081526] p-3 shadow-glow"
      >
        <div className="h-full rounded-[1.45rem] border border-white/10 bg-gradient-to-b from-electric/30 via-void to-ember/20 p-4">
          <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-white/22" />
          <div
            className="rounded-[8px] border border-white/14 bg-white/[0.08] p-3 transition"
            style={{ transform: `translateX(${(gesture - 50) / 5}px)` }}
          >
            <Smartphone className="h-5 w-5 text-plasma" aria-hidden="true" />
            <p className="mt-8 text-xl font-black text-white">Sync flow</p>
            <p className="mt-2 text-xs leading-5 text-white/58">
              Offline queue ready. Gesture latency stays under budget.
            </p>
          </div>
        </div>
      </div>
      <div data-sandbox-item>
        <p className="text-xs font-black uppercase text-ember">
          Touch model
        </p>
        <h3 className="mt-3 text-3xl font-black text-white">Slide gesture</h3>
        <p className="mt-3 text-sm leading-6 text-white/64">
          Adjust the gesture value to move the product card and test how a
          mobile state responds across the flow.
        </p>
        <input
          type="range"
          min="0"
          max="100"
          value={gesture}
          onChange={(event) => setGesture(event.target.value)}
          className="mt-8 w-full accent-plasma"
          aria-label="Slide gesture intensity"
        />
      </div>
    </div>
  );
}

function ModernisationSandbox() {
  const [modern, setModern] = useState(false);

  return (
    <div className="grid h-full gap-4 md:grid-cols-2">
      {['Legacy Layer', 'Modern Layer'].map((label, index) => {
        const active = modern === Boolean(index);
        const isLegacy = index === 0;
        
        return (
          <button
            type="button"
            key={label}
            onClick={() => setModern(Boolean(index))}
            data-sandbox-item
            className={`group relative overflow-hidden rounded-[8px] border p-5 text-left transition-all duration-300 ${
              active
                ? 'border-plasma/55 bg-gradient-to-br from-plasma/10 to-transparent shadow-glow'
                : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
            }`}
          >
            {/* Background Details */}
            <div className="absolute right-[-10%] top-[-10%] h-32 w-32 rounded-full bg-white/[0.02] blur-xl" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4)_1px,transparent_1px)]" style={{ backgroundSize: '12px 12px' }} />

            <div className="relative z-10 flex items-center justify-between">
              <RotateCcw className={`h-5 w-5 transition-colors ${active ? 'text-plasma' : 'text-ember/70'}`} aria-hidden="true" />
              {active && <span className="flex h-2 w-2 rounded-full bg-plasma animate-pulse" />}
            </div>
            
            <h3 className="relative z-10 mt-5 text-2xl font-black tracking-tight text-white">{label}</h3>
            <p className="relative z-10 mt-3 text-[0.8rem] leading-6 text-white/60 font-medium">
              {isLegacy
                ? 'Tightly coupled modules, manual checks, unclear ownership and slow deployments.'
                : 'Typed boundaries, contract tests, staged releases, and live telemetry tracking.'}
            </p>
            
            <div className="relative z-10 mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${isLegacy ? 'bg-ember/60' : 'bg-gradient-to-r from-plasma to-electric'}`}
                initial={{ width: 0 }}
                animate={{ width: isLegacy ? '35%' : '92%' }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            {/* Faux Code/Metrics block */}
            <div className="relative z-10 mt-4 rounded-md border border-white/5 bg-black/40 p-3 font-mono text-[0.55rem] text-white/40 leading-relaxed overflow-hidden">
              {isLegacy ? (
                <>
                  <div className="text-ember/70">WARN: Dependency mismatch found in core_v2</div>
                  <div>Trying to resolve module conflicts...</div>
                  <div className="text-white/20 mt-1">Status: Fragile</div>
                </>
              ) : (
                <>
                  <div className="text-plasma/80">SUCCESS: Microservices scaled automatically</div>
                  <div>Deploying container [id: 8f4a2] to cluster</div>
                  <div className="text-white/20 mt-1">Status: Optimal, 99.9% uptime</div>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AutomationSandbox() {
  const [running, setRunning] = useState(false);
  const steps = ['Collect', 'Validate', 'Update ERP', 'Audit'];

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setTimeout(() => setRunning(false), 2400);
    return () => window.clearTimeout(timer);
  }, [running]);

  return (
    <div className="h-full rounded-[8px] border border-white/10 bg-white/[0.035] p-5 flex flex-col">
      <div data-sandbox-item className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-ember flex items-center gap-2">
            RPA Workflow Runner
            {running && <span className="flex h-2 w-2 rounded-full bg-plasma animate-pulse" />}
          </p>
          <h3 className="mt-1 text-2xl font-black text-white tracking-tight">Workflow Execution</h3>
        </div>
        <button
          type="button"
          disabled={running}
          onClick={() => setRunning(true)}
          className="inline-flex h-10 items-center gap-2 rounded-[6px] bg-ember px-4 text-sm font-black text-void transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {running ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-void border-t-transparent" />
          ) : (
            <Bot className="h-4 w-4" aria-hidden="true" />
          )}
          {running ? 'Executing...' : 'Run Bot'}
        </button>
      </div>
      <div data-sandbox-item className="mt-6 grid gap-3 grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const delay = index * 0.45;
          const isStepRunning = running;
          
          return (
            <div
              key={step}
              className="relative overflow-hidden rounded-[8px] border border-white/10 bg-void/60 p-4 shadow-inner"
            >
              {/* Progress bar background that fills up when running */}
              <motion.div
                className="absolute inset-0 bg-plasma/10 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isStepRunning ? 1 : 0 }}
                transition={{ duration: 0.4, delay: isStepRunning ? delay : 0, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <Workflow className={`h-5 w-5 transition-colors ${running ? 'text-plasma' : 'text-white/40'}`} aria-hidden="true" />
                <p className="mt-4 text-sm font-black text-white">{step}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white/50">
                    {running ? 'Processing' : 'Idle'}
                  </p>
                  {/* Status dot */}
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-plasma"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: isStepRunning ? [0.2, 1, 0.2] : 0.2 }}
                    transition={{ duration: 0.6, delay: isStepRunning ? delay : 0, repeat: isStepRunning ? Infinity : 0 }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Console output area */}
      <div data-sandbox-item className="mt-4 flex-1 rounded-[6px] border border-white/10 bg-black/50 p-3 font-mono text-xs overflow-hidden relative">
        <div className="text-white/30 mb-2 font-bold tracking-widest text-[0.6rem] uppercase">Terminal Output</div>
        <div className="space-y-1.5">
          <div className="text-white/40">{'>'} Ready to execute sequence.</div>
          {running && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-plasma">
                [00:00] Initializing RPA worker nodes...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="text-plasma">
                [00:01] Parsing 1,204 invoice documents...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-plasma">
                [00:02] Cross-referencing ERP database...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }} className="text-ember">
                [00:02] Updating records and generating audit logs.
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="text-white/60">
                {'>'} Sequence completed successfully.
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AiSandbox() {
  const [asked, setAsked] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [displayText, setDisplayText] = useState('Ask the assistant to generate a decision brief.');
  const fullResponse = 'Prioritise verified records, human review, and assisted next actions.';

  useEffect(() => {
    if (!asked) return;
    
    setThinking(true);
    setDisplayText('Analyzing context and guardrails...');
    
    const thinkTimer = setTimeout(() => {
      setThinking(false);
      setDisplayText('');
      
      let i = 0;
      const typeTimer = setInterval(() => {
        setDisplayText((prev) => prev + fullResponse.charAt(i));
        i++;
        if (i >= fullResponse.length) {
          clearInterval(typeTimer);
        }
      }, 30);
      
      return () => clearInterval(typeTimer);
    }, 1000);
    
    return () => clearTimeout(thinkTimer);
  }, [asked]);

  return (
    <div className="grid h-full gap-4 md:grid-cols-[0.86fr_1fr]">
      <div
        data-sandbox-item
        className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5"
      >
        <BrainCircuit className="h-8 w-8 text-plasma" aria-hidden="true" />
        <h3 className="mt-5 text-3xl font-black text-white">
          AI Decision Assistant
        </h3>
        <p className="mt-4 text-sm leading-6 text-white/62">
          The assistant uses verified context, guardrails, and review steps to
          keep the response useful and accountable.
        </p>
        <button
          type="button"
          disabled={asked}
          onClick={() => setAsked(true)}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-plasma px-4 text-sm font-black text-void disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {thinking ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-void border-t-transparent" />
          ) : (
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          )}
          {asked ? 'Processing...' : 'Ask assistant'}
        </button>
      </div>
      <div
        data-sandbox-item
        className="rounded-[8px] border border-white/10 bg-[#06101f] p-5 relative"
      >
        <p className="text-xs font-black uppercase text-ember">
          Assistive brief
        </p>
        <p className="mt-5 text-xl font-black leading-8 text-white min-h-[64px]">
          {displayText}
          {asked && !thinking && displayText.length < fullResponse.length && (
            <span className="inline-block w-2 h-5 bg-plasma ml-1 animate-pulse" />
          )}
        </p>
        <div className="mt-8 grid gap-3">
          {['Cite records', 'Avoid guessing', 'Route to review'].map((item, i) => (
            <motion.div 
              key={item} 
              initial={{ opacity: 0.3 }}
              animate={{ opacity: asked && !thinking && displayText.length > (i * 15) ? 1 : 0.3 }}
              className="flex items-center gap-3 text-white/68"
            >
              <Check className="h-4 w-4 text-plasma" aria-hidden="true" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SandboxPreview({ service, phaseProgress, isReducedMotion }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressTweenRef = useRef(null);
  const progressRef = useRef(phaseProgress);

  progressRef.current = phaseProgress;

  const Sandbox =
    service.sandbox.type === 'dashboard'
      ? DashboardSandbox
      : service.sandbox.type === 'mobile'
        ? MobileSandbox
        : service.sandbox.type === 'modernisation'
          ? ModernisationSandbox
          : service.sandbox.type === 'automation'
            ? AutomationSandbox
            : AiSandbox;

  useLayoutEffect(() => {
    if (isReducedMotion) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    let context;
    let cancelled = false;

    Promise.resolve(import('gsap')).then(({ gsap }) => {
      if (cancelled) return;

      context = gsap.context(() => {
        const header = container.querySelector('[data-sandbox-header]');
        const body = container.querySelector('[data-sandbox-body]');
        const badges = Array.from(
          container.querySelectorAll('[data-sandbox-badge]'),
        );
        const items = Array.from(
          container.querySelectorAll('[data-sandbox-item]'),
        );

        if (header) {
          gsap.set(header, { opacity: 0, y: 10 });
        }
        if (body) {
          gsap.set(body, { opacity: 0, y: 14 });
        }
        if (badges.length) {
          gsap.set(badges, { opacity: 0, y: 8 });
        }
        if (items.length) {
          gsap.set(items, { opacity: 0, y: 12 });
        }

        const timeline = gsap.timeline({ paused: true });

        if (header) {
          timeline.to(
            header,
            { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' },
            0,
          );
        }

        if (badges.length) {
          timeline.to(
            badges,
            {
              opacity: 1,
              y: 0,
              duration: 0.18,
              ease: 'power2.out',
              stagger: 0.06,
            },
            0.05,
          );
        }

        if (body) {
          timeline.to(
            body,
            { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' },
            0.12,
          );
        }

        if (items.length) {
          timeline.to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.24,
              ease: 'power2.out',
              stagger: { each: 0.06, from: 'start' },
            },
            0.18,
          );
        }

        timelineRef.current = timeline;
        timeline.progress(progressRef.current);
      }, container);
    });

    return () => {
      cancelled = true;
      progressTweenRef.current?.kill();
      progressTweenRef.current = null;
      timelineRef.current = null;
      context?.revert();
    };
  }, [isReducedMotion, service.id, service.sandbox.type]);

  useEffect(() => {
    if (isReducedMotion) {
      timelineRef.current?.progress(1);
      return;
    }

    const timeline = timelineRef.current;
    if (!timeline) return;

    progressTweenRef.current?.kill();
    progressTweenRef.current = timeline.tweenTo(phaseProgress, {
      duration: 0.12,
      ease: 'power2.out',
    });
  }, [isReducedMotion, phaseProgress]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[420px] overflow-hidden rounded-[8px] border border-white/10 bg-void/68 p-4 shadow-glow"
    >
      <div
        data-sandbox-header
        className="mb-4 flex flex-wrap items-center justify-between gap-3"
      >
        <span
          data-sandbox-badge
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-black uppercase text-white/64"
        >
          <MousePointer2 className="h-4 w-4 text-plasma" aria-hidden="true" />
          Interactive sandbox
        </span>
        <span
          data-sandbox-badge
          className="inline-flex items-center gap-2 text-sm font-bold text-white/68"
        >
          <Activity className="h-4 w-4 text-ember" aria-hidden="true" />
          {service.sandbox.metric}
          <ArrowRight className="h-4 w-4 text-white/30" aria-hidden="true" />
          {service.sandbox.action}
        </span>
      </div>
      <div data-sandbox-body className="h-[calc(100%-3.5rem)]">
        <Sandbox service={service} />
      </div>
    </div>
  );
}
