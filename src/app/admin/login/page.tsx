import {redirect} from 'next/navigation';
import {isAdminAuthConfigured, isAdminAuthenticated} from '@/lib/admin-auth';
import {loginAction} from '../actions';

export const dynamic = 'force-dynamic';

export default async function LoginPage({searchParams}: {searchParams: Promise<{error?: string}>}) {
  if (await isAdminAuthenticated()) redirect('/admin');
  const configured = isAdminAuthConfigured(); const {error} = await searchParams;
  return <main className="flex min-h-screen items-center justify-center px-5 py-12"><section className="terminal-window w-full max-w-md rounded-[1.25rem] p-6 sm:p-8"><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">TreeTech CRM</p><h1 className="mt-3 text-3xl font-semibold">Anmelden</h1><p className="mt-3 text-sm leading-6 text-muted">Interner Zugang für die Verwaltung von Leads und Follow-ups.</p>{!configured ? <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">Admin-Zugang ist noch nicht konfiguriert. Ergänzen Sie die ADMIN_* Variablen.</p> : null}{error ? <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">E-Mail oder Passwort ist nicht korrekt.</p> : null}<form action={loginAction} className="mt-6 grid gap-4"><label className="grid gap-2 text-sm font-semibold">E-Mail<input name="email" type="email" autoComplete="username" required className="h-12 rounded-xl border border-white/10 bg-white/[0.055] px-3 outline-none focus:border-accent/60" /></label><label className="grid gap-2 text-sm font-semibold">Passwort<input name="password" type="password" autoComplete="current-password" required minLength={12} className="h-12 rounded-xl border border-white/10 bg-white/[0.055] px-3 outline-none focus:border-accent/60" /></label><button disabled={!configured} className="mt-2 min-h-12 rounded-full bg-accent px-5 font-semibold text-[#070806] disabled:opacity-40">Anmelden</button></form></section></main>;
}

