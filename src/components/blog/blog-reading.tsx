'use client';

import {useEffect, useState} from 'react';

import {cn} from '@/lib/utils';

/** Thin yellow bar under the header that fills while the article is read. */
export function ReadingProgress({targetId}: {targetId: string}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      setProgress(value);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none sticky top-[72px] z-40 h-1 w-full bg-transparent" aria-hidden="true">
      <div className="h-full origin-left bg-[var(--signal)]" style={{transform: `scaleX(${progress})`}} />
    </div>
  );
}

type TocItem = {id: string; label: string};

/** Table of contents that highlights the section currently on screen. */
export function BlogToc({items, title}: {items: TocItem[]; title: string}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const elements = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {rootMargin: '-90px 0px -65% 0px'}
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="text-[13px] font-bold uppercase tracking-wide text-muted">{title}</p>
      <ol className="mt-3 grid gap-0.5 border-l-2 border-border">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                '-ml-0.5 flex gap-2 border-l-2 py-1.5 pl-3 text-[14px] leading-snug transition',
                active === item.id ? 'border-accent font-bold text-foreground' : 'border-transparent text-muted hover:text-foreground'
              )}
            >
              <span className="w-5 shrink-0 tabular-nums text-muted">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
