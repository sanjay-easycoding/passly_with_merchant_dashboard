import { type Locale } from '@/lib/translations';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' }
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
}
