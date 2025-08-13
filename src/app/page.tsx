import { getTranslations } from '@/lib/translations';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  // Serve German content by default at root level
  const t = getTranslations('de');
  
  return (
    <div>
      <Navigation locale="de" />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Willkommen bei Passly
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 text-lg mb-6">
            Willkommen in Ihrem Passwort-Manager Dashboard
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Dashboard
              </h3>
              <p className="text-blue-700">
                Verwalten Sie Ihre Passwörter und Konten
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Neuen Pass erstellen
              </h3>
              <p className="text-green-700">
                Erstellen Sie sichere Passwörter für neue Konten
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Einstellungen
              </h3>
              <p className="text-purple-700">
                Konfigurieren Sie Ihre Sicherheitseinstellungen
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
