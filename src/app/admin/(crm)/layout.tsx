import {Archive, KanbanSquare, LayoutDashboard, ListTodo, LogOut, Settings, Users} from 'lucide-react';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {isAdminAuthenticated} from '@/lib/admin-auth';
import {logoutAction} from '../actions';

const links = [{href:'/admin',label:'Übersicht',icon:LayoutDashboard},{href:'/admin/leads',label:'Leads',icon:Users},{href:'/admin/pipeline',label:'Pipeline',icon:KanbanSquare},{href:'/admin/tasks',label:'Aufgaben',icon:ListTodo},{href:'/admin/archive',label:'Archiv',icon:Archive},{href:'/admin/settings',label:'Einstellungen',icon:Settings}];

export default async function CrmLayout({children}: {children: React.ReactNode}) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');
  return <div className="min-h-screen bg-[#070806] text-foreground lg:grid lg:grid-cols-[240px_1fr]"><aside className="border-b border-white/10 bg-[#0b0e0b] px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r"><div className="flex items-center justify-between lg:block"><Link href="/admin" className="text-lg font-semibold">TreeTech <span className="text-accent">CRM</span></Link><form action={logoutAction} className="lg:hidden"><button aria-label="Abmelden" className="rounded-lg border border-white/10 p-2"><LogOut className="h-4 w-4" /></button></form></div><nav aria-label="CRM Navigation" className="mt-4 flex gap-2 overflow-x-auto lg:mt-8 lg:grid">{links.map(({href,label,icon:Icon})=><Link key={href} href={href} className="flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted transition hover:bg-white/[0.06] hover:text-white"><Icon className="h-4 w-4" aria-hidden="true" />{label}</Link>)}</nav><form action={logoutAction} className="mt-auto hidden pt-8 lg:block"><button className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted hover:bg-white/[0.06] hover:text-white"><LogOut className="h-4 w-4" />Abmelden</button></form></aside><main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main></div>;
}

