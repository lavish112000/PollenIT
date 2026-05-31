import { AnimatePresence, motion } from 'framer-motion';
import { serviceStages } from '../../data/siteContent.js';
import BlueprintGraph from './BlueprintGraph.jsx';
import IDEWindow from './IDEWindow.jsx';
import BuildPipeline from './BuildPipeline.jsx';
import SandboxPreview from './SandboxPreview.jsx';

const phaseComponents = [
  BlueprintGraph,
  IDEWindow,
  BuildPipeline,
  SandboxPreview,
];

export default function ScrollSyncCanvas({
  service,
  phase,
  phaseProgress,
  isReducedMotion,
}) {
  const ActiveComponent = phaseComponents[phase] || BlueprintGraph;
  const stage = serviceStages[phase] || serviceStages[0];

  return (
    <div className="glass-panel flex h-full min-h-0 flex-col gap-3 rounded-[14px] p-4 md:p-5">
      <div className="rounded-[12px] border border-white/10 bg-white/[0.04] p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-ember/90">
              {stage.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-black text-white">
              {stage.label}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.045] p-1">
            {serviceStages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onPhaseSelect?.(index)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.18em] transition ${
                  index === phase
                    ? 'bg-plasma text-void shadow-[0_0_20px_rgba(82,211,216,0.35)]'
                    : 'border border-white/10 text-white/42 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${service.id}-${phase}`}
            initial={{ opacity: 0, y: isReducedMotion ? 0 : 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isReducedMotion ? 0 : -14, scale: 0.985 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <ActiveComponent
              service={service}
              phaseProgress={phaseProgress}
              isReducedMotion={isReducedMotion}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="rounded-[12px] border border-white/10 bg-white/[0.035] p-4">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-white/42">
          Focus
        </p>
        <p className="mt-2 text-sm leading-6 text-white/62">
          {stage.description}
        </p>
      </div>
    </div>
  );
}
