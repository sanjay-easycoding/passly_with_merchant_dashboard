import Providers from '@/components/shared/Providers';

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Passly',
  description: 'Digital Pass Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
