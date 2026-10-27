'use client';

import {Send} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {phonePattern} from '@/lib/contact-options';
import {cn} from '@/lib/utils';

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  websiteUrl: string;
  startedAt: number;
};

const emptyValues = {name: '', phone: '', email: '', company: '', message: '', websiteUrl: ''};

const inputClass =
  'h-14 w-full rounded-[12px] border-2 border-border bg-surface px-4 text-base text-foreground outline-none transition placeholder:text-muted/70 focus:border-foreground';

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
    defaultValues: {...emptyValues, startedAt}
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
        budget: 'web',
        metadata: {source: 'free_analysis', locale}
      })
    }).catch(() => null);

    if (!response?.ok) {
      setStatus('error');
      return;
    }

    reset({...emptyValues, startedAt});
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[14px] border-2 border-foreground bg-surface p-5 sm:p-6"
      noValidate
    >
      <div className="grid gap-4">
        <Field label={t('name')} error={errors.name?.message}>
          <input
            {...register('name', {
              required: t('errors.name'),
              minLength: {value: 2, message: t('errors.name')},
              maxLength: {value: 120, message: t('errors.name')}
            })}
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className={inputClass}
          />
        </Field>
        <Field label={t('company')} error={errors.company?.message}>
          <input
            {...register('company', {
              required: t('errors.company'),
              minLength: {value: 2, message: t('errors.company')},
              maxLength: {value: 160, message: t('errors.company')}
            })}
            autoComplete="organization"
            placeholder={t('companyPlaceholder')}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('phone')} error={errors.phone?.message}>
            <input
              {...register('phone', {
                pattern: {value: phonePattern, message: t('errors.phone')},
                validate: (value, all) => Boolean(value.trim() || all.email.trim()) || t('errors.reachable')
              })}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t('phonePlaceholder')}
              className={inputClass}
            />
          </Field>
          <Field label={t('email')} error={errors.email?.message}>
            <input
              {...register('email', {
                maxLength: {value: 160, message: t('errors.email')},
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('errors.email')
                }
              })}
              type="email"
              autoComplete="email"
              placeholder={t('emailPlaceholder')}
              className={inputClass}
            />
          </Field>
        </div>
        <p className="-mt-2 text-sm text-muted">{t('reachableHint')}</p>
        <Field label={`${t('message')} (${t('optional')})`} error={errors.message?.message}>
          <input
            {...register('message', {maxLength: {value: 2000, message: t('errors.message')}})}
            placeholder={t('messagePlaceholder')}
            className={inputClass}
          />
        </Field>
      </div>

      <input {...register('websiteUrl')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" {...register('startedAt', {valueAsNumber: true})} value={startedAt} readOnly />

      <div className="mt-5 grid gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[12px] bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          <span>{isSubmitting ? t('submitting') : t('submit')}</span>
        </button>
        {status ? (
          <p
            className={cn(
              'rounded-[10px] px-4 py-3 text-base font-semibold',
              status === 'success' ? 'bg-accent/[0.08] text-accent' : 'bg-red-50 text-red-700'
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
      <span className="mb-2 block text-base font-bold text-foreground">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm font-semibold text-red-700">{error}</span> : null}
    </label>
  );
}
