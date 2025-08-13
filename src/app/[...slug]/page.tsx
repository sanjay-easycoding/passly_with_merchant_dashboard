import { getTranslations, type Locale } from '@/lib/translations';
import Navigation from '@/components/Navigation';

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
    if (['en', 'de', 'fr'].includes(locale)) {
      const t = getTranslations(locale);
      
      // Serve content directly for language roots
      return (
        <div>
          <Navigation locale={locale} />
          <main className="max-w-7xl mx-auto px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {locale === 'de' && 'Willkommen bei Passly'}
              {locale === 'en' && 'Welcome to Passly'}
              {locale === 'fr' && 'Bienvenue chez Passly'}
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-600 text-lg mb-6">
                {locale === 'de' && 'Willkommen in Ihrem Passwort-Manager Dashboard'}
                {locale === 'en' && 'Welcome to your Password Manager Dashboard'}
                {locale === 'fr' && 'Bienvenue dans votre tableau de bord de gestionnaire de mots de passe'}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {t.navigation.dashboard}
                  </h3>
                  <p className="text-blue-700">
                    {locale === 'de' && 'Verwalten Sie Ihre Passwörter und Konten'}
                    {locale === 'en' && 'Manage your passwords and accounts'}
                    {locale === 'fr' && 'Gérez vos mots de passe et comptes'}
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    {t.navigation.createNewPass}
                  </h3>
                  <p className="text-green-700">
                    {locale === 'de' && 'Erstellen Sie sichere Passwörter für neue Konten'}
                    {locale === 'en' && 'Create secure passwords for new accounts'}
                    {locale === 'fr' && 'Créez des mots de passe sécurisés pour de nouveaux comptes'}
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    {t.navigation.settings}
                  </h3>
                  <p className="text-purple-700">
                    {locale === 'de' && 'Konfigurieren Sie Ihre Sicherheitseinstellungen'}
                    {locale === 'en' && 'Configure your security settings'}
                    {locale === 'fr' && 'Configurez vos paramètres de sécurité'}
                  </p>
                </div>
              </div>
            </div>
          </main>
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
