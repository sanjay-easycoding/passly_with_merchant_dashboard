import { translations, type Locale } from '@/lib/translations';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' }
  ];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const t = translations[params.locale];
  
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
}
