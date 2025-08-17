import type { Locale } from '@/lib/translations';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <main>
      {children}
    </main>
  );
}


