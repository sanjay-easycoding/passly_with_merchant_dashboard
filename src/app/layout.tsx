import { GeistSans, GeistMono } from 'geist/font';

import Providers from '@/components/shared/Providers';
import "./globals.css";

import type { Metadata } from "next";

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
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
