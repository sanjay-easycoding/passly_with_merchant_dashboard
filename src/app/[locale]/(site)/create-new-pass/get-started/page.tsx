import { type Locale, getTranslations } from '@/lib/translations';

export default function CreateNewPassGetStarted({ params }: { params: { locale: Locale } }) {
  const t = getTranslations(params.locale);
  const c = t.pages.createNewPassGetStarted;
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">{c.heading}</h1>
          <p className="mt-6 text-gray-700 text-lg max-w-2xl">{c.description}</p>
          <a
            href={`/${params.locale}/create-new-pass/pass-type`}
            className="inline-block mt-8 rounded-full bg-green-600 text-white px-8 py-4 font-semibold hover:bg-green-700"
          >
            {c.cta}
          </a>
        </div>

        {/* Right placeholder card */}
        <div className="w-full">
          <div className="rounded-xl border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="bg-green-600 text-white px-6 py-4 font-semibold">{c.card.campaign}</div>
            <div className="bg-white p-6">
              <p className="text-sm text-gray-700">{c.card.collect}</p>
              <div className="mt-3 flex gap-2 text-gray-400">{'★★★★★'.split('').map((s,i)=>(<span key={i}>★</span>))}</div>
              <div className="mt-4 text-xs text-gray-500 flex justify-between">
                <span>{c.card.stampsNeeded}</span>
                <span>{c.card.minPurchase}</span>
              </div>
              <div className="mt-6 border-t pt-4">
                <div className="font-medium text-gray-900">{c.card.business}</div>
                <div className="text-xs text-gray-500">{c.card.phone}</div>
              </div>
              <button className="mt-6 inline-flex items-center rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                {c.card.add}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">📱</div>
          <div className="font-semibold">{c.features.completeSetup.title}</div>
          <div className="mt-2 text-gray-600">{c.features.completeSetup.desc}</div>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">⌁</div>
          <div className="font-semibold">{c.features.instantDistribution.title}</div>
          <div className="mt-2 text-gray-600">{c.features.instantDistribution.desc}</div>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">★</div>
          <div className="font-semibold">{c.features.fullBranding.title}</div>
          <div className="mt-2 text-gray-600">{c.features.fullBranding.desc}</div>
        </div>
      </div>
    </section>
  );
}


