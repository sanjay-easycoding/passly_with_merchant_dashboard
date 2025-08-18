import GetStartedSection from '@/components/GetStartedSection';
import { type Locale } from '@/lib/translations';

export default function GetStartedPage({ params }: { params: { locale: Locale } }) {
  return <GetStartedSection locale={params.locale} />;
}


