import {cn} from '@/lib/utils';

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({className}: LogoMarkProps) {
  return (
    <svg
      className={cn('block h-11 w-11 shrink-0', className)}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="12" fill="#0f5f45" />
      <path d="M19 18h26v8H35v22h-8V26h-8z" fill="#fff" />
      <path d="M38 30h9v7h-9v11h-8V30z" fill="#f2b84b" />
    </svg>
  );
}
