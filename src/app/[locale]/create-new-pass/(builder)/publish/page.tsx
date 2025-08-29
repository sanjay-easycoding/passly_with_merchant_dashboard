"use client";
import React from 'react';
import { useSelector } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import StepNav from '@/components/features/createPass/StepNav';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';

import type { Locale } from '@/lib/translations';

export default function PublishPage({ params }: { params: { locale: Locale } }) {
  // Retrieve data from Redux
  const data = useSelector((state: RootState) => state.builder);

  // Get translations
  const t = useTranslations(params.locale, 'builder');

  // Display data in review section
  const handlePublish = () => {
    // TODO: Implement actual publishing logic
    // Data to be published:
    // - Pass Type & Branding: campaignName, type, brandColor, logoUrl, tagline
    // - Details: rewardDescription, stampsNeeded, minPurchase
    // - Business: businessName, businessAddress, contact, email, website, socialMedia
    // - Experience: welcomeMessage, instructions, specialOffers, offersFrequency
  };

  return (
    <>
      {/* Left: review and publish */}
      <div className="bg-white rounded-xl border border-gray-200 p-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-4 text-center">{t.publish.title}</h2>
        <p className="text-gray-700 mb-8 text-center">{t.publish.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-10 text-gray-900">
          <div>
            <div className="text-gray-600">{t.publish.reviewFields.campaign}</div>
            <div className="font-medium">{data.campaignName || '—'}</div>
          </div>
          <div>
            <div className="text-gray-600">{t.publish.reviewFields.type}</div>
            <div className="font-medium">{data.type || 'loyalty'}</div>
          </div>
          <div>
            <div className="text-gray-600">{t.publish.reviewFields.business}</div>
            <div className="font-medium">{data.businessName || '—'}</div>
          </div>
          <div>
            <div className="text-gray-600">{t.publish.reviewFields.contact}</div>
            <div className="font-medium">{data.contact || '+10-6789887612'}</div>
          </div>
          <div>
            <div className="text-gray-600">{t.publish.reviewFields.stampsRequired}</div>
            <div className="font-medium">{data.stampsNeeded || 5}</div>
          </div>
          <div>
            <div className="text-gray-600">{t.publish.reviewFields.reward}</div>
            <div className="font-medium">{data.rewardDescription || '—'}</div>
          </div>
        </div>

        <h3 className="text-[22px] font-semibold mb-4">{t.publish.whatHappensNext}</h3>
        <ul className="space-y-3 text-emerald-600 mb-8">
          {t.publish.nextSteps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ul>

        <button onClick={handlePublish} className="rounded-lg bg-emerald-600 text-white px-6 py-3 font-semibold hover:bg-emerald-700">{t.publish.publishButton}</button>
      </div>

      {/* Right preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.34) 0px 4px 4px 0px, rgba(0, 0, 0, 0.31) 0px -4px 4px 0px' }}>
        <h2 className="text-2xl font-semibold mb-12 text-center">{t.publish.livePreview}</h2>
        <PreviewCard title={data.campaignName || 'Your Campaign'} />
      </div>

      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}
