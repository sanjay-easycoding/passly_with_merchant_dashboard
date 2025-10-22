"use client";
import React, { use } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { setStampsNeeded, setRewardDescription } from '@/store/builderSlice';

import type { Locale } from '@/lib/translations';

export default function DetailsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  
  // Use Redux state
  const stamps = useSelector((state: RootState) => state.builder.stampsNeeded);
  const reward = useSelector((state: RootState) => state.builder.rewardDescription);
  const dispatch = useDispatch();

  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');

  // Update dispatch logic
  const dec = () => dispatch(setStampsNeeded(Math.max(1, stamps - 1)));
  const inc = () => dispatch(setStampsNeeded(Math.min(20, stamps + 1)));

  // Update input change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setRewardDescription(e.target.value));

  // Update Redux store immediately when values change
  React.useEffect(() => {
    dispatch(setStampsNeeded(stamps));
  }, [stamps, dispatch]);

  React.useEffect(() => {
    if (reward) {
      dispatch(setRewardDescription(reward));
    }
  }, [reward, dispatch]);

  // Retrieve campaign name from Redux
  const campaignName = useSelector((state: RootState) => state.builder.campaignName);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) {
          // This state is managed by Redux, so we don't need to update it here
          // setCampaignName(data.campaignName);
        }
      } catch { /* Ignore localStorage errors */ }
    }
  }, []);

  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{t.details.title}</h2>
        <p className="text-base text-gray-600 font-medium">Define how customers earn rewards with your loyalty pass</p>
      </div>

      {/* Number of Stamps Section */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-900 mb-4">{t.details.stamps.label}</label>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={dec} 
            className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm" 
            aria-label="decrease"
          >
            −
          </button>
          
          <div className="w-16 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-lg font-medium text-gray-900 bg-gray-50 shadow-sm">
            {stamps}
          </div>
          
          <button 
            onClick={inc} 
            className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm" 
            aria-label="increase"
          >
            +
          </button>
        </div>
      </div>

      {/* Reward Description Section */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-900 mb-4">{t.details.reward.label}</label>
        
        <input
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm"
          value={reward}
          onChange={onChange}
          placeholder={t.details.reward.placeholder}
        />
        
        <p className="text-xs text-gray-500 mt-2 font-medium">Shown to customers on their pass.</p>
      </div>
    </div>
  );
}
