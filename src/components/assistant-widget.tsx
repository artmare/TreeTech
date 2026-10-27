'use client';

import {CheckCircle2, ClipboardList, Loader2, MessageCircle, Minus, Phone, Send, Trash2, X} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState} from 'react';

import {phoneHref, whatsappHref} from '@/content/contact-links';
import {phonePattern} from '@/lib/contact-options';
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
  company: string;
  reach: string;
};

type QualificationField = 'businessType' | 'situation' | 'urgency';
type QualificationState = Partial<Record<QualificationField, string>> & {care?: boolean};

type QualificationOption = {
  field: QualificationField;
  label: string;
  care?: boolean;
};

type QualificationStep = {
  field: QualificationField;
  question: string;
  options: QualificationOption[];
};

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

type Translate = ReturnType<typeof useTranslations>;

const maxClientMessages = 12;
const fieldOrder: QualificationField[] = ['businessType', 'situation', 'urgency'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const iconButton =
  'flex h-10 w-10 items-center justify-center rounded-[10px] text-muted transition hover:bg-background hover:text-foreground';
const optionButton =
  'min-h-11 rounded-[10px] border-2 border-border bg-surface px-3 py-2 text-left text-sm font-semibold leading-5 text-foreground transition hover:border-foreground disabled:cursor-not-allowed disabled:opacity-60';
const primaryButton =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-accent px-4 py-2 text-base font-bold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70';
const secondaryButton =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] border-2 border-foreground bg-surface px-3 py-2 text-[15px] font-bold text-foreground transition hover:bg-background';

export function AssistantWidget({locale}: AssistantWidgetProps) {
  const t = useTranslations('assistant');
  const reduceMotion = useReducedMotion();
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  // v3: niche rewrite, older conversations about other topics are dropped.
  const storageKey = `treetech-assistant:v3:${locale}`;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const streamedContentRef = useRef('');
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createGreeting(t('greeting'))]);
  const [qualification, setQualification] = useState<QualificationState>({});
  const [loaded, setLoaded] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSending, setLeadSending] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'success' | 'invalid' | 'error' | null>(null);
  const [leadStartedAt, setLeadStartedAt] = useState(() => Date.now());
  const [leadValues, setLeadValues] = useState<LeadFormValues>({name: '', company: '', reach: ''});

  const qualificationSteps = useMemo(() => createQualificationSteps(t), [t]);
  const qualificationSummary = useMemo(() => createQualificationSummary(qualification, t), [qualification, t]);
  const quickPrompts = useMemo(() => [t('prompt1'), t('prompt2'), t('prompt3')], [t]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored) as ChatMessage[];
          const validMessages = parsed.filter(isChatMessage).slice(-maxClientMessages);
          if (validMessages.length > 0) setMessages(validMessages);
        }
      } catch {
        try {
          window.localStorage.removeItem(storageKey);
        } catch {
          // Storage can be blocked (private mode); the chat still works without it.
        }
      }
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(messages.slice(-maxClientMessages)));
    } catch {
          // Storage can be blocked (private mode); the chat still works without it.
        }
  }, [loaded, messages, storageKey]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({block: 'end'});
  }, [messages, open, leadOpen]);

  if (isDemoSitePath(pathname) || activeLocale !== locale) {
    return null;
  }

  function resetChat() {
    setMessages([createGreeting(t('greeting'))]);
    setQualification({});
    setInput('');
    setLeadOpen(false);
    setLeadStatus(null);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
          // Storage can be blocked (private mode); the chat still works without it.
        }
  }

  function handleQualificationSelect(option: QualificationOption) {
    const next: QualificationState = {
      ...qualification,
      [option.field]: option.label,
      ...(option.field === 'situation' ? {care: Boolean(option.care)} : {})
    };
    const nextStep = fieldOrder.find((field) => !next[field]);
    const reply =
      nextStep === 'situation'
        ? t('qualifierNextProject')
        : nextStep === 'urgency'
          ? t('qualifierNextUrgency')
          : next.care
            ? t('qualifierCompleteCare')
            : t('qualifierComplete');

    setQualification(next);
    setMessages((current) =>
      [
        ...current,
        {id: createId(), role: 'user' as const, content: option.label},
        {id: createId(), role: 'assistant' as const, content: reply}
      ].slice(-maxClientMessages)
    );

    if (!nextStep) trackEvent('assistant_dialog_completed', {locale});
  }

  function openLeadForm() {
    setLeadStatus(null);
    setLeadStartedAt(Date.now());
    setLeadOpen(true);
    trackEvent('assistant_lead_opened', {locale});
  }

  async function submitMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isStreaming) return;

    setInput('');
    const userMessage: ChatMessage = {id: createId(), role: 'user', content};
    const assistantMessage: ChatMessage = {id: createId(), role: 'assistant', content: ''};
    const nextMessages = [...messages, userMessage, assistantMessage].slice(-maxClientMessages);
    const setAssistantContent = (value: string) =>
      setMessages((current) =>
        current.map((message) => (message.id === assistantMessage.id ? {...message, content: value} : message))
      );

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
            .map(({role, content: value}) => ({role, content: value}))
        })
      });

      if (!response.ok || !response.body) throw new Error('assistant_failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      streamedContentRef.current = '';

      while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        streamedContentRef.current += decoder.decode(value, {stream: true});
        setAssistantContent(streamedContentRef.current);
      }

      streamedContentRef.current += decoder.decode();
      setAssistantContent(streamedContentRef.current || t('emptyResponse'));
    } catch {
      setAssistantContent(t('error'));
    } finally {
      setIsStreaming(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus(null);

    const name = leadValues.name.trim();
    const company = leadValues.company.trim();
    const reach = leadValues.reach.trim();
    const isEmail = emailPattern.test(reach);
    const isPhone = phonePattern.test(reach);

    if (name.length < 2 || company.length < 2 || (!isEmail && !isPhone)) {
      setLeadStatus('invalid');
      return;
    }

    setLeadSending(true);
    const transcript = createMetadataTranscript(messages);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        company,
        email: isEmail ? reach : '',
        phone: isEmail ? '' : reach,
        budget: 'web',
        message: createStoredLeadMessage(qualificationSummary, transcript, t('leadSource')),
        metadata: {
          source: 'assistant',
          locale,
          bookingIntent: false,
          qualification: {
            businessType: qualification.businessType,
            projectType: qualification.situation,
            urgency: qualification.urgency
          },
          transcript
        },
        websiteUrl: '',
        startedAt: leadStartedAt
      })
    }).catch(() => null);
    setLeadSending(false);

    if (!response?.ok) {
      setLeadStatus('error');
      return;
    }

    setLeadStatus(null);
    setLeadOpen(false);
    setLeadValues({name: '', company: '', reach: ''});
    setMessages((current) => [...current, {id: createId(), role: 'assistant' as const, content: t('leadSuccess')}]);
    trackEvent('assistant_lead_submitted', {locale});
  }

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-4 z-[70] sm:inset-x-auto sm:right-5 md:bottom-4',
        // On phones the sticky contact bar sits at the bottom, so the closed launcher floats above it.
        open ? 'bottom-4' : 'bottom-[100px]'
      )}
    >
      <AnimatePresence mode="wait">
        {open ? (
          <motion.section
            key="assistant-panel"
            initial={reduceMotion ? false : {opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 12}}
            transition={{duration: 0.2, ease: 'easeOut'}}
            className="pointer-events-auto ml-auto flex h-[min(720px,calc(100svh-2rem))] w-full flex-col overflow-hidden rounded-[16px] border-2 border-foreground bg-surface text-foreground shadow-[6px_6px_0_rgba(28,34,32,0.9)] sm:w-[400px]"
            aria-label={t('title')}
          >
            <header className="flex min-h-16 items-center justify-between gap-3 border-b-2 border-foreground bg-background px-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-extrabold">{t('title')}</h2>
                  <p className="truncate text-sm text-muted">{t('subtitle')}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center">
                <button type="button" onClick={resetChat} className={iconButton} aria-label={t('clear')} title={t('clear')}>
                  <Trash2 className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={iconButton}
                  aria-label={t('minimize')}
                  title={t('minimize')}
                >
                  <Minus className="hidden h-5 w-5 sm:block" aria-hidden="true" />
                  <X className="h-5 w-5 sm:hidden" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="grid gap-3">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={cn(
                      'max-w-[88%] rounded-[14px] px-4 py-3 text-[15px] leading-6',
                      message.role === 'user'
                        ? 'ml-auto rounded-br-[4px] bg-accent text-white'
                        : 'mr-auto rounded-bl-[4px] bg-background text-foreground'
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
                  </article>
                ))}
              </div>

              {leadOpen ? (
                <LeadForm
                  values={leadValues}
                  setValues={setLeadValues}
                  status={leadStatus}
                  sending={leadSending}
                  t={t}
                  onClose={() => setLeadOpen(false)}
                  onSubmit={submitLead}
                />
              ) : (
                <div className="mt-4 grid gap-3">
                  <QualificationPanel
                    steps={qualificationSteps}
                    qualification={qualification}
                    summary={qualificationSummary}
                    locale={locale}
                    t={t}
                    onSelect={handleQualificationSelect}
                    onRequest={openLeadForm}
                  />
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => submitMessage(prompt)}
                        disabled={isStreaming}
                        className="min-h-10 rounded-full border-2 border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-foreground disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitMessage();
              }}
              className="border-t-2 border-foreground p-3"
            >
              <label className="sr-only" htmlFor="assistant-message">
                {t('inputLabel')}
              </label>
              <div className="flex items-center gap-2 rounded-[12px] border-2 border-border bg-surface p-1.5 transition focus-within:border-foreground">
                <input
                  id="assistant-message"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={1600}
                  placeholder={t('placeholder')}
                  className="h-11 min-w-0 flex-1 bg-transparent px-2 text-base text-foreground outline-none placeholder:text-muted/70"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-accent text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={t('send')}
                  title={t('send')}
                >
                  {isStreaming ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          </motion.section>
        ) : (
          <motion.button
            key="assistant-launcher"
            initial={reduceMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 8}}
            transition={{duration: 0.18, ease: 'easeOut'}}
            type="button"
            onClick={() => {
              setOpen(true);
              trackEvent('assistant_opened', {locale});
            }}
            className="pointer-events-auto ml-auto flex min-h-14 items-center gap-2.5 rounded-full border-2 border-foreground bg-surface p-1.5 text-base font-bold text-foreground shadow-[3px_3px_0_rgba(28,34,32,0.9)] transition hover:bg-background sm:pr-5"
            aria-label={t('open')}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">{t('open')}</span>
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
  locale: Locale;
  t: Translate;
  onSelect: (option: QualificationOption) => void;
  onRequest: () => void;
};

function QualificationPanel({steps, qualification, summary, locale, t, onSelect, onRequest}: QualificationPanelProps) {
  const activeStep = steps.find((step) => !qualification[step.field]);
  const complete = !activeStep;

  return (
    <section className="rounded-[14px] border-2 border-border p-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-white">
          {complete ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <ClipboardList className="h-4 w-4" aria-hidden="true" />}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground">{t('qualifierTitle')}</h3>
          {complete ? null : <p className="mt-0.5 text-sm leading-5 text-muted">{t('qualifierIntro')}</p>}
        </div>
      </div>

      {summary ? (
        <p className="mt-3 rounded-[10px] bg-accent/[0.08] px-3 py-2 text-sm leading-5 text-accent">
          <span className="font-bold">{t('qualifierSummaryTitle')}:</span> {summary}
        </p>
      ) : null}

      {activeStep ? (
        <div className="mt-3">
          <p className="text-[15px] font-bold leading-6 text-foreground">{activeStep.question}</p>
          <div className="mt-2 grid gap-2">
            {activeStep.options.map((option) => (
              <button key={option.label} type="button" onClick={() => onSelect(option)} className={optionButton}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3 grid gap-2">
          <button type="button" onClick={onRequest} className={primaryButton}>
            {qualification.care ? t('requestCare') : t('requestPreview')}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <a href={phoneHref} className={secondaryButton} data-track="phone_click">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('callNow')}
            </a>
            <a
              href={whatsappHref(t('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButton}
              data-track="whatsapp_click"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t('whatsapp')}
            </a>
          </div>
          {qualification.care ? null : (
            <p className="text-center text-sm leading-5 text-muted" lang={locale}>
              {t('bookingTrust')}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

type LeadFormProps = {
  values: LeadFormValues;
  setValues: React.Dispatch<React.SetStateAction<LeadFormValues>>;
  status: 'success' | 'invalid' | 'error' | null;
  sending: boolean;
  t: Translate;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function LeadForm({values, setValues, status, sending, t, onClose, onSubmit}: LeadFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-[14px] border-2 border-foreground p-3" noValidate>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-foreground">{t('leadTitle')}</p>
          <p className="mt-1 text-sm leading-5 text-muted">{t('leadHelp')}</p>
        </div>
        <button type="button" onClick={onClose} className={iconButton} aria-label={t('closeLead')} title={t('closeLead')}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid gap-3">
        <LeadInput
          label={t('leadName')}
          value={values.name}
          onChange={(value) => setValues((current) => ({...current, name: value}))}
          autoComplete="name"
          placeholder={t('leadNamePlaceholder')}
        />
        <LeadInput
          label={t('leadCompany')}
          value={values.company}
          onChange={(value) => setValues((current) => ({...current, company: value}))}
          autoComplete="organization"
          placeholder={t('leadCompanyPlaceholder')}
        />
        <LeadInput
          label={t('leadReach')}
          value={values.reach}
          onChange={(value) => setValues((current) => ({...current, reach: value}))}
          autoComplete="tel"
          inputMode="tel"
          placeholder={t('leadReachPlaceholder')}
        />
      </div>
      <button type="submit" disabled={sending} className={cn(primaryButton, 'mt-3')}>
        {sending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {sending ? t('sending') : t('sendLead')}
      </button>
      {status === 'invalid' || status === 'error' ? (
        <p className="mt-3 rounded-[10px] bg-red-50 px-3 py-2 text-sm font-semibold text-red-700" role="status">
          {status === 'invalid' ? t('leadError') : t('leadSendError')}
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
  autoComplete?: string;
  inputMode?: 'text' | 'tel';
};

function LeadInput({label, value, onChange, placeholder, autoComplete, inputMode = 'text'}: LeadInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className="h-12 w-full rounded-[10px] border-2 border-border bg-surface px-3 text-base text-foreground outline-none transition placeholder:text-muted/70 focus:border-foreground"
      />
    </label>
  );
}

function createGreeting(content: string): ChatMessage {
  return {id: 'assistant-greeting', role: 'assistant', content};
}

function createQualificationSteps(t: Translate): QualificationStep[] {
  return [
    {
      field: 'businessType',
      question: t('qualifierBusinessQuestion'),
      options: [
        t('qualifierBusinessElectric'),
        t('qualifierBusinessPlumbing'),
        t('qualifierBusinessBuild'),
        t('qualifierBusinessCar'),
        t('qualifierBusinessOther')
      ].map((label) => ({field: 'businessType' as const, label}))
    },
    {
      field: 'situation',
      question: t('qualifierProjectQuestion'),
      options: [
        {field: 'situation', label: t('qualifierProjectNone')},
        {field: 'situation', label: t('qualifierProjectOld')},
        {field: 'situation', label: t('qualifierProjectNoLeads')},
        {field: 'situation', label: t('qualifierProjectCare'), care: true}
      ]
    },
    {
      field: 'urgency',
      question: t('qualifierUrgencyQuestion'),
      options: [t('qualifierUrgencyNow'), t('qualifierUrgencyMonth'), t('qualifierUrgencyLater')].map((label) => ({
        field: 'urgency' as const,
        label
      }))
    }
  ];
}

function createQualificationSummary(qualification: QualificationState, t: Translate) {
  const labels: Record<QualificationField, string> = {
    businessType: t('qualifierBusinessLabel'),
    situation: t('qualifierProjectLabel'),
    urgency: t('qualifierUrgencyLabel')
  };

  return fieldOrder
    .filter((field) => qualification[field])
    .map((field) => `${labels[field]}: ${qualification[field]}`)
    .join(' | ');
}

function createMetadataTranscript(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .slice(-maxClientMessages)
    .map((message) => ({role: message.role, content: message.content.trim().slice(0, 420)}));
}

function createStoredLeadMessage(
  qualificationSummary: string,
  transcript: Array<{role: 'assistant' | 'user'; content: string}>,
  sourceLabel: string
) {
  const compactTranscript = transcript
    .filter((item) => item.role === 'user')
    .slice(-6)
    .map((item) => `- ${item.content}`)
    .join('\n');

  return [sourceLabel, qualificationSummary, compactTranscript].filter(Boolean).join('\n\n').slice(0, 2000);
}

function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  (window as AnalyticsWindow).gtag?.('event', name, params || {});
}

function renderAssistantText(content: string) {
  const nodes: ReactNode[] = [];

  content.split(/(\*\*[^*]+\*\*)/g).forEach((part, index) => {
    if (!part) return;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      nodes.push(
        <strong key={`${part}-${index}`} className="font-bold">
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
  if (!value || typeof value !== 'object') return false;
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
