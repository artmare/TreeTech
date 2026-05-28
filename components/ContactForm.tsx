'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

const projectTypes = ['Website Development', 'AI Automation', 'CRM & Dashboard', 'Landing Page', 'UI/UX Design'];
const budgets = ['€3k - €6k', '€6k - €12k', '€12k - €25k', '€25k+'];

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('loading');
    setError('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong.');
      form.reset();
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-[2rem] p-5 sm:p-8">
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" />
        <Select label="Project type" name="projectType" options={projectTypes} />
        <Select label="Budget" name="budget" options={budgets} />
      </div>
      <label className="mt-4 block text-sm font-medium text-slate-200">
        Message
        <textarea required name="message" rows={5} placeholder="Tell us what you want to build or automate." className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60" />
      </label>
      <button disabled={state === 'loading'} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70">
        {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {state === 'loading' ? 'Sending...' : 'Send project request'}
      </button>
      {state === 'success' ? <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">Thank you. We’ll contact you shortly.</p> : null}
      {state === 'error' ? <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
    </form>
  );
}

function Field({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <label className="block text-sm font-medium text-slate-200">
      {label}
      <input required name={name} type={type} placeholder={placeholder} className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60" />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block text-sm font-medium text-slate-200">
      {label}
      <select required name={name} className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-cyan-300/60">
        <option value="">Select</option>
        {options.map((option) => <option key={option} value={option} className="bg-slate-950">{option}</option>)}
      </select>
    </label>
  );
}
