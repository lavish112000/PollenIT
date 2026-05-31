import { useEffect, useLayoutEffect, useRef } from 'react';
import { Cloud, Database, Hexagon, Layers3, Server, UserRound } from 'lucide-react';

const nodeIcons = [UserRound, Layers3, Server, Database, Cloud, Hexagon];
const positions = [
  { x: 13, y: 34 },
  { x: 34, y: 18 },
  { x: 55, y: 34 },
  { x: 36, y: 68 },
  { x: 72, y: 18 },
  { x: 80, y: 66 },
];

export default function BlueprintGraph({ service, phaseProgress, isReducedMotion }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressTweenRef = useRef(null);
  const floatTweenRef = useRef(null);
  const progressRef = useRef(phaseProgress);

  progressRef.current = phaseProgress;

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
        const links = gsap.utils.toArray('[data-link]');
        const nodes = gsap.utils.toArray('[data-node]');
        const footer = container.querySelector('[data-footer]');
        const ambient = container.querySelector('[data-ambient]');

        links.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0.2,
            strokeWidth: 0.22,
          });
        });

        gsap.set(nodes, {
          scale: 0.85,
          opacity: 0.35,
          boxShadow: '0 0 20px rgba(255,255,255,0.08)',
        });

        if (ambient) {
          gsap.set(ambient, { opacity: 0 });
        }

        if (footer) {
          gsap.set(footer, { opacity: 0, y: 10 });
        }

        const timeline = gsap.timeline({ paused: false, repeat: -1, repeatDelay: 2 });

        if (ambient) {
          timeline.to(
            ambient,
            { opacity: 1, duration: 0.15, ease: 'power2.out' },
            0,
          );
        }

        const linkCount = links.length;
        links.forEach((line, index) => {
          const start = 0.5 + (0.8 * index);
          timeline.to(
            line,
            {
              strokeDashoffset: 0,
              opacity: 0.9,
              strokeWidth: 0.48,
              duration: 0.4,
              ease: 'power2.out',
            },
            start,
          );
        });

        const nodeCount = nodes.length;
        nodes.forEach((node, index) => {
          const start = 0.5 + (0.8 * index);
          timeline.to(
            node,
            {
              scale: 1,
              opacity: 1,
              boxShadow: `0 0 42px ${service.accent}55`,
              duration: 0.4,
              ease: 'power2.out',
            },
            start,
          );
        });

        const lastLink = links[links.length - 1];
        if (lastLink) {
          timeline.to(
            lastLink,
            {
              strokeWidth: 0.62,
              opacity: 1,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
            },
            0.5 + (0.8 * linkCount),
          );
        }

        const lastNode = nodes[nodes.length - 1];
        if (lastNode) {
          timeline.to(
            lastNode,
            {
              boxShadow: `0 0 60px ${service.accent}88`,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
            },
            0.5 + (0.8 * nodeCount),
          );
        }

        if (nodes.length) {
          floatTweenRef.current = gsap.to(nodes, {
            y: (index) => (index % 2 ? 4 : -4),
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.12, from: 'center' },
          });
        }

        if (footer) {
          timeline.to(
            footer,
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            0.5,
          );
        }

        timelineRef.current = timeline;
      }, container);
    });

    return () => {
      cancelled = true;
      floatTweenRef.current?.kill();
      floatTweenRef.current = null;
      timelineRef.current = null;
      context?.revert();
    };
  }, [isReducedMotion, service.accent, service.id]);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[420px] overflow-hidden rounded-[8px] border border-white/10 bg-void/50 p-4 scanline"
    >
      <div
        data-ambient
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(82,211,216,0.15),transparent_34rem)]"
        style={{ opacity: isReducedMotion ? 1 : 0 }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {positions.slice(0, -1).map((start, index) => {
          const end = positions[index + 1];

          return (
            <line
              key={`${start.x}-${end.x}`}
              data-link
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={service.accent}
              strokeWidth={isReducedMotion ? 0.48 : 0.22}
              strokeDasharray="3 2"
              opacity={isReducedMotion ? 0.9 : 0.2}
            />
          );
        })}
      </svg>

      {service.blueprintNodes.map((label, index) => {
        const Icon = nodeIcons[index % nodeIcons.length];
        const position = positions[index % positions.length];
        const baseScale = isReducedMotion ? 1 : 0.88;

        return (
          <div
            key={label}
            data-node
            className="absolute grid h-20 w-20 place-items-center rounded-full border border-white/12 bg-midnight/80 text-center shadow-glow backdrop-blur-md"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) scale(${baseScale})`,
              opacity: isReducedMotion ? 1 : 0.35,
              boxShadow: isReducedMotion
                ? `0 0 42px ${service.accent}55`
                : '0 0 20px rgba(255,255,255,0.08)',
            }}
          >
            <Icon className="mb-1 h-5 w-5 text-plasma" aria-hidden="true" />
            <span className="px-2 text-[0.67rem] font-black uppercase text-white/82">
              {label}
            </span>
          </div>
        );
      })}

      <div
        data-footer
        className="absolute bottom-4 left-4 right-4 rounded-[8px] border border-white/10 bg-void/72 p-4 backdrop-blur-md"
        style={{
          opacity: isReducedMotion ? 1 : 0,
          transform: isReducedMotion ? 'none' : 'translateY(10px)',
        }}
      >
        <p className="text-xs font-black uppercase text-ember">
          Discovery / Design
        </p>
        <p className="mt-2 text-sm leading-6 text-white/72">
          {service.outcome}
        </p>
      </div>
    </div>
  );
}
