import {ArrowRight, Check, ExternalLink, Info, Lightbulb, Quote, TriangleAlert} from 'lucide-react';
import Image from 'next/image';
import type {ReactNode} from 'react';

import {BlogIllustration} from '@/components/blog/blog-illustration';
import type {BlogBlock} from '@/content/blog-types';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

/** Renders **bold** and [links](url) inside article text. */
export function RichText({text}: {text: string}) {
  const parts = text.split(tokenPattern).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          return (
            <TextLink key={index} href={link[2]}>
              {link[1]}
            </TextLink>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

const linkClass =
  'font-semibold text-accent underline decoration-[var(--signal)] decoration-2 underline-offset-[3px] transition hover:decoration-accent';

function TextLink({href, children}: {href: string; children: ReactNode}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={linkClass} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const calloutStyles = {
  info: {box: 'border-foreground bg-background', icon: Info, iconBox: 'bg-foreground text-white'},
  tip: {box: 'border-accent bg-[#e8f1ec]', icon: Lightbulb, iconBox: 'bg-accent text-white'},
  warn: {box: 'border-foreground bg-[#fdf3d0]', icon: TriangleAlert, iconBox: 'bg-[var(--signal)] text-foreground'}
};

export function BlogBlocks({blocks, locale}: {blocks: BlogBlock[]; locale: Locale}) {
  return (
    <div className="mt-5 grid gap-5">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} locale={locale} />
      ))}
    </div>
  );
}

function BlockView({block, locale}: {block: BlogBlock; locale: Locale}) {
  if (typeof block === 'string') {
    return (
      <p className="text-pretty text-[18px] leading-[1.75] text-foreground/90">
        <RichText text={block} />
      </p>
    );
  }

  switch (block.type) {
    case 'lead':
      return (
        <p className="text-pretty border-l-[6px] border-[var(--signal)] pl-5 text-[19px] font-semibold leading-[1.55] text-foreground sm:text-[22px]">
          <RichText text={block.text} />
        </p>
      );

    case 'list': {
      const style = block.style ?? 'bullet';
      const ListTag = style === 'number' ? 'ol' : 'ul';
      return (
        <ListTag className="grid gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-[17px] leading-[1.65] text-foreground/90">
              {style === 'number' ? (
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-foreground text-[13px] font-extrabold text-white">
                  {i + 1}
                </span>
              ) : style === 'check' ? (
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
              ) : (
                <span className="mt-[0.7em] h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              )}
              <span className="min-w-0">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ListTag>
      );
    }

    case 'callout': {
      const style = calloutStyles[block.tone];
      const Icon = style.icon;
      return (
        <aside className={cn('flex gap-4 rounded-[14px] border-2 p-5', style.box)}>
          <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full', style.iconBox)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            {block.title ? <p className="text-[17px] font-bold text-foreground">{block.title}</p> : null}
            <p className={cn('text-[16px] leading-[1.65] text-foreground/85', block.title && 'mt-1')}>
              <RichText text={block.text} />
            </p>
          </div>
        </aside>
      );
    }

    case 'quote':
      return (
        <figure className="relative my-2 overflow-hidden rounded-[14px] bg-foreground px-6 py-7 text-white sm:px-9 sm:py-9">
          <Quote className="absolute -right-2 -top-2 h-24 w-24 text-white/10" aria-hidden="true" />
          <blockquote className="relative text-balance text-[22px] font-extrabold leading-[1.3] sm:text-[27px]" style={{fontStretch: '110%'}}>
            <RichText text={block.text} />
          </blockquote>
          {block.cite ? <figcaption className="mt-3 text-[14px] font-semibold text-white/70">{block.cite}</figcaption> : null}
          <span className="relative mt-5 block h-1.5 w-16 rounded-full bg-[var(--signal)]" aria-hidden="true" />
        </figure>
      );

    case 'table':
      return (
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-[14px] border-2 border-foreground text-left text-[15px]">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col" className="bg-foreground px-4 py-3 text-[14px] font-bold text-white">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 ? 'bg-background' : 'bg-surface'}>
                  {row.map((cell, c) => {
                    const Cell = c === 0 ? 'th' : 'td';
                    return (
                      <Cell
                        key={c}
                        scope={c === 0 ? 'row' : undefined}
                        className={cn(
                          'border-t border-border px-4 py-3 align-top leading-snug',
                          c === 0 ? 'font-bold text-foreground' : 'text-foreground/85'
                        )}
                      >
                        <RichText text={cell} />
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'illustration':
      return (
        <figure className="my-2">
          <BlogIllustration name={block.name} locale={locale} />
          {block.caption ? <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">{block.caption}</figcaption> : null}
        </figure>
      );

    case 'image':
      return (
        <figure className="my-2">
          <div className="overflow-hidden rounded-[14px] border-2 border-foreground">
            <Image src={block.src} alt={block.alt} width={block.width} height={block.height} className="h-auto w-full" sizes="(min-width: 1024px) 720px, 100vw" />
          </div>
          {block.caption ? <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">{block.caption}</figcaption> : null}
        </figure>
      );

    case 'gallery':
      return (
        <figure className="my-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {block.items.map((item, i) => (
              <div
                key={item.src}
                className={cn(
                  'overflow-hidden rounded-[12px] border-2 border-foreground bg-surface transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--foreground)]',
                  i === 0 && 'sm:col-span-2'
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full"
                  sizes={i === 0 ? '(min-width: 1024px) 720px, 100vw' : '(min-width: 640px) 360px, 100vw'}
                />
              </div>
            ))}
          </div>
          {block.caption ? <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">{block.caption}</figcaption> : null}
        </figure>
      );

    case 'stats':
      return (
        <div>
          <dl className={cn('grid gap-3', block.items.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3')}>
            {block.items.map((item) => (
              <div key={item.label} className="rounded-[14px] border-2 border-foreground bg-[var(--signal)] p-4">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-[34px] font-extrabold leading-none text-foreground" style={{fontStretch: '115%'}}>
                    {item.value}
                  </span>
                  <span className="mt-2 block text-[14px] font-semibold leading-snug text-foreground/80">{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          {block.note ? <p className="mt-2 text-[13px] text-muted">{block.note}</p> : null}
        </div>
      );

    case 'steps':
      return (
        <ol className="relative grid gap-4 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-0.5 before:bg-border">
          {block.items.map((step, i) => (
            <li key={step.title} className="relative flex gap-4">
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-foreground bg-[var(--signal)] text-[15px] font-extrabold text-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 rounded-[14px] border-2 border-border bg-surface p-4 transition hover:border-foreground">
                <p className="text-[17px] font-bold text-foreground">{step.title}</p>
                <p className="mt-1 text-[16px] leading-[1.65] text-foreground/85">
                  <RichText text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'flow':
      return (
        <ol className="flex flex-wrap items-center gap-2 rounded-[14px] border-2 border-dashed border-foreground/40 bg-background p-4">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-center gap-2">
              <span
                className={cn(
                  'rounded-full border-2 border-foreground px-3.5 py-1.5 text-[14px] font-bold',
                  i === block.items.length - 1 ? 'bg-accent text-white' : 'bg-surface text-foreground'
                )}
              >
                {item}
              </span>
              {i < block.items.length - 1 ? <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      );

    case 'qa':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <div
              key={item.q}
              className={cn(
                'rounded-[14px] border-2 border-foreground bg-surface p-4',
                block.items.length % 2 === 1 && i === block.items.length - 1 && 'sm:col-span-2'
              )}
            >
              <p className="inline-block rounded-[8px] bg-foreground px-2.5 py-1 text-[15px] font-bold text-white">{item.q}</p>
              <p className="mt-3 flex gap-2 text-[15px] leading-[1.6] text-foreground/85">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <RichText text={item.a} />
                </span>
              </p>
            </div>
          ))}
        </div>
      );

    case 'sources':
      return (
        <div className="grid gap-6 rounded-[14px] border-2 border-border bg-background p-5">
          {block.groups.map((group) => (
            <div key={group.title}>
              <p className="text-[14px] font-bold uppercase tracking-wide text-muted">{group.title}</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[14px] leading-snug text-foreground/80 marker:text-muted sm:columns-2 sm:gap-8">
                {group.items.map((item) => (
                  <li key={item.href} className="break-inside-avoid">
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">
                      {item.label}
                      <ExternalLink className="ml-1 inline h-3 w-3 -translate-y-px opacity-60" aria-hidden="true" />
                    </a>
                    {item.note ? <span className="text-muted"> · {item.note}</span> : null}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      );
  }
}
