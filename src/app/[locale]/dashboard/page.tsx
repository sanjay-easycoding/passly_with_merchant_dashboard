import Dashboard from '@/components/features/Dashboard';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { type Locale } from '@/lib/translations';

interface DashboardPageProps {
  params: { locale: Locale };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = params;
  
  return (
    <div className="min-h-screen">
      <Navigation locale={locale} />
      <main>
        <Dashboard locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
