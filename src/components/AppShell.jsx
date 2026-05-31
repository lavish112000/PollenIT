import { cn } from '../utils/cn.js';
import AnimatedBackground from './simulation/AnimatedBackground.jsx';

export default function AppShell({ children, className }) {
  return (
    <div className={cn('relative min-h-screen overflow-x-hidden', className)}>
      <AnimatedBackground />
      {children}
    </div>
  );
}
