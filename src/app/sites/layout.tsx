import type {Metadata, Viewport} from 'next';

import '@fontsource-variable/bricolage-grotesque/index.css';
import '@fontsource-variable/instrument-sans/index.css';

// Root layout for client website previews (e.g. weg-i.treetech.at → /sites/weg-i).
// Deliberately independent of the TreeTech site: no header, footer, analytics or assistant.
export const metadata: Metadata = {robots: {index: false, follow: false}};

export const viewport: Viewport = {width: 'device-width', initialScale: 1, themeColor: '#0B1D2A'};

export default function ClientSitesLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="de">
      <body style={{margin: 0}}>{children}</body>
    </html>
  );
}
