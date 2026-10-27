'use client';

import {useEffect} from 'react';

import {ErrorState} from '@/components/admin/crm-ui';

export default function AdminError({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  useEffect(() => {
    console.error('admin_route_failed', {message: error.message, digest: error.digest});
  }, [error]);

  return <ErrorState action={<button type="button" onClick={reset} className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">Erneut versuchen</button>} />;
}
