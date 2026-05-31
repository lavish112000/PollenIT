import { MessageSquareText, Send } from 'lucide-react';
import { company } from '../data/siteContent.js';

export default function ConversionDock() {
  return (
    <div className="fixed bottom-4 right-3 z-50 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:max-w-[calc(100vw-3rem)]">
      <a
        href="#contact"
        accessKey="c"
        className="inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-full border border-ember/45 bg-ember px-4 text-sm font-bold text-void shadow-ember transition hover:-translate-y-0.5 hover:bg-[#ff7a32]"
      >
        <MessageSquareText className="h-4 w-4" aria-hidden="true" />
        <span className="hidden max-w-[11rem] truncate sm:inline">
          {company.primaryCta}
        </span>
        <span className="sm:hidden">Talk</span>
      </a>
      <a
        href="#contact-form"
        accessKey="g"
        className="inline-flex h-10 max-w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-midnight/80 px-4 text-sm font-semibold text-white/85 shadow-glow backdrop-blur-md transition hover:-translate-y-0.5 hover:border-plasma/45 hover:text-white"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span className="hidden max-w-[8rem] truncate sm:inline">
          {company.secondaryCta}
        </span>
        <span className="sm:hidden">Contact</span>
      </a>
    </div>
  );
}
