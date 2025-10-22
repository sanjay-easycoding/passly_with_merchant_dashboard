"use client";
import React, { use } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { 
  setCampaignName, 
  setBusinessName, 
  setStampsNeeded, 
  setType,
  setBrandColor,
  setLogoUrl,
  setTagline,
  setRewardDescription,
  setMinPurchase,
  setBusinessAddress,
  setContact,
  setEmail,
  setWebsite,
  setSocialMedia,
  setWelcomeMessage,
  setInstructions,
  setSpecialOffers,
  setOffersFrequency
} from '@/store/builderSlice';

import type { Locale } from '@/lib/translations';

export default function PublishPage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  
  // Retrieve data from Redux
  const data = useSelector((state: RootState) => state.builder);
  const dispatch = useDispatch();

  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');

  // Debug: Log data when component mounts
  React.useEffect(() => {
    console.log('=== PUBLISH PAGE DEBUG ===');
    console.log('Publish page mounted');
    console.log('Redux data:', data);
    console.log('Data keys available:', Object.keys(data));
    console.log('Is data empty?', Object.keys(data).length === 0);
    console.log('Campaign name:', data.campaignName);
    console.log('Business name:', data.businessName);
    console.log('Stamps needed:', data.stampsNeeded);
    
    // Check localStorage directly (only on client side)
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('builderState');
      console.log('LocalStorage data:', localData);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          console.log('Parsed localStorage data:', parsed);
        } catch (e) {
          console.log('Error parsing localStorage data:', e);
        }
      }
    }
  }, [data]);

  // Test function to add sample data to all fields
  const addTestData = () => {
    console.log('Adding comprehensive test data to Redux store...');
    
    // Pass Type & Branding
    dispatch(setCampaignName('Summer Coffee Lovers'));
    dispatch(setType('store'));
    dispatch(setBrandColor('#8B4513'));
    dispatch(setTagline('Your Daily Coffee Fix'));
    
    // Details
    dispatch(setRewardDescription('Free Large Coffee'));
    dispatch(setStampsNeeded(8));
    dispatch(setMinPurchase(50));
    
    // Business Information
    dispatch(setBusinessName('Brew & Beans Cafe'));
    dispatch(setBusinessAddress('123 Coffee Street, Downtown, City 12345'));
    dispatch(setContact('+1 (555) 123-4567'));
    dispatch(setEmail('info@brewbeanscafe.com'));
    dispatch(setWebsite('www.brewbeanscafe.com'));
    dispatch(setSocialMedia('@brewbeanscafe'));
    
    // Customer Experience
    dispatch(setWelcomeMessage('Welcome to Brew & Beans! Start earning rewards today.'));
    dispatch(setInstructions('Show this pass to our barista with each purchase. Get a stamp for every $10 spent.'));
    dispatch(setSpecialOffers('Happy Hour: 20% off all drinks from 2-4 PM'));
    dispatch(setOffersFrequency('Weekly'));
    
    console.log('✅ All test data added successfully!');
    console.log('📊 Test data includes:');
    console.log('  - Campaign: Summer Coffee Lovers');
    console.log('  - Business: Brew & Beans Cafe');
    console.log('  - Reward: Free Large Coffee (8 stamps)');
    console.log('  - Min Purchase: $50');
    console.log('  - Contact: +1 (555) 123-4567');
    console.log('  - And much more...');
  };



  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{t.publish.title}</h2>
        <p className="text-base text-gray-600 font-medium">Please review the details of your pass before publishing.</p>
      </div>

      {/* Review Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pass Details Review</h3>
        <div className="space-y-3">
          {/* Campaign Name */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Campaign Name</span>
            <span className="text-gray-900 font-semibold text-sm">{data.campaignName || 'Not set'}</span>
          </div>

          {/* Type */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Pass Type</span>
            <span className="text-gray-900 font-semibold text-sm">{data.type || 'Not set'}</span>
          </div>

          {/* Brand Color */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Brand Color</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: data.brandColor }}></div>
              <span className="text-gray-900 font-semibold text-sm">{data.brandColor || 'Not set'}</span>
            </div>
          </div>

          {/* Business Name */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Business Name</span>
            <span className="text-gray-900 font-semibold text-sm">{data.businessName || 'Not set'}</span>
          </div>

          {/* Contact Info */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Contact</span>
            <span className="text-gray-900 font-semibold text-sm">{data.contact || 'Not set'}</span>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Email</span>
            <span className="text-gray-900 font-semibold text-sm">{data.email || 'Not set'}</span>
          </div>

          {/* Stamps Required */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Stamps Required</span>
            <span className="text-gray-900 font-semibold text-sm">{data.stampsNeeded || 'Not set'}</span>
          </div>

          {/* Reward */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Reward</span>
            <span className="text-gray-900 font-semibold text-sm">{data.rewardDescription || 'Not set'}</span>
          </div>

          {/* Min Purchase */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium text-sm">Min Purchase</span>
            <span className="text-gray-900 font-semibold text-sm">${data.minPurchase || 'Not set'}</span>
          </div>

          {/* Layout Type */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium text-sm">Layout Type</span>
            <span className="text-gray-900 font-semibold text-sm">{data.layoutType || 'Not set'}</span>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="space-y-3">
          {/* QR Codes and Share Links */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2v-2zM13 19h2v2h-2v-2zM15 15h2v2h-2v-2zM17 17h2v2h-2v-2z"/>
              </svg>
            </div>
            <span className="text-gray-600 font-medium text-sm">QR codes and share links will be generated upon publishing.</span>
          </div>

          {/* Digital Wallet */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 7H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM3 9h18v6H3V9z"/>
                <path d="M7 11h2v2H7v-2zM11 11h2v2h-2v-2z"/>
              </svg>
            </div>
            <span className="text-gray-600 font-medium text-sm">Customers can instantly add the pass to their digital wallet.</span>
          </div>

          {/* Analytics */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            <span className="text-gray-600 font-medium text-sm">You'll be able to view analytics for this pass.</span>
          </div>
        </div>
      </div>

      {/* Test Data Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={addTestData}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Add Test Data
        </button>
      </div>
    </div>
  );
}
