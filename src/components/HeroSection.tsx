import React from 'react';
import { getTranslations, type Locale } from '@/lib/translations';
import GetStartedSection from './GetStartedSection';
import JoinThousandsSection from './JoinThousandsSection';
import CoreValuesSection from './CoreValuesSection';
import Footer from './Footer';

interface HeroSectionProps {
  locale: Locale;
}

const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = getTranslations(locale);
  
  return (
    <>
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 sm:mb-10 md:mb-12 leading-tight px-2">
              {locale === 'de' && 'Gehen Sie digital mit Ihren Stempelkarten-Belohnungen'}
              {locale === 'en' && 'Go digital with your Stamp card Rewards'}
            </h1>
            
            {/* Minimal Box Placeholder */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-100 border-2 border-gray-200 rounded-lg mx-auto mb-8 sm:mb-10 flex items-center justify-center">
              <div className="text-gray-400 text-xs sm:text-sm text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded mx-auto mb-2"></div>
                <span className="block">Placeholder</span>
              </div>
            </div>
            
            {/* Main Content Container */}
            <div className="flex flex-col items-center justify-center mb-12 sm:mb-14 md:mb-16">
              {/* Description Text */}
              <p className="text-lg sm:text-xl text-black leading-relaxed mb-6 sm:mb-8 max-w-4xl text-center px-4">
                {locale === 'de' && '"Betreten Sie die Zukunft des Kundenengagements mit digitalen Pässen — Treuekarten, Gutscheine und Event-Tickets, die nahtlos über QR und Apple Wallet funktionieren."'}
                {locale === 'en' && '"Step into the future of customer engagement with digital passes — loyalty cards, coupons, and event tickets that work seamlessly through QR and Apple Wallet."'}
              </p>
              
              {/* Know More Button */}
              <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                {locale === 'de' && 'Mehr erfahren'}
                {locale === 'en' && 'Know more'}
              </button>
            </div>
            
            {/* Bottom Features */}
            <div className="flex justify-center items-center gap-8 md:gap-16">
              <span className="text-gray-600 text-sm md:text-base">
                {locale === 'de' && 'Digitale Gutscheine'}
                {locale === 'en' && 'Digital Coupons'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {locale === 'de' && 'Exklusiver Pass'}
                {locale === 'en' && 'Exclusive Pass'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {locale === 'de' && 'Apple Wallet'}
                {locale === 'en' && 'Apple Wallet'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {locale === 'de' && 'Smart QR'}
                {locale === 'en' && 'Smart QR'}
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get Started Section */}
      <GetStartedSection locale={locale} />
      
      {/* Join Thousands Section */}
      <JoinThousandsSection locale={locale} />
      
      {/* Core Values Section */}
      <CoreValuesSection locale={locale} />

      {/* Footer */}
      <Footer locale={locale} />
    </>
  );
};

export default HeroSection;
