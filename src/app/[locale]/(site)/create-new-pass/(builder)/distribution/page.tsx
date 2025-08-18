"use client";
import React from 'react';


import PreviewCard from '@/components/createPass/PreviewCard';
import StepNav from '@/components/createPass/StepNav';
import { useTranslations } from '@/lib/translations';

import type { Locale } from '@/lib/translations';

export default function DistributionPage({ params }: { params: { locale: Locale } }) {
  const [link] = React.useState('https://example.com/your-pass');
  const [campaignName, setCampaignName] = React.useState<string>('');

  // Get translations
  const t = useTranslations(params.locale, 'builder');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch { /* Ignore localStorage errors */ }
    }
  }, []);

  return (
    <>
      {/* Left panel per screenshot */}
      <div className="bg-white rounded-xl border border-gray-200 p-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-4 text-center">{t.distribution.title}</h2>
        <p className="text-gray-700 mb-8 text-center">{t.distribution.subtitle}</p>

        <div className="flex flex-col items-center">
          <div className="w-52 h-52 rounded-lg bg-[#10E7B3] flex items-start justify-start p-3 mb-5">
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black" />
              ))}
            </div>
          </div>
          <p className="text-center text-gray-800 mb-4 max-w-md">
            {t.distribution.qrDescription}
          </p>
          <div className="flex items-center gap-3 mb-10">
            <button className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-50">{t.distribution.buttons.downloadQR}</button>
            <button className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-50" onClick={() => navigator.clipboard.writeText(link)}>{t.distribution.buttons.copyLink}</button>
            <button className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-50">{t.distribution.buttons.emailToMe}</button>
          </div>

          <div className="w-full">
            <h3 className="text-[22px] font-semibold mb-4">{t.distribution.distributionIdeas.title}</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-800">
              {t.distribution.distributionIdeas.ideas.map((idea: string, index: number) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right preview (kept simple) */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-12 text-center">{t.distribution.livePreview}</h2>
        <PreviewCard title={campaignName || 'Your Campaign'} />
        <div className="mt-4 rounded-md bg-gray-100 p-3 break-all text-sm text-gray-700 max-w-[520px]">{link}</div>
      </div>
      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}


