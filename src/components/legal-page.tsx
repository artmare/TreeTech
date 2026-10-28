import type {ReactNode} from 'react';

import {Container} from '@/components/ui/container';

export type LegalSection = {
  heading: string;
  body: ReactNode[];
};

type LegalPageProps = {
  title: string;
  /** Shown above the text, e.g. that the German version is binding. */
  note?: string;
  updated: string;
  updatedLabel: string;
  sections: LegalSection[];
};

/** Plain, readable layout for Impressum, Datenschutz and AGB. */
export function LegalPage({title, note, updated, updatedLabel, sections}: LegalPageProps) {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-[44rem]">
          <h1 className="text-balance text-[38px] leading-[1.05] text-foreground sm:text-5xl">{title}</h1>
          {note ? (
            <p className="mt-4 rounded-[10px] border-2 border-border bg-surface px-4 py-3 text-[15px] text-muted">{note}</p>
          ) : null}
          <div className="mt-8 grid gap-8">
            {sections.map((section) => (
              <section key={section.heading} className="min-w-0">
                <h2 data-size="sm" className="leading-tight text-foreground">{section.heading}</h2>
                <div className="mt-3 grid gap-3 text-[16px] leading-relaxed text-foreground/90 [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
                  {section.body.map((paragraph, index) => (
                    <div key={index} className="min-w-0 break-words">
                      {paragraph}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-10 border-t border-border pt-4 text-sm text-muted">
            {updatedLabel}: {updated}
          </p>
        </div>
      </Container>
    </section>
  );
}
