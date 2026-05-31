import { motion } from 'framer-motion';
import { cn } from '../utils/cn.js';
import { useMouseGlow } from '../hooks/useMouseGlow.js';

export default function GlassPanel({
  as = 'div',
  className,
  children,
  interactive = false,
  ...props
}) {
  const Component = motion[as] || motion.div;
  const handleGlow = useMouseGlow();

  return (
    <Component
      className={cn('glass-panel rounded-[8px]', className)}
      onPointerMove={handleGlow}
      whileHover={interactive ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      {...props}
    >
      {children}
    </Component>
  );
}
