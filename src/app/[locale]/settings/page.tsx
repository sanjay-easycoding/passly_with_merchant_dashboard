import Settings from '@/components/features/Settings';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { type Locale } from '@/lib/translations';

interface SettingsPageProps {
  params: { locale: Locale };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = params;
  
  return (
    <div className="min-h-screen">
      <Navigation locale={locale} />
      <main>
        <Settings locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
