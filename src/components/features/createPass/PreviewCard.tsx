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

// Premium Dark Loyalty Pass Design
export default function PreviewCard({
  headerColor: _headerColor,
  title,
  type: _type,
  rewardLine,
  starsCount: _starsCount,
  stampsNeeded,
  minPurchase: _minPurchase,
  businessName,
  contact: _contact,
}: PreviewCardProps) {
  // previewCardData from RTK
  const previewCardData = useSelector((s: RootState) => s.builder);

  const resolvedTitle = title ?? (previewCardData.campaignName || 'Your Loyalty Pass');
  const resolvedBusiness = businessName ?? (previewCardData.businessName || 'Company Name');
  const resolvedStampsNeeded = stampsNeeded ?? previewCardData.stampsNeeded ?? 5;
  const resolvedReward = rewardLine ?? (previewCardData.rewardDescription || 'Free Coffee');
  const _resolvedLogoUrl = previewCardData.logoUrl;

  return (
    <div className="w-full max-w-[400px] mx-auto perspective-1000">
      {/* 3D Card Container */}
      <div className="relative transform transition-all duration-500 hover:rotateY-2 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
        {/* Shadow layers for depth */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl blur-2xl transform translate-y-6 scale-95 opacity-60"></div>
        <div className="absolute inset-0 bg-black/20 rounded-3xl blur-xl transform translate-y-4 scale-98 opacity-40"></div>
        
        {/* Main 3D Card */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-slate-600/30 transform translate-z-4" style={{ 
          background: 'linear-gradient(145deg, #1e293b 0%, #334155 50%, #0f172a 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
        }}>
          {/* Header Section */}
          <div className="px-8 py-7 relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-bold text-2xl text-white leading-tight mb-2 drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {resolvedTitle}
                </h3>
                <p className="text-base text-gray-300 drop-shadow-md">
                  {resolvedBusiness}
                </p>
              </div>
              
              {/* 3D Digital Pass Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-lg border border-white/30 flex items-center justify-center shadow-lg" style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.3)'
              }}>
                <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="px-8 py-10 text-center relative">
            {/* 3D Stamp Count */}
            <div className="mb-6">
              <div className="text-8xl font-bold text-white mb-3 drop-shadow-2xl" style={{ 
                textShadow: '0 4px 8px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.1)',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))'
              }}>
                {resolvedStampsNeeded}
              </div>
              <p className="text-lg text-gray-300 drop-shadow-md">
                Stamps
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="px-8 pb-8 text-center relative">
            {/* 3D Reward */}
            <div className="mb-6">
              <p className="font-bold text-xl text-white mb-3 drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {resolvedReward}
              </p>
              <p className="text-base text-gray-300 drop-shadow-sm">
                Show this pass to redeem
              </p>
            </div>
          </div>

          {/* 3D Edge Highlights */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-transparent to-white/10"></div>
        </div>
      </div>
    </div>
  );
}
