import { ArrowUpRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ButtonLink } from '@/components/ButtonLink';
import { ContactForm } from '@/components/ContactForm';
import { DashboardMockup } from '@/components/DashboardMockup';
import { SectionHeader } from '@/components/SectionHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { process, projects, reasons, services, stats, testimonials } from '@/data/site';

export default function Home() {
  return (
    <main id="top" className="overflow-hidden bg-ink">
      <SiteHeader />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <CaseStudy />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen px-5 pb-20 pt-28 sm:px-8 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.18),transparent_34%),linear-gradient(180deg,#05070b_0%,#0b0f17_100%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">Building AI-Powered Digital Experiences</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">We help businesses grow with modern websites, automation systems, AI integrations, and scalable digital products.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projects">View Projects</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">Book a Call</ButtonLink>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-4">
            {stats.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">{item}</div>)}
          </div>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <AnimatedSection className="border-y border-white/10 bg-white/[0.03] px-5 py-10 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => <div key={item} className="glass rounded-3xl p-6"><p className="text-3xl font-semibold text-white">{index === 0 ? '100%' : index === 1 ? '24/7' : index === 2 ? 'Next' : '95+'}</p><p className="mt-2 text-sm text-slate-400">{item}</p></div>)}
      </div>
    </AnimatedSection>
  );
}

function Services() {
  return (
    <AnimatedSection className="px-5 py-24 sm:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Systems, interfaces and automation built as one product." description="TreeTech combines premium design taste with the engineering discipline needed for business-critical digital workflows." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;
            return <article key={service.title} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"><Icon className="h-7 w-7 text-cyan-200" /><h3 className="mt-8 text-xl font-semibold text-white">{service.title}</h3><p className="mt-4 text-sm leading-7 text-slate-400">{service.description}</p></article>;
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

function Portfolio() {
  return (
    <AnimatedSection className="light-panel px-5 py-24 sm:px-8" id="projects">
      <div className="mx-auto max-w-7xl">
        <SectionHeader light eyebrow="Portfolio" title="Polished digital products for ambitious service businesses." description="Each project is designed to look premium, load fast and connect directly to the business workflow behind it." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => <article key={project.title} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-panel"><div className="relative h-56 bg-slate-950 p-5"><div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} /><MockPreview index={index} /><div className="absolute bottom-5 left-5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">{project.tech.join(' / ')}</div></div><div className="p-6"><h3 className="text-2xl font-semibold text-slate-950">{project.title}</h3><p className="mt-3 text-slate-600">{project.description}</p><button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">View Case Study <ArrowUpRight className="h-4 w-4" /></button></div></article>)}
        </div>
      </div>
    </AnimatedSection>
  );
}

function MockPreview({ index }: { index: number }) {
  return <div className="relative z-10 grid h-full grid-cols-[0.8fr_1.2fr] gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"><div className="space-y-3">{[0, 1, 2].map((item) => <span key={item} className="block h-10 rounded-2xl bg-white/10" />)}</div><div className="rounded-2xl bg-slate-950/60 p-3"><div className="mb-3 h-3 w-24 rounded-full bg-cyan-300/70" /><div className="grid h-28 grid-cols-4 items-end gap-2">{[42, 78, 56, 92].map((height, i) => <span key={i} style={{ height: `${height + index * 2}%` }} className="rounded-t-xl bg-cyan-300/50" />)}</div></div></div>;
}

function CaseStudy() {
  return (
    <AnimatedSection className="px-5 py-24 sm:px-8" id="case-study">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Featured case study</p><h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">Cleanova Wien</h2><p className="mt-6 text-lg leading-8 text-slate-300">A premium cleaning company website with pricing logic, booking automation and a refined brand experience for Vienna households and offices.</p><div className="mt-8 grid gap-3 text-sm text-slate-300">{['Goals: increase qualified booking requests', 'Process: strategy, UX, interface system, automation flow', 'Technology: Next.js, Supabase, CRM sync, email workflows', 'Features: pricing calculator, booking intake, lead scoring'].map((item) => <p key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />{item}</p>)}</div></div>
          <div className="glass rounded-[2rem] p-5"><div className="grid gap-4 md:grid-cols-2"><Comparison title="Before" muted items={['Static service list', 'Manual quotes', 'No CRM handoff']} /><Comparison title="After" items={['Guided booking flow', 'Instant price estimate', 'Automated CRM pipeline']} /></div><div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/50 p-5"><p className="text-sm font-semibold text-white">Automation concept</p><div className="mt-4 grid gap-3 md:grid-cols-4">{['Lead intake', 'AI scoring', 'Calendar route', 'CRM update'].map((item) => <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4 text-sm text-slate-300">{item}</div>)}</div></div></div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Comparison({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return <div className={muted ? 'rounded-3xl border border-white/10 bg-white/[0.03] p-5 opacity-75' : 'rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5'}><h3 className="text-lg font-semibold text-white">{title}</h3><div className="mt-5 space-y-3">{items.map((item) => <p key={item} className="rounded-2xl bg-slate-950/40 px-4 py-3 text-sm text-slate-300">{item}</p>)}</div></div>;
}

function Process() {
  return <AnimatedSection className="light-panel px-5 py-24 sm:px-8" id="process"><div className="mx-auto max-w-7xl"><SectionHeader light eyebrow="Process" title="A clear studio workflow from idea to launch." /><div className="grid gap-4 lg:grid-cols-5">{process.map((step, index) => { const Icon = step.icon; return <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-sm font-semibold text-blue-600">0{index + 1}</span><Icon className="mt-8 h-7 w-7 text-slate-950" /><h3 className="mt-6 text-xl font-semibold text-slate-950">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p></article>; })}</div></div></AnimatedSection>;
}

function WhyChooseUs() {
  return <AnimatedSection className="px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionHeader title="Why businesses choose TreeTech." description="A studio approach built around business value, not just screens." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{reasons.map((reason) => { const Icon = reason.icon; return <div key={reason.title} className="glass rounded-3xl p-6"><Icon className="h-6 w-6 text-cyan-200" /><p className="mt-6 text-xl font-semibold text-white">{reason.title}</p></div>; })}</div></div></AnimatedSection>;
}

function Testimonials() {
  return <AnimatedSection className="light-panel px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionHeader light eyebrow="Testimonials" title="Calm execution, premium outcomes." /><div className="grid gap-6 lg:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><blockquote className="text-lg leading-8 text-slate-700">“{item.quote}”</blockquote><figcaption className="mt-8"><p className="font-semibold text-slate-950">{item.name}</p><p className="mt-1 text-sm text-slate-500">{item.role}</p></figcaption></figure>)}</div></div></AnimatedSection>;
}

function Contact() {
  return (
    <AnimatedSection className="px-5 py-24 sm:px-8" id="contact">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Contact</p><h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">Let’s build the system your business keeps imagining.</h2><p className="mt-6 text-lg leading-8 text-slate-300">Tell us what you want to launch, improve or automate. We will come back with a focused next step.</p><div className="mt-8 grid gap-4"><a href="https://wa.me/430000000000" className="glass inline-flex items-center gap-3 rounded-2xl p-4 text-white"><MessageCircle className="h-5 w-5 text-cyan-200" /> WhatsApp consultation</a><a href="mailto:hello@treetech.studio" className="glass inline-flex items-center gap-3 rounded-2xl p-4 text-white"><Mail className="h-5 w-5 text-cyan-200" /> hello@treetech.studio</a></div></div>
        <ContactForm />
      </div>
    </AnimatedSection>
  );
}
