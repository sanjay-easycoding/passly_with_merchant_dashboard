import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';
import { setLayoutType } from '@/store/builderSlice';
import TemplatesPopup from './TemplatesPopup';
import iPhoneMockup from './iPhoneMockup';
import type { LayoutTemplate } from './TemplatesPopup';

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
  const dispatch = useDispatch();
  const [showTemplates, setShowTemplates] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'phone'>('card');

  // Listen for custom events from layout
  useEffect(() => {
    const handleOpenTemplates = () => {
      setShowTemplates(true);
    };

    const handleSetViewMode = (event: CustomEvent) => {
      setViewMode(event.detail);
      // Update button states for Apple-style segmented control
      const cardBtn = document.getElementById('card-view-btn');
      const phoneBtn = document.getElementById('phone-view-btn');
      const previewControls = document.getElementById('preview-controls');
      
      if (cardBtn && phoneBtn) {
        if (event.detail === 'card') {
          // Card selected - white background with shadow
          cardBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-white text-gray-900 shadow-sm';
          phoneBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900';
        } else {
          // Phone selected - white background with shadow
          cardBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900';
          phoneBtn.className = 'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-white text-gray-900 shadow-sm';
        }
      }
      
      // Keep controls visible in both modes - no hiding/showing
      if (previewControls) {
        previewControls.style.display = 'flex';
      }
      
      const phoneToggle = document.getElementById('phone-toggle');
      if (phoneToggle) {
        phoneToggle.style.display = 'none';
      }
    };

    window.addEventListener('openTemplates', handleOpenTemplates as EventListener);
    window.addEventListener('setViewMode', handleSetViewMode as EventListener);

    return () => {
      window.removeEventListener('openTemplates', handleOpenTemplates as EventListener);
      window.removeEventListener('setViewMode', handleSetViewMode as EventListener);
    };
  }, []);

  const resolvedTitle = title ?? (previewCardData.campaignName || 'Your Loyalty Pass');
  const resolvedBusiness = businessName ?? (previewCardData.businessName || 'Company Name');
  const resolvedStampsNeeded = stampsNeeded ?? previewCardData.stampsNeeded ?? 5;
  const resolvedReward = rewardLine ?? (previewCardData.rewardDescription || 'Free Coffee');
  const resolvedMinPurchase = previewCardData.minPurchase || 0;
  const resolvedContact = previewCardData.contact || '';
  const resolvedBusinessAddress = previewCardData.businessAddress || '';
  const resolvedTagline = previewCardData.tagline || '';
  const resolvedLogoUrl = previewCardData.logoUrl;
  const resolvedBrandColor = previewCardData.brandColor || '#7123a9';
  const layoutType = previewCardData.layoutType || 'dark';

  // Layout-specific styling
  const getLayoutStyles = () => {
    switch (layoutType) {
      case 'light':
        return {
          cardBg: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
          textColor: 'text-gray-900',
          subTextColor: 'text-gray-600',
          accentColor: 'text-blue-600',
          borderColor: 'border-gray-200',
          shadowColor: 'shadow-gray-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
      case 'gradient':
        return {
          cardBg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500',
          textColor: 'text-white',
          subTextColor: 'text-white/90',
          accentColor: 'text-yellow-300',
          borderColor: 'border-white/20',
          shadowColor: 'shadow-purple-500/50',
          iconBg: 'bg-white/20',
          iconColor: 'text-white'
        };
      case 'minimal':
        return {
          cardBg: 'bg-white',
          textColor: 'text-gray-800',
          subTextColor: 'text-gray-500',
          accentColor: 'text-gray-800',
          borderColor: 'border-gray-300',
          shadowColor: 'shadow-gray-300',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600'
        };
      case 'vibrant':
        return {
          cardBg: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
          textColor: 'text-white',
          subTextColor: 'text-white/90',
          accentColor: 'text-yellow-200',
          borderColor: 'border-white/30',
          shadowColor: 'shadow-orange-500/50',
          iconBg: 'bg-white/20',
          iconColor: 'text-white'
        };
      case 'elegant':
        return {
          cardBg: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
          textColor: 'text-white',
          subTextColor: 'text-white/80',
          accentColor: 'text-pink-300',
          borderColor: 'border-white/20',
          shadowColor: 'shadow-purple-900/50',
          iconBg: 'bg-white/10',
          iconColor: 'text-white'
        };
      default: // dark
        return {
          cardBg: 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900',
          textColor: 'text-white',
          subTextColor: 'text-gray-300',
          accentColor: 'text-white',
          borderColor: 'border-slate-600/30',
          shadowColor: 'shadow-black/60',
          iconBg: 'bg-white/20',
          iconColor: 'text-white'
        };
    }
  };

  const styles = getLayoutStyles();

  // Render the card content
  const renderCardContent = () => (
    <div className={`relative ${viewMode === 'phone' ? 'w-full max-w-[320px]' : 'w-full max-w-[400px]'} mx-auto ${viewMode === 'card' ? 'perspective-1000' : ''}`}>
      {/* 3D Card Container */}
      <div className={`relative transform transition-all duration-500 ${viewMode === 'card' ? 'hover:rotateY-2 hover:scale-105' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        {/* Shadow layers for depth - only in card mode */}
        {viewMode === 'card' && (
          <>
            <div className="absolute inset-0 bg-black/40 rounded-3xl blur-2xl transform translate-y-6 scale-95 opacity-60"></div>
            <div className="absolute inset-0 bg-black/20 rounded-3xl blur-xl transform translate-y-4 scale-98 opacity-40"></div>
          </>
        )}
        
        {/* Main 3D Card */}
        <div className={`relative ${styles.cardBg} ${viewMode === 'phone' ? 'rounded-2xl' : 'rounded-3xl'} overflow-hidden ${viewMode === 'card' ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]' : 'shadow-lg'} ${styles.borderColor} ${viewMode === 'card' ? 'transform translate-z-4' : ''}`} style={{ 
          boxShadow: viewMode === 'card' 
            ? (layoutType === 'dark' 
                ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
                : `inset 0 1px 0 rgba(255,255,255,0.2), 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)`)
            : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.1)'
        }}>
          
          {/* Header Section */}
          <div className={`${viewMode === 'phone' ? 'px-6 py-6' : 'px-8 py-7'} relative`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className={`font-bold ${viewMode === 'phone' ? 'text-xl' : 'text-2xl'} ${styles.textColor} leading-tight mb-2 drop-shadow-lg`} style={{ textShadow: layoutType === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 1px 2px rgba(0,0,0,0.1)' }}>
                  {resolvedTitle}
                </h3>
                <p className={`${viewMode === 'phone' ? 'text-base' : 'text-base'} ${styles.subTextColor} drop-shadow-md`}>
                  {resolvedBusiness}
                </p>
                {resolvedTagline && (
                  <p className={`${viewMode === 'phone' ? 'text-sm' : 'text-sm'} ${styles.subTextColor} drop-shadow-sm mt-1`}>
                    {resolvedTagline}
                  </p>
                )}
              </div>
              
              {/* Logo or 3D Digital Pass Icon */}
              <div className={`${viewMode === 'phone' ? 'w-8 h-8' : 'w-10 h-10'} ${styles.iconBg} rounded-lg ${styles.borderColor} flex items-center justify-center shadow-lg overflow-hidden`} style={{
                boxShadow: layoutType === 'dark' 
                  ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.3)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {resolvedLogoUrl ? (
                  <img 
                    src={resolvedLogoUrl} 
                    alt="Business Logo" 
                    className={`${viewMode === 'phone' ? 'w-6 h-6' : 'w-8 h-8'} object-cover rounded`}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                  />
                ) : (
                  <svg className={`${viewMode === 'phone' ? 'w-4 h-4' : 'w-5 h-5'} ${styles.iconColor} drop-shadow-sm`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`${viewMode === 'phone' ? 'px-4 py-6' : 'px-8 py-10'} text-center relative`}>
            {/* 3D Stamp Count */}
            <div className="mb-6">
              <div className={`${viewMode === 'phone' ? 'text-5xl' : 'text-8xl'} font-bold ${styles.textColor} mb-3 drop-shadow-2xl`} style={{ 
                textShadow: layoutType === 'dark' 
                  ? '0 4px 8px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.1)'
                  : '0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(255,255,255,0.1)',
                filter: layoutType === 'dark' 
                  ? 'drop-shadow(0 0 10px rgba(255,255,255,0.2))'
                  : 'drop-shadow(0 0 5px rgba(0,0,0,0.1))'
              }}>
                {resolvedStampsNeeded}
              </div>
              <p className={`${viewMode === 'phone' ? 'text-sm' : 'text-lg'} ${styles.subTextColor} drop-shadow-md`}>
                Stamps
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className={`${viewMode === 'phone' ? 'px-4 pb-4' : 'px-8 pb-8'} text-center relative`}>
            {/* 3D Reward */}
            <div className="mb-6">
              <p className={`font-bold ${viewMode === 'phone' ? 'text-base' : 'text-xl'} ${styles.textColor} mb-3 drop-shadow-lg`} style={{ textShadow: layoutType === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : '0 1px 2px rgba(0,0,0,0.1)' }}>
                {resolvedReward}
              </p>
              {resolvedMinPurchase > 0 && (
                <p className={`${viewMode === 'phone' ? 'text-xs' : 'text-sm'} ${styles.subTextColor} drop-shadow-sm mb-2`}>
                  Min. purchase: ${resolvedMinPurchase}
                </p>
              )}
              <p className={`${viewMode === 'phone' ? 'text-xs' : 'text-base'} ${styles.subTextColor} drop-shadow-sm`}>
                Show this pass to redeem
              </p>
            </div>
            
            {/* Contact Information */}
            {resolvedContact && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className={`${viewMode === 'phone' ? 'text-xs' : 'text-sm'} ${styles.subTextColor} drop-shadow-sm`}>
                  Contact: {resolvedContact}
                </p>
              </div>
            )}
          </div>

          {/* 3D Edge Highlights */}
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${layoutType === 'dark' ? 'via-white/20' : 'via-white/40'} to-transparent`}></div>
          <div className={`absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b ${layoutType === 'dark' ? 'from-white/20' : 'from-white/40'} via-transparent to-transparent`}></div>
          <div className={`absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-transparent ${layoutType === 'dark' ? 'to-white/10' : 'to-white/20'}`}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[400px] mx-auto relative">

      {/* Card Content */}
      {viewMode === 'phone' ? (
        React.createElement(iPhoneMockup, { children: renderCardContent() })
      ) : (
        renderCardContent()
      )}

      {/* Templates Popup */}
      {showTemplates && (
        <TemplatesPopup
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={(template: LayoutTemplate) => {
            dispatch(setLayoutType(template.layoutType));
            setShowTemplates(false);
          }}
        />
      )}
    </div>
  );
}
