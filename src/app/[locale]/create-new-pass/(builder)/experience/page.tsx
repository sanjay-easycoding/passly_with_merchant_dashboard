"use client";

import { useState, useEffect, use } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { setWelcomeMessage, setInstructions, setSpecialOffers, setOffersFrequency } from '@/store/builderSlice';

import type { OffersFrequency } from '@/store/builderSlice';
import type { Locale } from '@/lib/translations';

export default function ExperiencePage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  const dispatch = useDispatch();
  
  // Get data from Redux state
  const builderData = useSelector((state: RootState) => state.builder);
  
  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');
  
  // Use Redux state directly for form fields
  const welcome = builderData.welcomeMessage;
  const instructions = builderData.instructions;
  const offers = builderData.specialOffers;
  const frequency = builderData.offersFrequency;

  const Button = ({ value }: { value: OffersFrequency }) => (
    <button
      type="button"
      onClick={() => dispatch(setOffersFrequency(value))}
      className={`px-4 py-2 rounded-xl border text-sm font-medium ${
        frequency === value ? 'bg-[#111827] text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
    >
      {value}
    </button>
  );

  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{t.experience.title}</h2>
        <p className="text-base text-gray-600 font-medium">{t.experience.subtitle}</p>
      </div>

      {/* Form Sections */}
      <div className="space-y-6">
        {/* Welcome Message Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-900 mb-4">{t.experience.welcomeMessage.label}</label>
          <input
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm"
            value={welcome}
            onChange={(e) => dispatch(setWelcomeMessage(e.target.value))}
            placeholder={t.experience.welcomeMessage.placeholder}
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">{t.experience.welcomeMessage.helpText}</p>
        </div>

        {/* Usage Instructions Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-900 mb-4">{t.experience.instructions.label}</label>
          <textarea
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 min-h-[80px] text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm resize-none"
            value={instructions}
            onChange={(e) => dispatch(setInstructions(e.target.value))}
            placeholder={t.experience.instructions.placeholder}
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">Provide clear instructions on how customers can use their pass.</p>
        </div>

        {/* Special Offers Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-900 mb-4">{t.experience.specialOffers.label}</label>
          <input
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm"
            value={offers}
            onChange={(e) => dispatch(setSpecialOffers(e.target.value))}
            placeholder={t.experience.specialOffers.placeholder}
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">Highlight any special offers or promotions associated with the pass.</p>
        </div>

        {/* Update Frequency Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-900 mb-4">{t.experience.updateFrequency.label}</label>
          
          {/* Apple-style Segmented Control */}
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => dispatch(setOffersFrequency('Daily'))}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                frequency === 'Daily' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => dispatch(setOffersFrequency('Weekly'))}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                frequency === 'Weekly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => dispatch(setOffersFrequency('Monthly'))}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                frequency === 'Monthly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => dispatch(setOffersFrequency('Never'))}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                frequency === 'Never' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Never
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
