import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, TerminalSquare } from 'lucide-react';

const checkpoints = ['Lint', 'Test', 'Bundle', 'Audit'];

export default function BuildPipeline({ service, phaseProgress, isReducedMotion }) {
  const [progressValue, setProgressValue] = useState(
    isReducedMotion
      ? 100
      : Math.min(100, Math.max(12, Math.round(phaseProgress * 112))),
  );
  const [visibleLines, setVisibleLines] = useState(
    Math.max(1, Math.ceil((progressValue / 100) * service.terminal.length)),
  );
  const timelineRef = useRef(null);
  const progressTweenRef = useRef(null);
  const progressRef = useRef(phaseProgress);
  const stateRef = useRef({ progressValue, visibleLines });

  progressRef.current = phaseProgress;

  const updateProgress = (value) => {
    const nextProgress = isReducedMotion
      ? 100
      : Math.min(100, Math.max(12, Math.round(value * 112)));
    const nextVisible = Math.max(
      1,
      Math.ceil((nextProgress / 100) * service.terminal.length),
    );
    const current = stateRef.current;

    if (current.progressValue !== nextProgress) {
      current.progressValue = nextProgress;
      setProgressValue(nextProgress);
    }
    if (current.visibleLines !== nextVisible) {
      current.visibleLines = nextVisible;
      setVisibleLines(nextVisible);
    }
  };

  useLayoutEffect(() => {
    if (isReducedMotion) {
      return undefined;
    }

    let context;
    let cancelled = false;

    Promise.resolve(import('gsap')).then(({ gsap }) => {
      if (cancelled) return;

      context = gsap.context(() => {
        const progress = { value: 0 };
        const timeline = gsap.timeline({ paused: true });

        timeline.to(
          progress,
          {
            value: 1,
            duration: 1,
            ease: 'none',
            onUpdate: () => updateProgress(progress.value),
          },
          0,
        );

        timelineRef.current = timeline;
        timeline.progress(progressRef.current);
      });
    });

    return () => {
      cancelled = true;
      progressTweenRef.current?.kill();
      progressTweenRef.current = null;
      timelineRef.current = null;
      context?.revert();
    };
  }, [isReducedMotion, service.terminal.length]);

  useEffect(() => {
    if (isReducedMotion) {
      updateProgress(1);
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

  const progress = isReducedMotion ? 100 : progressValue;
  const activeCheckpointIndex = Math.max(
    -1,
    Math.min(checkpoints.length - 1, Math.floor(progress / 22) - 1),
  );
  const terminalLines = service.terminal.slice(
    0,
    isReducedMotion ? service.terminal.length : visibleLines,
  );

  return (
    <div className="grid h-full min-h-[420px] gap-4 overflow-hidden rounded-[8px] border border-white/10 bg-void/68 p-4 shadow-glow md:grid-cols-[0.8fr_1fr]">
      <div className="flex flex-col justify-between rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
        <div>
          <p className="text-xs font-black uppercase text-ember">
            Build / QA
          </p>
          <h3 className="mt-3 text-2xl font-black text-white">
            Simulated pipeline
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/62">
            Compile progress tracks the service state and unlocks release
            checks as the interaction moves toward a sandbox preview.
          </p>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-end justify-between">
            <span className="text-sm font-bold text-white/72">Pipeline</span>
            <span className="text-3xl font-black text-plasma">
              {progress}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="progress-stripe h-full rounded-full bg-gradient-to-r from-ember via-plasma to-electric"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          {checkpoints.map((checkpoint, index) => {
            const done = progress >= (index + 1) * 22;
            const pulse = index === activeCheckpointIndex && progress < 100;

            return (
              <div
                key={checkpoint}
                className={`rounded-[8px] border bg-white/[0.045] p-4 transition ${
                  done
                    ? 'border-plasma/55 opacity-100'
                    : 'border-white/10 opacity-45'
                } ${pulse ? 'checkpoint-pulse' : ''}`}
                style={{ transform: done ? 'translateY(0)' : 'translateY(4px)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black text-white">
                    {checkpoint}
                  </span>
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-plasma" aria-hidden="true" />
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin text-white/42" aria-hidden="true" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="min-h-0 rounded-[8px] border border-white/10 bg-[#06101f] p-4 font-mono text-xs leading-6 shadow-inner">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="flex items-center gap-2 font-black uppercase text-white/50">
              <TerminalSquare className="h-4 w-4 text-plasma" aria-hidden="true" />
              Terminal
            </span>
            <span className="flex items-center gap-2 text-plasma">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              secure
            </span>
          </div>
          <div aria-live="polite">
            {terminalLines.map((line, index) => (
              <div
                key={line}
                className="text-white/74 transition"
                style={{
                  opacity: 1,
                  transform: 'translateX(0)',
                  transitionDelay: `${index * 35}ms`,
                }}
              >
                <span className="text-ember">$</span> {line}
                {index === terminalLines.length - 1 && progress < 100 ? (
                  <>
                    <span className="text-plasma"> ...</span>
                    <span className="terminal-caret" aria-hidden="true" />
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
