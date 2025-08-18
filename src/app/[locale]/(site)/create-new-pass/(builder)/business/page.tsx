"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PreviewCard from '@/components/createPass/PreviewCard';
import StepNav from '@/components/createPass/StepNav';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { setBusinessName, setContact } from '@/store/builderSlice';

import type { Locale } from '@/lib/translations';

export default function BusinessPage({ params }: { params: { locale: Locale } }) {
  const [campaignName, setCampaignName] = React.useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch { /* Ignore localStorage errors */ }
    }
  }, []);

  // Use Redux state
  const businessName = useSelector((state: RootState) => state.builder.businessName);
  const contact = useSelector((state: RootState) => state.builder.contact);
  const dispatch = useDispatch();

  // Get translations
  const t = useTranslations(params.locale, 'builder');

  return (
    <>
      {/* Left: business info form */}
      <div className="bg-white rounded-xl border border-gray-200 p-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-4 text-center">{t.business.title}</h2>
        <p className="text-gray-700 mb-8 text-center">{t.business.subtitle}</p>

        <div className="space-y-6">
          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.business.businessName.label}</label>
            <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder={t.business.businessName.placeholder} value={businessName} onChange={(e) => dispatch(setBusinessName(e.target.value))} />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.business.businessAddress.label}</label>
            <textarea className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[110px]" placeholder={t.business.businessAddress.placeholder} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.business.phoneNumber.label}</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder={t.business.phoneNumber.placeholder} value={contact} onChange={(e) => dispatch(setContact(e.target.value))} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.business.email.label}</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder={t.business.email.placeholder} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.business.website.label}</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder={t.business.website.placeholder} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.business.socialMedia.label}</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder={t.business.socialMedia.placeholder} />
            </div>
          </div>
        </div>
      </div>

      {/* Right: preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-12 text-center">{t.business.livePreview}</h2>
        <PreviewCard title={campaignName || 'Your Campaign'} businessName={businessName || 'Your Business Name'}  contact={contact || '+10-6789887612'} />
      </div>
      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}


