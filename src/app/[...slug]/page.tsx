import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import { type Locale } from '@/lib/translations';

export default function SlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug;
  
  // Handle language root paths: /en, /de, /fr
  if (slug.length === 1) {
    const locale = slug[0] as Locale;
    
    // Check if it's a valid locale
    if (['en', 'de'].includes(locale)) {
      // Serve content directly for language roots
      return (
        <div>
          <Navigation locale={locale} />
          <HeroSection locale={locale} />
        </div>
      );
    }
  }
  
  // If not a valid locale or has more segments, redirect to German dashboard
  return (
    <div>
      <Navigation locale="de" />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Seite nicht gefunden
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 text-lg">
            Die angeforderte Seite konnte nicht gefunden werden.
          </p>
        </div>
      </main>
    </div>
  );
}
