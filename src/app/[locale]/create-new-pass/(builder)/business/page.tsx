"use client";
import React, { use } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PreviewCard from '@/components/features/createPass/PreviewCard';
import { useTranslations } from '@/lib/translations';
import { RootState } from '@/store';
import { setBusinessName, setContact, setBusinessAddress, setEmail, setWebsite, setSocialMedia } from '@/store/builderSlice';

import type { Locale } from '@/lib/translations';

export default function BusinessPage({ params }: { params: Promise<{ locale: Locale }> }) {
  // Unwrap params using use()
  const resolvedParams = use(params);
  
  // Use Redux state for all fields
  const businessName = useSelector((state: RootState) => state.builder.businessName);
  const businessAddress = useSelector((state: RootState) => state.builder.businessAddress);
  const contact = useSelector((state: RootState) => state.builder.contact);
  const email = useSelector((state: RootState) => state.builder.email);
  const website = useSelector((state: RootState) => state.builder.website);
  const socialMedia = useSelector((state: RootState) => state.builder.socialMedia);
  const dispatch = useDispatch();

  // Get translations
  const t = useTranslations(resolvedParams.locale, 'builder');

  return (
    <div className="p-8 lg:p-12">
      {/* Apple-style Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">{t.business.title}</h2>
        <p className="text-base text-gray-600 font-medium">{t.business.subtitle}</p>
      </div>

      {/* Business Information Form */}
      <div className="space-y-6">
        {/* Business Name Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-900 mb-4">{t.business.businessName.label}</label>
          <input 
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm" 
            placeholder={t.business.businessName.placeholder} 
            value={businessName} 
            onChange={(e) => dispatch(setBusinessName(e.target.value))} 
          />
        </div>

        {/* Business Address Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-900 mb-4">{t.business.businessAddress.label}</label>
          <textarea 
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 min-h-[100px] text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm resize-none" 
            placeholder={t.business.businessAddress.placeholder}
            value={businessAddress}
            onChange={(e) => dispatch(setBusinessAddress(e.target.value))}
          />
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">{t.business.phoneNumber.label}</label>
            <input 
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm" 
              placeholder={t.business.phoneNumber.placeholder} 
              value={contact} 
              onChange={(e) => dispatch(setContact(e.target.value))} 
            />
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">{t.business.email.label}</label>
            <input 
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm" 
              placeholder={t.business.email.placeholder}
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </div>
        </div>

        {/* Website and Social Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Website */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">{t.business.website.label}</label>
            <input 
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm" 
              placeholder={t.business.website.placeholder}
              value={website}
              onChange={(e) => dispatch(setWebsite(e.target.value))}
            />
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">{t.business.socialMedia.label}</label>
            <input 
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200 placeholder-gray-400 shadow-sm" 
              placeholder={t.business.socialMedia.placeholder}
              value={socialMedia}
              onChange={(e) => dispatch(setSocialMedia(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
