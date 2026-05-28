import { BarChart3, Bot, BrainCircuit, Code2, Compass, Gauge, LayoutDashboard, Layers3, MessagesSquare, Rocket, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

export const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Process', href: '#process' }
];

export const stats = [
  '100% Responsive',
  'Automation Ready',
  'Modern Tech Stack',
  'Performance Optimized'
];

export const services = [
  {
    icon: Code2,
    title: 'Website Development',
    description: 'Modern responsive websites for businesses and startups with fast performance and clean content systems.'
  },
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Business workflow automation using AI, integrations and reliable systems that remove repetitive work.'
  },
  {
    icon: LayoutDashboard,
    title: 'CRM & Dashboards',
    description: 'Custom client dashboards and internal management systems for operations, sales and reporting.'
  },
  {
    icon: Layers3,
    title: 'UI/UX Design',
    description: 'Modern interfaces focused on conversion, usability and premium product clarity.'
  },
  {
    icon: Rocket,
    title: 'Landing Pages',
    description: 'High-conversion landing pages optimized for paid traffic, launches and lead generation.'
  }
];

export const projects = [
  {
    title: 'Cleanova Wien',
    description: 'Premium cleaning company website with pricing calculator and booking automation.',
    tech: ['Next.js', 'Supabase', 'Automation'],
    accent: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'NovaCRM',
    description: 'Modern CRM dashboard for client, invoice and pipeline management.',
    tech: ['React', 'CRM', 'Analytics'],
    accent: 'from-blue-400 to-indigo-500'
  },
  {
    title: 'FlowAI',
    description: 'AI-powered automation platform for business workflows and routing.',
    tech: ['AI', 'Workflows', 'API'],
    accent: 'from-sky-300 to-cyan-500'
  },
  {
    title: 'UrbanDent',
    description: 'Modern dental clinic website with online booking and patient journeys.',
    tech: ['Next.js', 'Booking', 'UX'],
    accent: 'from-slate-300 to-blue-400'
  }
];

export const process = [
  { title: 'Discovery', description: 'We map the business model, audience, workflows and conversion points.', icon: Compass },
  { title: 'Strategy', description: 'We turn requirements into a clear product roadmap and technical architecture.', icon: BrainCircuit },
  { title: 'Design', description: 'We design polished interfaces, dashboards and journeys before development.', icon: Sparkles },
  { title: 'Development', description: 'We build scalable systems with clean components, APIs and automation logic.', icon: Workflow },
  { title: 'Launch', description: 'We ship, measure, optimize performance and prepare the next growth iteration.', icon: Gauge }
];

export const reasons = [
  { title: 'Scalable architecture', icon: ShieldCheck },
  { title: 'Modern UI/UX', icon: Sparkles },
  { title: 'Automation-focused systems', icon: Workflow },
  { title: 'Fast communication', icon: MessagesSquare },
  { title: 'Performance optimization', icon: Gauge },
  { title: 'Conversion-focused design', icon: BarChart3 }
];

export const testimonials = [
  {
    quote: 'TreeTech translated our messy operational process into a clean digital system our team actually wants to use. The first demo already felt production-ready.',
    name: 'Marlene Hoffmann',
    role: 'Founder, Cleanova Wien'
  },
  {
    quote: 'The combination of premium design and automation thinking was rare. We did not just get a website; we got a better client acquisition flow.',
    name: 'Daniel Weber',
    role: 'Managing Partner, Weber Advisory'
  },
  {
    quote: 'Their dashboard work gave our sales team visibility we had been missing for years. Calm process, strong execution, excellent taste.',
    name: 'Sofia Markovic',
    role: 'COO, NovaCRM Labs'
  }
];
