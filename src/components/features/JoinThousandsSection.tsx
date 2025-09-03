import Image from 'next/image';
import React from 'react';

import {type Locale } from '@/lib/translations';

interface JoinThousandsSectionProps {
  locale: Locale;
}

const JoinThousandsSection = ({ locale }: JoinThousandsSectionProps) => {


  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center flex-wrap">
          
          {/* Left Section - Image */}
          <div className="flex justify-center lg:justify-start bg-white h-full flex-1">
            <Image
              src="/passly_iphone_image.png"
              alt="Join Thousands of Users"
              width={600}
              height={400}
              className="w-full h-auto max-w-lg"
            />
          </div>
          
          {/* Right Section - Content */}
          <div className="text-left flex-1">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black mb-8 sm:mb-10 md:mb-12 leading-tight">
              {locale === 'de' && 'Intelligente Kundenbindung'}
              {locale === 'en' && 'Smart Loyality'}
            </h2>
            
            {/* Description Text */}
            <p className="text-xl text-black leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              {locale === 'de' && 'Kundenzugriff ohne Reibung. So können Sie sich auf die persönliche Verbindung konzentrieren.'}
              {locale === 'en' && 'Customer interaction without any friction. So you can focus on the personal connection.'}
            </p>
            
            {/* Stats or Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-black mb-2">10K+</div>
                <div className="text-gray-600">
                  {locale === 'de' && 'Aktive Unternehmen'}
                  {locale === 'en' && 'Active Businesses'}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-black mb-2">1M+</div>
                <div className="text-gray-600">
                  {locale === 'de' && 'Digitale Pässe erstellt'}
                  {locale === 'en' && 'Digital Passes Created'}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-black mb-2">99%</div>
                <div className="text-gray-600">
                  {locale === 'de' && 'Kundenzufriedenheit'}
                  {locale === 'en' && 'Customer Satisfaction'}
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-2 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                {locale === 'de' && 'Jetzt starten'}
                {locale === 'en' && 'Get Started Now'}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default JoinThousandsSection;
