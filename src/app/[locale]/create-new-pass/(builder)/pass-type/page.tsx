"use client";
import React, { use } from 'react';
import { useDispatch , useSelector } from 'react-redux';


import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { 
  setCampaignName as setCampaignNameAction, 
  setType,
  setBrandColor,
  setLogoUrl,
  setTagline,
  setRewardDescription,
  setStampsNeeded,
  setMinPurchase,
  setBusinessName,
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

type TileProps = {
  title: string;
  subtitle: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
};

export default function PassTypePage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  
  const [selected, setSelected] = React.useState<'store' | 'coupon' | 'event' | 'boarding' | 'generic'>('store');
  const dispatch = useDispatch();
  
  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');

  // Use Redux state for campaign name
  const campaignName = useSelector((state: RootState) => state.builder.campaignName);

  // Update Redux store immediately when values change
  React.useEffect(() => {
    dispatch(setType(selected));
  }, [selected, dispatch]);

  React.useEffect(() => {
    if (campaignName) {
      dispatch(setCampaignNameAction(campaignName));
    }
  }, [campaignName, dispatch]);

  // Add dummy data function
  const addDummyData = () => {
    console.log('Adding comprehensive dummy data to Redux store...');
    
    // Pass Type & Branding
    dispatch(setCampaignNameAction('Summer Coffee Lovers'));
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
    
    console.log('✅ All dummy data added successfully!');
    alert('Dummy data added successfully! All fields have been populated.');
  };

  const passTypes = [
    { key: 'store', icon: '🏪' },
    { key: 'coupon', icon: '🎫' },
    { key: 'event', icon: '🎟️' },
    { key: 'boarding', icon: '✈️' },
    { key: 'generic', icon: '💳' }
  ];

  function Tile({ title, subtitle, icon, active, onClick }: TileProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full rounded-2xl p-4 border-2 transition-all duration-300 flex items-center gap-4 group ${
          active
            ? 'bg-gray-900 text-white shadow-lg scale-[1.02]'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-[1.01]'
        }`}
      >
        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className="flex-1 text-left">
          <div className={`font-bold text-lg mb-1 transition-colors ${
            active 
              ? 'text-white group-hover:text-gray-200' 
              : 'text-gray-900 group-hover:text-gray-700'
          }`}>{title}</div>
          <div className={`text-sm leading-relaxed transition-colors ${
            active 
              ? 'text-gray-200 group-hover:text-gray-300' 
              : 'text-gray-600 group-hover:text-gray-500'
          }`}>{subtitle}</div>
        </div>
        {active && (
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{(t.passType as { title: string }).title}</h2>
        <p className="text-base text-gray-600 font-medium">Choose the type of pass you want to create</p>
      </div>

      {/* Apple-style Tiles Grid */}
      <div className="space-y-4 mb-12">
        {passTypes.map((passType) => (
          <Tile
            key={passType.key}
            title={(t.passType as { tiles: Record<string, { title: string; subtitle: string }> }).tiles[passType.key].title}
            subtitle={(t.passType as { tiles: Record<string, { title: string; subtitle: string }> }).tiles[passType.key].subtitle}
            icon={passType.icon}
            active={selected === passType.key}
            onClick={() => { setSelected(passType.key as PassType); dispatch(setType(passType.key as PassType)); }}
          />
        ))}
      </div>

      {/* Apple-style Campaign Name Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-900 mb-1">{(t.passType as { campaignName: { label: string } }).campaignName.label}</label>
          <p className="text-gray-600 font-medium text-sm">Give your campaign a memorable name</p>
        </div>
        
        <div className="relative">
          <textarea
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 min-h-[100px] resize-y bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#008929]/20 focus:border-[#008929]/50 transition-all duration-300 text-base font-medium placeholder-gray-400"
            placeholder={(t.passType as { campaignName: { placeholder: string } }).campaignName.placeholder}
            value={campaignName}
            onChange={(e) => {
              const v = e.target.value;
              dispatch(setCampaignNameAction(v));
            }}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
            {campaignName.length}/100
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-3 font-medium leading-relaxed">{(t.passType as { campaignName: { helpText: string } }).campaignName.helpText}</p>
      </div>

      {/* Add Dummy Data Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={addDummyData}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Dummy Data
        </button>
      </div>
    </div>
  );
}
