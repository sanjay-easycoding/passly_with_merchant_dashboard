import { getTranslations, type Locale } from '@/lib/translations';

export default function CreatePassPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const t = getTranslations(params.locale);
  
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {t.navigation.createNewPass}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-gray-600 text-lg">
          {t.pages.createPass.create}
        </p>
      </div>
    </div>
  );
}
