"use client";
import React, { use } from 'react';


import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';

import type { Locale } from '@/lib/translations';

export default function DistributionPage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  
  const [link] = React.useState('https://example.com/your-pass');
  const [campaignName, setCampaignName] = React.useState<string>('');

  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = JSON.parse(localStorage.getItem('passly_builder') || '{}');
        if (data.campaignName) setCampaignName(data.campaignName);
      } catch { /* Ignore localStorage errors */ }
    }
  }, []);

  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{t.distribution.title}</h2>
        <p className="text-base text-gray-600 font-medium">Distribute your pass to customers through various channels. Choose the method that best suits your campaign and audience.</p>
      </div>

      {/* QR Code Distribution Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-start gap-4">
          {/* QR Code Section */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
              {/* QR Code Icon */}
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-sm ${
                      i % 3 === 0 || i % 5 === 0 || i % 7 === 0 
                        ? 'bg-gray-600' 
                        : 'bg-gray-300'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code</h3>
            <p className="text-gray-600 font-medium mb-4 text-sm">Download the QR code for your pass to share it offline.</p>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Top Row - Download QR and Copy Link */}
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition-all duration-200 shadow-sm text-sm">
                  {t.distribution.buttons.downloadQR}
                </button>
                <button 
                  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition-all duration-200 shadow-sm text-sm"
                  onClick={() => navigator.clipboard.writeText(link)}
                >
                  {t.distribution.buttons.copyLink}
                </button>
              </div>
              
              {/* Bottom Row - Email Button (Full Width) */}
              <button className="w-full px-4 py-2 rounded-xl bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition-all duration-200 shadow-sm text-sm">
                {t.distribution.buttons.emailToMe}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Ideas Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution ideas:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-gray-600 font-medium text-sm">Share the QR code on social media.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-gray-600 font-medium text-sm">Include the QR code in your email newsletter.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-gray-600 font-medium text-sm">Print the QR code on flyers or posters.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-gray-600 font-medium text-sm">Embed the link on your website or app.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
