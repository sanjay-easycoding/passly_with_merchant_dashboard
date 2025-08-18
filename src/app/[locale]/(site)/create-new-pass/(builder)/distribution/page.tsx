"use client";
import React from 'react';
import type { Locale } from '@/lib/translations';
import StepNav from '@/components/createPass/StepNav';
import PreviewCard from '@/components/createPass/PreviewCard';

export default function DistributionPage({ params }: { params: { locale: Locale } }) {
  const [link, setLink] = React.useState('https://example.com/your-pass');
  const [campaignName, setCampaignName] = React.useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch {}
    }
  }, []);

  return (
    <>
      {/* Left panel per screenshot */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-[28px] font-semibold mb-2">Distribution and access</h2>
        <p className="text-gray-700 mb-8">How Customers will get and use your pass.</p>

        <div className="flex flex-col items-center">
          <div className="w-52 h-52 rounded-lg bg-[#10E7B3] flex items-start justify-start p-3 mb-5">
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black" />
              ))}
            </div>
          </div>
          <p className="text-center text-gray-800 mb-4 max-w-md">
            Customers scan this qr code to add your pass to
            their apple wallet
          </p>
          <div className="flex items-center gap-3 mb-10">
            <button className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-50">Download QR</button>
            <button className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-50" onClick={() => navigator.clipboard.writeText(link)}>Copy link</button>
            <button className="px-4 py-2 rounded-lg border bg-white text-gray-800 hover:bg-gray-50">Email to me</button>
          </div>

          <div className="w-full">
            <h3 className="text-[22px] font-semibold mb-4">Distribution Ideas</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-800">
              <li>Place qr code at your register on Counter</li>
              <li>Print on receipts on Business cards</li>
              <li>Share Link on Social media</li>
              <li>Include in email signature</li>
              <li>Display on your Website</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right preview (kept simple) */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Live Preview</h2>
        <PreviewCard title={campaignName || 'Your Campaign'} />
        <div className="mt-4 rounded-md bg-gray-100 p-3 break-all text-sm text-gray-700 max-w-[520px]">{link}</div>
      </div>
      <div className="lg:col-span-2">
        <StepNav />
      </div>
    </>
  );
}


