import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TreeTech | AI-Powered Digital Experiences',
  description: 'Premium AI automation, web development, SaaS interfaces and CRM systems for modern businesses.',
  metadataBase: new URL('https://treetech.vercel.app'),
  openGraph: {
    title: 'TreeTech | AI-Powered Digital Experiences',
    description: 'Modern websites, automation systems, AI integrations and scalable digital products.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
