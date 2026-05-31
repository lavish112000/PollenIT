import { motion } from 'framer-motion';
import { useMotionPreference } from '../../hooks/useMotionPreference.jsx';

export default function HeroServiceVisualizer() {
  const { isReducedMotion } = useMotionPreference();

  if (isReducedMotion) {
    return (
      <div className="absolute inset-0 z-[-2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,101,138,0.2),transparent_60%)]" />
      </div>
    );
  }

  // Define nodes representing the 5 core services
  const nodes = [
    { id: 1, x: '25%', y: '25%', label: 'Application Dev', color: '#52D3D8' }, // plasma
    { id: 2, x: '50%', y: '45%', label: 'Mobile Dev', color: '#33658A' }, // electric
    { id: 3, x: '40%', y: '15%', label: 'Modernisation', color: '#F26419' }, // ember
    { id: 4, x: '20%', y: '65%', label: 'Automation & RPA', color: '#52D3D8' },
    { id: 5, x: '55%', y: '75%', label: 'AI-Assisted', color: '#F26419' },
  ];

  // Connections between nodes
  const edges = [
    { from: 3, to: 1 },
    { from: 3, to: 2 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 4, to: 5 },
  ];

  return (
    <div className="absolute inset-0 z-[-2] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,101,138,0.1),transparent_70%)]" />

      {/* Floating abstract data points */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute h-1 w-1 rounded-full bg-plasma/40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}

      <svg className="absolute inset-0 h-full w-full opacity-60">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw connections with flowing data particles */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);

          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(248, 250, 252, 0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
              />
              <motion.circle
                r="3"
                fill="#52D3D8"
                filter="url(#glow)"
                initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 0 }}
                animate={{
                  cx: [fromNode.x, toNode.x],
                  cy: [fromNode.y, toNode.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={`node-${node.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill={node.color}
              filter="url(#glow)"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
            {/* Concentric expanding ripple */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="transparent"
              stroke={node.color}
              strokeWidth="1"
              initial={{ r: 6, opacity: 0.8 }}
              animate={{ r: 30, opacity: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.3,
              }}
            />
            <text
              x={node.x}
              y={node.y}
              dx="15"
              dy="4"
              fill="rgba(248, 250, 252, 0.7)"
              fontSize="12"
              fontFamily="monospace"
              className="hidden sm:block"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
