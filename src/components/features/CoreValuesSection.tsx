import React from 'react';
import { CgQr } from 'react-icons/cg';
import {FaMobileAlt} from 'react-icons/fa';
import { IoStarSharp } from 'react-icons/io5';

import { getTranslations, type Locale } from '@/lib/translations';


interface CoreValuesSectionProps {
  locale: Locale;
}

const CoreValuesSection = ({ locale }: CoreValuesSectionProps) => {
  const t = getTranslations(locale);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#F3F3F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-6">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
                {t.coreValues?.title || 'Core Values and Features'}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-black max-w-4xl mx-auto">
                {t.coreValues?.subtitle || 'Simple, fast, and reliable — instant QR access, secure sharing, and real-time tracking.'}
              </p>
            </div>

          </div>
        </div>

        {/* Main Content Area - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Textual Description */}
          <div className="space-y-8 h-full flex flex-col items-center md:items-start justify-between">
            <div>
              <h3 className="text-lg text-center md:text-left sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">
                {t.coreValues?.instantDistribution?.title || 'Instant Distribution'}
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-sm text-justify md:text-left sm:text-base text-black mb-4 sm:mb-6">
                  {t.coreValues?.instantDistribution?.paragraph1 || 'Generate QR codes and links for easy customer access. Effortlessly create and distribute unique QR codes and direct links for your offers, passes, or digital content.'}
                </p>
                <p className="text-sm text-justify md:text-left sm:text-base text-black mb-4 sm:mb-6">
                  {t.coreValues?.instantDistribution?.paragraph2 || 'Customers can instantly scan or tap to access what they need—no app downloads, sign-ups, or extra steps required. This seamless process ensures faster engagement, better customer experience, and higher conversion rates for your business.'}
                </p>
              </div>
            </div>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="bg-white text-black font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-full border-2 border-teal-400 hover:bg-gray-50 transition-colors duration-200">
                {t.coreValues?.cta?.getStarted || 'Get Started'}
              </button>
              <button className="bg-black text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover:bg-gray-800 transition-colors duration-200">
                {t.coreValues?.cta?.knowMore || 'Know more'}
              </button>
            </div>

            
          </div>

          {/* Right Column - Feature Cards Layout */}
          <div className="space-y-6">
            {/* Main Card - Instant Distribution */}
            <div className="bg-[#F3F3F3] rounded-xl shadow-[0px_4px_4.3px_3px_#0000004F] p-8 sm:p-10 border border-gray-100 text-center">
              <div className="flex flex-col items-center">
                {/* Icon at top center */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-[#C8FFB4] rounded-full flex items-center justify-center mb-4">
                  <CgQr className="text-green-800 w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                {/* Title */}
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                  {t.coreValues?.cards?.instantDistribution?.title || 'Instant Distribution'}
                </h4>
                {/* Description */}
                <p className="text-sm sm:text-base text-black max-w-sm">
                  {t.coreValues?.cards?.instantDistribution?.description || 'Generate QR codes and links for easy customer access'}
                </p>
              </div>
            </div>

            {/* Two Smaller Cards Below */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Card 1: Complete Setup */}
              <div className="bg-[#F3F3F3] rounded-xl shadow-[0px_4px_4.3px_3px_#0000004F] p-6 sm:p-8 border border-gray-100 text-center">
                <div className="flex flex-col items-center">
                  {/* Icon at top center */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C8FFB4] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <FaMobileAlt className="text-green-800 w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  {/* Title */}
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                    {t.coreValues?.cards?.completeSetup?.title || 'Complete Setup'}
                  </h4>
                  {/* Description */}
                  <p className="text-sm sm:text-base text-black">
                    {t.coreValues?.cards?.completeSetup?.description || 'All required fields and business details for professional passes'}
                  </p>
                </div>
              </div>

              {/* Card 2: Full Branding */}
              <div className="bg-[#F3F3F3] rounded-xl shadow-[0px_4px_4.3px_3px_#0000004F] p-6 sm:p-8 border border-gray-100 text-center">
                <div className="flex flex-col items-center">
                  {/* Icon at top center */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C8FFB4] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <IoStarSharp className="text-green-800 w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  {/* Title */}
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                    {t.coreValues?.cards?.fullBranding?.title || 'Full Branding'}
                  </h4>
                  {/* Description */}
                  <p className="text-sm sm:text-base text-black">
                    {t.coreValues?.cards?.fullBranding?.description || 'Customize everything to match your brand perfectly'}
                  </p>
                </div>
              </div>
            </div>
          </div>


          
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
