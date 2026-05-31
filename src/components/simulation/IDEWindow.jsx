import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, Code2, Copy, Play } from 'lucide-react';

function classifyToken(token) {
  if (/^(import|export|function|const|let|return|await|async|for|from|if|new|then|catch)$/.test(token)) {
    return 'code-token-keyword';
  }
  if (/^(['"`]).*\1$/.test(token)) {
    return 'code-token-string';
  }
  if (/^\d+(\.\d+)?$/.test(token)) {
    return 'code-token-number';
  }
  if (/^[A-Za-z_$][\w$]*(?=\()/.test(token)) {
    return 'code-token-function';
  }

  return '';
}

function HighlightedLine({ line }) {
  const segments = line
    .split(/(\bimport\b|\bexport\b|\bfunction\b|\bconst\b|\blet\b|\breturn\b|\bawait\b|\basync\b|\bfor\b|\bfrom\b|\bif\b|\bnew\b|\bthen\b|\bcatch\b|'[^']*'|"[^"]*"|`[^`]*`|\b\d+(?:\.\d+)?\b)/g)
    .filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`} className={classifyToken(segment)}>
          {segment}
        </span>
      ))}
    </>
  );
}

export default function IDEWindow({ service, phaseProgress, isReducedMotion }) {
  const [displayCount, setDisplayCount] = useState(
    isReducedMotion ? service.code.length : 0,
  );
  const containerRef = useRef(null);
  const codeScrollRef = useRef(null);
  const timelineRef = useRef(null);
  const progressTweenRef = useRef(null);
  const displayRef = useRef(displayCount);
  const progressRef = useRef(phaseProgress);

  displayRef.current = displayCount;
  progressRef.current = phaseProgress;

  const updateDisplayCount = (next) => {
    const clamped = Math.max(0, Math.min(service.code.length, next));
    if (displayRef.current === clamped) return;
    displayRef.current = clamped;
    setDisplayCount(clamped);
  };

  useLayoutEffect(() => {
    if (isReducedMotion) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    updateDisplayCount(0);

    let context;
    let cancelled = false;

    Promise.resolve(import('gsap')).then(({ gsap }) => {
      if (cancelled) return;

      context = gsap.context(() => {
        const typing = { value: 0 };
        const codeLength = service.code.length;
        const header = container.querySelector('[data-ide-header]');
        const runButton = container.querySelector('[data-ide-run]');
        const copyButton = container.querySelector('[data-ide-copy]');

        if (header) {
          gsap.set(header, { opacity: 0.92, y: 0 });
        }

        if (runButton) {
          gsap.set(runButton, { boxShadow: '0 0 0 rgba(242,100,25,0)' });
        }

        if (copyButton) {
          gsap.set(copyButton, { boxShadow: '0 0 0 rgba(82,211,216,0)' });
        }

        const timeline = gsap.timeline({ paused: true });

        if (header) {
          timeline.to(
            header,
            { opacity: 1, duration: 0.18, ease: 'power2.out' },
            0,
          );
        }

        timeline.to(
          typing,
          {
            value: 1,
            duration: 1,
            ease: 'none',
            onUpdate: () => {
              updateDisplayCount(Math.round(typing.value * codeLength));
            },
          },
          0.08,
        );

        if (copyButton) {
          timeline.to(
            copyButton,
            {
              boxShadow: '0 0 14px rgba(82,211,216,0.45)',
              duration: 0.16,
              yoyo: true,
              repeat: 1,
            },
            0.78,
          );
        }

        if (runButton) {
          timeline.to(
            runButton,
            {
              boxShadow: '0 0 18px rgba(242,100,25,0.55)',
              duration: 0.18,
              yoyo: true,
              repeat: 1,
            },
            0.86,
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
  }, [isReducedMotion, service.code, service.id]);

  useEffect(() => {
    if (isReducedMotion) {
      updateDisplayCount(service.code.length);
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
  }, [isReducedMotion, phaseProgress, service.code.length]);

  useEffect(() => {
    const pre = codeScrollRef.current;
    if (!pre) return;

    const maxScroll = pre.scrollHeight - pre.clientHeight;
    if (maxScroll <= 0) return;

    const ratio = service.code.length
      ? displayCount / service.code.length
      : 0;
    pre.scrollTop = ratio * maxScroll;
  }, [displayCount, service.code.length]);

  const visibleCode = useMemo(
    () => service.code.slice(0, displayCount),
    [displayCount, service.code],
  );

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[8px] border border-white/10 bg-[#06101f]/92 shadow-glow"
    >
      <div
        data-ide-header
        className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.04] px-4"
      >
        <div className="flex items-center gap-2">
          <Circle className="h-3 w-3 fill-ember text-ember" aria-hidden="true" />
          <Circle className="h-3 w-3 fill-[#ffd166] text-[#ffd166]" aria-hidden="true" />
          <Circle className="h-3 w-3 fill-plasma text-plasma" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-2 text-xs font-black uppercase text-white/52">
          <Code2 className="h-4 w-4 text-plasma" aria-hidden="true" />
          {service.title}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ide-copy
            className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-white/70 hover:text-white"
            aria-label="Copy code sample"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            data-ide-run
            className="grid h-8 w-8 place-items-center rounded-full bg-ember text-void"
            aria-label="Run code sample"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[3.2rem_1fr] overflow-hidden font-mono text-[0.78rem] leading-6">
        <div className="select-none border-r border-white/8 bg-white/[0.025] py-4 text-right text-white/26">
          {visibleCode.split('\n').map((_, index) => (
            <div key={index} className="px-3">
              {index + 1}
            </div>
          ))}
        </div>
        <pre
          ref={codeScrollRef}
          className="m-0 overflow-auto whitespace-pre-wrap p-4 text-white/82"
        >
          {visibleCode.split('\n').map((line, index) => (
            <code key={`${service.id}-${index}`} className="block min-h-6">
              <HighlightedLine line={line} />
              {index === visibleCode.split('\n').length - 1 &&
                displayCount < service.code.length && (
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-plasma"
                  />
                )}
            </code>
          ))}
        </pre>
      </div>
    </div>
  );
}
