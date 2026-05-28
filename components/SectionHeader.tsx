export function SectionHeader({ eyebrow, title, description, light = false }: { eyebrow?: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
      {eyebrow ? <p className={light ? 'mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600' : 'mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300'}>{eyebrow}</p> : null}
      <h2 className={light ? 'text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl' : 'text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl'}>{title}</h2>
      {description ? <p className={light ? 'mt-5 text-base leading-8 text-slate-600 sm:text-lg' : 'mt-5 text-base leading-8 text-slate-300 sm:text-lg'}>{description}</p> : null}
    </div>
  );
}
