import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

type PreviewCardProps = {
  headerColor?: string;
  title?: string;
  type?: string;
  rewardLine?: string;
  starsCount?: number;
  stampsNeeded?: number;
  minPurchase?: number | string;
  businessName?: string;
  contact?: string;
};

// Modern 3D Pass Card Design
export default function PreviewCard({
  headerColor,
  title,
  type,
  rewardLine,
  starsCount,
  stampsNeeded,
  minPurchase,
  businessName,
  contact,
}: PreviewCardProps) {
  // previewCardData from RTK
  const previewCardData = useSelector((s: RootState) => s.builder);

  const resolvedHeader = headerColor ?? previewCardData.brandColor ?? '#6B21A8';
  const resolvedTitle = title ?? (previewCardData.campaignName || 'Your Campaign');
  const resolvedType = type ?? previewCardData.type;
  const displayType = resolvedType === 'loyalty' ? 'Loyalty Pass' : resolvedType;
  const resolvedReward = rewardLine ?? `Collect stamps for: ${previewCardData.rewardDescription}`;
  const resolvedStars = starsCount ?? 5;
  const resolvedStampsNeeded = stampsNeeded ?? previewCardData.stampsNeeded;
  const resolvedMinPurchase = minPurchase ?? previewCardData.minPurchase;
  const resolvedBusiness = businessName ?? previewCardData.businessName;
  const resolvedContact = contact ?? previewCardData.contact;

  // Add logo URL and tagline to PreviewCard
  const resolvedLogoUrl = previewCardData.logoUrl;
  const resolvedTagline = previewCardData.tagline;

  // Create gradient based on the header color
  const darkenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
  };

  const gradientStart = resolvedHeader;
  const gradientEnd = darkenColor(resolvedHeader, 20);

  return (
    <div className="perspective-1000 w-full max-w-[420px]">
      {/* 3D Card Container with hover effect */}
      <div className="relative transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
        {/* Shadow layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-[24px] blur-xl opacity-30 transform translate-y-4"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-[24px] blur-lg opacity-20 transform translate-y-2"></div>
        
        {/* Main Card */}
        <div className="relative bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-white/20">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-tr-full"></div>
          
          {/* Header Section with Gradient */}
          <div 
            className="relative px-6 py-6 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
            }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black rounded-full blur-2xl transform -translate-x-16 translate-y-16"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* Logo with modern styling */}
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                    {resolvedLogoUrl ? (
                      <Image 
                        src={resolvedLogoUrl} 
                        alt="Logo" 
                        width={40} 
                        height={40} 
                        className="max-h-full max-w-full object-contain rounded-xl" 
                      />
                    ) : (
                      <span className="text-3xl text-white">★</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl text-white leading-tight mb-1 tracking-wide">
                      {resolvedTitle}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        {displayType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Code placeholder */}
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">QR</span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              {resolvedTagline && (
                <div className="mt-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-sm text-white/95 font-medium">{resolvedTagline}</p>
                </div>
              )}
            </div>

            {/* Decorative strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          {/* Body Section */}
          <div className="relative px-6 py-6 bg-gradient-to-b from-gray-50 to-white">
            {/* Reward Section */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b" style={{ background: `linear-gradient(180deg, ${gradientStart}, ${gradientEnd})` }}></div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Reward</h4>
              </div>
              <p className="text-base text-gray-900 font-medium leading-relaxed">{resolvedReward}</p>
            </div>

            {/* Progress Stars */}
            <div className="mb-5 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Progress</p>
              <div className="flex gap-3 justify-center">
                {Array.from({ length: resolvedStars }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl text-gray-300 bg-gray-50 transition-all hover:scale-110"
                  >
                    ★
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Stamps Needed</p>
                <p className="text-lg font-bold text-blue-900">{resolvedStampsNeeded}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <p className="text-xs font-semibold text-green-600 uppercase mb-1">Min Purchase</p>
                <p className="text-lg font-bold text-green-900">{resolvedMinPurchase}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-200 rounded-full -translate-x-1/2"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-200 rounded-full translate-x-1/2"></div>
            </div>

            {/* Business Info */}
            <div className="mb-5">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})` }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base mb-1">{resolvedBusiness}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {resolvedContact}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                  color: 'white'
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
                Add to Wallet
              </button>
              
              <button className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
