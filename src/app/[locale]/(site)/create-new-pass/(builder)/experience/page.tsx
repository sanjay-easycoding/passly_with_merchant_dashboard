"use client";
import React from 'react';
import type { Locale } from '@/lib/translations';
import StepNav from '@/components/createPass/StepNav';
import PreviewCard from '@/components/createPass/PreviewCard';

export default function ExperiencePage({ params }: { params: { locale: Locale } }) {
  const [welcome, setWelcome] = React.useState(
    'Welcome to our Loyalty program, Start earning Rewards with every Purchase'
  );
  const [instructions, setInstructions] = React.useState(
    'Show this pass at checkout to earn stamps. Present your phone screen to our staff'
  );
  const [offers, setOffers] = React.useState(
    'Get notified about special promotions, new products and exclusive member events'
  );
  const [freq, setFreq] = React.useState<'Daily' | 'Weekly' | 'Monthly' | 'Never'>('Monthly');
  const [campaignName, setCampaignName] = React.useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch {}
    }
  }, []);

  const Button = ({ value }: { value: typeof freq }) => (
    <button
      type="button"
      onClick={() => setFreq(value)}
      className={`px-4 py-2 rounded-xl border text-sm font-medium ${
        freq === value ? 'bg-[#111827] text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
    >
      {value}
    </button>
  );

  return (
    <>
      {/* Left panel */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-[28px] font-semibold mb-2">Customer Experience</h2>
        <p className="text-gray-700 mb-8">Customize how customers interact with your pass</p>

        <div className="space-y-6">
          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">Welcome Message</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[90px]"
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-2">This message appears when Customers first add the pass</p>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">How to use Instructions?</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[90px]"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">Special offers and updates</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[90px]"
              value={offers}
              onChange={(e) => setOffers(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-3">Update frequency</label>
            <div className="flex items-center gap-3">
              <Button value="Daily" />
              <Button value="Weekly" />
              <Button value="Monthly" />
              <Button value="Never" />
            </div>
            <p className="text-sm text-gray-600 mt-2">How often should customers receive updates about offers</p>
          </div>
        </div>
      </div>

      {/* Right preview */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
        <PreviewCard title={campaignName || 'Your Campaign'} />
      </div>
      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}


