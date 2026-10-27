import type {Locale} from './routing';

type BaseLocale = 'de' | 'en';
type LocaleInput<T> = Record<BaseLocale, T> & Partial<Record<Locale, T>>;

export type CompleteLocaleRecords<T> = T extends LocaleInput<infer Value>
  ? Record<Locale, CompleteLocaleRecords<Value>>
  : T extends Array<infer Item>
    ? Array<CompleteLocaleRecords<Item>>
    : T extends object
      ? {[Key in keyof T]: CompleteLocaleRecords<T[Key]>}
      : T;

export function withLocaleFallbacks<T>(value: T): CompleteLocaleRecords<T> {
  fillLocaleFallbacks(value);
  return value as CompleteLocaleRecords<T>;
}

function fillLocaleFallbacks(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(fillLocaleFallbacks);
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  const record = value as Record<string, unknown>;

  for (const child of Object.values(record)) {
    fillLocaleFallbacks(child);
  }

  if ('de' in record && 'en' in record && !('ru' in record)) {
    record.ru = cloneFallback(record.en ?? record.de);
  }
}

function cloneFallback<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(cloneFallback) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cloneFallback(child)])
    ) as T;
  }

  return value;
}
