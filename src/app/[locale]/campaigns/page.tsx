import Campaigns from '@/components/features/Campaigns';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { type Locale } from '@/lib/translations';

interface CampaignsPageProps {
  params: { locale: Locale };
}

export default function CampaignsPage({ params }: CampaignsPageProps) {
  const { locale } = params;
  
  return (
    <div className="min-h-screen">
      <Navigation locale={locale} />
      <main>
        <Campaigns locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
