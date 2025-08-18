import React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

type PreviewCardProps = {
  headerColor?: string;
  title?: string;
  type?: string;
  codeLine?: string;
  rewardLine?: string;
  starsCount?: number;
  stampsNeeded?: number | string;
  minPurchase?: number | string;
  businessName?: string;
  contact?: string;
  logoUrl?: string | null;
};

// Simple presentational card optimized to look like the reference
export default function PreviewCard({
  headerColor,
  title,
  type,
  codeLine,
  rewardLine,
  starsCount,
  stampsNeeded,
  minPurchase,
  businessName,
  contact,
  logoUrl,
}: PreviewCardProps) {
  // previewCardData from RTK
  const previewCardData = useSelector((s: RootState) => s.builder);

  const resolvedHeader = headerColor ?? previewCardData.brandColor ?? '#6B21A8';
  const resolvedTitle = title ?? (previewCardData.campaignName || 'Your Campaign');
  const resolvedType = type ?? previewCardData.type;
  const displayType = resolvedType === 'loyalty' ? 'Loyality Pass' : resolvedType;
  const resolvedReward = rewardLine ?? `Collect stamps for: ${previewCardData.rewardDescription}`;
  const resolvedStars = starsCount ?? 5;
  const resolvedStampsNeeded = stampsNeeded ?? previewCardData.stampsNeeded;
  const resolvedMinPurchase = minPurchase ?? previewCardData.minPurchase;
  const resolvedBusiness = businessName ?? previewCardData.businessName;
  const resolvedContact = contact ?? previewCardData.contact;
  const resolvedCode = codeLine ?? 'dfsdfsadfsadfsadfasdfdsfafasfsdf';

  // Add logo URL and tagline to PreviewCard
  const resolvedLogoUrl = previewCardData.logoUrl;
  const resolvedTagline = previewCardData.tagline;


  return (
    <div className="rounded-[12px] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.2)] border border-gray-200 overflow-hidden max-w-[400px] w-full bg-white">
      {/* Header */}
      <div className="px-5 py-4" style={{ backgroundColor: resolvedHeader }}>
        <div className="flex items-start gap-3 text-white">


          {/* Render logo image if available, otherwise use star */}
          <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
            {resolvedLogoUrl ? (
              <img src={resolvedLogoUrl} alt="Logo preview" className="max-h-full max-w-full object-contain" />
            ) : (
              '★'
            )}
          </div>

          
          <div>
            {/* Ensure tagline is displayed correctly */}
            <div className="font-semibold text-[16px] leading-none mb-1">{resolvedTitle}</div>
            <div className="text-white/90 text-[14px]">{displayType}</div>
           
          </div>
        </div>
        {
resolvedTagline&&   <div className="mt-3 text-white text-[14px] break-all">{resolvedTagline}</div>

        }
     
      </div>

      {/* Body */}
      <div className="px-5 py-4">
     
        <div className="text-[16px] text-gray-900 mb-3">{resolvedReward}</div>
        <div className="flex gap-3 text-gray-400 mb-4">
          {Array.from({ length: resolvedStars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-[14px] text-gray-700 mb-4">
          <span>{resolvedStampsNeeded} stamps needed</span>
          <span>Min purchase: {resolvedMinPurchase}</span>
        </div>
        <div className="h-px bg-gray-200 mb-4" />

        <div className="text-gray-900 font-medium mb-1">{resolvedBusiness}</div>
        <div className="text-gray-600 text-[14px]">{resolvedContact}</div>

        <div className="flex items-center justify-between mt-5">
          <a className="text-[#10B981] text-[14px]" href="#">Add to apple wallet</a>
          <div className="w-8 h-8 rounded-md border flex items-center justify-center">▢</div>
        </div>
      </div>
    </div>
  );
}


