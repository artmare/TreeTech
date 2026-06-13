'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Send} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';

import {budgetValues, createContactSchema, type ContactFormValues} from '@/lib/contact';
import {cn} from '@/lib/utils';

export function ContactForm() {
  const t = useTranslations('contactForm');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const schema = useMemo(
    () =>
      createContactSchema({
        name: t('errors.name'),
        email: t('errors.email'),
        budget: t('errors.budget'),
        message: t('errors.message')
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting}
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      budget: '',
      message: '',
      websiteUrl: ''
    }
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus('error');
      return;
    }

    reset();
    setStatus('success');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-[8px] border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} error={errors.name?.message}>
          <input
            {...register('name')}
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className="h-12 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </Field>
        <Field label={t('email')} error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            className="h-12 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={t('company')} error={errors.company?.message}>
          <input
            {...register('company')}
            autoComplete="organization"
            placeholder={t('companyPlaceholder')}
            className="h-12 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </Field>
        <Field label={t('budget')} error={errors.budget?.message}>
          <select
            {...register('budget')}
            className="h-12 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            <option value="">{t('budgetPlaceholder')}</option>
            {budgetValues.map((budget) => (
              <option key={budget} value={budget}>
                {t(`budgets.${budget}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t('message')} error={errors.message?.message} className="mt-4">
        <textarea
          {...register('message')}
          rows={6}
          placeholder={t('messagePlaceholder')}
          className="w-full resize-none rounded-[8px] border border-border bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </Field>

      <input {...register('websiteUrl')} tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(15,95,69,0.2)] transition hover:bg-[#0a4f38] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>{isSubmitting ? t('submitting') : t('submit')}</span>
        </button>
        {status ? (
          <p
            className={cn(
              'text-sm font-medium',
              status === 'success' ? 'text-primary' : 'text-red-600'
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
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
