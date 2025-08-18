"use client";
import React from 'react';
import type { Locale } from '@/lib/translations';
import StepNav from '@/components/createPass/StepNav';
import PreviewCard from '@/components/createPass/PreviewCard';
// Import necessary hooks
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PublishPage({ params }: { params: { locale: Locale } }) {
  const [campaignName, setCampaignName] = React.useState<string>('');
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch {}
    }
  }, []);

  // Retrieve data from Redux
  const data = useSelector((state: RootState) => state.builder);

  // Log experience-related fields
  const handlePublish = () => {
    console.log('Publishing data:', {
      campaignName: data.campaignName,
      type: data.type,
      brandColor: data.brandColor,
      logoUrl: data.logoUrl,
      rewardDescription: data.rewardDescription,
      stampsNeeded: data.stampsNeeded,
      minPurchase: data.minPurchase,
      businessName: data.businessName,
      businessAddress: data.businessAddress,
      contact: data.contact,
      email: data.email,
      website: data.website,
      socialMedia: data.socialMedia,
      offersFrequency: data.offersFrequency,
      tagline: data.tagline,
      welcomeMessage: data.welcomeMessage,
      instructions: data.instructions,
      specialOffers: data.specialOffers,
    });
  };

  return (
    <>
      {/* Left: review and publish */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-[28px] font-semibold mb-2">Review and Publish</h2>
        <p className="text-gray-700 mb-8">Review your pass details before publishing</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-10 text-gray-900">
          <div>
            <div className="text-gray-600">Campaign:</div>
            <div className="font-medium">—</div>
          </div>
          <div>
            <div className="text-gray-600">Type:</div>
            <div className="font-medium">loyalty</div>
          </div>
          <div>
            <div className="text-gray-600">Business</div>
            <div className="font-medium">—</div>
          </div>
          <div>
            <div className="text-gray-600">Contact</div>
            <div className="font-medium">+10-6789887612</div>
          </div>
          <div>
            <div className="text-gray-600">Stamps Required</div>
            <div className="font-medium">5</div>
          </div>
          <div>
            <div className="text-gray-600">Reward</div>
            <div className="font-medium">—</div>
          </div>
        </div>

        <h3 className="text-[22px] font-semibold mb-4">What happens Next ?</h3>
        <ul className="space-y-3 text-emerald-600 mb-8">
          <li>Your pass will be generated and ready to share</li>
          <li>QR codes and sharing links will be created</li>
          <li>Customers can add it to their apple wallet instantly</li>
          <li>You will get analytics on pass downloads and usage</li>
        </ul>

        <button onClick={handlePublish} className="rounded-lg bg-emerald-600 text-white px-6 py-3 font-semibold hover:bg-emerald-700">Publish Pass</button>
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


