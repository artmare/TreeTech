'use client';

/** Clears the stored analytics choice and reloads, so the consent notice appears again. */
export function ConsentReset({label}: {label: string}) {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem('treetech-analytics-consent');
        } catch {
          // Storage blocked: nothing stored, nothing to reset.
        }
        window.location.reload();
      }}
      className="inline-flex min-h-11 items-center rounded-[10px] border-2 border-foreground bg-surface px-4 text-[15px] font-bold text-foreground transition hover:bg-background"
    >
      {label}
    </button>
  );
}
