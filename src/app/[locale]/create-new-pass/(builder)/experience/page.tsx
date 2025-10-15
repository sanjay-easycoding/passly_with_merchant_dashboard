"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';

import type { OffersFrequency } from '@/store/builderSlice';

export default function ExperiencePage() {
  const params = useParams<{ locale: 'en' | 'de' }>();
  
  // Get data from Redux state
  const builderData = useSelector((state: RootState) => state.builder);
  
  // Get translations
  const t = useTranslations(params.locale, 'builder');
  
  // Local state for form fields - these will be saved to localStorage for now
  const [welcome, setWelcome] = useState(builderData.welcomeMessage);
  const [instructions, setInstructions] = useState(builderData.instructions);
  const [offers, setOffers] = useState(builderData.specialOffers);
  const [frequency, setFrequency] = useState<OffersFrequency>(builderData.offersFrequency);

  // Save to localStorage when values change (temporary solution)
  useEffect(() => {
    const currentData = JSON.parse(localStorage.getItem('builderState') || '{}');
    const updatedData = {
      ...currentData,
      welcomeMessage: welcome,
      instructions,
      specialOffers: offers,
      offersFrequency: frequency
    };
    localStorage.setItem('builderState', JSON.stringify(updatedData));
  }, [welcome, instructions, offers, frequency]);

  const Button = ({ value }: { value: OffersFrequency }) => (
    <button
      type="button"
      onClick={() => setFrequency(value)}
      className={`px-4 py-2 rounded-xl border text-sm font-medium ${
        frequency === value ? 'bg-[#111827] text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
    >
      {value}
    </button>
  );

  return (
    <>
      {/* Left panel */}
      <div className="p-8 lg:p-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">{t.experience.title}</h2>
        <p className="text-gray-700 mb-8 text-center">{t.experience.subtitle}</p>

        <div className="space-y-6">
          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.experience.welcomeMessage.label}</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[90px]"
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
              placeholder={t.experience.welcomeMessage.placeholder}
            />
            <p className="text-sm text-gray-600 mt-2">{t.experience.welcomeMessage.helpText}</p>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.experience.instructions.label}</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[90px]"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={t.experience.instructions.placeholder}
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">{t.experience.specialOffers.label}</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[90px]"
              value={offers}
              onChange={(e) => setOffers(e.target.value)}
              placeholder={t.experience.specialOffers.placeholder}
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-3">{t.experience.updateFrequency.label}</label>
            <div className="flex items-center gap-3">
              <Button value="Daily" />
              <Button value="Weekly" />
              <Button value="Monthly" />
              <Button value="Never" />
            </div>
            <p className="text-sm text-gray-600 mt-2">{t.experience.updateFrequency.helpText}</p>
          </div>
        </div>
      </div>

      {/* Right preview */}
      <div className="p-8 lg:p-10 flex flex-col items-center justify-center bg-gray-50">
        <PreviewCard title={builderData.campaignName || 'Your Campaign'} />
      </div>
    </>
  );
}
