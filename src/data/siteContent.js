import {
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Handshake,
  Lock,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Smartphone,
  Target,
  Workflow,
  Zap,
} from 'lucide-react';

export const company = {
  name: 'PollenIT',
  legalName: 'PollenIT Technologies',
  tagline: 'SEEDING INTELLIGENT SOLUTIONS',
  heroKicker: 'CUSTOM SOFTWARE ENGINEERING',
  heroTitle: 'Software that grows with your business.',
  heroBody:
    'PollenIT Technologies delivers custom applications, mobile experiences, and intelligent automation for businesses across India and around the world.',
  primaryCta: 'Start a Conversation',
  secondaryCta: 'Get in Touch',
  messageCta: 'MESSAGE',
};

export const navigation = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
];

export const heroHighlights = [
  {
    eyebrow: 'APP DEVELOPMENT',
    title: 'Enterprise Web Platform',
    copy: 'Custom-built, cloud-native',
  },
  {
    eyebrow: 'MOBILE DEVELOPMENT',
    title: 'iOS & Android Apps',
    copy: 'React Native / Flutter',
  },
  {
    eyebrow: 'AUTOMATION',
    title: 'RPA & Smart Workflows',
    copy: 'Automated, intelligent processes',
  },
];

export const coreServicesIntro = {
  eyebrow: 'WHAT WE DO',
  title: 'CORE SERVICES',
  copy:
    'Five focused engineering disciplines — from custom development and mobile apps to automation, modernisation, and AI-assisted solutions where they genuinely help.',
};

export const servicesOfferIntro = {
  eyebrow: 'WHAT WE OFFER',
  title: 'CORE IT SERVICES',
  copy:
    'From custom app and mobile development to automation, modernisation, and smart integrations — focused engineering services built for the long term.',
};

export const clientBanner = {
  title: 'Serving Clients Locally & Globally',
  copy:
    'PollenIT Technologies works with businesses across India and internationally — delivering quality software engineering and BPS wherever you are',
  pills: ['India', 'United States', 'International Clients'],
};

export const serviceStages = [
  {
    id: 'blueprint',
    label: 'Architecture Blueprint',
    shortLabel: 'Blueprint',
    eyebrow: 'Discovery / Design',
    description:
      'A glowing node graph maps users, workflows, data components, cloud layers, and the delivery path before build work begins.',
  },
  {
    id: 'code',
    label: 'Live Code Stream',
    shortLabel: 'Code',
    eyebrow: 'Development',
    description:
      'A syntax-highlighted IDE streams discipline-specific code to show the practical engineering rhythm behind each service.',
  },
  {
    id: 'compile',
    label: 'Interactive Compilation Visual',
    shortLabel: 'Compile',
    eyebrow: 'Build / QA',
    description:
      'Pipeline readouts, progress systems, and test checkpoints simulate a clean build moving toward release readiness.',
  },
  {
    id: 'sandbox',
    label: 'Rendered Sandbox Preview',
    shortLabel: 'Sandbox',
    eyebrow: 'Experience',
    description:
      'The simulated output resolves into a small interactive UI so clients can touch a sample of what the team builds.',
  },
];

export const services = [
  {
    id: 'application-development',
    number: '01',
    title: 'Application Development',
    footerLabel: 'App Development',
    icon: Code2,
    accent: '#F26419',
    gradient: 'from-ember/35 via-white/5 to-electric/20',
    summary:
      'End-to-end web applications tailored to your workflows — from MVPs to enterprise-grade SaaS platforms.',
    description:
      'We design, architect, and build custom web applications from the ground up — tailored precisely to your business workflows. From early-stage MVPs to full enterprise platforms, we deliver scalable, cloud-native solutions built for the long term.',
    outcome:
      'A production-grade application interface with reusable components, clean state, and business logic that can scale.',
    tags: [
      'WEB APPS',
      'SAAS PLATFORMS',
      'APIS & INTEGRATIONS',
      'CLOUD-NATIVE',
      'INTEGRATION-READY',
    ],
    cta: 'Start a Project',
    blueprintNodes: ['Users', 'Workflow', 'API', 'Data', 'Cloud', 'UI'],
    code: `import { useMemo, useState } from 'react';

export function useEnterpriseWebPlatform(seedData) {
  const [workflow, setWorkflow] = useState('operations');
  const [confidence, setConfidence] = useState(86);

  const cards = useMemo(() => {
    return seedData
      .filter((item) => item.workflow === workflow)
      .map((item) => ({
        ...item,
        platform: item.latency < 140 ? 'cloud-native' : 'review',
      }));
  }, [seedData, workflow]);

  return { cards, workflow, setWorkflow, confidence, setConfidence };
}`,
    terminal: [
      'pnpm build:application --profile enterprise',
      'checking component boundaries',
      'running accessibility smoke tests',
      'optimizing dashboard chunks',
      'application sandbox ready',
    ],
    sandbox: {
      type: 'dashboard',
      label: 'Enterprise Web Platform',
      metric: '86%',
      action: 'Switch signal',
    },
  },
  {
    id: 'mobile-development',
    number: '02',
    title: 'Mobile Development',
    footerLabel: 'Mobile Development',
    icon: Smartphone,
    accent: '#52D3D8',
    gradient: 'from-electric/35 via-white/5 to-ember/20',
    summary:
      'Native and cross-platform mobile apps for iOS and Android, built for performance and user delight.',
    description:
      'Native and cross-platform mobile applications built for performance and user experience. iOS, Android, or React Native — we ship apps that users love and that stand up to real-world usage at scale, with intelligent features that set them apart.',
    outcome:
      'A device-ready product flow with gesture-aware navigation, offline resilience, and responsive service layers.',
    tags: ['IOS', 'ANDROID', 'REACT NATIVE', 'FLUTTER', 'APP STORE LAUNCH'],
    cta: 'Discuss Your App',
    blueprintNodes: ['Device', 'Gesture', 'Sync', 'API', 'Cache', 'Release'],
    code: `import { useEffect, useState } from 'react';

export function useOfflineMobileSync(queue, client) {
  const [status, setStatus] = useState('watching');

  useEffect(() => {
    if (!navigator.onLine || queue.length === 0) return;

    const controller = new AbortController();
    setStatus('syncing');

    client.flush(queue, { signal: controller.signal })
      .then(() => setStatus('synced'))
      .catch(() => setStatus('retry'));

    return () => controller.abort();
  }, [client, queue]);

  return status;
}`,
    terminal: [
      'bundle mobile shell',
      'checking viewport variants',
      'warming offline cache',
      'measuring gesture latency',
      'mobile preview ready',
    ],
    sandbox: {
      type: 'mobile',
      label: 'iOS & Android Apps',
      metric: '42 ms',
      action: 'Slide gesture',
    },
  },
  {
    id: 'maintenance-modernisation',
    number: '03',
    title: 'Maintenance & Modernisation',
    footerLabel: 'Maintenance & Modernisation',
    icon: RefreshCw,
    accent: '#F26419',
    gradient: 'from-white/10 via-electric/20 to-ember/25',
    summary:
      'Keep existing systems healthy, upgrade legacy tech, and evolve your product with your business.',
    description:
      "Your technology shouldn't stand still. We provide ongoing engineering partnership that keeps your existing products healthy, helps you adopt newer technology at the right pace, and automates the repetitive so your team can focus on what matters.",
    outcome:
      'A calmer, better-instrumented platform with cleaner modules, safer upgrades, and reduced operational drag.',
    tags: [
      'ONGOING MAINTENANCE',
      'LEGACY STACK SUPPORT',
      'TECHNOLOGY MODERNISATION',
      'SYSTEM INTEGRATIONS',
      'FEATURE EVOLUTION',
    ],
    cta: 'Modernise Systems',
    blueprintNodes: ['Legacy', 'Audit', 'Refactor', 'Tests', 'Deploy', 'Observe'],
    code: `const modernizationPlan = createPlan({
  system: 'customer-operations',
  riskTolerance: 'measured',
});

modernizationPlan
  .mapLegacyModules()
  .addContractTests()
  .replaceBrittleAdapters()
  .shipBehindFeatureFlags()
  .observe({
    latencyBudget: 180,
    errorBudget: 0.01,
  });`,
    terminal: [
      'scanning dependency graph',
      'isolating legacy adapters',
      'generating contract tests',
      'running feature-flag migration',
      'modernisation pass complete',
    ],
    sandbox: {
      type: 'modernisation',
      label: 'Modernisation Console',
      metric: '31%',
      action: 'Compare layers',
    },
  },
  {
    id: 'automation-rpa',
    number: '04',
    title: 'Automation & RPA',
    footerLabel: 'Automation & RPA',
    icon: Bot,
    accent: '#52D3D8',
    gradient: 'from-electric/30 via-ember/15 to-white/10',
    summary:
      'Eliminate manual bottlenecks with robotic process automation and intelligent workflow pipelines.',
    description:
      'Eliminate repetitive manual processes with Robotic Process Automation. From data entry to cross-system workflows — we build bots that work.',
    outcome:
      'A repeatable automation path that routes work, validates inputs, updates systems, and reports completion with confidence.',
    tags: [
      'RPA',
      'WORKFLOW AUTOMATION',
      'CROSS-SYSTEM WORKFLOWS',
      'AUDIT TRAILS',
    ],
    cta: 'Automate Workflows',
    blueprintNodes: ['Inbox', 'Rules', 'Bot', 'ERP', 'Audit', 'Report'],
    code: `export async function runSmartWorkflow(context) {
  const items = await context.inbox.collect('pending');

  for (const item of items) {
    const result = await context.ocr.read(item.file);

    await context.rules.validate(result);
    await context.erp.createVoucher(result);
    await context.audit.write({
      itemId: item.id,
      status: 'processed',
    });
  }

  return context.report.summary();
}`,
    terminal: [
      'connecting process triggers',
      'validating rule graph',
      'launching bot worker',
      'writing audit trail',
      'automation run successful',
    ],
    sandbox: {
      type: 'automation',
      label: 'RPA & Smart Workflows',
      metric: '18 tasks',
      action: 'Run workflow',
    },
  },
  {
    id: 'ai-assisted-solutions',
    number: '05',
    title: 'AI-Assisted Solutions',
    footerLabel: 'AI-Assisted Solutions',
    icon: BrainCircuit,
    accent: '#F26419',
    gradient: 'from-ember/25 via-electric/20 to-white/10',
    summary:
      'Where it adds genuine value, we integrate AI tools and APIs to make your products smarter — no hype, just practical outcomes.',
    description:
      'Where it adds genuine value, we integrate AI tools and APIs to make your products smarter — no hype, just practical outcomes.',
    outcome:
      'An AI-assisted experience grounded in useful context, guardrails, human review, and clear business outcomes.',
    tags: ['AI TOOLS', 'APIS', 'SMART INTEGRATIONS', 'PRACTICAL OUTCOMES'],
    cta: 'Explore AI Fit',
    blueprintNodes: ['Context', 'Prompt', 'Guardrail', 'Model', 'Review', 'Action'],
    code: `export async function createAssistiveBrief({ query, records, model }) {
  const context = records
    .filter((record) => record.status === 'verified')
    .slice(0, 6);

  const response = await model.generate({
    system: 'Help the operator decide the next best action.',
    input: { query, context },
    guardrails: ['cite-records', 'avoid-guessing'],
  });

  return {
    summary: response.summary,
    confidence: response.confidence,
    nextActions: response.actions,
  };
}`,
    terminal: [
      'indexing verified context',
      'applying guardrail checks',
      'generating assistive brief',
      'routing for human review',
      'AI-assisted sandbox ready',
    ],
    sandbox: {
      type: 'ai',
      label: 'AI-Assisted Solutions',
      metric: '94%',
      action: 'Ask assistant',
    },
  },
];

export const modernisationFeatures = [
  {
    title: 'Ongoing Maintenance',
    icon: ShieldCheck,
    copy:
      'Bug resolution, security patches, performance monitoring, and proactive code health reviews — backed by clear SLAs.',
  },
  {
    title: 'Legacy Stack Support',
    icon: Workflow,
    copy:
      'We work with your existing technology — no matter how old. Stabilise, document, and extend legacy systems without disruption.',
  },
  {
    title: 'Technology Modernisation',
    icon: Rocket,
    copy:
      'Incremental or full migration to newer frameworks, cloud infrastructure, and modern architecture. Planned, phased, and low-risk.',
  },
  {
    title: 'RPA & Automation',
    icon: Bot,
    copy:
      'Eliminate repetitive manual processes with Robotic Process Automation. From data entry to cross-system workflows — we build bots that work.',
  },
  {
    title: 'System Integrations',
    icon: Workflow,
    copy:
      'Connect siloed tools and platforms through API integrations, middleware, and workflow automation pipelines.',
  },
  {
    title: 'Feature Evolution',
    icon: Code2,
    copy:
      'Continuous enhancement of live products — new features, UI improvements, and capability upgrades aligned to your roadmap.',
  },
];

export const whyPollenit = {
  eyebrow: 'WHY POLLENIT',
  title: 'BUILT DIFFERENTLY',
  copy:
    "We're not an MSP. We're a focused software engineering partner with skin in the game.",
  pillars: [
    {
      title: 'Focused Scope',
      icon: Target,
      copy:
        'App dev, mobile, automation, and engineering support — a tight, intentional service set that means deeper expertise and genuine accountability in everything we do.',
    },
    {
      title: 'Partnership Model',
      icon: Handshake,
      copy:
        'Long-term relationships over one-off engagements. We grow alongside your product and scale with your ambitions.',
    },
    {
      title: 'Agile Delivery',
      icon: Zap,
      copy:
        'Sprint-based delivery with transparent progress updates. You always know exactly where your product stands.',
    },
    {
      title: 'Quality Assurance',
      icon: Lock,
      copy:
        'Rigorous testing, code reviews, and performance benchmarks built into every delivery — not bolted on after.',
    },
  ],
};

export const about = {
  eyebrow: 'ABOUT POLLENIT',
  title: 'FOCUSED. PURPOSEFUL. ENGINEERING-FIRST.',
  copy:
    "PollenIT Technologies is a software engineering company serving businesses across India and internationally — seeding intelligent solutions that help our clients grow. We're not an MSP. We're a hands-on engineering partner.",
  sections: [
    {
      title: 'Our Mission',
      copy:
        "To be the engineering partner that growing businesses actually want — focused, reliable, and deeply invested in the outcomes we help create. We measure success by your product's performance, not by the number of tickets we close.",
    },
    {
      title: 'How We Work',
      copy:
        'Every engagement starts with a discovery phase — understanding your business context, not just your feature list. We work in agile sprints with transparent communication, regular demos, and a shared definition of done. No black boxes.',
    },
    {
      title: "What We're Not",
      copy:
        "We don't do managed IT services, helpdesk support, infrastructure management, or cybersecurity consulting. We deliberately keep our scope narrow so we can be excellent at what we do offer.",
    },
    {
      title: 'Our Team',
      copy:
        'A passionate team of engineers, mobile developers, and process specialists — each bringing sharp focus and genuine ownership to every engagement. We work closely with our clients across India and internationally, ensuring every project gets the dedication and craftsmanship it deserves.',
    },
  ],
};

export const resources = {
  eyebrow: 'KNOWLEDGE HUB',
  title: 'RESOURCES',
  copy:
    'Guides, articles, and insights from the PollenIT engineering team — practical content for technical teams and decision-makers alike.',
  items: [
    {
      type: 'GUIDE',
      title: 'How to Scope a Custom App Project',
      copy:
        'A practical framework for defining requirements, estimating timelines, and aligning stakeholders before development begins.',
      action: 'Read Guide',
    },
    {
      type: 'ARTICLE',
      title: 'React Native vs Flutter in 2025',
      copy:
        'An honest comparison of the two leading cross-platform frameworks — when to use each, and what the tradeoffs look like in practice.',
      action: 'Read Article',
    },
    {
      type: 'CHECKLIST',
      title: 'Post-Launch App Maintenance Checklist',
      copy:
        'Everything your team should be monitoring, reviewing, and updating in the 90 days after your product goes live.',
      action: 'Download',
    },
    {
      type: 'GUIDE',
      title: 'When to Outsource Finance & Accounting',
      copy:
        'A decision-making guide for startup and scale-up leaders weighing in-house vs. outsourced finance operations.',
      action: 'Read Guide',
    },
    {
      type: 'ARTICLE',
      title: 'Cloud-Native vs Traditional Architecture',
      copy:
        'Understanding the real-world implications of architecture decisions for growing SaaS products.',
      action: 'Read Article',
    },
    {
      type: 'TEMPLATE',
      title: 'SLA Template for Software Support',
      copy:
        'A ready-to-use SLA structure covering response times, escalation paths, and KPIs for external engineering support.',
      action: 'Download',
    },
  ],
};

export const contact = {
  title: "LET'S WORK TOGETHER",
  alternateTitle: "LET'S BUILD SOMETHING GREAT.",
  copy:
    "Whether you're starting from scratch or need ongoing engineering support, we'd love to learn about your project.",
  alternateCopy:
    "We work with startups and growing businesses across India and internationally. Tell us what you're building.",
  cta: 'GET IN TOUCH',
  channels: [
    'App Development',
    'Mobile Development',
    'Maintenance & Modernisation',
    'Automation & RPA',
    'AI-Assisted Solutions',
    'BPS – Finance',
  ],
};

export const footer = {
  description:
    'PollenIT Technologies — software engineering, automation, AI-assisted solutions, and BPS for businesses across India and internationally.',
  contactEmail: 'hello@pollenit.com',
  sendMessage: 'Send a Message',
  copyright: '© 2026 PollenIT Technologies. All rights reserved.',
  signoff: 'Seeding Intelligent Solutions.',
};
