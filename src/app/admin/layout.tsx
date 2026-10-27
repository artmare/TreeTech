import type {Metadata} from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {title: 'TreeTech CRM', robots: {index: false, follow: false}};

export default function AdminRootLayout({children}: {children: React.ReactNode}) {
  return <html lang="de"><body>{children}</body></html>;
}

