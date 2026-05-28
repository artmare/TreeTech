'use client';

import { motion } from 'framer-motion';
import { Activity, Bot, CheckCircle2, Code2, Database, Workflow } from 'lucide-react';

const cards = [
  { label: 'AI Routing', value: '92%', icon: Bot },
  { label: 'Lead Quality', value: '+41%', icon: Activity },
  { label: 'Tasks Saved', value: '128h', icon: CheckCircle2 }
];

export function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-12 max-w-5xl lg:mt-0">
      <div className="absolute -inset-8 rounded-[3rem] bg-radial-blue blur-2xl" aria-hidden="true" />
      <motion.div
        className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-5"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">Automation cockpit</div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pipeline</p><h3 className="mt-1 text-xl font-semibold text-white">Client acquisition flow</h3></div>
              <Workflow className="h-5 w-5 text-cyan-200" />
            </div>
            <div className="space-y-3">
              {['Website lead', 'AI qualification', 'CRM sync', 'Follow-up sequence'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 4, delay: index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300/10 text-xs font-semibold text-cyan-200">0{index + 1}</span>
                  <span className="flex-1 text-sm text-slate-200">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-3">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                    <Icon className="mb-3 h-4 w-4 text-cyan-200" />
                    <p className="text-lg font-semibold text-white">{card.value}</p>
                    <p className="mt-1 text-[11px] leading-4 text-slate-400">{card.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold text-white">System map</span><Database className="h-4 w-4 text-cyan-200" /></div>
              <div className="grid grid-cols-3 items-center gap-3 text-center text-xs text-slate-300">
                {['Form', 'AI', 'CRM', 'Email', 'Dashboard', 'Booking'].map((node) => <div key={node} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-2 py-3">{node}</div>)}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 font-mono text-xs leading-6 text-slate-300">
              <div className="mb-2 flex items-center gap-2 text-cyan-200"><Code2 className="h-4 w-4" /> automation.ts</div>
              <p><span className="text-blue-300">if</span> (lead.score &gt; 80) route.to('sales')</p>
              <p><span className="text-blue-300">await</span> crm.sync(profile)</p>
              <p><span className="text-blue-300">return</span> launch.sequence()</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
