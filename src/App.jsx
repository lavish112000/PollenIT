import { Suspense, lazy, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ContactFooter from './components/ContactFooter.jsx';
import ConversionDock from './components/ConversionDock.jsx';
import AppShell from './components/AppShell.jsx';
import Hero from './components/Hero.jsx';
import IdentityValues from './components/IdentityValues.jsx';
import NavBar from './components/NavBar.jsx';
import Resources from './components/Resources.jsx';
import ServiceDeepDives from './components/ServiceDeepDives.jsx';
import { MotionPreferenceProvider, useMotionPreference } from './hooks/useMotionPreference.jsx';

const ServicesScrollytelling = lazy(
  () => import('./components/ServicesScrollytelling.jsx'),
);

function ServicesFallback() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] p-6 text-white/70">
        <Loader2 className="h-5 w-5 animate-spin text-plasma" aria-hidden="true" />
        Loading live developer experience
      </div>
    </section>
  );
}

function AppExperience() {
  const { isReducedMotion } = useMotionPreference();

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    const timers = [120, 650, 1400].map((delay) =>
      window.setTimeout(scrollToHash, delay),
    );
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <MotionConfig reducedMotion={isReducedMotion ? 'always' : 'user'}>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-plasma focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-void"
      >
        Skip to services
      </a>
      <AppShell>
        <NavBar />
        <main>
          <Hero />
          <div id="services" className="scroll-mt-28">
            <Suspense fallback={<ServicesFallback />}>
              <ServicesScrollytelling />
            </Suspense>
          </div>
          <ServiceDeepDives />
          <Resources />
          <IdentityValues />
        </main>
        <ContactFooter />
        <ConversionDock />
      </AppShell>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <MotionPreferenceProvider>
      <AppExperience />
    </MotionPreferenceProvider>
  );
}
