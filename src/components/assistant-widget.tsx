'use client';

import {
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Loader2,
  MessageCircle,
  Minus,
  Send,
  Sparkles,
  Trash2,
  X
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState} from 'react';

import {type BudgetValue} from '@/lib/contact-options';
import {isDemoSitePath} from '@/lib/demo-routes';
import {cn} from '@/lib/utils';
import {usePathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

type AssistantWidgetProps = {
  locale: Locale;
};

type LeadFormValues = {
  name: string;
  email: string;
  message: string;
};

type QualificationState = {
  businessType?: string;
  projectType?: BudgetValue;
  projectLabel?: string;
  urgency?: string;
};

type QualificationField = keyof QualificationState;

type QualificationOption = {
  field: QualificationField;
  value: string;
  label: string;
  budget?: BudgetValue;
};

type QualificationStep = {
  field: QualificationField;
  question: string;
  options: QualificationOption[];
};

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

const maxClientMessages = 12;
const pressable =
  'motion-safe:active:scale-[0.97] motion-safe:active:brightness-110 motion-safe:active:transition-transform';

export function AssistantWidget({locale}: AssistantWidgetProps) {
  const t = useTranslations('assistant');
  const contactT = useTranslations('contactForm');
  const reduceMotion = useReducedMotion();
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const storageKey = `treetech-assistant:v2:${locale}`;
  const bookingHref = `/${locale}/contact#audit-call`;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const streamedContentRef = useRef('');
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createGreeting(t('greeting'))]);
  const [qualification, setQualification] = useState<QualificationState>({});
  const [loaded, setLoaded] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'success' | 'error' | null>(null);
  const [leadStartedAt, setLeadStartedAt] = useState(() => Date.now());
  const [leadValues, setLeadValues] = useState<LeadFormValues>({
    name: '',
    email: '',
    message: ''
  });

  const qualificationSteps = useMemo(() => createQualificationSteps(t), [t]);
  const qualificationSummary = useMemo(
    () => createQualificationSummary(qualification, t),
    [qualification, t]
  );
  const quickPrompts = useMemo(
    () => [t('prompt1'), t('prompt2'), t('prompt3')],
    [t]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKey);

      if (stored) {
        try {
          const parsed = JSON.parse(stored) as ChatMessage[];
          const validMessages = parsed.filter(isChatMessage).slice(-maxClientMessages);

          if (validMessages.length > 0) {
            setMessages(validMessages);
          }
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }

      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(messages.slice(-maxClientMessages)));
  }, [loaded, messages, storageKey]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({block: 'end'});
    }
  }, [messages, open, leadOpen]);

  if (isDemoSitePath(pathname) || activeLocale !== locale) {
    return null;
  }

  function resetChat() {
    const greeting = createGreeting(t('greeting'));
    setMessages([greeting]);
    setQualification({});
    setError(null);
    setInput('');
    window.localStorage.removeItem(storageKey);
  }

  function handleQualificationSelect(option: QualificationOption) {
    const nextQualification = applyQualificationOption(qualification, option);
    const nextAssistantMessage = getNextQualificationMessage(nextQualification, t);

    setQualification(nextQualification);
    setMessages((currentMessages) => {
      const additions: ChatMessage[] = [
        {
          id: createId(),
          role: 'user',
          content: `${getQualificationFieldLabel(option.field, t)}: ${option.label}`
        }
      ];

      if (nextAssistantMessage) {
        additions.push({
          id: createId(),
          role: 'assistant',
          content: nextAssistantMessage
        });
      }

      return [...currentMessages, ...additions].slice(-maxClientMessages);
    });

    if (isQualificationComplete(nextQualification)) {
      trackEvent('assistant_dialog_completed', {locale});
    }
  }

  function openLeadForm() {
    setLeadStatus(null);
    setLeadStartedAt(Date.now());
    setLeadValues((values) => ({
      ...values,
      message: values.message || createLeadBrief(messages, t('leadSource'), qualificationSummary)
    }));
    setLeadOpen(true);
    trackEvent('assistant_email_offer_opened', {locale});
  }

  async function submitMessage(text?: string) {
    const content = (text ?? input).trim();

    if (!content || isStreaming) {
      return;
    }

    setInput('');
    setError(null);

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content
    };
    const assistantMessage: ChatMessage = {
      id: createId(),
      role: 'assistant',
      content: ''
    };
    const nextMessages = [...messages, userMessage, assistantMessage].slice(-maxClientMessages);

    setMessages(nextMessages);
    setIsStreaming(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          locale,
          messages: nextMessages
            .filter((message) => message.content.trim().length > 0)
            .slice(-maxClientMessages)
            .map(({role, content}) => ({role, content}))
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(t('error'));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      streamedContentRef.current = '';

      while (true) {
        const {value, done} = await reader.read();

        if (done) {
          break;
        }

        streamedContentRef.current += decoder.decode(value, {stream: true});
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessage.id
              ? {...message, content: streamedContentRef.current}
              : message
          )
        );
      }

      streamedContentRef.current += decoder.decode();

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessage.id
            ? {...message, content: streamedContentRef.current || t('emptyResponse')}
            : message
        )
      );
    } catch {
      setError(t('error'));
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessage.id
            ? {...message, content: t('error')}
            : message
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus(null);

    const message = leadValues.message.trim();

    if (
      leadValues.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadValues.email.trim()) ||
      message.length < 20
    ) {
      setLeadStatus('error');
      return;
    }

    const transcript = createMetadataTranscript(messages);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: leadValues.name.trim(),
        email: leadValues.email.trim(),
        company: '',
        budget: deriveBudget(qualification),
        message: createStoredLeadMessage(message, qualificationSummary, transcript, t('leadSource')),
        metadata: {
          source: 'assistant',
          locale,
          bookingIntent: false,
          qualification: {
            businessType: qualification.businessType,
            projectType: qualification.projectLabel || qualification.projectType,
            urgency: qualification.urgency
          },
          transcript
        },
        websiteUrl: '',
        startedAt: leadStartedAt
      })
    });

    if (!response.ok) {
      setLeadStatus('error');
      return;
    }

    setLeadStatus('success');
    setLeadValues({
      name: '',
      email: '',
      message: ''
    });
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: createId(),
        role: 'assistant',
        content: t('leadSuccess')
      }
    ]);
    trackEvent('assistant_lead_submitted', {locale});
  }

  return (
    <div
      className={cn(
        'theme-dark pointer-events-none fixed inset-x-4 z-[70] sm:inset-x-auto sm:right-5 md:bottom-4',
        // On phones the sticky contact bar sits at the bottom, so the closed launcher floats above it.
        open ? 'bottom-4' : 'bottom-[100px]'
      )}
    >
      <AnimatePresence mode="wait">
        {open ? (
        <motion.section
          key="assistant-panel"
          initial={reduceMotion ? false : {opacity: 0, y: 18, scale: 0.97}}
          animate={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0, scale: 1}}
          exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 12, scale: 0.98}}
          transition={{duration: 0.22, ease: 'easeOut'}}
          className="pointer-events-auto ml-auto flex h-[min(720px,calc(100svh-2rem))] w-full flex-col overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#070806]/96 text-foreground shadow-[0_24px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:w-[420px]"
          aria-label={t('title')}
        >
          <header className="flex min-h-16 items-center justify-between gap-3 border-b border-white/10 px-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-[#070806]">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">{t('title')}</h2>
                <p className="truncate text-xs text-muted">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-muted transition hover:border-accent/40 hover:text-accent',
                  pressable
                )}
                aria-label={t('clear')}
                title={t('clear')}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-muted transition hover:border-accent/40 hover:text-accent',
                  pressable
                )}
                aria-label={t('minimize')}
                title={t('minimize')}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-muted transition hover:border-accent/40 hover:text-accent sm:hidden',
                  pressable
                )}
                aria-label={t('close')}
                title={t('close')}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid gap-3">
              <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.article
                  key={message.id}
                  layout
                  initial={reduceMotion ? false : {opacity: 0, y: 10, scale: 0.98}}
                  animate={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0, scale: 1}}
                  exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -6, scale: 0.98}}
                  transition={{duration: 0.18, ease: 'easeOut'}}
                  className={cn(
                    'max-w-[88%] rounded-[1rem] px-4 py-3 text-sm leading-6',
                    message.role === 'user'
                      ? 'ml-auto bg-accent text-[#070806]'
                      : 'mr-auto border border-white/10 bg-white/[0.06] text-foreground'
                  )}
                >
                  {message.content ? (
                    <p className="whitespace-pre-wrap">{renderAssistantText(message.content)}</p>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-muted">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t('thinking')}
                    </span>
                  )}
                </motion.article>
              ))}
              </AnimatePresence>
            </div>

            {!leadOpen ? (
              <div className="mt-4 grid gap-3">
                <QualificationPanel
                  steps={qualificationSteps}
                  qualification={qualification}
                  summary={qualificationSummary}
                  bookingHref={bookingHref}
                  t={t}
                  onSelect={handleQualificationSelect}
                  onProposal={openLeadForm}
                />
                <div className="grid gap-2 sm:grid-cols-3">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => submitMessage(prompt)}
                      disabled={isStreaming}
                      className={cn(
                        'min-h-10 rounded-[0.85rem] border border-white/10 bg-white/[0.045] px-3 py-2 text-left text-xs font-medium leading-5 text-muted transition hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60',
                        pressable
                      )}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <LeadForm
                values={leadValues}
                setValues={setLeadValues}
                status={leadStatus}
                contactT={contactT}
                t={t}
                summary={qualificationSummary}
                onClose={() => setLeadOpen(false)}
                onSubmit={submitLead}
              />
            )}

            {error ? (
              <p className="mt-3 rounded-[0.85rem] border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage();
            }}
            className="border-t border-white/10 p-3"
          >
            <label className="sr-only" htmlFor="assistant-message">
              {t('inputLabel')}
            </label>
            <div className="flex items-center gap-2 rounded-[1.1rem] border border-white/10 bg-white/[0.065] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition focus-within:border-accent/50 focus-within:bg-white/[0.08] focus-within:ring-4 focus-within:ring-accent/10">
              <input
                id="assistant-message"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1600}
                placeholder={t('placeholder')}
                className="h-11 min-w-0 flex-1 bg-transparent px-2 text-sm leading-6 text-foreground outline-none placeholder:text-muted/70"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-[#070806] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60',
                  pressable
                )}
                aria-label={t('send')}
                title={t('send')}
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </form>
        </motion.section>
      ) : (
        <motion.button
          key="assistant-launcher"
          initial={reduceMotion ? false : {opacity: 0, y: 10, scale: 0.94}}
          animate={reduceMotion ? {opacity: 1} : {opacity: 1, y: 0, scale: 1}}
          exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 8, scale: 0.96}}
          whileTap={reduceMotion ? undefined : {scale: 0.96}}
          transition={{duration: 0.18, ease: 'easeOut'}}
          type="button"
          onClick={() => {
            setOpen(true);
            trackEvent('assistant_opened', {locale});
          }}
          className="pointer-events-auto relative isolate ml-auto flex min-h-14 items-center gap-3 overflow-visible rounded-full border border-accent/30 bg-[#070806]/92 px-4 py-2 text-sm font-semibold text-foreground opacity-100 shadow-[0_18px_58px_rgba(0,0,0,0.38)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
          aria-label={t('open')}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 -z-10 rounded-full border border-accent/35"
            animate={
              reduceMotion
                ? {opacity: 0.2}
                : {
                    opacity: [0.28, 0.08, 0.28],
                    scale: [0.98, 1.18, 0.98]
                  }
            }
            transition={{duration: 2.4, ease: 'easeInOut', repeat: reduceMotion ? 0 : Infinity}}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 -z-20 rounded-full bg-accent/10 blur-lg"
            animate={
              reduceMotion
                ? {opacity: 0.16}
                : {
                    opacity: [0.12, 0.3, 0.12],
                    scale: [0.94, 1.08, 0.94]
                  }
            }
            transition={{duration: 3.2, ease: 'easeInOut', repeat: reduceMotion ? 0 : Infinity}}
          />
          <motion.span
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[#070806]"
            animate={reduceMotion ? undefined : {y: [0, -2, 0], scale: [1, 1.08, 1]}}
            transition={{duration: 1.9, ease: 'easeInOut', repeat: Infinity}}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </motion.span>
          <span className="relative z-10 hidden sm:inline">{t('open')}</span>
          <motion.span
            className="relative z-10 text-accent"
            animate={reduceMotion ? undefined : {rotate: [0, 14, -8, 0], scale: [1, 1.18, 1]}}
            transition={{duration: 2.1, ease: 'easeInOut', repeat: Infinity}}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
      </AnimatePresence>
    </div>
  );
}

type QualificationPanelProps = {
  steps: QualificationStep[];
  qualification: QualificationState;
  summary: string;
  bookingHref: string;
  t: ReturnType<typeof useTranslations>;
  onSelect: (option: QualificationOption) => void;
  onProposal: () => void;
};

function QualificationPanel({
  steps,
  qualification,
  summary,
  bookingHref,
  t,
  onSelect,
  onProposal
}: QualificationPanelProps) {
  const activeStep = getActiveQualificationStep(steps, qualification);
  const complete = !activeStep;

  return (
    <section className="rounded-[1rem] border border-white/10 bg-white/[0.045] p-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[#070806]">
          {complete ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{t('qualifierTitle')}</h3>
          <p className="mt-1 text-xs leading-5 text-muted">
            {complete ? t('qualifierComplete') : t('qualifierIntro')}
          </p>
        </div>
      </div>

      {summary ? (
        <p className="mt-3 rounded-[0.85rem] border border-accent/20 bg-accent/[0.07] px-3 py-2 text-xs leading-5 text-accent">
          <span className="font-semibold">{t('qualifierSummaryTitle')}:</span> {summary}
        </p>
      ) : null}

      {activeStep ? (
        <div className="mt-3">
          <p className="text-sm font-semibold leading-6 text-foreground">{activeStep.question}</p>
          <div className="mt-2 grid gap-2">
            {activeStep.options.map((option) => (
              <button
                key={`${option.field}-${option.value}`}
                type="button"
                onClick={() => onSelect(option)}
                className={cn(
                  'min-h-10 rounded-[0.85rem] border border-white/10 bg-white/[0.05] px-3 py-2 text-left text-xs font-semibold leading-5 text-muted transition hover:border-accent/40 hover:bg-accent/[0.08] hover:text-foreground',
                  pressable
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3 grid gap-2">
          <a
            href={bookingHref}
            onClick={() => trackEvent('assistant_booking_clicked')}
            className={cn(
              'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#070806] transition hover:bg-white',
              pressable
            )}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            {t('bookCall')}
          </a>
          <button
            type="button"
            onClick={onProposal}
            className={cn(
              'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/[0.09] px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-[#070806]',
              pressable
            )}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {t('proposalByEmail')}
          </button>
          <p className="text-center text-xs leading-5 text-muted">{t('bookingTrust')}</p>
        </div>
      )}
    </section>
  );
}

type LeadFormProps = {
  values: LeadFormValues;
  setValues: React.Dispatch<React.SetStateAction<LeadFormValues>>;
  status: 'success' | 'error' | null;
  contactT: ReturnType<typeof useTranslations>;
  t: ReturnType<typeof useTranslations>;
  summary: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function LeadForm({values, setValues, status, contactT, t, summary, onClose, onSubmit}: LeadFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-[1rem] border border-white/10 bg-white/[0.045] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{t('leadTitle')}</p>
          <p className="mt-1 text-xs leading-5 text-muted">{t('leadHelp')}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted transition hover:text-accent',
            pressable
          )}
          aria-label={t('closeLead')}
          title={t('closeLead')}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <LeadInput
          label={contactT('name')}
          value={values.name}
          onChange={(value) => setValues((current) => ({...current, name: value}))}
          autoComplete="name"
          placeholder={contactT('namePlaceholder')}
        />
        <LeadInput
          label={contactT('email')}
          value={values.email}
          onChange={(value) => setValues((current) => ({...current, email: value}))}
          autoComplete="email"
          placeholder={contactT('emailPlaceholder')}
          type="email"
        />
      </div>
      {summary ? (
        <p className="mt-3 rounded-[0.85rem] border border-accent/20 bg-accent/[0.07] px-3 py-2 text-xs leading-5 text-accent">
          {summary}
        </p>
      ) : null}
      <label className="mt-3 block">
        <span className="mb-1.5 block text-xs font-semibold text-foreground">{t('leadMessageLabel')}</span>
        <textarea
          value={values.message}
          onChange={(event) => setValues((current) => ({...current, message: event.target.value}))}
          rows={4}
          maxLength={2000}
          placeholder={contactT('messagePlaceholder')}
          className="w-full resize-none rounded-[0.85rem] border border-white/10 bg-white/[0.055] px-3 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent/50 focus:ring-4 focus:ring-accent/10"
        />
      </label>
      <button
        type="submit"
        className={cn(
          'mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#070806] transition hover:bg-white',
          pressable
        )}
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {t('sendLead')}
      </button>
      {status ? (
        <p
          className={cn(
            'mt-3 text-sm font-medium',
            status === 'success' ? 'text-accent' : 'text-red-300'
          )}
          role="status"
        >
          {status === 'success' ? t('leadSuccess') : t('leadError')}
        </p>
      ) : null}
    </form>
  );
}

type LeadInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
};

function LeadInput({label, value, onChange, placeholder, type = 'text', autoComplete}: LeadInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 w-full rounded-[0.85rem] border border-white/10 bg-white/[0.055] px-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent/50 focus:ring-4 focus:ring-accent/10"
      />
    </label>
  );
}

function createGreeting(content: string): ChatMessage {
  return {
    id: 'assistant-greeting',
    role: 'assistant',
    content
  };
}

function createLeadBrief(messages: ChatMessage[], sourceLabel: string, qualificationSummary: string) {
  const userMessages = messages
    .filter((message) => message.role === 'user')
    .slice(-4)
    .map((message) => message.content.trim())
    .filter(Boolean);
  const parts = [sourceLabel, qualificationSummary, ...userMessages].filter(Boolean);

  return parts.length > 0 ? `${parts.join('\n\n')}\n\n` : `${sourceLabel}\n\n`;
}

function createQualificationSteps(t: ReturnType<typeof useTranslations>): QualificationStep[] {
  return [
    {
      field: 'businessType',
      question: t('qualifierBusinessQuestion'),
      options: [
        {field: 'businessType', value: 'clinic', label: t('qualifierBusinessClinic')},
        {field: 'businessType', value: 'legal', label: t('qualifierBusinessLegal')},
        {field: 'businessType', value: 'hotel', label: t('qualifierBusinessHotel')},
        {field: 'businessType', value: 'service', label: t('qualifierBusinessService')}
      ]
    },
    {
      field: 'projectType',
      question: t('qualifierProjectQuestion'),
      options: [
        {
          field: 'projectType',
          value: 'ai-website',
          label: t('qualifierProjectWebsite'),
          budget: 'web'
        },
        {
          field: 'projectType',
          value: 'lead-automation',
          label: t('qualifierProjectLeads'),
          budget: 'automation'
        },
        {
          field: 'projectType',
          value: 'documents',
          label: t('qualifierProjectDocs'),
          budget: 'workflow'
        },
        {
          field: 'projectType',
          value: 'assistant',
          label: t('qualifierProjectAssistant'),
          budget: 'integration'
        }
      ]
    },
    {
      field: 'urgency',
      question: t('qualifierUrgencyQuestion'),
      options: [
        {field: 'urgency', value: 'now', label: t('qualifierUrgencyNow')},
        {field: 'urgency', value: 'month', label: t('qualifierUrgencyMonth')},
        {field: 'urgency', value: 'later', label: t('qualifierUrgencyLater')}
      ]
    }
  ];
}

function applyQualificationOption(
  qualification: QualificationState,
  option: QualificationOption
): QualificationState {
  if (option.field === 'projectType') {
    return {
      ...qualification,
      projectType: option.budget || 'automation',
      projectLabel: option.label
    };
  }

  return {
    ...qualification,
    [option.field]: option.label
  };
}

function getActiveQualificationStep(steps: QualificationStep[], qualification: QualificationState) {
  if (!qualification.businessType) {
    return steps.find((step) => step.field === 'businessType');
  }

  if (!qualification.projectType) {
    return steps.find((step) => step.field === 'projectType');
  }

  if (!qualification.urgency) {
    return steps.find((step) => step.field === 'urgency');
  }

  return null;
}

function getNextQualificationMessage(
  qualification: QualificationState,
  t: ReturnType<typeof useTranslations>
) {
  if (!qualification.projectType) {
    return t('qualifierNextProject');
  }

  if (!qualification.urgency) {
    return t('qualifierNextUrgency');
  }

  return t('qualifierComplete');
}

function getQualificationFieldLabel(
  field: QualificationField,
  t: ReturnType<typeof useTranslations>
) {
  if (field === 'businessType') {
    return t('qualifierBusinessLabel');
  }

  if (field === 'projectType' || field === 'projectLabel') {
    return t('qualifierProjectLabel');
  }

  return t('qualifierUrgencyLabel');
}

function createQualificationSummary(
  qualification: QualificationState,
  t: ReturnType<typeof useTranslations>
) {
  return [
    qualification.businessType
      ? `${t('qualifierBusinessLabel')}: ${qualification.businessType}`
      : '',
    qualification.projectLabel
      ? `${t('qualifierProjectLabel')}: ${qualification.projectLabel}`
      : '',
    qualification.urgency ? `${t('qualifierUrgencyLabel')}: ${qualification.urgency}` : ''
  ]
    .filter(Boolean)
    .join(' | ');
}

function isQualificationComplete(qualification: QualificationState) {
  return Boolean(qualification.businessType && qualification.projectType && qualification.urgency);
}

function deriveBudget(qualification: QualificationState): BudgetValue {
  return qualification.projectType || 'automation';
}

function createMetadataTranscript(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .slice(-maxClientMessages)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 420)
    }));
}

function createStoredLeadMessage(
  message: string,
  qualificationSummary: string,
  transcript: Array<{role: 'assistant' | 'user'; content: string}>,
  sourceLabel: string
) {
  const compactTranscript = transcript
    .slice(-6)
    .map((item) => `${item.role}: ${item.content}`)
    .join('\n');

  return [message, qualificationSummary, sourceLabel, compactTranscript]
    .filter(Boolean)
    .join('\n\n---\n')
    .slice(0, 2000);
}

function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.('event', name, params || {});
}

function renderAssistantText(content: string) {
  const nodes: ReactNode[] = [];
  const parts = content.split(/(\*\*[^*]+\*\*)/g);

  parts.forEach((part, index) => {
    if (!part) {
      return;
    }

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      nodes.push(
        <strong key={`${part}-${index}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
      return;
    }

    nodes.push(part);
  });

  return nodes;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as ChatMessage;
  return (
    typeof candidate.id === 'string' &&
    (candidate.role === 'assistant' || candidate.role === 'user') &&
    typeof candidate.content === 'string'
  );
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
