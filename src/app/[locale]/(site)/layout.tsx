import Navigation from '@/components/Navigation';
import type { Locale } from '@/lib/translations';

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <div>
      <Navigation locale={params.locale} />
      <main>
        {children}
      </main>
    </div>
  );
}


