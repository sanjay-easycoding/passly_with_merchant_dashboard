import HeroSection from '@/components/features/HeroSection';
import CoreValuesSection from '@/components/features/CoreValuesSection';
import GetStartedSection from '@/components/features/GetStartedSection';
import JoinThousandsSection from '@/components/features/JoinThousandsSection';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { type Locale } from '@/lib/translations';

interface LandingPageProps {
  params: { locale: Locale };
}

export default function LandingPage({ params }: LandingPageProps) {
  const { locale } = params;
  
  return (
    <div className="min-h-screen">
      <Navigation locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <CoreValuesSection locale={locale} />
        <GetStartedSection locale={locale} />
        <JoinThousandsSection locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
