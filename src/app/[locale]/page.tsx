import CoreValuesSection from '@/components/features/CoreValuesSection';
import GetStartedSection from '@/components/features/GetStartedSection';
import HeroSection from '@/components/features/HeroSection';
import JoinThousandsSection from '@/components/features/JoinThousandsSection';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
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
       
        <GetStartedSection locale={locale} />
        <JoinThousandsSection locale={locale} />
        <CoreValuesSection locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
