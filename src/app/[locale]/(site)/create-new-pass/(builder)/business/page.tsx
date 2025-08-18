"use client";
import React from 'react';
import type { Locale } from '@/lib/translations';
import StepNav from '@/components/createPass/StepNav';
import PreviewCard from '@/components/createPass/PreviewCard';
// Import necessary hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setBusinessName, setContact } from '@/store/builderSlice';

export default function BusinessPage({ params }: { params: { locale: Locale } }) {
  const [campaignName, setCampaignName] = React.useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch {}
    }
  }, []);

  // Use Redux state
  const businessName = useSelector((state: RootState) => state.builder.businessName);
  const contact = useSelector((state: RootState) => state.builder.contact);
  const dispatch = useDispatch();

  return (
    <>
      {/* Left: business info form */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-[28px] font-semibold mb-2">Business Information</h2>
        <p className="text-gray-700 mb-8">This information will appear on your pass for customer reference.</p>

        <div className="space-y-6">
          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">Business Name</label>
            <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="Your Business Name" value={businessName} onChange={(e) => dispatch(setBusinessName(e.target.value))} />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-gray-900 mb-2">Business Address</label>
            <textarea className="w-full rounded-xl border border-gray-300 px-4 py-3 min-h-[110px]" placeholder="Your Business Name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">Phone Number</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="+10-6789887612" value={contact} onChange={(e) => dispatch(setContact(e.target.value))} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">e-mail address</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="business@gmail.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">Website</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="www.yourbusiness.com" />
            </div>
            <div>
              <label className="block text-[16px] font-semibold text-gray-900 mb-2">Social Media</label>
              <input className="w-full rounded-xl border border-gray-300 px-4 py-3" placeholder="@your_business" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: preview */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
        <PreviewCard title={campaignName || 'Your Campaign'} businessName={businessName} contact={contact} />
      </div>
      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}


