"use client";
import React from 'react';
import type { Locale } from '@/lib/translations';
import StepNav from '@/components/createPass/StepNav';
import PreviewCard from '@/components/createPass/PreviewCard';

// Import necessary hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setStampsNeeded, setRewardDescription } from '@/store/builderSlice';

export default function DetailsPage({ params }: { params: { locale: Locale } }) {
  // Use Redux state
  const stamps = useSelector((state: RootState) => state.builder.stampsNeeded);
  const reward = useSelector((state: RootState) => state.builder.rewardDescription);
  const dispatch = useDispatch();

  // Update dispatch logic
  const dec = () => dispatch(setStampsNeeded(Math.max(1, stamps - 1)));
  const inc = () => dispatch(setStampsNeeded(Math.min(20, stamps + 1)));

  // Update input change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setRewardDescription(e.target.value));

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
      } catch {}
    }
  }, []);

  return (
    <>
      {/* Left panel */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-[28px] font-semibold mb-8">Set up Loyalty Rewards</h2>

        {/* Number of stamps required */}
        <div className="mb-6">
          <label className="block text-[16px] font-semibold text-gray-900 mb-3">Number of stamps required</label>
          <div className="flex items-center gap-3">
            <button onClick={dec} className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center text-xl hover:bg-gray-50" aria-label="decrease">−</button>
            <div className="w-16 h-12 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-medium">{stamps}</div>
            <button onClick={inc} className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center text-xl hover:bg-gray-50" aria-label="increase">+</button>
          </div>
          <div className="flex items-start gap-2 mt-4 text-gray-700">
            <span className="text-xl leading-none">💡</span>
            <span className="text-[18px]">6–10 stamps works best for most businesses</span>
          </div>
        </div>

        {/* Reward description */}
        <div className="mb-2">
          <label className="block text-[16px] font-semibold text-gray-900 mb-2">Reward description *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            value={reward}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Right preview */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
        <PreviewCard title={campaignName || 'Your Campaign'} rewardLine={`Collect stamps for: ${reward || 'Reward'}`} stampsNeeded={stamps} minPurchase={45} />
      </div>
      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}


