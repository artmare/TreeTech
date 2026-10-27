'use client';

import {Send} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {cn} from '@/lib/utils';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  websiteUrl: string;
  startedAt: number;
};

export function ContactForm() {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [startedAt] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting}
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      websiteUrl: '',
      startedAt
    }
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...values,
        company: '',
        budget: 'automation',
        metadata: {source: 'free_analysis', locale}
      })
    });

    if (!response.ok) {
      setStatus('error');
      return;
    }

    reset({
      name: '',
      email: '',
      message: '',
      websiteUrl: '',
      startedAt
    });
    setStatus('success');
    window.dispatchEvent(
      new CustomEvent('treetech:analytics', {
        detail: {
          name: 'contact_form_submitted',
          params: {source: 'free_analysis'}
        }
      })
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="terminal-window shine-surface rounded-[1.25rem] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} error={errors.name?.message}>
          <input
            {...register('name', {
              required: t('errors.name'),
              minLength: {value: 2, message: t('errors.name')},
              maxLength: {value: 120, message: t('errors.name')}
            })}
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className="h-12 w-full rounded-[0.9rem] border border-white/10 bg-white/[0.055] px-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-accent/10"
          />
        </Field>
        <Field label={t('email')} error={errors.email?.message}>
          <input
            {...register('email', {
              required: t('errors.email'),
              maxLength: {value: 160, message: t('errors.email')},
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('errors.email')
              }
            })}
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            className="h-12 w-full rounded-[0.9rem] border border-white/10 bg-white/[0.055] px-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-accent/10"
          />
        </Field>
      </div>

      <Field label={t('message')} error={errors.message?.message} className="mt-4">
        <textarea
          {...register('message', {
            required: t('errors.message'),
            minLength: {value: 20, message: t('errors.message')},
            maxLength: {value: 2000, message: t('errors.message')}
          })}
          rows={6}
          placeholder={t('messagePlaceholder')}
          className="w-full resize-none rounded-[0.9rem] border border-white/10 bg-white/[0.055] px-3 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-accent/10"
        />
      </Field>

      <input {...register('websiteUrl')} tabIndex={-1} autoComplete="off" className="hidden" />
      <input type="hidden" {...register('startedAt', {valueAsNumber: true})} value={startedAt} readOnly />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#070806] shadow-[0_18px_42px_rgba(214,255,99,0.14)] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>{isSubmitting ? t('submitting') : t('submit')}</span>
        </button>
        {status ? (
          <p
            className={cn(
              'text-sm font-medium',
              status === 'success' ? 'text-accent' : 'text-red-400'
            )}
            role="status"
          >
            {t(status)}
          </p>
        ) : null}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function Field({label, error, children, className}: FieldProps) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-400">{error}</span> : null}
    </label>
  );
}
